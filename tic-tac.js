
// Initialize the characters symbol for each player
var first_player = "X";
var second_player = "O";
var firstPlayerTurn = true;
var firstPlayerCells = [];
var secondPlayerCells = [];

// This array will determine who will win the game
var mixedWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7] , [2,5,8] ,[0,4,8], [6,4,2]];
var cells = document.querySelectorAll ('.cell');
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

window.onload = function() {
    var cells = document.getElementsByClassName('cell');
    for(var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', event => {
            var cell = event.target;
            var cellId = event.target.id;
            if(!document.getElementById(cellId).childNodes.length){
                if(firstPlayerTurn){
                    var icon = document.createElement('i');
                    icon.style = "color: #5386e4";
                    icon.id = cellId;
                    icon.className = "fas fa-times fa-5x";
                    cell.appendChild(icon);
                    firstPlayerCells.push(cellId);
                    firstPlayerTurn = false;
                } else {
                    var icon = document.createElement('i');
                    icon.style = "color: #ed6a5a";
                    icon.id = cellId;
                    icon.className = "fas fa-dot-circle fa-4x";
                    cell.appendChild(icon);
                    secondPlayerCells.push(cellId);
                    firstPlayerTurn = true;
                }
            }
        });
    }
}

