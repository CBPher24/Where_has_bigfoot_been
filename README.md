
# PROJECT 3: WHERE HAS BIGFOOT BEEN?

![header](https://user-images.githubusercontent.com/100891182/178513371-40a9fd95-5391-4c85-bbf5-f96d82459c41.jpg)


## WHERE HAS BIGFOOT BEEN?

## BACKGROUND

Bigfoot is said to be an ape-like creature who roams around the forests of North America. Resembling a cross between a gorilla and a human, many have theorized that they are something of a “missing link” in evolution. 

According to Bigfoot Field Researcher Organization (BFRO), there have been over 10,000 reported Bigfoot sightings in the continental United States. About one-third of all claims of Bigfoot sightings are located in the Pacific Northwest, with the remaining reports spread throughout the rest of North America. 

BFRO has collected and set a dataset about bigfoot sightings throughout North America. 

This project will create an application that shows various visualizations and statistics about sasquatch sightings.

## QUESTIONS FOR ANALYSIS:

- Which regions on the US map have the highest concentrations of recorded Bigfoot sightings?
- What are the classifications of sightings?
- How many sightings exist per class?
- How do the number of sightings change over time? How many sightings are there per decade in the US?
- What are some of the most popular articles about Bigfoot?


## METHODS FOR ANALYSIS:

You will need:
- web browser (Chrome or Firefox recommended)
- Jupyter Notebook
    - pandas
    - numpy 
    - pymongo

    - os
    - requests
    - Splinter
    - webdriver_manager
    - Beautiful Soup
- MongoDB

- VS Code 

- Flask
    - Python
    - HTML/CSS
        - Bootstrap
    - Javascript
        - Leaflet
        - Plotly


<strong>1. Utilize the datasets found in BFRO, DataWorld.</strong>
- Open the Data folder in this repository and use the Bigfooot_Locations.csv file directly or
- you can download your file <a href="https://hub.arcgis.com/datasets/TrainingServices::-bigfoot-sightings/explore?location=36.682290%2C-103.774481%2C4.00">here</a>. Click the cloud download button on the left side of the map <img src="https://cdn-icons-png.flaticon.com/512/109/109600.png" style="height:20px; width:20px"> and choose to download the GeoJSON file.

<strong>2. Powered by a dataset with over 3,500 records, using a Mongo Database.</strong>
- Open the Bigfoot_Locations CSV file in Jupyter Notebook. (Refer to our Data_Jupyter.ipynb inside the Coding folder)
- Load in the proper dependencies including:
```
import pandas as pd
import numpy as np
import pymongo as db
from pymongo import MongoClient
client = MongoClient()
```
note: Open MongoDB before running .ipynb code
- Create a connection to MongoDB and name your database that you will load your data into (Where we have Project_3), then read in the CSV file
```
db=client.Project_3
db.Bigfoot.drop() # drop if exists so it is not duplicated
bf_df=pd.read_csv("../Data/Bigfoot_Locations.csv")
```
- Clean and manipulate the data as you see fit, we decided to pull out the classes from the description column and create a new column of classes by itself.
```
classes = []
for index, row in bf_df.iterrows():

    if 'Class A' in row['descriptio']:
        classes.append('Class A')
    elif 'Class B' in row['descriptio']:
        classes.append('Class B')
    elif 'Class C' in row['descriptio']:
        classes.append('Class C')
    else:
        classes.append('None')
```
- Lastly, load this newly cleaned data into your MongoDB by adding it as a collection to your above created database. (Here our collection is called 'Bigfoot' and the dictionary will be stored as 'data')
```
for x in range(len(bf_df)):
        results=bf_df.iloc[x,:]
        index=results["ObjectId"].astype('str')
        result=results.to_dict()
        db.Bigfoot.insert_one({"index":index,"data":result})
```
- note: see the Data_Jupyter_vWindows11.ipynb if you are on Windows 11, you will need to run an extra snippet of code for your system to recognize the data in the correct format to load into MongoDB
```
lst = list(bf_df)
bf_df[lst] = bf_df[lst].astype('str')
```
<strong>3. Webscrape and add the scraped collection to the database.</strong>
- Open a new Jupyter Notebook file to use for webscraping. (Refer to our Scraping.ipynb)
- Import necessary dependencies to webscrape and execute path to browser:
```
import os
import requests
import pandas as pd
from splinter import Browser
from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import pymongo as db
from pymongo import MongoClient

executable_path = {'executable_path': ChromeDriverManager().install()}
browser = Browser('chrome', **executable_path, headless=True)
```
- Save this URL: "https://www.outsideonline.com/gallery/10-most-convincing-bigfoot-sightings/"
into a variable
- Proceed the scraping process. Add the page source to the variable `content`, load the contents of the page, its source, into BeautifulSoup.
```
browser.visit(bf_url)

content = browser.html

soup = BeautifulSoup(content,features="lxml")
```

- Pull the sections and images from the page using a 'for' loop like below:
```
sections = []
for element in soup.findAll(attrs = {'class': 'c-content-single-gallery__gallery-image u-spacing'}):
    images = {}
    img_sect = element.find(attrs={'class':'o-image lazy'})
     # print(img_sect)
    img_dtl = img_sect["alt"]
     # print(img_dtl)
    img_src = img_sect["data-src"]
     # print(img_src)
    
    images["blurb"] = img_dtl
    images["photo"] = img_src

    sections.append(images)
```
- Connect to MongoDB using MongoClient exactly like in step 2. 
```
client = MongoClient()
db=client.Project_3 
db.images.drop()
```
The new collection is called images. The last line will drop the collection if it already exists in the database to avoid duplications.

- Save the new data into a dataframe
```
sect = pd.DataFrame(sections)
sect["index"] = sect.index
sect
```

- Add the new collection to the existing database
```
for x in range(len(sect)):
        results=sect.iloc[x,:]
        index=results["index"].astype('str')
        result=results.to_dict()
        db.images.insert_one({"index":index,"data":result})
```
The dictionary to refer to inside this collection is saved under 'data'
- note, if using Windows 11, refer to our Scraping_vWindows11.ipynb for the extra snippet of code to run for this OS
```
lst = list(sect)
sect[lst] = sect[lst].astype('str')
```
Run one cell before last line 

<strong>4. Use VS Code to run Flask, HTML/CSS and Javascript</strong>
- Open VS Code and create a new folder called templates (it is crucial you name this folder templates so render_template will recognize it)
    - Inside 'templates' create your `index.html`
- Next create a folder called static where you will have two subfolders, name one `css` where you will create and store your `style.css` file and name the other `js` where you will create and store all of your javascript files.
- Lastly inside VS Code start a new file called `app.py` This will run Python code to integrate all of your working files together and display them on a webpage. 
```
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
```
Import the necessary dependencies including: Flask, render_template, redirect, Pymongo, and also bson.json_util
Connect to MongoDB and your database.
Create a route that reads from the database and connects and incorporates it into your `index.html` which will open and display your dashboard.

- When creating `.js` files for javascript, you will need a `config.js` to hold your API key for accessing Leaflet, a `logic.js` page for your javascript code to create maps using Leaflet and a `plots.js` page for your Plot.ly charts and graphs.
- You can create separate pages for any additional javascript or javascript libraries used (we have `L.colorIcon.js` as an additional library plugin used on our Leaflet map)
- When designing the look of your webpage dashboard add the appropriate Bootstrap scripts (in the `<head>` tag and before the closing `</body>` tag) We use Bootstrap version 4.6 in our `index.html` 

## FINAL FINDINGS:

### Distribution of bigfoot sightings by location in Streetview basemap


![Web capture_13-7-2022_112113_127 0 0 1](https://user-images.githubusercontent.com/100891182/178819870-473ca991-9439-4965-91f2-c55b38e468de.jpeg)


### Distribution of bigfoot sightings by location in Satellite basemap 

![Web capture_14-7-2022_163144_127 0 0 1](https://user-images.githubusercontent.com/100891182/179089931-3a641333-e716-4023-a795-bef7013e2a00.jpeg)


### Distribution of bigfoot sightings by location in Topographical basemap 

![Web capture_14-7-2022_163212_127 0 0 1](https://user-images.githubusercontent.com/100891182/179090056-60021711-4118-43c3-bdde-c1262d012b1b.jpeg)




### Popup with details of sighting

![Web capture_14-7-2022_163455_127 0 0 1](https://user-images.githubusercontent.com/100891182/179090220-90023533-1429-4fb7-9344-b6176ae068de.jpeg)


### Landing page with distribution of bigfoot sightings by class

![newplot (7)](https://user-images.githubusercontent.com/100891182/179089087-7fb23b76-dd48-469a-b72d-8baf4168b1a5.png)



### Landing page with distribution of bigfoot sightings by decade

![newplot (8)](https://user-images.githubusercontent.com/100891182/179089012-27e2a083-2a96-499d-9e37-8d5106140fb3.png)



### Full website

![Web capture_14-7-2022_162840_127 0 0 1](https://user-images.githubusercontent.com/100891182/179089407-d797afd0-ff1f-474a-9226-ea56efd4ce48.jpeg)

<br>

## Contributors:
 - <i><u>Daniel Davies</u></i> - Jupyter Notebook, data cleanup/manipulation, Javascript, Leaflet, Plot.ly, Python Flask, styling, presentation

 - <i><u>Khanh Le</u></i> - Javascript, Leaflet, README, presentation creation

 - <i><u>Christopher Partee</u></i> - Gather data and resources, Jupyter Notebook, webscraping, HTML, Bootstrap 

 - <i><u>Stefanie Gagnon</u></i> - HTML, CSS, Bootstrap, styling, README additions/detailing/refining, data resources, presentation notes </i>

<br>

## REFEERENCES:

Data:

https://data.world/timothyrenner/bfro-sightings-data/workspace/project-summary?agentid=timothyrenner&datasetid=bfro-sightings-data

http://bfro.net/REF/aboutbfr.asp

Coding:

https://leafletjs.com/

https://github.com/shevekk/Leaflet.ColorIcon

https://getbootstrap.com/docs/4.6/getting-started/introduction/

https://retentionscience.zendesk.com/hc/en-us/articles/115003025814-How-To-Build-HTML-for-Conditional-Statements

Images:

https://cdn.pixabay.com/photo/2022/01/14/04/02/bigfoot-6936421__340.png

https://stock.adobe.com/search/free?k=forest&search_type=usertyped&asset_id=332548527&content_id=332548527

Content/other:
https://books.google.com/books/about/Leave_Nothing_But_Footprints_Take_Nothin.html?id=lcOoxgEACAAJ




