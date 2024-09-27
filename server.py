from flask import Flask, request, jsonify, make_response
from flask_cors import CORS

import os
from dotenv import load_dotenv
load_dotenv()
from groq import Groq
import requests

app = Flask(__name__)
CORS(app)

@app.route("/api")
def test():
    return jsonify({
        "message": "Hello, World!"
    })

@app.route("/api/analyze", methods=["POST"])
def analyze():
    SECRET_KEY = os.getenv("FOODVISOR_SECRET_KEY")
    url = "https://vision.foodvisor.io/api/1.0/en/analysis/"

    headers = {"Authorization": "Api-Key " + SECRET_KEY}
    response = requests.post(url, headers=headers, files={"image": request.files.get("file")})
    if response.ok:
        data = response.json()
        print(data)
        return data
    else:
        return make_response(response.text, response.status_code)

if __name__ == "__main__":
    app.run(debug=True, port=8080)