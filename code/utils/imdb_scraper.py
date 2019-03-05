import requests
from bs4 import BeautifulSoup
import csv
from pprint import pprint

page = requests.get("https://www.imdb.com/title/tt0944947/trivia?ref_=tt_trv_trv")
soup = BeautifulSoup(page.content, "html.parser")
paragraphs = soup.find_all("div", {"class": "sodatext"})
with open("imdb_text.csv", "w") as f:
	writer = csv.writer(f)
	towrite = []
	for p in paragraphs:
		if p:
			writer.writerow([p.text])