require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);



var action = process.argv[2];
var searchTerm = process.argv[3];
//concert-this gets the name of the venue, the location and the date MM/DD/YYY
//user types in concert-this and an artist name as the 2nd and 3rd arguments
//liri makes the call and logs the info to the terminal

//----------------concert-this function-------------------------------
function concertThis() {
    let artist = searchTerm;
    let concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(concertURL).then(response => {
        let data = response.data
        let date = moment(data[0].datetime).format("MM-DD-YYYY")
        console.log("Venue: " + data[0].venue.name + "\nLocation: " + data[0].venue.city + ", " + data[0].venue.region + "\nDate: " + date)
    }).catch(error => {
        console.log(error);
    });
};

//spotify-this-song gets the artist's name, the song's name, a preview link and the album name
//the song's name is the 3rd argument
//--------------spotify-this-song function---------------------------------------

function spotifyThisSong() {
    let song = searchTerm;
    spotify.search({ type: "track", query: song }).then(response => {
        console.log(response.tracks.items[0].album)
    }).catch(error => {
        console.log(error);
    });
};

//movie-this gets title, year, imdb rating,rotten tomatoes rating, country of production, language, plot, and actors
//the movie name is the 3rd argument
//-----------------movie-this function

function movieThis() {
    let movie = searchTerm;
    let movieUrl = "http://www.omdbapi.com/?apikey=715b0924&t=" + movie
    axios.get(movieUrl).then(response => {
        let data = response.data;
        console.log("Title: " + data["Title"] + "\nYear: " + data["Year"] + "\nIMDB Rating: " + data["imdbRating"] + "\nRotten Tomatoes Rating: " + data["Ratings"][1]["Value"] + "\nCountry of Production: " + data["Country"] + "\nLanguage: " + data["Language"] + "\nPlot: " + data["Plot"]
            + "\nActors: " + data["Actors"]);
    }).catch(error => {
        console.log(error);
    });
}



if (action === "concert-this") {
    concertThis();
} else if (action === "spotify-this-song") {
    spotifyThisSong();
} else if (action === "movie-this") {
    movieThis();
}
