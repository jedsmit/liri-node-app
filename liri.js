require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require('fs');

//user input variables
var action = process.argv[2];
var searchTerm = process.argv[3];

//concert-this gets the name of the venue, the location and the date MM/DD/YYY for the first three results
//user types in concert-this and an artist name as the 2nd and 3rd arguments
//liri makes the call and logs the info to the terminal
//----------------concert-this function-------------------------------

function concertThis() {
    let artist = searchTerm;
    let concertURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(concertURL).then(response => {
        for (i = 0; i < 3; i++) {
            let data = response.data
            let date = moment(data[i].datetime).format("MM-DD-YYYY")
            console.log("\nVenue: " + data[i].venue.name + "\nLocation: " + data[i].venue.city + ", " + data[i].venue.region + "\nDate: " + date);
        };
    }).catch(error => {
        console.log(error);
    });
};

//spotify-this-song gets the artist's name, the song's name, a preview link and the album name for the first three results
//the song's name is the 3rd argument
//if no song input, defaults to Ace of Base's "The Sign"
//--------------spotify-this-song function---------------------------------------

function spotifyThisSong() {
    let song = "The Sign Ace of Base";
    if (searchTerm) {
        song = searchTerm;
    }
    spotify.request('https://api.spotify.com/v1/search?q=track:' + song + '&type=track&limit=10', function (error, response) {
        for (i = 0; i < 3; i++) {
            if (error) {
                return console.log(error);
            }
            console.log("\nArtist: " + response.tracks.items[i].artists[0].name + "\nSong: " + response.tracks.items[i].name + "\nPreview: " + response.tracks.items[i].preview_url + "\nAlbum: " + response.tracks.items[i].album.name);
        };
    });
};


//movie-this gets title, year, imdb rating,rotten tomatoes rating, country of production, language, plot, and actors
//the movie name is the 3rd argument
//if no movie inout, defaults to "Mr. Nobody"
//-----------------movie-this function-------------------------

function movieThis() {
    var movie = "Mr. Nobody";
    if (searchTerm) {
        var movie = searchTerm;
    };
    let movieUrl = "http://www.omdbapi.com/?apikey=715b0924&t=" + movie
    axios.get(movieUrl).then(response => {
        let data = response.data;
        console.log("Title: " + data["Title"] + "\nYear: " + data["Year"] + "\nIMDB Rating: " + data["imdbRating"] + "\nRotten Tomatoes Rating: " + data["Ratings"][1]["Value"] + "\nCountry of Production: " + data["Country"] + "\nLanguage: " + data["Language"] + "\nPlot: " + data["Plot"]
            + "\nActors: " + data["Actors"]);
    }).catch(error => {
        console.log(error);
    });
}

//do-what-it-says uses fs to get text from random.txt and uses it to call one of liri's commands
//the 3rd argument 
//--------------------------do-what-it-says function----------------------

function doWhatItSays() {
    fs.readFile("./random.txt", "utf8", function (error, data) {
        var dataArray = data.split(",")
        action = dataArray[0];
        searchTerm = dataArray[1].slice(1, -1);
        if (action === "concert-this") {
            concertThis();
        } else if (action === "spotify-this-song") {
            console.log(searchTerm)
            spotifyThisSong();
        } else if (action === "movie-this") {
            movieThis();
        };
    }
    );
};

//---------------------main app function---------------------

function commandLoop() {
    if (action === "concert-this") {
        concertThis();
    } else if (action === "spotify-this-song") {
        spotifyThisSong();
    } else if (action === "movie-this") {
        movieThis();
    } else if (action === 'do-what-it-says') {
        doWhatItSays();
    };
};

commandLoop();