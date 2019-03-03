from flask import Flask, request, Response, render_template
from random import sample
import ssl
import pickle

app = Flask(__name__)
with open("sentences.pickle", "rb") as f:
    sentences = pickle.load(f)


@app.route("/", methods=["GET", "POST"])
def handle_post_request():
    data = request.get_data().decode("utf-8")

    # TODO: Classify the data as a spoiler or not

    resp = Response("Data received")
    resp.headers["Access-Control-Allow-Origin"] = '*'
    return resp  # Temporary, in future, return classification result


@app.route("/survey", methods=["GET"])
def load_survey():
    render_template("survey.html", sentences=pick_sentences())


@app.route("/survey", methods=["POST"])
def survey_submission():
    data = request.get_data().decode("utf-8").split("&")
    freq = data[0][5:]  # Unused for now, left in for possible future logging
    for i in range(1, 11):
        [id, val] = data[i].split("=")
        sentences[int(id)][val] += 1
    with open("sentence.pickle", "wb") as f:
        pickle.dump(sentences, f)

    return render_template("complete.html")


def min_votes():
    m = min(sentences.values(), key=lambda x: x["yes"] + x["no"])
    return m["yes"] + m["no"]


def pick_sentences():
    least_votes = [(k, v["sentence"]) for k, v in sentences.items() if v["yes"] + v["no"] == min_votes()]
    if len(least_votes) < 10:
        least_votes += [(k, v["sentence"]) for k, v in sentences.items() if v["yes"] + v["no"] == min_votes() + 1]
    return enumerate(sample(least_votes, 10), 1)


if __name__ == "__main__":
    context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    context.load_cert_chain('/root/.acme.sh/spoiler.bogpeople.com/spoiler.bogpeople.com.cer',
                            '/root/.acme.sh/spoiler.bogpeople.com/spoiler.bogpeople.com.key')
    app.run(host="0.0.0.0", port=443, ssl_context=context)
