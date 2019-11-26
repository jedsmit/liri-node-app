# liri-node-app

Liri is a command line app that takes in search terms and returns results from various APIs. Liri has four main functions: concert-this, movie-this, spotify-this-song, and do-what-it-says. This is a node app, so the user begins by typing the following into the command line: `node liri.js` followed by two arguments. The first tells Liri which function to use and the second is the search term. Here's a description of each function and what they do:

**concert-this**

The concert-this function takes in the name of a band or artist and returns information about the venue, location, and date of thier next three sheduled shows. In the command line, the user types:

`node liri.js concert-this artist/band`

The app then queries the Bands in Town API with the search term and returns the results:

![concert-this code](concert-this.png)
