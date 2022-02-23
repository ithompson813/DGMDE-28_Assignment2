// Game Variables
// the character to be placed, will alternate between X and O
var draw_character = "X";

// tracks number of squares to check for ties
var filled_squares = 0;

// the board sequence is an array which tracks the board state
// when a tile is selected, the character is added to the sequence
// at the index of the board tile, which is from 0 to 8 
var board_sequence = [];

// a flag to track is a player has won
var win = false;


// function which changes the current guess between X and O
function switch_character()
{
    if (draw_character == "X")
    {
        draw_character = "O"
    } else {
        draw_character = "X"
    }

    // alert player
    document.getElementById("info").innerHTML = (draw_character + " to play next");
}

// check the board state through the board_sequence after each play
// this function checks the 8 possible winning 3-in-a-row guesses
function check_winner(char)
{

    // track number of matches, if this number reaches 3 then a win has been found
    var number_of_matches = 0;

    // check columns for wins
    // from left to right, check each column
    for (let i = 0; i < 3; i++)
    {
        // loop downward through boxes
        for (let j = i; j < 9; j += 3)
        {
            // if characters match, increment counter
            if (board_sequence[j] == char)
            {
                number_of_matches++;
            }
        }

        // if three matches are found, change win flag to true
        if (number_of_matches == 3)
        {
            win = true;
        }

        // reset counter
        number_of_matches = 0;
    }


    // check rows for wins
    // from top to bottom, check each row
    for (let i = 0; i < 7; i += 3)
    {
        // loop through boxes left to right
        for (let j = i; j < i + 3; j++)
        {
            // if characters match, increment counter
            if (board_sequence[j] == char)
            {
                number_of_matches++;
            }
        }

        // if three matches are found, change win flag to true
        if (number_of_matches == 3)
        {
            win = true;
        }

        // reset counter
        number_of_matches = 0;
    }


    // check diagonals for wins
    // downward slope diagonal
    for (let i = 0; i < 9; i += 4)
    {
        // if characters match, increment counter
        if (board_sequence[i] == char)
        {
            number_of_matches++;
        }
    }

    // if three matches are found, change win flag to true
    if (number_of_matches == 3)
    {
        win = true;
    }

    // reset counter
    number_of_matches = 0;

    // upward slope diagonal
    for (let i = 2; i < 7; i += 2)
    {
        // if characters match, increment counter
        if (board_sequence[i] == char)
        {
            number_of_matches++;
        }
    }

    // if three matches are found, change win flag to true
    if (number_of_matches == 3)
    {
        win = true;
    }
    
    // reset counter
     number_of_matches = 0;

    // check for a winning game state or for a filled board without a win, then alert the player
    if (win)
    {
        document.getElementById("info").innerHTML = (char.toUpperCase() + " Wins!");

    } else if (filled_squares == 9){
        document.getElementById("info").innerHTML = "Tie!";
    }
}

// add functionality once page has loaded
document.addEventListener('DOMContentLoaded', () => {

    // draw game board
    for (let i=0; i<3; i++)
    {
        // create row element & assign style
        let row = document.createElement("div");
        row.style.display = "flex";
        
        // create three boxes per row div, and assign them each a unique id and an event listener
        for (let j=0; j<3; j++)
        {
            let box = document.createElement("button"); 
            box.className = "board_button";
            box.id = ("box"+((j)+(i*3)));

            // onclick event
            box.addEventListener("click", function(){

                // only allow the board to update if a play is still available
                if (!win){

                    // only allow click event if box is empty
                    if (this.innerHTML == ""){  
                
                        // update box to display X or O
                        box.innerText = draw_character;

                        // increment play counter
                        filled_squares++;

                        // switch next play character to oposite character
                        switch_character();

                        // add play to board sequence
                        board_sequence[(parseInt(this.id[3]))] = this.innerHTML;

                        // check if play results in a win for the guessed character
                        check_winner(box.innerText);

                    // dont change the tie message until the reset button is hit
                    } else if (filled_squares != 9) {

                        // if box is not empty, show a message to alert the player
                        document.getElementById("info").innerHTML = "Try a different box!";
                    }
                }
            })
            
            // add box to row 
            row.appendChild(box);
        }

        // add row to board once all three buttons have been added
        document.getElementById("board").appendChild(row);
    }


    // add reset button's functionality
    document.getElementById("reset").addEventListener("click", function(){

        // reset box's display text
        for (let i = 0; i < 9; i++)
        {
            document.getElementById("box" + i).innerHTML = "";
        }

        // reset game variables
        board_sequence = [];
        win = false;
        draw_character = "X"
        filled_squares = 0;
        number_of_matches = 0;

        // alert player
        document.getElementById("info").innerHTML = "Game has been reset, X to play first!";
    })

});