//GeoJSON URL Variables
var bigfooturl = "D:\GT-VIRT-DATA-PT-03-2022-U-LOL\Bigfoot\data\Bigfoot_Locations.geojson"

// Initialize & Create  LayerGroup:
var bigfoot = new L.LayerGroup();

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
    "bigfoot": bigfoot,

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
d3.json(bigfootURL, function(bigfootData) {
        L.geoJson(bigfootData), {
                color: "#DC143C",
                weight: 1
        }.addTo(myMap);
}) ;

// Set Up Legend
var legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"), 
        qtybigfoot = [500, 1000, 2000, 3000, 4000, 5000];

    div.innerHTML += "<h3>bigfoot</h3>"

    for (var i = 0; i < qtybigfoot.length; i++) {
        div.innerHTML +=
            '<i style="background: ' + chooseColor(qtybigfoot[i] + 1) + '"></i> ' +
            qtybigfoot[i] + (qtybigfoot[i + 1] ? '&ndash;' + qtybigfoot[i + 1] + '<br>' : '+');
    }
    return div;
};
// Add Legend to the Map
legend.addTo(myMap);
;