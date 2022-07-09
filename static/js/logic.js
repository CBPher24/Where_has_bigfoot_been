
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
        center: [30, -90],
        zoom: 1.2,
        layers: [satelliteMap, big_foot]
    });

// Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);
}




function createMarkers(bfoot_data) {
    var bfoot_data = JSON.parse(bfoot_data)
    console.log(bfoot_data[0])
    var bfIcon = L.icon({
        iconUrl: 'https://cdn.pixabay.com/photo/2022/01/14/04/02/bigfoot-6936421__340.png',
        
    
        iconSize:     [20, 43], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
// }
var markers = L.markerClusterGroup();

for (var i = 0; i < bfoot_data.length; i++) {
    var lat = bfoot_data[i].data.Lat;
    var lon = bfoot_data[i].data.Lon;
  var location = [lon, lat];
  if(location) {
    markers.addLayer(L.marker([location[1],location[0]], {icon: bfIcon})
    .bindPopup("<h3>" + bfoot_data[i].data.ObjectId + "<h3><h3>Description: " + bfoot_data[i].data.descriptio + "</h3>"));
  }
}

    // var Markers = [];
  
    // // Loop through the big foot array.
    // for (var index = 0; index < bfoot_data.length; index++) {
    //   var lat = bfoot_data[index].data.Lat;
    //   var lon = bfoot_data[index].data.Lon;
  
    //   // For each pass, create a marker, and bind a popup with the sighting's ID and description.
    //   var Marker = L.marker([lat, lon])
    //     .bindPopup("<h3>" + bfoot_data[index].data.ObjectId + "<h3><h3>Description: " + bfoot_data[index].data.descriptio + "</h3>");
  
    //   // Add the marker to the Markers array.
    //   Markers.push(Marker);
    // }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    console.log(markers)
    createMap(markers);
  }

