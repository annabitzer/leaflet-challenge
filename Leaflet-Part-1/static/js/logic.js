// Create a map object
let myMap = L.map("map", {
    center: [39.1, -95.7],
    zoom: 5
});

//Add the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

//save JSON url
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function quakeMarkers (response) {

    //pull the information for all earthquakes
    let features = response.features;

    //initialize an array to hold earthquake markers
    //let markers = [];

    //Loop through the array of features
    for (let index = 0; index < features.length; index++) {

        //set variable for current loop iteration
        let quake = features[index];

        //Conditional loop for scaleable color, based on depth
        let color = "";
        if (quake.geometry.coordinates[2] > 90) {
            color = "#b8198b";
        }
        else if (quake.geometry.coordinates[2] > 70) {
            color = "#8c1bb8";
        }
        else if (quake.geometry.coordinates[2] > 50) {
            color = "#351db8";
        }
        else if (quake.geometry.coordinates[2] > 30) {
            color = "#205eb7";
        }
        else if (quake.geometry.coordinates[2] > 10) {
            color = "#22b3b7";
        }
        else {
            color = "#24b768";
        }
    
    

        //For each earthquake, create a marker and bind a popup with the place, location, magnitude and time of the earthquake
        L.circleMarker([quake.geometry.coordinates[1],
                        quake.geometry.coordinates[0]],
                        {radius: quake.properties.mag * 5,
                        fillColor: color,
                        color: "black",
                        fillOpacity: 0.9,
                        weight: 1})
        .bindPopup(`<h3> Location: ${quake.properties.place}</h3> <hr> <h3> Magnitude: ${quake.properties.mag}</h3> <hr> <h3> Depth: ${quake.geometry.coordinates[2]}</h3> `)
        .addTo(myMap);
        
    }

}

//Perform API call to GeoJSON to get most recent earthquake data. Then, call quakeMarkers function.
d3.json(url).then(quakeMarkers);