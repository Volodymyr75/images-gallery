import os
import requests
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv(dotenv_path="./.env.local")
# print(os.environ.get('UNSPLASH_KEY', ''))


UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(
    os.environ.get("DEBUG", True)
)  # to disable debug set env DEBUG in .env.local =''

if not UNSPLASH_KEY:
    raise EnvironmentError(
        "Please create .env.local file and insert there UNSPLASH_KEY"
    )

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG


@app.route("/new-image")
def new_image():
    word = request.args.get("query")
    headers = {"Accept-Version": "v1", "Authorization": "Client-ID " + UNSPLASH_KEY}
    params = {"query": word}
    r = requests.get(url=UNSPLASH_URL, headers=headers, params=params)
    data = r.json()
    # return {'word': word}
    return data


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
