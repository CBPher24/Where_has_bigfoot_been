import os
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import bson.json_util as json_util

# template_fol = os.path.abspath("../templates")
app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/Project_3")


@app.route("/")
def home():
    data = {}
    bfoot = mongo.db.Bigfoot.find()
    data=list(bfoot)
    data = json_util.dumps(data)


    return render_template("index.html", bfoot_data=data)
    


# @app.route("/scrape")
# def scrape():
#     mars_data = scrape_mars.scrape()
#     mongo.db.marsc.update_one({}, {"$set": mars_data}, upsert=True)
#     return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)