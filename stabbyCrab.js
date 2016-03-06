console.log("js window has loaded");

// global variables declaration:
var gameBoard = document.querySelector(".gameBoard");
var isBoardReady = false;
var tileSpan;
var tileArray = [];
var message = document.querySelector(".message");
var healthBarComputer = document.querySelector(".health.computer");
var healthBarPlayer = document.querySelector(".health.player");
var remainingHealthComputer = 0;
var remainingHealthPlayer = 0;
var matchedTilesIndArray = [];
var matchedTilesLettersArray = [];
var reduceComputerHealth = 0;
var reducePlayerHealth = 0;

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
        //tileSwap();

        // maybe playGame() will alternate between calling makeMovePlayer
        // with makeMoveComputer functions?
        playGame();
        }
        else {
          console.log("invalid move");
          message.innerText = "Please make a valid move!";
          player.move = [];
        }
    }
  });
}

//works with player.move array, which already contains a valid move:
function makeMovePlayer() {
  //moved the following message to the end of makeMoveComputer function:
  //message.innerText = "Player - make your move!";
  //player.move
  var temp = tileArray[player.move[0]];
  tileArray[player.move[0]] = tileArray[player.move[1]];
  tileArray[player.move[1]] = temp;
  matchedTiles();

  // resets player move (global object):
  player.move = [];
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
  //console.log("blueTiles array: " + blueTiles);
  //try moving each blue tile up, right, left, down and see if valid move:
  var foundMove = false;
  for (var k = 0; k < blueTiles.length; k += 1) {
    // isValidMove will return true if move is valid/ false otherwise:
    //can swap up?
    if (isValidMove(blueTiles[k], blueTiles[k]-10)) {
      console.log("swapped blue tile index: " + blueTiles[k] + " up");
      // swap tiles in tileArray:
      computer.move[0] = blueTiles[k];
      computer.move[1] = blueTiles[k]-10;
      var temp = tileArray[computer.move[0]];
      tileArray[computer.move[0]] = tileArray[computer.move[1]];
      tileArray[computer.move[1]] = temp;
      matchedTiles();

      return true;
    }
    //can swap right?
    else if (isValidMove(blueTiles[k], blueTiles[k]+1)) {
      console.log("swapped blue tile index: " + blueTiles[k] + " right");
      // swap tiles
      computer.move[0] = blueTiles[k];
      computer.move[1] = blueTiles[k]+1;
      var temp = tileArray[computer.move[0]];
      tileArray[computer.move[0]] = tileArray[computer.move[1]];
      tileArray[computer.move[1]] = temp;
      matchedTiles();

      return true;
    }
    //can swap down?
    else if (isValidMove(blueTiles[k], blueTiles[k]+10)) {
      console.log("swapped blue tile index: " + blueTiles[k] + " down");
      // swap tiles
      computer.move[0] = blueTiles[k];
      computer.move[1] = blueTiles[k]+10;
      var temp = tileArray[computer.move[0]];
      tileArray[computer.move[0]] = tileArray[computer.move[1]];
      tileArray[computer.move[1]] = temp;
      matchedTiles();

      return true;
    }
    //can swap left?
    else if (isValidMove(blueTiles[k], blueTiles[k]-1)) {
      console.log("swapped blue tile index: " + blueTiles[k] + " left");
      // swap tiles
      computer.move[0] = blueTiles[k];
      computer.move[1] = blueTiles[k]-1;
      var temp = tileArray[computer.move[0]];
      tileArray[computer.move[0]] = tileArray[computer.move[1]];
      tileArray[computer.move[1]] = temp;
      matchedTiles();

      return true;
    }

    // resets computer move (global object):
    computer.move = [];
    // else {
    //   console.log("computer ran out of possible moves");
    //   //swap any tiles that would result in a valid move:
    //   for (var m = 0; m < tileArray; m +=1) {
    //     if (isValidMove(tileArray[m], blueTiles[m]-10)) {
    //       console.log("swapped random tile up");
    //     }
    //     else if (isValidMove(tileArray[m], blueTiles[m]+1)) {
    //       console.log("swapped random tile right");
    //     }
    //     else if (isValidMove(tileArray[m], blueTiles[m]+10)) {
    //       console.log("swapped random tile down");
    //     }
    //     else if (isValidMove(tileArray[m], blueTiles[m]-1)) {
    //       console.log("swapped random tile left");
    //     }
    //     else {
    //       console.log("computer ran out of possible moves");
    //     }
    //   }
    // }
  }
  console.log("computer ran out of possible moves");
  message.innerText = "Player - make your move!";
  return true;
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



function gameInitialize() {
  // fills players' health bars with colors:
  var p1HealthDiv = document.querySelector(".computer");
  p1HealthDiv.classList.add("computerColor");
  var p2HealthDiv = document.querySelector(".player");
  p2HealthDiv.classList.add("playerColor");

  // sets players' health to max:
  computer.health = 10;
  player.health = 10;
  message.innerText = "Player - make your move!";

}

// initializes computer healthBar:
function healthBarComp() {
  for (var i = 0; i < 20; i += 1) {
  var healthBarSpan = document.createElement('span');
  healthBarSpan.classList.add("healthTileComputer");
  healthBarComputer.appendChild(healthBarSpan);
  //console.log("new health tile: " + healthBarSpan);
  }
  remainingHealthComputer = 20;
}

// initializes player healthBar:
function healthBarPlay() {
  for (var i = 0; i < 20; i += 1) {
  var healthBarSpan = document.createElement('span');
  healthBarSpan.classList.add("healthTilePlayer");
  healthBarPlayer.appendChild(healthBarSpan);
  //console.log("new health tile: " + healthBarSpan);
  }
  remainingHealthPlayer = 20;
}

// reduces computer's health due to successful player move:
function reduceHealthOfComputer(reductionNum) {
  //reduce computer health displayed on its health bar:
  remainingHealthComputer -= reductionNum;
  //console.log("remaining health: " + remainingHealthComputer);

  var tempArray = healthBarComputer.querySelectorAll(".healthTileComputer");
  //console.log("tempArray[0]: " + tempArray[0]);

  for (var i = 0; i < tempArray.length; i +=1) {
    healthBarComputer.removeChild(tempArray[i]);
    //console.log("removing");
  }

  for (var k = 0; k < remainingHealthComputer; k += 1) {
    var healthBarSpan = document.createElement('span');
    healthBarSpan.classList.add("healthTileComputer");
    healthBarComputer.appendChild(healthBarSpan);
  }

}

// reduces player's health due to successful computer move:
function reduceHealthOfPlayer(reductionNum) {

  //console.log("entered reduceHealthOfPlayer function. remainingHealthPlayer is: " + remainingHealthPlayer);
  //reduce player health displayed on its health bar:
  remainingHealthPlayer -= reductionNum;
  //console.log("remainingHealthPlayer was just reduced by reductionNum of " + reductionNum);
  console.log("remainingHealthPlayer is now: " + remainingHealthPlayer);
  //console.log("remaining health: " + remainingHealthPlayer);

  // CHANGE THE FOLLOWING CODE:
  var tempArray = healthBarPlayer.querySelectorAll(".healthTilePlayer");
  //console.log("tempArray[0]: " + tempArray[0]);

  for (var i = 0; i < tempArray.length; i +=1) {
    healthBarPlayer.removeChild(tempArray[i]);
    //console.log("removing");
  }

  for (var k = 0; k < remainingHealthPlayer; k += 1) {
    var healthBarSpan = document.createElement('span');
    healthBarSpan.classList.add("healthTilePlayer");
    healthBarPlayer.appendChild(healthBarSpan);
  }

}

// checks if board contains 3 horizonally matched red or blue tiles. If does, returns true. Otherwise, returns false:
// function needs to be called in a loop?
function checkBoard() {
  var result = false;
  //var threeRedRow = tileArray[i] === "R" && tileArray[i+1] === "R" && tileArray[i+2] === "R";
  //var threeBlueRow = tileArray[i] === "B" && tileArray[i+1] === "B" && tileArray[i+2] === "B";

  for (var i = 0; i < tileArray.length; i +=1) {
    //if (tileArray[i] === "R" && tileArray[i+1] === "R" && tileArray[i+2] === "R")
    if ((tileArray[i] === "R" && tileArray[i+1] === "R" && tileArray[i+2] === "R") ||
        (tileArray[i] === "B" && tileArray[i+1] === "B" && tileArray[i+2] === "B") ||
        (tileArray[i] === "P" && tileArray[i+1] === "P" && tileArray[i+2] === "P") ||
        (tileArray[i] === "O" && tileArray[i+1] === "O" && tileArray[i+2] === "O") ||
        (tileArray[i] === "G" && tileArray[i+1] === "G" && tileArray[i+2] === "G") ||
        (tileArray[i] === "Y" && tileArray[i+1] === "Y" && tileArray[i+2] === "Y") ||
        (tileArray[i] === "R" && tileArray[i+10] === "R" && tileArray[i+20] === "R") ||
        (tileArray[i] === "B" && tileArray[i+10] === "B" && tileArray[i+20] === "B") ||
        (tileArray[i] === "P" && tileArray[i+10] === "P" && tileArray[i+20] === "P") ||
        (tileArray[i] === "O" && tileArray[i+10] === "O" && tileArray[i+20] === "O") ||
        (tileArray[i] === "G" && tileArray[i+10] === "G" && tileArray[i+20] === "G") ||
        (tileArray[i] === "Y" && tileArray[i+10] === "Y" && tileArray[i+20] === "Y")) {

          result = true;
          console.log("re-set board due to 3 in a row");
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

           //console.log("isValidMove will return true");
           return true;
      }
    }
  }
  //console.log("isValidMove will return false");
  return false;
}


