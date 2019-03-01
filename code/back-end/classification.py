# Code taken from datacamp under "natural language processing fundamentals in python"


from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import metrics
from sklearn.naive_bayes import MultinomialNB
import numpy as np


import pandas as pd
from pprint import pprint

file = "../utils/data.csv"

#cp437
df = pd.read_csv(file, encoding="ISO-8859-1")

y = df.label

X_train, X_test, y_train, y_test = train_test_split(df["text"],
                                                    y,
                                                    test_size = 0.33,
                                                    random_state = 53)


count_vectorizer = CountVectorizer(stop_words="english", encoding="ISO-8859-1")
count_train = count_vectorizer.fit_transform(X_train.values.astype(str))
count_test = count_vectorizer.transform(X_test.values.astype(str))


tfidf_vectorizer = TfidfVectorizer(stop_words="english", max_df=0.7)

# Transform the training data: tfidf_train 
tfidf_train = tfidf_vectorizer.fit_transform(X_train.values.astype(str))

# Transform the test data: tfidf_test 
tfidf_test = tfidf_vectorizer.transform(X_test.values.astype(str))

# Create the CountVectorizer DataFrame: count_df
count_df = pd.DataFrame(count_train.A, columns=count_vectorizer.get_feature_names())

# Create the TfidfVectorizer DataFrame: tfidf_df
tfidf_df = pd.DataFrame(tfidf_train.A, columns=tfidf_vectorizer.get_feature_names())

"""
# Instantiate a Multinomial Naive Bayes classifier: nb_classifier
nb_classifier = MultinomialNB()

# Fit the classifier to the training data
nb_classifier.fit(count_train, y_train)

# Create the predicted tags: pred
print(count_test)
pred = nb_classifier.predict(count_test)

# Calculate the accuracy score: score
score = metrics.accuracy_score(y_test, pred)
print(score)

########## Calculate the confusion matrix: cm
cm = metrics.confusion_matrix(y_test, pred, labels=['SPOILER', 'NON-SPOILER'])
print(cm)

"""

# Create a Multinomial Naive Bayes classifier: nb_classifier
nb_classifier = MultinomialNB()

# Fit the classifier to the training data
nb_classifier.fit(tfidf_train, y_train)

# Create the predicted tags: pred
pred = nb_classifier.predict(tfidf_test)

# Calculate the accuracy score: score
score = metrics.accuracy_score(y_test, pred)
print(score)

# Calculate the confusion matrix: cm
cm = metrics.confusion_matrix(y_test, pred, labels=['SPOILER', 'NON-SPOILER'])
print(cm)

# Create the list of alphas: alphas
alphas = np.arange(0,1,0.1)

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

# Iterate over the alphas and print the corresponding score
#print(train_and_predict(0.1))


# Get the class labels: class_labels
class_labels = nb_classifier.classes_
#print(class_labels)


# Extract the features: feature_names
feature_names = tfidf_vectorizer.get_feature_names()

# Zip the feature names together with the coefficient array and sort by weights: feat_with_weights

feat_with_weights = sorted(zip(nb_classifier.coef_[0], feature_names))

# Print the first class label and the top 20 feat_with_weights entries
print(class_labels[0], feat_with_weights[:20])

# Print the second class label and the bottom 20 feat_with_weights entries
print(class_labels[1], feat_with_weights[-20:])
