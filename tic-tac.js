
// Initialize the characters symbol for each player
var firstPlayerWins = 0;
var secondPlayerWins = 0;
var tieCounter = 0 ;
var firstPlayerTurn = true;
var firstPlayerCells = [];
var secondPlayerCells = [];
var playing = false;
var first_player_name= "Player 1";
var second_player_name = "Player 2";
var gameMessage = 'Please press Start Game to initialize the game.';

// Timer stuff
var id;
var totalTime;
var counter = 0 ;
var timer_is_on = false;
// This array will determine who will win the game
var mixedWins = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7] , [2,5,8] ,[0,4,8], [6,4,2]];

function isWinner(playerCells) {
    var isWinner = false;
    for(var i = 0; i < mixedWins.length; i++){
        if(mixedWins[i].every(function(val) { return playerCells.indexOf(val) >= 0; })){
            for ( var index = 0 ; index < mixedWins[i].length; ++index){
                if (firstPlayerTurn)
                document.getElementById(mixedWins[i][index]).style.backgroundColor = "pink";
                else
                document.getElementById(mixedWins[i][index]).style.backgroundColor = "green";
            }

            isWinner = true;
        }
    }
    return isWinner;
}

function startGame() {
    document.getElementById('gameMessage').innerText = first_player_name +  "'s turn.";
    firstPlayerCells = [];
    secondPlayerCells = [];
    firstPlayerTurn = true;
    playing = true;
    timedCount();
    startTimer(first_player_name);
}

function startTimer (playerName){
        window.clearTimeout(id);
        kickstartTimer(30, playerName);
}

function kickstartTimer(seconds, playerName) {
    var timer = document.getElementById("time");
    timer.style.visibility = "visible";

    timer.textContent = playerName + " has " + seconds + " seconds";
    if (seconds != 0){
        --seconds;
    }
    id = setTimeout(function () {
         kickstartTimer(seconds, playerName);
    }, 1000);
}

function pauseGame() {
    // Pause the timer
    timer_is_on = !timer_is_on;
    if (!timer_is_on)clearTimeout(totalTime);
    else
        startCount();
    playing = !playing;
    document.getElementById('gameMessage').innerText = 'Game paused. Press Pause Game button to continue';
}

function reset() {
    var cells = document.getElementsByClassName('cell');
    for(var i = 0; i < cells.length; i++) {
        if(cells[i].childElementCount){
            cells[i].style.removeProperty("background-color");
            cells[i].removeChild(cells[i].firstChild);
        }
    }
    clearTimeout(totalTime) ;
    timer_is_on = false;
    counter = 0 ;
    startCount();
    firstPlayerTurn = true;
    playing = true;
    firstPlayerCells = [];
    secondPlayerCells = [];
}

function changeName () {
    swal("Please Enter First Player Name", {
        content: "input",
    }).then((value1) => {
        if (value1 != null)
         first_player_name = value1;
         swal("Please Enter Second Player Name", {
            content: "input",
        }).then((value) => {
            if (value != null)
            second_player_name = value;
        });
    });
}

function timedCount() {
    document.getElementById("totalTime").value =  counter;
    counter = counter + 1;
    totalTime = setTimeout(function(){ timedCount() }, 1000);
}

function startCount() {
    if (!timer_is_on) {
        timer_is_on = true;
        timedCount();
    }
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
    changeName();
    document.getElementById("totalTime").value = "0" ;
    var cells = document.getElementsByClassName('cell');
    for(var i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', event => {
            if(playing) {
                var cell = event.target;
                var cellId = event.target.id;
                if(!document.getElementById(cellId).childNodes.length){
                    if(firstPlayerTurn){

                        startTimer(first_player_name);

                        var icon = document.createElement('i');
                        icon.style = "color: #5386e4";
                        icon.id = cellId;
                        icon.className = "fas fa-times fa-5x";
                        cell.appendChild(icon);
                        firstPlayerCells.push(parseInt(cellId));
                        firstPlayerTurn = false;
                        document.getElementById('gameMessage').innerText = second_player_name +  "'s turn.";
                        // Check if the array of both cells are full filled
                        var full_box = firstPlayerCells.length + secondPlayerCells.length;
                        if(isWinner(firstPlayerCells)){
                            firstPlayerWins++;
                            playing = false;
                            document.getElementById('firstPlayerWins').innerText = firstPlayerWins;
                            swal("Yeah", first_player_name + " won. Total time is " + counter + " seconds", "success");
                            clearTimeout(totalTime);
                            document.getElementById('gameMessage').innerText = 'First Player won! Press Replay to reset game.';

                        }
                        else if ( full_box == 9){
                            ++tieCounter;
                            document.getElementById("tieCount").innerText = tieCounter;
                           swal("Hmm", "Game Tie") ;
                        }

                    } else {
                        startTimer(second_player_name);
                        var icon = document.createElement('i');
                        icon.style = "color: #ed6a5a";
                        icon.id = cellId;
                        icon.className = "fas fa-dot-circle fa-4x";
                        cell.appendChild(icon);
                        secondPlayerCells.push(parseInt(cellId));
                        firstPlayerTurn = true;
                        document.getElementById('gameMessage').innerText =  first_player_name + "'s turn.";
                        if(isWinner(secondPlayerCells)){
                            secondPlayerWins++;
                            playing = false;
                            document.getElementById('secondPlayerWins').innerText = secondPlayerWins;
                            swal("Yeah", second_player_name + " won. Total time is " + counter + " seconds", "success");
                            clearTimeout(totalTime);
                            document.getElementById('gameMessage').innerText = 'Second Player won! Press Replay to reset game.';
                        }
                        else if ( full_box == 9){
                            ++tieCounter;
                            document.getElementById("tieCount").innerText = tieCounter;
                           swal("Hmm", "Game Tie") ;
                        }

                    }
                }
            }
            else {
                var full_box = firstPlayerCells.length + secondPlayerCells.length;
                if (full_box == 0)
                swal("Please Click Start Game button");
                else
                    swal("This game has ended. Please Click Replay button to start new game!")
            }
        });
    }
}

