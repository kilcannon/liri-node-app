//importing functions from keys.js file
var imports = require('./keys.js')

//npm requirements for node functionality
var inquirer = require('inquirer')

//setting console prompts to guide user
console.log("\nWelcome to LIRI! Choose from an action below.")
console.log("<---------------------------------------->\n")

//generates timestamp for liri command activity
var currentDate = new Date()
var hours = currentDate.getHours()
var minutes = currentDate.getMinutes()
var seconds = currentDate.getSeconds()
var date = currentDate.getDate()
var month = currentDate.getMonth()
var year = currentDate.getFullYear()
var dateString = hours + ":" + minutes + ":" + seconds + " - " + date + "/" + (month + 1) + "/" + year

inquirer.prompt([
  {
    type: "list",
    name: "command",
    message: "What would you like to do?",
    choices: [
      {name: "my-tweets",
      short: "Display your last 20 tweets."},
      {name: "spotify-this-song",
      short: "prompt for a song"},
      {name: "movie-this",
      short: "prompt for a movie"},
      {name: "do-what-it-says",
      short: "read random.txt file"}]
    }
]).then(function(answer) {
  if (answer.command === 'my-tweets') {
    imports.getSomeTweets()
    
    var stuffToLog = "\nAction Executed: " + answer.command + "\nTime Stamp: " 
      + dateString + "\n\n------------------------------------------\n"
    
    imports.logSomeStuff(stuffToLog)
  }
  else if (answer.command === "spotify-this-song") {
    imports.getSomeSongs()

    var stuffToLog = "\nAction Executed: " + answer.command + "\nTime Stamp: " 
      + dateString + "\n\n------------------------------------------\n"

    imports.logSomeStuff(stuffToLog)
  }
  else if (answer.command === "movie-this") {
    imports.getSomeMovies()

    var stuffToLog = "\nAction Executed: " + answer.command + "\nTime Stamp: " 
      + dateString + "\n\n------------------------------------------\n"

    imports.logSomeStuff(stuffToLog)
  }
  else if (answer.command === "do-what-it-says") {
    imports.getSomeStuff()

    var stuffToLog = "\nAction Executed: " + answer.command + "\nTime Stamp: " 
      + dateString + "\n\n------------------------------------------\n"

    imports.logSomeStuff(stuffToLog)
  }
})


