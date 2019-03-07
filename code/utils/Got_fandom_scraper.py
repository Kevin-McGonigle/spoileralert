import requests
from bs4 import BeautifulSoup
import csv
from pprint import pprint

urls = ["https://gameofthrones.fandom.com/wiki/The_Wars_To_Come", "https://gameofthrones.fandom.com/wiki/The_House_of_Black_and_White",
		"https://gameofthrones.fandom.com/wiki/High_Sparrow_(episode)", "https://gameofthrones.fandom.com/wiki/Sons_of_the_Harpy_(episode)",
		"https://gameofthrones.fandom.com/wiki/Kill_the_Boy", "https://gameofthrones.fandom.com/wiki/Unbowed,_Unbent,_Unbroken",
		"https://gameofthrones.fandom.com/wiki/The_Gift_(episode)", "https://gameofthrones.fandom.com/wiki/Hardhome_(episode)",
		"https://gameofthrones.fandom.com/wiki/The_Dance_of_Dragons", r"https://gameofthrones.fandom.com/wiki/Mother%27s_Mercy"]

with open("episodes_s5.csv", "w") as f:
	writer = csv.writer(f)
	for url in urls:
		page = requests.get(url)
		soup = BeautifulSoup(page.content, "html.parser")
		paragraphs = soup.find_all("p")
		for p in paragraphs:
			if p:
				writer.writerow([p.text])