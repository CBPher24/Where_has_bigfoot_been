import os
from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import bson.json_util as json_util

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/Project_3")

@app.route("/")
def home():
    data = {}
    bfoot = mongo.db.Bigfoot.find()
    bimgs = mongo.db.images.find()
    data=list(bfoot)
    data = json_util.dumps(data)


    return render_template("index.html", bfoot_data=data, plotdata= data, bfimgs = bimgs)
    


if __name__ == "__main__":
    app.run(debug=True)