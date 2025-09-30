
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scraper import scrape_and_store
from pymongo import MongoClient
from fastapi.responses import JSONResponse
import os
from dotenv import load_dotenv
app = FastAPI(title="Kerala News API")
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
      allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["kerala_notices_db"]
collection = db["noticess"]


@app.get("/api/scrape")
def run_scraper():
    try:
        scrape_and_store()
        return JSONResponse({"status": "completed"})
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)})


@app.get("/api/news")
def get_news():
    """
    Returns all news from MongoDB
    """
    news = list(collection.find({}, {"_id": 0}))  # exclude _id for cleaner response
    return {"total": len(news), "news": news}


@app.get("/api/scrape")
def scrape_news():
    """
    Trigger scraping for all sources
    """
    scrape_and_store()
    return {"status": "scraping_completed"}
