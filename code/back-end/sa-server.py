from flask import Flask, request
app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def handle_post_request():
    data = request.get_data().decode("utf-8")
    print(data)

    # TODO: Classify the data as a spoiler or not

    return "Data received"  # Temporary, in future, return classification result


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=443, ssl_context="adhoc")
