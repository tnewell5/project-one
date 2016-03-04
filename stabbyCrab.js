console.log("js window has loaded");

// global variables declaration:
var gameBoard = document.querySelector(".gameBoard");
var tileSpan;
var tileArray = [];
var message = document.querySelector(".message");
var healthBarComputer = document.querySelector(".health.computer");
var healthBarSpan;

// game board creation:
function populateBoard() {
  for (var i = 0; i < 100; i += 1) {
    tileSpan = document.createElement('span');
    tileSpan.innerText = tileColorCreation();
    if (tileSpan.innerText === "R") {
      tileSpan.classList.add("red");
      tileSpan.classList.add("tile");
    }
    else if (tileSpan.innerText === "B") {
      tileSpan.classList.add("blue");
      tileSpan.classList.add("tile");
    }
    else if (tileSpan.innerText === "G") {
      tileSpan.classList.add("green");
      tileSpan.classList.add("tile");
    }
    else if (tileSpan.innerText === "Y") {
      tileSpan.classList.add("yellow");
      tileSpan.classList.add("tile");
    }
    else if (tileSpan.innerText === "P") {
      tileSpan.classList.add("purple");
      tileSpan.classList.add("tile");
    }
    else if (tileSpan.innerText === "O") {
      tileSpan.classList.add("orange");
      tileSpan.classList.add("tile");
    }

    //console.log(tileSpan.innerText);
    gameBoard.appendChild(tileSpan);
    tileArray.push(tileSpan.innerText);
    activateTile(tileSpan, i);
  }
}

// adds event listener to the tile, which, upon a click,
// pushes the address of the tile in tileArray to
// player.move array:
function activateTile(tile, index) {
  tile.addEventListener("click", function(event) {
    player.move.push(index);
    // the following sort does not always work - why?
    player.move = player.move.sort();
    console.log("tile was clicked, tileArray index: " + index);
    console.log(player.move);
    if (player.move.length === 2) {tileSwap();}
  });

}

// creates a randomly generated color for a tile
//(Red, Blue, Greeen, or Yellow):
function tileColorCreation() {
  //function taken from Mozilla Developer Network:
  var randomNum = Math.floor(Math.random() * (7 - 1)) + 1;

  if (randomNum === 1) {return "R";}
  else if (randomNum === 2) {return "B";}
  else if (randomNum === 3) {return "G";}
  else if (randomNum === 4) {return "Y";}
  else if (randomNum === 5) {return "P";}
  else {return "O";}
}

//re-create board based on current tileArray:
function recreateBoard() {
  var tileSpanArray = gameBoard.querySelectorAll('.tile');
  for (var j = 0; j < 100; j += 1) {
    tileSpanArray[j].innerText = tileArray[j];

    //tileSpan.innerText = tileColorCreation();
    if (tileSpanArray[j].innerText === "R") {
      tileSpanArray[j].className = "tile";
      tileSpanArray[j].classList.add("red");

    }
    else if (tileSpanArray[j].innerText === "B") {
      tileSpanArray[j].className = "tile";
      tileSpanArray[j].classList.add("blue");
    }
    else if (tileSpanArray[j].innerText === "G") {
      tileSpanArray[j].className = "tile";
      tileSpanArray[j].classList.add("green");
    }
    else if (tileSpanArray[j].innerText === "Y") {
      tileSpanArray[j].className = "tile";
      tileSpanArray[j].classList.add("yellow");
    }
    else if (tileSpanArray[j].innerText === "P") {
      tileSpanArray[j].className = "tile";
      tileSpanArray[j].classList.add("purple");
    }
    else if (tileSpanArray[j].innerText === "O") {
      tileSpanArray[j].className = "tile";
      tileSpanArray[j].classList.add("orange");
    }

    gameBoard.appendChild(tileSpanArray[j]);

    //activateTile(tileSpan, i);
  }
  //console.log(tileSpanArray);
}

var computer = {
  name: "Bob",
  health: 0,
  //move array will hold 2 clicked tiles:
  move: []

}

var player = {
  name: "",
  health: 0,
  //move array will hold 2 clicked tiles:
  move: []

}

// game play:
// ask if 1 or 2 players, initiate health bars
// health bar gets a color, sets health to max health
// asks player1 to make a move by clicking on two
// adjacent tiles. Checks to see if tiles are adjacent
//if adjacent, swap the tiles in array and display
//if not adjacent, asks player1 to re-swap tiles
//once two tiles are swapped, need to check if there is
// a match of at least 3 adjacent tiles of the same color
// if so, check to see if the matched tile color corresponds
// to any player's health color and then reduce that
// player's health bar accordingly by that amount and
// refill the matched tile slots with new random tiles
// if there is no match of at least 3 adjacent tiles,
// undo the swap and ask player to swap again

function gameInitialize() {
  // fills players' health bars with colors:
  var p1HealthDiv = document.querySelector(".computer");
  p1HealthDiv.classList.add("computerColor");
  var p2HealthDiv = document.querySelector(".player");
  p2HealthDiv.classList.add("playerColor");

  // sets players' health to max:
  computer.health = 10;
  player.health = 10;

}

function makeMove() {
  // ask player1 to make a move:
  //alert("Player - make your move!");
  message.innerText = "Player - make your move!";

}

function threeRedMatch() {
  // checking for at least 3 red tiles in a row:
  for (var m = 0; m < tileArray.length; m +=1) {
    var redMatchstatus = false;
    if (tileArray[m] === "R" && tileArray[m+1] === "R" && tileArray[m+2] === "R") {
      console.log(m + "index is Red and has a horizonal match");
      redMatchstatus = true;
      var healthReduction = 0;
      //count all red tiles in a row and reduce opponent's health by that amount:
      while (redMatchstatus && tileArray[m] === "R") {
        healthReduction += 1;
        m += 1;
      }
      redMatchstatus = false;
      console.log("healthReduction is now: " + healthReduction);
    }
  }
  // still need to figure out how to check for matching red values in a column.
  return healthReduction;
}


function tileSwap() {
  //console.log("work here");
  // check to see if tiles are adjacent:
  if (player.move[1] - player.move[0] === 1 || player.move[1] - player.move[0] === 10) {
    console.log("cards are adjacent");
    message.innerText = "Computer makes a move";
    // swap color values in tileArray
    var temp = tileArray[player.move[0]];
    tileArray[player.move[0]] = tileArray[player.move[1]];
    tileArray[player.move[1]] = temp;
    // display the swapped tiles on the board:
    recreateBoard();
    //function returns healthReduction amount:
    threeRedMatch();
    // now can reduce player's health bar by healthReduction and just re-create board:
    //try using progress bar to track health?




  }
  else {
    console.log("cards are not adjacent");
    // alert user to re-pick adjacent tiles
    message.innerText = "Please choose two adjacent tiles!";
  }


}

function healthBar() {
  console.log("healthBarComputer node: " + healthBarComputer);

  for (var i = 0; i < 20; i += 1) {
  healthBarSpan = document.createElement('span');
  healthBarSpan.classList.add("healthTile");
  healthBarComputer.appendChild(healthBarSpan);
  console.log("new health tile: " + healthBarSpan);
  }

}


populateBoard();
gameInitialize();
makeMove();
healthBar();
