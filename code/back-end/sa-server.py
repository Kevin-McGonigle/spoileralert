from flask import Flask, request, Response, render_template
from random import sample
import json
import ssl
import pickle

app = Flask(__name__)
with open("sentences.pickle", "rb") as f:
    sentences = pickle.load(f)


@app.route("/", methods=["POST"])
def handle_post_request():
    data = json.loads(request.get_data().decode("utf-8"))

    indexes = [i for i in range(len(data))]
    # TODO: Classify the data as a spoiler or not

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
    app.run(host="0.0.0.0", port=443, ssl_context=context)
