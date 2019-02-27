from flask import Flask, request, Response, render_template
import ssl
app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def handle_post_request():
    data = request.get_data().decode("utf-8")
    print(data)

    # TODO: Classify the data as a spoiler or not

    resp = Response("Data received")
    resp.headers["Access-Control-Allow-Origin"] = '*'
    return resp  # Temporary, in future, return classification result


@app.route("/survey", methods=["GET"])
def load_survey():
    questions = [("1", "Question 1 Text"), ("2", "Question 2 Text"), ("3", "Question 3 Text")]
    return render_template("survey.html", questions=questions)


@app.route("/survey", methods=["POST"])
def survey_submission():
    pass


if __name__ == "__main__":
    context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
    context.load_cert_chain('/root/.acme.sh/spoiler.bogpeople.com/spoiler.bogpeople.com.cer',
                            '/root/.acme.sh/spoiler.bogpeople.com/spoiler.bogpeople.com.key')
    app.run(host="0.0.0.0", port=443, ssl_context=context)
