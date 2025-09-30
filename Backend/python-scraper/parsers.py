
#     return notices
from bs4 import BeautifulSoup
from datetime import datetime
from urllib.parse import urljoin

BASE_URL = "https://fibkerala.gov.in"
def parse_fib_news(html, source):
    soup = BeautifulSoup(html, "html.parser")
    notices = []

    # Select all main rows
    rows = soup.select("table[border='1'] > tbody > tr")
    
    for row in rows:
        # Find all <a> tags inside the row
        a_tags = row.find_all("a")
        for a_tag in a_tags:
            title = a_tag.get_text(strip=True)
            href = a_tag.get("href")
            if not href:
                continue
            # Make absolute URL if needed
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

# You can create similar parsers for archive and farm news
def parse_wp_news(html, source):
    """
    Parses WordPress styled news page
    """
    soup = BeautifulSoup(html, "html.parser")
    notices = []

    # Find all <p> tags inside wpb_wrapper
    p_tags = soup.select("div.wpb_wrapper p")

    for p in p_tags:
        a_tag = p.find("a")
        if not a_tag:
            continue

        title = a_tag.get_text(strip=True)
        href = a_tag.get("href")
        if not href:
            continue

        # Make absolute URL
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

BASE_URL = "https://livestock.kerala.gov.in/"

def parse_news(html):
    soup = BeautifulSoup(html, "html.parser")
    news_data = []

    # find all tables with border=1
    tables = soup.find_all("table", {"border": "1"})
    
    # The second table contains the actual news (skip the first)
    if len(tables) < 2:
        return news_data
    
    news_table = tables[1]
    rows = news_table.find_all("tr")[1:]  # skip header row

    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 2:
            continue
        title_tag = cols[1].find("a")
        if title_tag:
            news_item = {
                "title": title_tag.get_text(strip=True),
                "link": urljoin(BASE_URL, title_tag.get("href"))
            }
            news_data.append(news_item)
    
    return news_data