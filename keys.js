//Core npm requirements to ensure app functionality
var keys = require('dotenv').config()
var Twitter = require('twitter')
var Spotify = require('node-spotify-api')
var request = require('request')
var inquirer = require('inquirer')
var fs = require('fs')

//Exports information to LIRI.js file
var exports = module.exports = {}

//Credentials for user access on Twitter and Spotify apis
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
})

//Twitter node function
exports.getSomeTweets = function() {

	client.get('statuses/user_timeline', 
	{screen_name: 's_bouchey', count: 20}, 
	function(error, tweets, response) {
	  if(error) throw error

    tweets.forEach(function(tweet) {
      var tweetString = ''
      var user = tweet.user.screen_name
      tweetString = "\n" + user + " tweeted: " + tweet.text + "\n" + "published on: " + tweet.created_at + "\n"
      console.log(tweetString)
      console.log("\n<---------------------------------------->\n")
    })
	})
}

//Spotify node function
exports.getSomeSongs = function () {

  inquirer.prompt([{
    name: 'song',
    message: 'What song would you like to search for?',
    default: "blink 182 - all the small things",
  }]).then(function(answer) {
    var request = answer.song
    
    spotify.search({ type: 'track', query: request, limit: 1}, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
    var artist = data.tracks.items[0].artists[0].name
    var track = data.tracks.items[0].name
    var URL = data.tracks.items[0].external_urls.spotify
    var album = data.tracks.items[0].album.name
    
    console.log("<---------------------------------------->\n")
    console.log("Artist: " + artist)
    console.log("Track: " + track)
    console.log("URL: " + URL)
    console.log("Album: " + album)
    console.log("\n<---------------------------------------->")
    })
  })
}

//OMDB node function
exports.getSomeMovies = function () {

  inquirer.prompt([{
    name: 'movie',
    message: 'What movie would you like to search for?',
    default: 'the matrix',
  }]).then(function(answer) {
    var movie = answer.movie
    movie.replace(' ', '+')

    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var movieTitle = JSON.parse(body).Title
        var yearReleased = JSON.parse(body).Year
        var imdbRating = JSON.parse(body).imdbRating
        var RTrating = JSON.parse(body).Ratings[1].Value
        var originLoc = JSON.parse(body).Country
        var language = JSON.parse(body).Language
        var plot = JSON.parse(body).Plot
        var actors = JSON.parse(body).Actors

        console.log("<---------------------------------------->\n")
        console.log("Title: " + movieTitle)
        console.log("Year: " + yearReleased)
        console.log("IMDB Rating: " + imdbRating)
        console.log("RT Rating: " + RTrating)
        console.log("Made In: " + originLoc)
        console.log("Language: " + language)
        console.log("Plot: " + plot)
        console.log("Actors: " + actors)
        console.log("\n<---------------------------------------->")
      }
    })
  })
}