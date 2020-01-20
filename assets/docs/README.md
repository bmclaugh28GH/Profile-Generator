# Profile-Generator

# Overview
Profile Generator in a node program that will accept two inputs: github user name and a choice of color. It will use the 
entered color as the background color of the HTML and PDF files. It will use the github user name to:

   - get the user's profile data from Github, 
   - use that to display the user's: 
      - avatar,
      - email address  
      - number of followers, 
      - number of other Github users following, and 
      - the blog URL
   - There will also be a link to the user's profile in Github. 
   - Lastly, it takes the Github location and 
      - uses the Google geocoding API to get the location's latitude and longitude, and
      - use the Google javascript map API to include a map image on the page

The code will add data dynamically to HTML using template literals, and will write out both an HTML file and a PDF file.

# Questions/Issues
1) From where do I get Github stars? I see a starred_url in the data returned from Github, but it doesn't return anything (for me).
2) electron-html-to doesn't seem to be working. I get a timeout error after 10 seconds. I basically just copied the code from npmjs.com. Tried both the HTML and URL arguments, and tried it exactly like the sample. I found this exact quesion on stackOverflow, unfortunately no one had answered it. 

   Error: Worker Timeout, the worker process does not respond after 10000 ms
      at Timeout._onTimeout (C:\_bcm\gwuBootcamp\bootcamp\homework\Profile-Generator\node_modules\electron-workers\lib\ElectronManager.js:377:21)
      at listOnTimeout (internal/timers.js:531:17)
      at processTimers (internal/timers.js:475:7) {
   workerTimeout: true,
   message: 'Worker Timeout, the worker process does not respond after 10000 ms',
   electronTimeout: true


3) I got an email about checking my code into Github with a Google api key in it. Is that bad? Is there another way to do that? 
