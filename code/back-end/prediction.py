from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import metrics
from sklearn.naive_bayes import MultinomialNB
import numpy as np


import pandas as pd
from pprint import pprint

def is_spoiler(text):
	file = "../utils/excels/data.csv"

	df = pd.read_csv(file, encoding="ISO-8859-1", skip_blank_lines=True)

	X_train, X_test, y_train, y_test = train_test_split(df['text'],
	                                                    df['label'],
	                                                    test_size = 0)


	cv1 =TfidfVectorizer(min_df=1, stop_words="english")

	x_traincv = cv1.fit_transform(X_train)

	text = cv1.transform([text])


	y_train = y_train.astype('int')

	mnb = MultinomialNB(alpha=0.1)
	mnb.fit(x_traincv, y_train)

	pred = mnb.predict(text)
	if pred:
		return True
	return False

if __name__ == "__main__":
	is_spoiler("Ned Stark dies")