// **********************************************
// globals 
// **********************************************
const inquirer = require("inquirer");
const axios = require("axios");
const myDS = require("./dataStructures");
const fs = require ('fs'); 
const convertFactory = require('electron-html-to');

let name; 
let numFollowers;
let numFollowing; 
let numRepos;
let lat; 
let lon; 
let email;
let avatarURL; 
let favColor; 
let htmlURL; 
let blog; 
let login; 

// **********************************************
// **********************************************

console.log ("Google key: " + myDS.myGoogleKey); 
inquirer
  .prompt([
    {
      type: "input",
      message: "What is your Github username?",
      name: "username"
    },
    {
      type: "input",
      message: "What is your favorite color?",
      name: "favColor"
    }
  ])
  .then(function(response) {

      //console.log(response.username + ", your favorite color is " + response.favColor);
      var githubURL = "https://api.github.com/users/" + response.username;
      axios
      //.get("https://www.omdbapi.com/?t=The%20Matrix&apikey=trilogy")
      .get(githubURL)
      .then(function(res) {

         var myLocation = res.data.location.replace(" ", "+")
         myLocation = myLocation.replace(", ", ",+")
         console.log(myLocation); 

         axios
         .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + myLocation + "&key="+ myDS.myGoogleKey)
         .then(function(res2) {

            //console.log ("lat " + res2.data.results[0].geometry.location.lat
            //   + "\n" + "long " + res2.data.results[0].geometry.location.lng); 

            name = res.data.name; 
            numFollowers = res.data.followers;
            numFollowing = res.data.following; 
            numRepos = res.data.public_repos;
            lat = res2.data.results[0].geometry.location.lat; 
            lon = res2.data.results[0].geometry.location.lng; 
            email = res.data.email; 
            avatarURL = res.data.avatar_url; 
            htmlURL = res.data.html_url; 
            blog = res.data.blog; 
            login = res.data.login; 

            console.log (avatarURL); 

            const myHtml = ` 
            <!DOCTYPE html>
            <html lang="en">
            <!-- **************************************** -->
            <!-- **************************************** -->
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <meta http-equiv="X-UA-Compatible" content="ie=edge" />
              <title>${name}</title>
              <!--css links-->
              <link rel="stylesheet" type="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/popper.min.js">
              <link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
              <link rel="stylesheet" type="text/css" href="./assets/css/style.css">
              <style>
                  body{
                    background-color:${response.favColor};
                  }
                  .jumbotron{
                    background-color: ${response.favColor};
                  }
                  img{
                    height: 250px;
                  }
                  #map {
                    height: 250px;
                  }
              </style>
            </head>
            <!-- **************************************** -->
            <!-- **************************************** -->
            <body>
              <div class="container">
                  <!--jumbotron-->
                  <div class="jumbotron">
                    <h2 class="text-center">${name}</h2>
                    <hr>
                    <h4 class="text-center">${res.data.location}</h4> 
                    <h4 class="text-center">${login}</h4>
                    <h4 class="text-center">Email:${email}</h4>
                    <!--<h4 class="text-center">C: 240 271 4891</h4>
                    <h4 class="text-center">H: 301 592 0076</h4>-->
                  </div> <!--jumbotron-->
                  <div class="row">
                    <div class="col-lg-4">
                        <img src=${avatarURL} alt="Image not found">
                        <p>${res.data.bio}</p>
                    </div>
                    <div class="col-lg-4">
                        <div id="map"></div>
                    </div>
                    <div class="offset-lg-1 col-lg-3">
                        <h3><a href=${htmlURL} target="_blank">${name}'s Website</a></h3>
                        <h3>Repos: ${numRepos}</h3>
                        <h3>Followed by: ${numFollowers}</h3>
                        <h3>Following: ${numFollowing}</h3>
                        <h3>Blog: ${blog}</h3>
                    </div>
                  </div>
              </div> <!-- container -->
              <script>
                  var map;
                  function initMap() {
                  map = new google.maps.Map(document.getElementById('map'), {
                    center: {lat: ${lat}, lng: ${lon}},
                    zoom: 14
                  });
                  }
              </script>
              <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyALW6Hbq5zs6NOucgAOkeKIU6-kMFfBEBM&callback=initMap"
                  async defer></script>
              <!--**************************************-->
              <!--js links-->
              <!--**************************************-->
              <script src="https://code.jquery.com/jquery.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
              <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
              <script src="./assets/script/script.js"></script>

            <!-- **************************************** -->
            <!-- **************************************** -->
            </body>
            </html>
            `; 

            fs.writeFile("index.html", myHtml, function(err) {

               if (err) {
                  return console.log(err);
               }
               else {

                  var conversion = convertFactory({
                     converterPath: convertFactory.converters.PDF
                  });
                
                  //conversion({ html: '<h1>Hello World</h1>' }, function(err, result) {
                  conversion({ url: './index.html' }, function(err, result) {
                     if (err) {
                        return console.error(err);
                     }
                
                     console.log(result.numberOfPages);
                     console.log(result.logs);
                     result.stream.pipe(fs.createWriteStream('index.pdf'));
                     conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
                  });

               }
            });

         }); 
      });
  }
);

