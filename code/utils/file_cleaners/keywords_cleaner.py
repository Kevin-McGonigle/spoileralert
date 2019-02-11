from pprint import pprint
from rake_nltk import Rake, Metric
import time

total_keywords = []

with open(r"C:\Users\david\Desktop\ca326\gotDataset\characters.txt", encoding="ISO-8859-1") as f:
	data = f.read().splitlines()

r = Rake()
for line in data:
	keywords = r.extract_keywords_from_text(line)
	keywords = r.get_ranked_phrases()
	for line in keywords:
		for word in line.split():
			total_keywords.append(word)


with open("data.txt","w", encoding="ISO-8859-1") as f:
	for word in set(total_keywords):
		if not word.isnumeric():
			f.write(word)
			f.write("\n")