
function createMap(big_foot){
    //Define Variable for Tile Layer:
    var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 30,
        center: [37.0902,95.7129],
        zoom: 2,
        
        id: "mapbox.satellite",
        accessToken: API_KEY,

        
     

    });
    var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 30,
        center: [37.0902,95.7129],
        zoom: 2,
        
     });

     var topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
        maxZoom: 30,
        
     });
// Define baseMaps Object to Hold Base Layers:

    var baseMaps = {
    "Satellite": satelliteMap,
    "Street" : streetMap,
    "Topographical" : topoMap
   
    };

// Create Overlay Object to Hold Overlay Layer
    var overlayMaps = {
    "bigfoot" : big_foot

    };

// Create Map, Passing In satelliteMap & bigfoot as Default Layers to Display on Load
    var myMap = L.map("map", {
        center: [50, -99],
        zoom: 2.0,
        layers: [satelliteMap, big_foot]
    });

// Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
    var legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += "<h6>Incident Class</h6>"
        div.innerHTML += '<i style="background:' + "#53C115" + '"></i> ' + (  "Class A" + '<br>' )
        div.innerHTML += '<i style="background:' + "#0422D3" + '"></i> ' + ( "Class B" + '<br>' )
        div.innerHTML += '<i style="background:' + "#992301" + '"></i> ' + ( "Class C" + '<br>' )


    return div;
    }

    legend.addTo(myMap);
}


function createMarkers(bfoot_data) {
    var bfoot_data = JSON.parse(bfoot_data)
    // console.log(bfoot_data[0])
    var bfIconGreen = L.colorIcon({
        iconSize:     [20, 43],
        popupAnchor:  [-3, -76],
        iconUrl: 'https://cdn.pixabay.com/photo/2022/01/14/04/02/bigfoot-6936421__340.png',
        color: "#53C115"

    });
    var bfIconBlue = L.colorIcon({
        iconSize:     [20, 43],
        popupAnchor:  [-3, -76],
        iconUrl: 'https://cdn.pixabay.com/photo/2022/01/14/04/02/bigfoot-6936421__340.png',
        color: "#0422D3"

    });
    var bfIconRed = L.colorIcon({
        iconSize:     [20, 43],
        popupAnchor:  [-3, -76],
        iconUrl: 'https://cdn.pixabay.com/photo/2022/01/14/04/02/bigfoot-6936421__340.png',
        color: "#992301"

    });
// }
var markers = L.markerClusterGroup();
var classes = []

for (var i = 0; i < bfoot_data.length; i++) {
    var lat = bfoot_data[i].data.Lat;
    var lon = bfoot_data[i].data.Lon;
  var location = [lon, lat];
  if(location) {
    if (bfoot_data[i].data.class == "Class A") {
        markers.addLayer(L.marker([location[1],location[0]], {icon: bfIconGreen}, )
        .bindPopup("<h3>Incident #: " + bfoot_data[i].data.ObjectId +
        "</h3><hr><p>Description: " + bfoot_data[i].data.descriptio + "<hr></p>"));}
    else if (bfoot_data[i].data.class == "Class B") {markers.addLayer(L.marker([location[1],location[0]], {icon: bfIconBlue}, )
        .bindPopup("<h3>Incident #: " + bfoot_data[i].data.ObjectId +
        "</h3><hr><p>Description: " + bfoot_data[i].data.descriptio + "<hr></p>"));}
    else {markers.addLayer(L.marker([location[1],location[0]], {icon: bfIconRed}, )
        .bindPopup("<h3>Incident #: " + bfoot_data[i].data.ObjectId +
        "</h3><hr><p>Description: " + bfoot_data[i].data.descriptio + "<hr></p>"));}
  }
}

    
    console.log(markers)
    createMap(markers);
  };

  

