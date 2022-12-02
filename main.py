from flask import Flask, render_template

app = Flask(__name__)

# home
@app.route("/")
def home():
    return render_template("index.html")

# hangman
@app.route("/hang_man")
def hang_man():
    return render_template("hang_man.html")

# cool pics
@app.route("/cool_pics")
def cool_pics():
    return render_template("cool_pics.html")

if __name__ == "__main__":
    app.run(debug=True)