// finds any horizontal/ vertical color matches of 3 minimum on board and
// fills in matchedTilesIndArray with matched color letters
// reduces computer and player health based on red/ blue tiles in matchedTilesIndArray
// updates health bars
// fills in matched tiles with new randomly generated tiles
function matchedTiles() {
  // matched red tiles reduce computer health. declared globally - resetting here:
  reduceComputerHealth = 0;
  // matched blue tiles reduce player health. declared globally - resetting here:
  reducePlayerHealth = 0;
  //matchedTilesIndArray and matchedTilesLettersArray declared globally, resetting here:
  matchedTilesIndArray = [];
  matchedTilesLettersArray = [];
  var repeatingLetterCount = 0;
  var currentLetter = "K";
  var match = false;

  //loop over tileArray and look for any repeating color of minimum 3 tiles horizonally or vertically.
  //If the color is red, increment reduceComputerHealth count and call red health reduction function
  //if the color is blue, increment reducePlayerHealth count and call blue health reduction function
  // call the refill matched tiles function for any matched tiles
  for (var i = 0; i < tileArray.length; i += 1) {
    //if there is a horizonal match of any color of at least 3 tiles:
    if (tileArray[i] === tileArray[i+1] && tileArray[i] === tileArray[i+2]) {
      currentLetter = tileArray[i];
      match = true;

      while (match && tileArray[i] === currentLetter) {
        repeatingLetterCount += 1;
        matchedTilesIndArray.push(i);
        matchedTilesLettersArray.push(tileArray[i]);
        i += 1;
      }
      match = false;
      currentLetter = tileArray[i];
    }
    else if (tileArray[i] === tileArray[i+10] && tileArray[i] === tileArray[i+20]) {
      currentLetter = tileArray[i];
      match = true;

      while (match && tileArray[i] === currentLetter) {
        repeatingLetterCount += 1;
        matchedTilesIndArray.push(i);
        matchedTilesLettersArray.push(tileArray[i]);
        i += 10;
      }
      match = false;
      currentLetter = tileArray[i];
    }
  }

  console.log("matchedTilesIndArray: " + matchedTilesIndArray);
  console.log("matchedTilesLettersArray: " + matchedTilesLettersArray);
  //now loop over the matchedTilesIndArray and for every red tile reduce Computer's health
  //and for every blue tile reduce player's health:
  for (var letter of matchedTilesLettersArray) {
    if (letter === "R") {
      reduceComputerHealth += 1;
    }
    else if (letter === "B") {
      reducePlayerHealth += 1;
    }
  }

  //now let's call the functions that actually reflect reduced health on health bars:
  // reduceHealthOfComputer(threeRedMatch()); - should be able to eliminate the threeRedMatch function

  reduceHealthOfComputer(reduceComputerHealth);
  reduceHealthOfPlayer(reducePlayerHealth);

  //finally, let's call the function that randomly refills all matched tiles:
  fillInMatchedTiles();

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

function playGame() {
  makeMovePlayer();
  makeMoveComputer();

}

//function tileSwap() {
//function playGame() {
    // swap color values in tileArray:
    // var temp = tileArray[player.move[0]];
    // tileArray[player.move[0]] = tileArray[player.move[1]];
    // tileArray[player.move[1]] = temp;
    // display the swapped tiles on the board:
    //recreateBoard();
    // returns true - should eliminate if not using return value:
    //makeMoveComputer();

//}

//set up game:
populateBoard();
// while checkBoard() evaluates to true, call resetBoard():
while (checkBoard()) {
  resetBoard();
}

gameInitialize();
makeMovePlayer();
//initializes computer and player health bars:
healthBarComp();
healthBarPlay();
