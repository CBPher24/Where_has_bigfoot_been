//GeoJSON URL Variables
function createmap(big_foot)


// Initialize & Create  LayerGroup:


//Define Variable for Tile Layer:
var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
});
// Define baseMaps Object to Hold Base Layers:

var baseMaps = {
    "Satellite": satelliteMap,
   
};

// Create Overlay Object to Hold Overlay Layer
var overlayMaps = {
    "bigfoot" : big_foot

};

// Create Map, Passing In satelliteMap & bigfoot as Default Layers to Display on Load
var myMap = L.map("map", {
    center: [30, -90],
    zoom: 1.2,
    layers: [satelliteMap, bigfoot]
});

// Create a Layer Control + Pass in baseMaps and overlayMaps + Add the Layer Control to the Map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Retrieve bigfootURL ( GeoJSON Data) with D3
// d3.json(bigfooturl, function(bigfootData) {

//     function styleInfo(feature) {
//         return {
//           opacity: 1,
//           fillOpacity: 1,
//           fillColor: chooseColor(feature.properties.mag),
//           color: "#000000",
//           radius: markerSize(feature.properties.mag),
//           stroke: true,
//           weight: 0.5
//         };
//     }});
    
function createMarkers(bfoot_data) {


  
    // Initialize an array to hold bike markers.
    var Markers = [];
  
    // Loop through the stations array.
    for (var index = 0; index < bfoot_data.length; index++) {
      var lat = bfoot_data[index].data.Lat;
      var lon = bfoot_data[index].data.Lon;
  
      // For each station, create a marker, and bind a popup with the station's name.
      var Markers = L.marker([lat, lon])
        .bindPopup("<h3>" + bfoot_data[index].data.ObjectId + "<h3><h3>Description: " + bfoot_data[index].data.descritio + "</h3>");
  
      // Add the marker to the bikeMarkers array.
      Markers.push(Markers);
    }
  
    // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
    createMap(L.layerGroup(Markers));
  }