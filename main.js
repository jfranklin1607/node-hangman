game.startGame();
var inquirer = require("inquirer");
//npm chalk to color alerts
var chalk = require("chalk");
var Word = require("./Word");
var choices = require("./choices");

//Initialize the Game function to display in node 
var game = new Game();

//Create constructor functions for the hangman game
function Game() {
    //Set constructor varialbe for user to this 
    var user = this;
	 console.log("\n");
        console.log("------------------------------------------------------------");
        console.log(" Welcome to NFL Team Hangman Game!");
        console.log("------------------------------------------------------------");

    //Set the properties and values to store the variable for the user and point to this
    this.play = function() {
        this.nextWord();
        this.guessesRemaining = 10;
    };

    //Use Math.random to select from the choices.
    this.nextWord = function() {
        var randWord = choices[Math.floor(Math.random() * choices.length)];
        this.currentWord = new Word(randWord);
        console.log('\n' + this.currentWord + '\n');
        this.guesses();
    };

    //Use npm inquirer to prompt the user for their guess
    this.guesses = function() {
        this.askForLetter().then(function() {
            //If the user has no guesses remaining after this guess, show them the word, ask if they want to play again
            if (user.guessesRemaining < 1) {
                console.log(
                    "No guesses left! Word was: \"" + user.currentWord.results() + "\"\n"
                );
                user.askToPlayAgain();

                //If the user guessed all letters of the current word corrently, reset guessesRemaining to 10 and get the next word
            } else if (user.currentWord.guessedCorrectly()) {
                console.log("Cool you're right! Try the next word!");
                user.guessesRemaining = 10;
                user.nextWord();
            } else {
                user.guesses();
            }
        });
    };

    //Asks the user if they want to play again after running out of guessesRemaining
    //Prompt user to continue
    this.askToPlayAgain = function() {
        inquirer.prompt([{
                type: "confirm",
                name: "choice",
                message: "Want to play again?"
            }])
            .then(function(value) {
                // If the user says yes to another game, play again, otherwise end the game
                if (value.choice) {
                    user.play();
                } else {
                    user.quit();
                }
            });
    };

    // Prompts the user for a letter
    this.askForLetter = function() {
        return inquirer.prompt([{
                type: "input",
                name: "choice",
                message: "Guess a letter!",
                validate: function(value) {
                    //Contains letter specific logic and data-to match the characters
                    return /[a-z1-9]/gi.test(value);
                }
            }])
            .then(function(value) {
                //Log correct if the user guess the word correctly
                var correctGuess = user.currentWord.guessLetter(value.choice);
                if (correctGuess) {
                    //Use chalk to color the "correct" alert  
                    console.log(chalk.green("\nCORRECT!!!\n"));

                    //Console log the guesses remaining
                } else {
                    user.guessesRemaining--;
                    //Use chalk to color the "incorrect" alert and display number of guesses remaining  
                    console.log(chalk.red("\nINCORRECT!!!\n"));
                    console.log(user.guessesRemaining + " guesses remaining!!!\n");
                }
            });
    };

    //Create function to exit the game
    this.quit = function() {
        console.log("\nGoodbye!");
        process.exit(0);
    };
}

//Start game
game.play();