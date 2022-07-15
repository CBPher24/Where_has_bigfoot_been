
# PROJECT 3: WHERE HAS BIGFOOT BEEN?

![header](https://user-images.githubusercontent.com/100891182/178513371-40a9fd95-5391-4c85-bbf5-f96d82459c41.jpg)


TEAM MEMBERS: Dan Davies, Stefanie Gagnon, Chris Partee, Khanh Le


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


1. Utilized the datasets found in BFRO, DataWorld.
- Open the Data folder in this repository and use the Bigfooot_Locations.csv file directly or
- you can download your file <a href="https://hub.arcgis.com/datasets/TrainingServices::-bigfoot-sightings/explore?location=36.682290%2C-103.774481%2C4.00">here</a>. Click the cloud download button on the left side of the map <img src="https://cdn-icons-png.flaticon.com/512/109/109600.png" style="height:20px; width:20px"> and choose to download the GeoJSON file.

2. Powered by a dataset with over 3,500 records, using a Mongo Database.
- Open the Bigfoot_Locations CSV file in Jupyter Notebook.
- Load in the proper dependencies including:
```
import pandas as pd
import numpy as np
import pymongo as db
from pymongo import MongoClient
client = MongoClient()
```
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

The project runs using a Python "Flask" App, including JavaScript, HTML, and CSS

Combination of Webscraping, Leaflet, and Plotly

## FINAL FINDINGS:

### Distribution of bigfoot sightings by location in Streen basemap


![Web capture_13-7-2022_112113_127 0 0 1](https://user-images.githubusercontent.com/100891182/178819870-473ca991-9439-4965-91f2-c55b38e468de.jpeg)


### Distribution of bigfoot sightings by location in Satellite basemap 

![Web capture_14-7-2022_163144_127 0 0 1](https://user-images.githubusercontent.com/100891182/179089931-3a641333-e716-4023-a795-bef7013e2a00.jpeg)


### Distribution of bigfoot sightings by location in Topographical basemap 

![Web capture_14-7-2022_163212_127 0 0 1](https://user-images.githubusercontent.com/100891182/179090056-60021711-4118-43c3-bdde-c1262d012b1b.jpeg)




### Popup with detail of sighting

![Web capture_14-7-2022_163455_127 0 0 1](https://user-images.githubusercontent.com/100891182/179090220-90023533-1429-4fb7-9344-b6176ae068de.jpeg)


### Landing page with distribution of bigfoot sightings by class

![newplot (7)](https://user-images.githubusercontent.com/100891182/179089087-7fb23b76-dd48-469a-b72d-8baf4168b1a5.png)



### Landing page with distribution of bigfoot sightings by decade

![newplot (8)](https://user-images.githubusercontent.com/100891182/179089012-27e2a083-2a96-499d-9e37-8d5106140fb3.png)



### Full website

![Web capture_14-7-2022_162840_127 0 0 1](https://user-images.githubusercontent.com/100891182/179089407-d797afd0-ff1f-474a-9226-ea56efd4ce48.jpeg)



## PRESENTATION LINK:



## REFEERENCES:

https://data.world/timothyrenner/bfro-sightings-data/workspace/project-summary?agentid=timothyrenner&datasetid=bfro-sightings-data

http://bfro.net/REF/aboutbfr.asp

https://cdn.pixabay.com/photo/2022/01/14/04/02/bigfoot-6936421__340.png




