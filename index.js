// **********************************************
// globals 
// **********************************************
const inquirer = require("inquirer");
const axios = require("axios");
const myDS = require("./dataStructures");

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

      console.log(response.username + ", your favorite color is " + response.favColor);
  
      axios
      //.get("https://www.omdbapi.com/?t=The%20Matrix&apikey=trilogy")
      .get("https://api.github.com/users/bmclaugh28gh")
      .then(function(res) {

         var myLocation = res.data.location.replace(" ", "+")
         myLocation = myLocation.replace(", ", ",+")
         console.log(myLocation); 

         axios
         .get("https://maps.googleapis.com/maps/api/geocode/json?address=" + myLocation + "&key="+ myDS.myGoogleKey)
         .then(function(res2) {

            console.log ("lat " + res2.data.results[0].geometry.location.lat
               + "\n" + "long " + res2.data.results[0].geometry.location.lng); 

         }); 
        



      });
  }
);

