import requests
from bs4 import BeautifulSoup
import csv
from pprint import pprint

page = requests.get("https://en.wikipedia.org/wiki/Game_of_Thrones")
soup = BeautifulSoup(page.content, "html.parser")
paragraphs = soup.find_all("p")
with open("non_spoilers_GoT.csv", "w") as f:
	writer = csv.writer(f)
	for p in paragraphs:
		if p:
			writer.writerow([p.text])