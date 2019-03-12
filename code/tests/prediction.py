from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import metrics
from sklearn.naive_bayes import MultinomialNB
import numpy as np


import pandas as pd
from pprint import pprint

def is_spoiler(text):
	file = r"C:\Users\david\Desktop\ca326\2019-ca326-kevin-david-spoileralert\code\utils\excels\data.csv"

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


# Define train_and_predict()
def train_and_predict(alpha):
    # Instantiate the classifier: nb_classifier
    nb_classifier = MultinomialNB(alpha=alpha)
    # Fit to the training data
    nb_classifier.fit(tfidf_train, y_train)
    # Predict the labels: pred
    pred = nb_classifier.predict(tfidf_test)
    # Compute accuracy: score
    score = metrics.accuracy_score(y_test, pred)
    return score

# Create the list of alphas: alphas
alphas = np.arange(0,1,0.1)

# Iterate over the alphas and print the corresponding score
for alpha in alphas:
    print('Alpha: ', alpha)
    print('Score: ', train_and_predict(alpha))

file = "../utils/excels/data.csv"

df = pd.read_csv(file, encoding="ISO-8859-1", skip_blank_lines=True)

X_train, X_test, y_train, y_test = train_test_split(df['text'],
                                                    df['label'],
                                                    test_size = 0)


global cv1
cv1 =TfidfVectorizer(min_df=1, stop_words="english")

x_traincv = cv1.fit_transform(X_train)

text = cv1.transform(["Game of thrones was made in 2011 and was written by George R.R Martin"])


y_train = y_train.astype('int')

global mnb
mnb = MultinomialNB(alpha=0.1)
mnb.fit(x_traincv, y_train)

#print(is_spoiler("Ned Stark is a character from Game of Thrones 2011"))

pred = mnb.predict(text)
print(pred[0])

feature_names = cv1.get_feature_names()

feats_with_weights = sorted(zip(mnb.coef_[0], feature_names))

print(feats_with_weights[:20])
print("\n")
print(feats_with_weights[-20:])

#score = metrics.accuracy_score(y_test, pred)
#print(score)

