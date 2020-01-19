

<!-- Github API. Here's the main one -->  
https://api.github.com/users/bmclaugh28gh


https://api.github.com/users/bmclaugh28gh/repos?per_page=100

https://api.github.com/users/bmclaugh28gh/followers?per_page=100

https://api.github.com/users/bmclaugh28gh/following?per_page=100


<!-- Geocoding API will give you lat/long of an address or city, state-->
https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyALW6Hbq5zs6NOucgAOkeKIU6-kMFfBEBM

https://maps.googleapis.com/maps/api/geocode/json?address=Silver+Spring,+MD&key=AIzaSyALW6Hbq5zs6NOucgAOkeKIU6-kMFfBEBM

<!-- The Javascript API will give you a map based on lat/long, but you need other bits to it. See below. Zoom is closer in with larger numbers, 
farther out with smaller. 15 shows several blocks, 8 is zoomed way out, like entire eastern seaboard-->
"https://maps.googleapis.com/maps/api/js?key=AIzaSyALW6Hbq5zs6NOucgAOkeKIU6-kMFfBEBM&callback=initMap"

See mapTest.html, also here: 

<!DOCTYPE html>
<html>
  <head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
      /* Always set the map height explicitly to define the size of the div
       * element that contains the map. */
      #map {
        height: 100%;
      }
      /* Optional: Makes the sample page fill the window. */
      html, body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
  </body>
</html>

