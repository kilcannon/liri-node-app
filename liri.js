//importing functions from keys.js file
var imports = require('./keys.js')

//npm requirements for node functionality
var inquirer = require('inquirer')

//setting console prompts to guide user
console.log("\nWelcome to LIRI! Choose from an action below.")
console.log("<---------------------------------------->\n")

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
    imports.logSomeStuff(answer.command)
  }
  
  else if (answer.command === "spotify-this-song") {
    imports.getSomeSongs()
    imports.logSomeStuff(answer.command)
  }

  else if (answer.command === "movie-this") {
    imports.getSomeMovies()
    imports.logSomeStuff(answer.command)
  }

  else if (answer.command === "do-what-it-says") {
    imports.getSomeStuff()
    imports.logSomeStuff(answer.command)
  }
})


