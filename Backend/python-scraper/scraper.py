import os
import sys
import time
import urllib3
from pathlib import Path
from datetime import datetime

# Ensure the current directory is always in sys.path
CURRENT_DIR = Path(__file__).resolve().parent
if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

import requests
from dotenv import load_dotenv
from pymongo import MongoClient
from parsers import parse_news, parse_wp_news

load_dotenv()
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Default Headers
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/140.0.0.0 Safari/537.36"
    )
}

SOURCES = [
    {
        "name": "FIB Home",
        "base_url": "https://www.fibkerala.gov.in",
        "list_url": "https://www.fibkerala.gov.in/node/1",
        "parser": parse_news
    },
    {
        "name": "FIB News",
        "base_url": "https://livestock.kerala.gov.in",
        "list_url": "https://livestock.kerala.gov.in/",
        "parser": parse_wp_news
    },
]

def get_database():
    """Lazily initialize or retrieve MongoDB collection"""
    uri = os.getenv("MONGO_URI")
    if not uri or "<db_password>" in uri:
        raise ValueError("MONGO_URI is not properly set or still contains '<db_password>' placeholder in .env")
    client = MongoClient(uri, serverSelectionTimeoutMS=5000)
    db = client["kerala_notices_db"]
    return db["noticess"]

def scrape_and_store():
    print("Scraper started...")
    total_inserted = 0
    collection = get_database()

    for src in SOURCES:
        try:
            html = requests.get(src["list_url"], headers=HEADERS, verify=False, timeout=15).text
            news_list = src["parser"](html, src)
            print(f"{src['name']} returned {len(news_list)} notices")

            for n in news_list:
                if collection.find_one({"title": n["title"], "link": n["link"]}) is None:
                    collection.insert_one(n)
                    total_inserted += 1
                    print(f"Inserted: {n['title']}")
                else:
                    print(f"Skipped duplicate: {n['title']}")

            time.sleep(2)
        except Exception as e:
            print(f"Error scraping {src['name']}: {e}")

    print(f"Scraping completed. Total new notices inserted: {total_inserted}")
    return total_inserted

if __name__ == "__main__":
    scrape_and_store()
