console.log("js window has loaded");

// global variables declaration:
var gameBoard = document.querySelector(".gameBoard");
var tileSpan;
var tileArray = [];

// game board creation:
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

  //console.log(tileSpan.innerText);
  gameBoard.appendChild(tileSpan);
  tileArray.push(tileSpan.innerText);
  activateTile(tileSpan, i);
}

// adds event listener to the tile, which, upon a click,
// pushes the address of the tile in tileArray to
// player.move array:
function activateTile(tile, index) {
  tile.addEventListener("click", function(event) {
    player.move.push(index);
    console.log("tile was clicked, tileArray index: " + index);
  });
}

// creates a randomly generated color for a tile
//(Red, Blue, Greeen, or Yellow):
function tileColorCreation() {
  //function taken from Mozilla Developer Network:
  var randomNum = Math.floor(Math.random() * (6 - 1)) + 1;

  if (randomNum === 1) {return "R";}
  else if (randomNum === 2) {return "B";}
  else if (randomNum === 3) {return "G";}
  else if (randomNum === 4) {return "Y";}
  else {return "P";}
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

function gamePlay() {
  // fills players' health bars with colors:
  var p1HealthDiv = document.querySelector(".computer");
  p1HealthDiv.classList.add("computerColor");
  var p2HealthDiv = document.querySelector(".player");
  p2HealthDiv.classList.add("playerColor");

  // sets players' health to max:
  computer.health = 10;
  player.health = 10;

  // ask player1 to make a move:
  alert("Player - make your move!");

  // listen for 2 clicked tiles and act accordingly:
  //if player clicked two tiles,
  //if (player.move.length === 2) {
    // check to see if tiles are adjacent:
    //player.move = player.move.sort
    //console.log("sorted player move array: " + player.move);
  //}

}


//test:
//console.log("tileArray contains: " + tileArray);


gamePlay();
