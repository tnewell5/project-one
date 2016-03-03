console.log("js window has loaded");

var gameBoard = document.querySelector(".gameBoard");
var tileSpan;
var tileArray = [];

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


  //console.log(tileSpan.innerText);
  gameBoard.appendChild(tileSpan);
  tileArray.push(tileSpan);
}

// creates a randomly generated color for a tile (Red, Blue, Greeen, or Yellow):
function tileColorCreation() {
  //function taken from Mozilla Developer Network:
  var randomNum = Math.floor(Math.random() * (5 - 1)) + 1;

  if (randomNum === 1) {return "R";}
  else if (randomNum === 2) {return "B";}
  else if (randomNum === 3) {return "G";}
  else {return "Y";}

}
