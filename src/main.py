from flask import Flask


app = Flask(__file__)


@app.route("/")
def hello_world():
    return '<a href="https://github.com/app-generator/api-server-flask">Hello, World!</a>'


if __name__ == '__main__':
    app.run(port=8080)
