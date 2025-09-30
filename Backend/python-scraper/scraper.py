
import requests
import time
import urllib3
from datetime import datetime
from parsers import  parse_wp_news, parse_news, BASE_URL
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from apscheduler.schedulers.background import BackgroundScheduler
load_dotenv()
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# MongoDB connection
MONGO_URI = os.getenv("mongodb+srv://sainishashank002:sswwtt2004@cluster0.hcehuci.mongodb.net/kerala_notices_db")
client = MongoClient("mongodb+srv://sainishashank002:sswwtt2004@cluster0.hcehuci.mongodb.net/kerala_notices_db")
db = client["kerala_notices_db"]
collection = db["noticess"]


def fetch_html(url):
    response = requests.get(url)
    response.raise_for_status()
    return response.text


# Headers
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/140.0.0.0 Safari/537.36"
}

SOURCES = [
    {"name": "FIB Home", "base_url": "https://www.fibkerala.gov.in", "list_url": "https://www.fibkerala.gov.in/node/1", "parser": parse_news},
    {"name": "FIB News ", "base_url": "https://livestock.kerala.gov.in", "list_url": "https://livestock.kerala.gov.in/", "parser": parse_wp_news},
    
]

# def scrape_all_sources():
#     total_inserted = 0
#     for src in SOURCES:
#         try:
#             html = requests.get(src["list_url"], headers=HEADERS, verify=False, timeout=15).text
#             notices = src["parser"](html, src)
#             print(f"{src['name']} returned {len(notices)} notices")

#             for n in notices:
#                 if collection.find_one({"title": n["title"], "link": n["link"]}) is None:
#                     collection.insert_one(n)
#                     total_inserted += 1
#                     print(f"Inserted: {n['title']}")
#                 else:
#                     print(f"Skipped duplicate: {n['title']}")

#             time.sleep(2)
#         except Exception as e:
#             print(f"Error scraping {src['name']}: {e}")

#     print(f"Scraping completed. Total new notices inserted: {total_inserted}")

# # Scheduler: scrape every day at 8:00 AM
# scheduler = BackgroundScheduler()
# scheduler.add_job(scrape_all_sources, 'cron', hour=8, minute=0)
# scheduler.start()

# def scrape_and_store():
#     html = fetch_html(BASE_URL + "/node/16")  # replace with news page URL
#     news_list = parse_news(html)

#     if news_list:
#         # clear previous entries
#         collection.delete_many({})
#         # insert new data
#         collection.insert_many(news_list)
#         print(f"{len(news_list)} news items saved to MongoDB")
#     else:
#         print("No news found.")

# if __name__ == "__main__":
#     scrape_and_store()

def scrape_and_store():
    print("Scraper started...")
    total_inserted = 0  # Track new notices

    for src in SOURCES:
        try:
            # Fetch HTML
            html = requests.get(src["list_url"], headers=HEADERS, verify=False, timeout=15).text
            
            # Parse notices using the source's parser
            news_list = src["parser"](html, src)
            print(f"{src['name']} returned {len(news_list)} notices")

            # Insert notices one by one, skip duplicates
            for n in news_list:
                if collection.find_one({"title": n["title"], "link": n["link"]}) is None:
                    collection.insert_one(n)
                    total_inserted += 1
                    print(f"Inserted: {n['title']}")
                else:
                    print(f"Skipped duplicate: {n['title']}")

            time.sleep(2)  # Optional delay between sources

        except Exception as e:
            print(f"Error scraping {src['name']}: {e}")

    print(f"Scraping completed. Total new notices inserted: {total_inserted}")

if __name__ == "__main__":
    scrape_and_store()