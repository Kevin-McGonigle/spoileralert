from pprint import pprint
from rake_nltk import Rake, Metric

def is_related_to_GoT(text, data):
	r = Rake()
	r.extract_keywords_from_text(text)
	phrases = r.get_ranked_phrases()
	for phrase in phrases:
		for word in phrase.split():
			if word.casefold() == "white":
				continue
			if word.casefold() in data:
				print("Found a match: {}".format(word.casefold()))
				return True
	return False