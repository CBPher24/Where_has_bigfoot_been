import os
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo

# template_fol = os.path.abspath("../templates")
app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/Project_3")


@app.route("/")
def home():
    bfoot = mongo.db.Bigfoot.find()
    return render_template("index.html", bfoot_data=bfoot)
    


# @app.route("/scrape")
# def scrape():
#     mars_data = scrape_mars.scrape()
#     mongo.db.marsc.update_one({}, {"$set": mars_data}, upsert=True)
#     return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)