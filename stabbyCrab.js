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
    //console.log("tile was clicked, tileArray index: " + index);
    //console.log(player.move);
    if (player.move.length === 2) {
      // if isValidMove returns true, call tileSwap():
        if (isValidMove(player.move[0], player.move[1])) {
        tileSwap();
        }
        else {
          console.log("invalid move");
          message.innerText = "Please make a valid move!";
          player.move = [];
        }
    }
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

// computer makes a move by creating an array of all blue tiles on the board and
// checking if there is a valid move for each one until it finds one:
// what should this function return?
function makeMoveComputer() {
  message.innerText = "Computer makes a move";
  var blueTiles = [];
  for (var i = 0; i < tileArray.length; i += 1) {
    if (tileArray[i] === "B") {
      //push address of blue tile into blueTiles array:
      blueTiles.push(i);
    }
  }
  console.log("blueTiles array: " + blueTiles);
  //try moving each blue tile up, right, left, down and see if valid move:
  var foundMove = false;
  for (var k = 0; k < blueTiles.length; k += 1) {
    // isValidMove will return true if move is valid/ false otherwise:
    //can swap up?
    if (isValidMove(blueTiles[k], blueTiles[k]-10)) {
      console.log("swapped blue tile index: " + blueTiles[k] + " up");
      // swap tiles
      // reduce player's health and health bar
      // replace matched tiles with new random tiles
      return true;
    }
    //can swap right?
    else if (isValidMove(blueTiles[k], blueTiles[k]+1)) {
      console.log("swapped blue tile index: " + blueTiles[k] + " right");
      // swap tiles
      // reduce player's health and health bar
      // replace matched tiles with new random tiles
      return true;
    }
    //can swap down?
    else if (isValidMove(blueTiles[k], blueTiles[k]+10)) {
      console.log("swapped blue tile index: " + blueTiles[k] + " down");
      // swap tiles
      // reduce player's health and health bar
      // replace matched tiles with new random tiles
      return true;
    }
    //can swap left?
    else if (isValidMove(blueTiles[k], blueTiles[k]-1)) {
      console.log("swapped blue tile index: " + blueTiles[k] + " left");
      // swap tiles
      // reduce player's health and health bar
      // replace matched tiles with new random tiles
      return true;
    }
    else {
      //console.log("computer ran out of possible moves");
      // swap any tiles that would result in a valid move:
      // for (var m = 0; m < tileArray; m +=1) {
      //   if (isValidMove(tileArray[m], blueTiles[m]-10)) {
      //     console.log("swapped random tile up");
      //   }
      //   else if (isValidMove(tileArray[m], blueTiles[m]+1)) {
      //     console.log("swapped random tile right");
      //   }
      //   else if (isValidMove(tileArray[m], blueTiles[m]+10)) {
      //     console.log("swapped random tile down");
      //   }
      //   else if (isValidMove(tileArray[m], blueTiles[m]-1)) {
      //     console.log("swapped random tile left");
      //   }
      //   else {
      //     console.log("computer ran out of possible moves");
      //   }
      // }
    }
  }
  console.log("computer ran out of possible moves");
  return true;
}

