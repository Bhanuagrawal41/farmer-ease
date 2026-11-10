from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scraper import scrape_and_store, get_database
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Kerala News API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/api/scrape")
def run_scraper():
    try:
        scrape_and_store()
        return JSONResponse({"status": "completed"})
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)

@app.get("/api/news")
def get_news():
    """
    Returns all news from MongoDB
    """
    try:
        collection = get_database()
        news = list(collection.find({}, {"_id": 0}))  # exclude _id for cleaner response
        return {"total": len(news), "news": news}
    except Exception as e:
        return JSONResponse({"status": "error", "message": str(e)}, status_code=500)
