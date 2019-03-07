# This program calculates the accuracy of the bayesian classifier accross a user entered number of splits of the data.

# Code taken from datacamp under "natural language processing fundamentals in python"


from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import metrics
from sklearn.naive_bayes import MultinomialNB
import numpy as np


import pandas as pd
from pprint import pprint

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

file = "../../../combine.csv"

df = pd.read_csv(file, encoding="ISO-8859-1", skip_blank_lines=True)

y = df.label

total_probs = 0

seeds = int(input("Enter how many splits of the data you would like: "))

for i in range(seeds):
    X_train, X_test, y_train, y_test = train_test_split(df["text"],
                                                        y,
                                                        test_size = 0.3,
                                                        random_state = i)


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



    # Outputs the confustion matrix, in this example there are 52 "non-spoilers" that are incorrectly classified as spoilers and 38 that are accurately
    #                                                                                                           classified as "non-spoilers".

    # Create a Multinomial Naive Bayes classifier: nb_classifier
    nb_classifier = MultinomialNB(alpha=0.1)

    # Fit the classifier to the training data
    nb_classifier.fit(tfidf_train, y_train)

    # Create the predicted tags: pred
    pred = nb_classifier.predict(tfidf_test)

    # Calculate the accuracy score: score
    score = metrics.accuracy_score(y_test, pred)
    #print(score)
    total_probs += score

    cm = metrics.confusion_matrix(y_test, pred, labels=[1, 0])
    print(cm)

print("The accuracy of the bayesian classifier accorss {} different splits of the data is: {:.2f}%".format(seeds, (total_probs / seeds) * 100 ))



# Create the list of alphas: alphas
alphas = np.arange(0,1,0.1)

# Define train_and_predict()


# Iterate over the alphas and print the corresponding score
for alpha in alphas:
    print("alpha = {}".format(alpha))
    print(train_and_predict(alpha))


# Get the class labels: class_labels
class_labels = nb_classifier.classes_
#print(class_labels)


# Extract the features: feature_names
feature_names = tfidf_vectorizer.get_feature_names()

# Zip the feature names together with the coefficient array and sort by weights: feat_with_weights

feat_with_weights = sorted(zip(nb_classifier.coef_[0], feature_names))

# Print the first class label and the top 20 feat_with_weights entries
#print(class_labels[0], feat_with_weights[:40])

# Print the second class label and the bottom 20 feat_with_weights entries
#print(class_labels[1], feat_with_weights[-40:])
