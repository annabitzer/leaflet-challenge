// Create a map object, which shows the entire US when opened
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

        //Set up a legend
        let legend = L.control({position: "bottomright"});

        legend.onAdd = function() {
            let div = L.DomUtil.create("div", "info legend");
            //lists of colors used and their corresponding values
            let limits = ["≤10", "11-30", "31-50", "51-70", "71-90", ">90"];
            let colors = ["#24b768", "#22b3b7", "#205eb7", "#351db8", "#8c1bb8", "#b8198b" ];
            let labels = [];
        
        //Add a title to the legend
        let legendInfo = "<h1>Depth of Earthquake (km)</h1>"

        div.innerHTML = legendInfo;

        //Populate the legend with color and value arrays created earlier
        //See CSS for Legend style code
        limits.forEach(function(limit, index) {
            labels.push(
                "<li style=\"background-color: " + colors[index] + "\">" + 
                "<span>" + limits[index] + "</span>" +
                "</li>");

        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
     };
        //Add legend to map
        legend.addTo(myMap);

}

//Perform API call to GeoJSON to get most recent earthquake data. Then, call quakeMarkers function.
d3.json(url).then(quakeMarkers);