//Look into [function prototypes] and use them for a few of your constructor's methods.

// Create the constructor function for each letter in the current word.
//Letter: Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.

function Letter(char) {
    //Contains letter specific logic and data-to match the characters
    this.visible = !/[a-z1-9]/i.test(char);
    //display underlying character
    this.char = char;
}

//Look into [function prototypes] and use them for a few of your constructor's methods
//Create the constructor function used to create the letter objects
Letter.prototype.toString = function() {
    if (this.visible === true) {
        return this.char;
    }
    return "_";
};

//Construct characters
Letter.prototype.results = function() {
    return this.char;
};

//If the user guess is correct show character
Letter.prototype.guess = function(charGuess) {
    if (charGuess.toUpperCase() === this.char.toUpperCase()) {
        this.visible = true;
        return true;
    }

    //If the user guess is incorrect the character it will not display
    return false;
};

module.exports = Letter;