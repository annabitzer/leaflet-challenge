# Leaflet Challenge

In this challenge, data sourced from the United States Geological Survey was used to generate a real-time map showing all earthquakes in the world from the past 7 days. JSON data was accessed from the following link: "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson".

HTML code was used to create the webpage structure, the Leaflet plugin for Javascript was used to create the earthquake map, and CSS was used to style the webpage. The resulting map includes all earthquakes from the past 7 days, pulling data in real time as the webpage is refreshed. Earthquake events are shown as circles, which vary in size relative to the magnitude of the quake, and in color relative to the depth of the quake (as shown in the included legend). Clicking on any circle will display the descriptive location, magnitude, and depth information about the earthquake.


Sources Used:
Leaflet Doucmentation: https://leafletjs.com/reference.html
Color Gradient generator: https://colordesigner.io/gradient-generator

The legend for the map was stylized using CSS code from the Activity 15.2.4 on choropleth maps. It was modified to fit the needs of this earthquake map. Bootcampspot Xpert Learning Assistant was used to generate CSS code to center elements on the legend. 