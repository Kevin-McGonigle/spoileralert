from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import metrics
from sklearn.naive_bayes import MultinomialNB
import numpy as np


import pandas as pd
from pprint import pprint

file = "../utils/data.csv"

df = pd.read_csv(file, encoding="ISO-8859-1")

cv = TfidfVectorizer(min_df=1, stop_words="english")


X_train, X_test, y_train, y_test = train_test_split(df['text'],
                                                    df['label'],
                                                    test_size = 0.01,
                                                    random_state = 17)


cv1 =TfidfVectorizer(min_df=1, stop_words="english")

x_traincv = cv1.fit_transform(X_train)
x_testcv = cv1.transform(X_test)
text = cv1.transform(["Ned Stark is a character from Game of Thrones 2011"])



y_train = y_train.astype('int')

mnb = MultinomialNB(alpha=0.1)
mnb.fit(x_traincv, y_train)

x_testcv = cv1.fit_transform(X_test)

pred = mnb.predict(text)
print(pred)

#score = metrics.accuracy_score(y_test, pred)
#print(score)