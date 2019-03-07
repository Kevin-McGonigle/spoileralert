from flask import Flask, request, Response, render_template
from random import sample
import json
import ssl
import pickle

from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import metrics
from sklearn.naive_bayes import MultinomialNB
import numpy as np

import pandas as pd

app = Flask(__name__)
with open("sentences.pickle", "rb") as f:
    sentences = pickle.load(f)


@app.route("/", methods=["POST"])
def handle_post_request():
    global mnb, cv1
    data = json.loads(request.get_data().decode("utf-8"))

    indexes = []
    # TODO: Classify the data as a spoiler or not
    for i in range(len(data)):
        text = cv1.transform([data[i]])
        pred = mnb.predict(text)
        if pred:
            indexes.append(i)

            
    resp = Response(json.dumps(indexes))
    resp.headers["Access-Control-Allow-Origin"] = '*'
    return resp  # Temporary, in future, return classification result


@app.route("/survey", methods=["GET"])
def load_survey():
    return render_template("survey.html", sentences=pick_sentences())


@app.route("/survey", methods=["POST"])
def survey_submission():
    data = request.get_data().decode("utf-8").split("&")
    for i in range(1, 11):
        [id_num, val] = data[i].split("=")
        sentences[int(id_num)][val] += 1
    with open("sentences.pickle", "wb") as f:
        pickle.dump(sentences, f)

    return render_template("complete.html")


def min_votes():
    m = min(sentences.values(), key=lambda x: x["yes"] + x["no"])
    return m["yes"] + m["no"]


def pick_sentences():
    lo = min_votes()
    least_votes = [(k, v["sentence"]) for k, v in sentences.items() if v["yes"] + v["no"] == lo]
    i = 1
    while len(least_votes) < 10:
        least_votes += [(k, v["sentence"]) for k, v in sentences.items() if v["yes"] + v["no"] == lo + i]
        i += 1
    return enumerate(sample(least_votes, 10), 1)


if __name__ == "__main__":
    context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    context.load_cert_chain('/root/.acme.sh/spoiler.bogpeople.com/fullchain.cer',
                            '/root/.acme.sh/spoiler.bogpeople.com/spoiler.bogpeople.com.key')

    file = "data.csv"

    df = pd.read_csv(file, encoding="ISO-8859-1", skip_blank_lines=True)

    X_train, X_test, y_train, y_test = train_test_split(df['text'],
                                                        df['label'],
                                                        test_size = 0)


    global cv1
    cv1 =TfidfVectorizer(min_df=1, stop_words="english")

    x_traincv = cv1.fit_transform(X_train)

    y_train = y_train.astype('int')

    global mnb
    mnb = MultinomialNB(alpha=0.1)
    mnb.fit(x_traincv, y_train)
    app.run(host="0.0.0.0", port=443, ssl_context=context)
