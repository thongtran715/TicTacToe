
// Initialize the characters symbol for each player
var firstPlayerWins = 0;
var secondPlayerWins = 0;
var firstPlayerTurn = true;
var firstPlayerCells = [];
var secondPlayerCells = [];
var playing = false;
var gameMessage = 'Please press Start Game to initialize the game.';
// This array will determine who will win the game
var mixedWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7] , [2,5,8] ,[0,4,8], [6,4,2]];

function isWinner(playerCells) {
    var isWinner = false;
    for(var i = 0; i < mixedWins.length; i++){
        if(mixedWins[i].every(function(val) { return playerCells.indexOf(val) >= 0; })){
            isWinner = true;
        }
    }
    return isWinner;
}

function startGame() {
    document.getElementById('gameMessage').innerText = 'First player turn.';
    firstPlayerCells = [];
    secondPlayerCells = [];
    firstPlayerTurn = true;
    playing = true;
}

function pauseGame() {
    playing = false;
}

function reset() {
    var cells = document.getElementsByClassName('cell');
    for(var i = 0; i < cells.length; i++) {
        if(cells[i].childElementCount){
            cells[i].removeChild(cells[i].firstChild);
        }
    }
    firstPlayerTurn = true;
    playing = true;
    firstPlayerCells = [];
    secondPlayerCells = [];
}

function resetWins() {
    firstPlayerWins = 0;
    secondPlayerWins = 0;
    firstPlayerCells = [];
    secondPlayerCells = [];
    document.getElementById('firstPlayerWins').innerText = firstPlayerWins;
    document.getElementById('secondPlayerWins').innerText = secondPlayerWins;
}

// Game Logic
window.onload = function() {
    var cells = document.getElementsByClassName('cell');
    for(var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', event => {
            if(playing) {
                var cell = event.target;
                var cellId = event.target.id;
                if(!document.getElementById(cellId).childNodes.length){
                    if(firstPlayerTurn){
                        var icon = document.createElement('i');
                        icon.style = "color: #5386e4";
                        icon.id = cellId;
                        icon.className = "fas fa-times fa-5x";
                        cell.appendChild(icon);
                        firstPlayerCells.push(parseInt(cellId));
                        firstPlayerTurn = false;
                        document.getElementById('gameMessage').innerText = 'Second player turn.';
                        if(isWinner(firstPlayerCells)){
                            firstPlayerWins++;
                            playing = false;
                            console.log('first player won!');
                            document.getElementById('firstPlayerWins').innerText = firstPlayerWins;
                            document.getElementById('gameMessage').innerText = 'First Player won! Press Replay to reset game.';
                        }
                    } else {
                        var icon = document.createElement('i');
                        icon.style = "color: #ed6a5a";
                        icon.id = cellId;
                        icon.className = "fas fa-dot-circle fa-4x";
                        cell.appendChild(icon);
                        secondPlayerCells.push(parseInt(cellId));
                        firstPlayerTurn = true;
                        document.getElementById('gameMessage').innerText = 'First player turn.';
                        if(isWinner(secondPlayerCells)){
                            secondPlayerWins++;
                            playing = false;
                            console.log('second player won!');
                            document.getElementById('secondPlayerWins').innerText = secondPlayerWins;
                            document.getElementById('gameMessage').innerText = 'Second Player won! Press Replay to reset game.';
                        }
                    }
                }
            }
        });
    }
}

