from bs4 import BeautifulSoup
from datetime import datetime
from urllib.parse import urljoin

BASE_URL_LIVESTOCK = "https://livestock.kerala.gov.in/"

def parse_fib_news(html, source):
    """
    Parses table news page from FIB Kerala
    """
    soup = BeautifulSoup(html, "html.parser")
    notices = []

    # Select all main rows
    rows = soup.select("table[border='1'] > tbody > tr")
    
    for row in rows:
        a_tags = row.find_all("a")
        for a_tag in a_tags:
            title = a_tag.get_text(strip=True)
            href = a_tag.get("href")
            if not href:
                continue
            if href.startswith("/"):
                link = source["base_url"].rstrip("/") + href
            else:
                link = href

            notices.append({
                "title": title,
                "link": link,
                "date": datetime.utcnow().date().isoformat(),
                "source": source["name"],
                "type": "news"
            })

    return notices

def parse_wp_news(html, source):
    """
    Parses WordPress styled news page
    """
    soup = BeautifulSoup(html, "html.parser")
    notices = []

    p_tags = soup.select("div.wpb_wrapper p")

    for p in p_tags:
        a_tag = p.find("a")
        if not a_tag:
            continue

        title = a_tag.get_text(strip=True)
        href = a_tag.get("href")
        if not href:
            continue

        if href.startswith("/"):
            link = source["base_url"].rstrip("/") + href
        else:
            link = href

        notices.append({
            "title": title,
            "link": link,
            "date": datetime.utcnow().date().isoformat(),
            "source": source["name"],
            "type": "news"
        })

    return notices

def parse_news(html, source=None):
    """
    Parses table news from government portal (supports both 1 or 2 arguments)
    """
    soup = BeautifulSoup(html, "html.parser")
    news_data = []

    tables = soup.find_all("table", {"border": "1"})
    if len(tables) < 2:
        return news_data
    
    news_table = tables[1]
    rows = news_table.find_all("tr")[1:]  # skip header row

    base_url = source.get("base_url", BASE_URL_LIVESTOCK) if isinstance(source, dict) else BASE_URL_LIVESTOCK

    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 2:
            continue
        title_tag = cols[1].find("a")
        if title_tag:
            href = title_tag.get("href", "")
            news_data.append({
                "title": title_tag.get_text(strip=True),
                "link": urljoin(base_url, href),
                "date": datetime.utcnow().date().isoformat(),
                "source": source["name"] if isinstance(source, dict) and "name" in source else "Government Portal",
                "type": "news"
            })
    
    return news_data
