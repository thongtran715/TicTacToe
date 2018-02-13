
// Initialize the characters symbol for each player
var first_player = "X";
var second_player = "O";

// This array will determine who will win the game
var mixedWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7] , [2,5,8] ,[0,4,8], [6,4,2]];
var cells = document.querrySelectorAll ('.cell');
start_game();

function start_game () {
    for ( i = 0 ; i < cells.length; ++i){
        cells[i].addEventListener("click", handle_click, false);
    }
}

function handle_click(Square){
    turn(square.target.id, first_player);
}

function turn(id, player) {
    document.getElementById(id).innerText=player;
}