// checks to see if two passed in tiles are adjacent and if swap matches a color:
function isValidMove(tile1Index, tile2Index) {
  tileArr = [];
  if (tile1Index > tile2Index) {
    tileArr[0] = tile2Index;
    tileArr[1] = tile1Index;
  }
  else {
    tileArr[0] = tile1Index;
    tileArr[1] = tile2Index;
  }

  //tileArr.push(tile1Index, tile2Index);
  //tileArr = tileArr.sort();
  //sort() sucks!!! sorts alphabetically, which is super misleading!!!
  //took soooo many console.logs to find this error!!!!

  //are two tles adjacent?
  if (Math.abs(tile1Index - tile2Index) === 1 || Math.abs(tile1Index - tile2Index) === 10) {
    // tests that the passed in tile indeces are not out of bounds:
    if (tileArr[0] > -1 && tileArr[1] < 100) {
      //does the tiles swap result in a matched color of at least 3 tiles in a row?
      var small = tileArr[0];
      var large = tileArr[1];
      var low = tileArr[1];
      var high = tileArr[0];
      var isHorizontal = large - small === 1;

      // horizontal swaps:
      // check if smaller swapped tile has matched both pieces to the right of it:
      var horizontalSmallRight = (tileArray[small] === tileArray[small + 2] &&
                             tileArray[small] === tileArray[small + 3] && isHorizontal);
      // check if larger swapped tile has matched both pieces to the left of it:
      var horizontalLargeLeft = (tileArray[large] === tileArray[large - 2] &&
                            tileArray[large] === tileArray[large - 3] && isHorizontal);
      //check if smaller swapped tile has matched both pieces above it
      var horizonalSmallAbove = (tileArray[small] === tileArray[small - 9] &&
                            tileArray[small] === tileArray[small - 19] && isHorizontal);
      //check if smaller swapped tile has matched both pieces below it
      var horizontalSmallBelow = (tileArray[small] === tileArray[small + 11] &&
                             tileArray[small] === tileArray[small + 21] && isHorizontal);
      //check if smaller swapped tile has matched one piece above it and one below
      var horizontalSmallAboveBelow = (tileArray[small] === tileArray[small - 9] &&
                                  tileArray[small] === tileArray[small + 11] && isHorizontal);
      //check if larger swapped tile has matched both pieces above it
      var horizontalLargeAbove = (tileArray[large] === tileArray[large - 11] &&
                            tileArray[large] === tileArray[large - 21] && isHorizontal);
      //check if larger swapped tile has matched both pieces below it
      var horizontalLargeBelow = (tileArray[large] === tileArray[large + 9] &&
                            tileArray[large] === tileArray[large + 19] && isHorizontal);
      //check if larger swapped tile has matched one piece above it and one below
      var horizontalLargeAboveBelow = (tileArray[large] === tileArray[large - 11] &&
                                  tileArray[large] === tileArray[large + 9] && isHorizontal);
      //vertical swaps:
      //check if lower swapped tile has matched both pieces above it
      var verticalLowAbove = (tileArray[low] === tileArray[low - 20] &&
                              tileArray[low] === tileArray[low - 30] && !isHorizontal);
      //check if higher swapped tile has matched both pieces below it
      var verticalHighAbove = (tileArray[high] === tileArray[high + 20] &&
                               tileArray[high] === tileArray[high + 30] && !isHorizontal);
      //check if lower swapped tile has matched two pieces to the left of it
      var verticalLowLeft = (tileArray[low] === tileArray[low - 11] &&
                             tileArray[low] === tileArray[low - 12] && !isHorizontal);
      //check if lower swapped tile has matched two pieces to the right of it
      var verticalLowRight = (tileArray[low] === tileArray[low - 9] &&
                              tileArray[low] === tileArray[low - 8] && !isHorizontal);
      //check if lower swapped tile has matched one piece to the left and one to the right
      var verticalLowLeftRight = (tileArray[low] === tileArray[low - 11] &&
                                  tileArray[low] === tileArray[low - 9] && !isHorizontal);
      //check if higher swapped tile has matched two pieces to the left of it
      var verticalHighLeft = (tileArray[high] === tileArray[high + 9] &&
                              tileArray[high] === tileArray[high + 8] && !isHorizontal);
      //check if higher swapped tile has matched two pieces to the right of it
      var verticalHighRight = (tileArray[high] === tileArray[high + 11] &&
                               tileArray[high] === tileArray[high + 12] && !isHorizontal);
      //check if higher swapped tile has matched one piece to the left and one to the right
      var verticalHighLeftRight = (tileArray[high] === tileArray[high + 9] &&
                               tileArray[high] === tileArray[high + 11] && !isHorizontal);

      if (horizontalSmallRight || horizontalLargeLeft || horizonalSmallAbove ||
        horizontalSmallBelow || horizontalSmallAboveBelow || horizontalLargeAbove ||
        horizontalLargeBelow || horizontalLargeAboveBelow || verticalLowAbove ||
        verticalHighAbove || verticalLowLeft || verticalLowRight || verticalLowLeftRight ||
        verticalHighLeft || verticalHighRight || verticalHighLeftRight) {

           console.log("isValidMove will return true");
           return true;
      }
    }
  }
  console.log("isValidMove will return false");
  return false;
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
  // if (Math.abs(player.move[1] - player.move[0]) === 1 || Math.abs(player.move[1] - player.move[0]) === 10) {
  //   console.log("cards are adjacent");
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
