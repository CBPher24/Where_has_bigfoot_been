from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import bigfoot

# Create an instance of Flask
app = Flask(__name__)

# Use PyMongo to establish Mongo connection
mongo = PyMongo(app, uri="mongodb://localhost:27017/Project_3")


# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    # Find one record of data from the mongo database
    bigfoot_data = mongo.db.Project_3.find_one()

    # Return template and data
    return render_template("index.html", bigfoot_data=bigfoot_data)


# Route that will trigger the scrape function
@app.route("/clean_data")
def clean():

    # Run the scrape function
    bigfoot_data = bigfoot_data.update()

    # Update the Mongo database using update and upsert=True
    mongo.db.Bigfoot.update({}, {"$set": bigfoot_data}, upsert=True)

    # Redirect back to home page
    return redirect("/")


if __name__ == "__main__":
    app.run(debug=True)
