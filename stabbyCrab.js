console.log("js window has loaded");

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


// global variables declaration:
var gameBoard = document.querySelector(".gameBoard");
var tileSpan;
var tileArray = [];
var message = document.querySelector(".message");
var healthBarComputer = document.querySelector(".health.computer");
var remainingHealthComputer = 0;
var matchedTilesIndArray = [];

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

    gameBoard.appendChild(tileSpan);
    tileArray.push(tileSpan.innerText);
    activateTile(tileSpan, i);
  }
}

// adds event listener to the tile, which, upon a click,
// pushes the address of the tile in tileArray to player.move array:
function activateTile(tile, index) {
  tile.addEventListener("click", function(event) {
    player.move.push(index);
    console.log("tile was clicked, tileArray index: " + index);
    console.log(player.move);
    if (player.move.length === 2) {tileSwap();}
  });
}

// creates a randomly generated color for a tile:
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
  }
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

function healthBar() {
  // computer healthBar:
  for (var i = 0; i < 20; i += 1) {
  var healthBarSpan = document.createElement('span');
  healthBarSpan.classList.add("healthTile");
  healthBarComputer.appendChild(healthBarSpan);
  //console.log("new health tile: " + healthBarSpan);
  }
  remainingHealthComputer = 20;
}

function reduceHealth(reductionNum) {
  //reduce computer health displayed on its health bar:
  remainingHealthComputer -= reductionNum;
  //console.log("remaining health: " + remainingHealthComputer);

  var tempArray = healthBarComputer.querySelectorAll(".healthTile");
  //console.log("tempArray[0]: " + tempArray[0]);

  for (var i = 0; i < tempArray.length; i +=1) {
    healthBarComputer.removeChild(tempArray[i]);
    //console.log("removing");
  }

  for (var k = 0; k < remainingHealthComputer; k += 1) {
    var healthBarSpan = document.createElement('span');
    healthBarSpan.classList.add("healthTile");
    healthBarComputer.appendChild(healthBarSpan);
  }

}

// checks if board contains 3 horizonally matched red or blue tiles. If does, returns true. Otherwise, returns false:
// function needs to be called in a loop?
function checkBoard() {
  var result = false;
  for (var i = 0; i < tileArray.length; i +=1) {
    if (tileArray[i] === "R" && tileArray[i+1] === "R" && tileArray[i+2] === "R") {
      result = true;
      console.log("3 red in a row");
    }
    else if (tileArray[i] === "B" && tileArray[i+1] === "B" && tileArray[i+2] === "B") {
      result = true;
      console.log("3 blue in a row");
    }
  }
  //console.log(result);
  return result;
}

// resets the board to eliminate existing matches prior to game start:
// currently only checks for red tiles in row (also need to add check for blue tiles and column order)
function resetBoard() {
  //re-shuffle tileArray:
  tileArray = [];
    for (var i = 0; i < 100; i +=1) {
      tileArray.push(tileColorCreation());
    }

  var tileSpanArray = gameBoard.querySelectorAll('.tile');
  for (var k = 0; k < tileArray.length; k +=1) {
    gameBoard.removeChild(tileSpanArray[k]);
  }

  for (var j = 0; j < tileArray.length; j +=1) {
    tileSpanArray[j].innerText = tileArray[j];
    gameBoard.appendChild(tileSpanArray[j]);

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
  }
}

//asks player to make a move:
function makeMovePlayer() {
  message.innerText = "Player - make your move!";

}

//displayes that computer is making a move:
function makeMoveComputer() {
  message.innerText = "Computer makes a move";
}

function threeRedMatch() {
  // checking for at least 3 red tiles in a row:
  var healthReduction = 0;
  // var matchedTilesIndArray = [];
  //matchedTilesIndArray is declared globally - need to remember to reset
  for (var m = 0; m < tileArray.length; m +=1) {
    var redMatchstatus = false;
    if (tileArray[m] === "R" && tileArray[m+1] === "R" && tileArray[m+2] === "R") {
      console.log(m + "index is Red and has a horizonal match");
      redMatchstatus = true;
      //count all red tiles in a row and reduce opponent's health by that amount:
      while (redMatchstatus && tileArray[m] === "R") {
        healthReduction += 1;
        matchedTilesIndArray.push(m);
        m += 1;
      }
      redMatchstatus = false;
      console.log("healthReduction is now: " + healthReduction);
    }
  }
  // still need to figure out how to check for matching red values in a column.
  return healthReduction;
}

//replaces the matched red tiles with brand-new random tiles:
function fillInMatchedTiles() {
  //loop over matchedTilesIndArray and for each value replace the index of tileArray with new tile:
  for (var num of matchedTilesIndArray) {
    tileArray[num] = tileColorCreation();
  }
  // re-display new tileArray on game board:
  var tileSpanArray = gameBoard.querySelectorAll('.tile');
  for (var k = 0; k < tileArray.length; k +=1) {
    gameBoard.removeChild(tileSpanArray[k]);
  }

  for (var j = 0; j < tileArray.length; j +=1) {
    tileSpanArray[j].innerText = tileArray[j];
    gameBoard.appendChild(tileSpanArray[j]);

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
  }

}

function tileSwap() {
  //console.log("work here");
  // check to see if tiles are adjacent:
  if (Math.abs(player.move[1] - player.move[0]) === 1 || Math.abs(player.move[1] - player.move[0]) === 10) {
    console.log("cards are adjacent");
    //makeMoveComputer();
    //message.innerText = "Computer makes a move";
    // swap color values in tileArray
    var temp = tileArray[player.move[0]];
    tileArray[player.move[0]] = tileArray[player.move[1]];
    tileArray[player.move[1]] = temp;
    // display the swapped tiles on the board:
    recreateBoard();
    //function returns healthReduction amount:
    //threeRedMatch();
    // now can reduce player's health bar by healthReduction and just re-create board:
    //try using progress bar to track health?
    reduceHealth(threeRedMatch());
    fillInMatchedTiles();
    makeMoveComputer();

  }
  else {
    console.log("cards are not adjacent");
    // alert user to re-pick adjacent tiles
    message.innerText = "Please choose two adjacent tiles!";
  }
}



populateBoard();
//console.log(tileArray);
// while checkBoard() evaluates to true, call resetBoard():
while (checkBoard()) {
  resetBoard();
}
//console.log(tileArray);
gameInitialize();
makeMovePlayer();
healthBar();
