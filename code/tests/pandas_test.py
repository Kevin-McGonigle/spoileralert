#This program uses the spoilers that we scraped from reddit to check how accurate our keywords-based identifier is.

import pandas as pd
from related_toGoT import is_related_to_GoT
with open(r"C:\Users\david\Desktop\ca326\2019-ca326-kevin-david-spoileralert\code\utils\data.txt", encoding="ISO-8859-1") as f:
	data = f.read().splitlines()
messages = pd.read_csv(r"C:\Users\david\Desktop\ca326\2019-ca326-kevin-david-spoileralert\code\utils\new_gameofthrones_posts.csv", encoding="ISO-8859-1")
phrases = messages['selftext']
passes = 0
for i in range(len(phrases)):
	if is_related_to_GoT(phrases[i],data):
		passes += 1

print("Accuracy: {:.2f}%".format( ((passes/len(phrases)) * 100) ))