$(document).ready(function() {

  var playerIcon = "<img src='http://www.collinferry.com/codepen/x.png'>";
  var pcIcon = "<img src='http://www.collinferry.com/codepen/o.png'>";
  var takenSquares = [];
  var winningArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  var pcMoves = [];
  var humanMoves = [];
  var winner = false;

  // Function that resets the board

  function clear(swap) {
    
    takenSquares = [];
    pcMoves = [];
    humanMoves = [];
    winner = false;

    for (var a = 1; a <= 9; a++) {
      var id = a.toString();
      document.getElementById(id).innerHTML = "<img src='http://www.collinferry.com/codepen/stain.png'>";
    }

    if (swap == 1) {
      var corners = [1, 3, 7, 9];
      var rand = Math.ceil(Math.random() * 4);
      var computerSquare = corners[rand];
      document.getElementById(computerSquare).innerHTML = pcIcon;
      takenSquares.push(computerSquare);
      pcMoves.push(computerSquare);
    }

    clearTimeout(pcTimer);

  }

  function playX() {
    playerIcon = "<img src='http://www.collinferry.com/codepen/x.png'>";
    pcIcon = "<img src='http://www.collinferry.com/codepen/o.png'>";
  }

  function playO() {
    playerIcon = "<img src='http://www.collinferry.com/codepen/o.png'>";
    pcIcon = "<img src='http://www.collinferry.com/codepen/x.png'>";
  }

  // Function that determines if the game is complete, run after each move

  function gameOn() {

    var possibleWins = [];

    // Check to see if computer has won --------- //

    if (pcMoves.length >= 3) {
      for (var a = 0; a < 8; a++) {

        var winCheck = 0;

        for (var b = 0; b < 3; b++) {
          if (pcMoves.indexOf(winningArray[a][b]) >= 0) {
            winCheck += 1;
          }

          if (winCheck == 3) {
            winner = true;
            alert("Computer wins. Welcome your new robot overlords.");
            if (playerIcon == "<img src='http://www.collinferry.com/codepen/o.png'>") {
              clear(1);
            } else {
              clear();
            }
          }

        }

      }

    }

    // Check to see if human has won --------- //

    if (humanMoves.length >= 3) {

      for (var a = 0; a < 8; a++) {

        var winCheck = 0;

        for (var b = 0; b < 3; b++) {

          if (humanMoves.indexOf(winningArray[a][b]) >= 0) {
            winCheck += 1;
          }

          if (winCheck == 3) {
            winner = true;
            alert("You Win! Humans prevail over AI...for now!");
            if (playerIcon == "<img src='http://www.collinferry.com/codepen/o.png'>") {
              clear(1);
            } else {
              clear();
            }
          }

        }

      }

    }
    
    // Check for tie --------- //

    if ((takenSquares.length == 9) && (winner === false)) {
      alert("Game over! It's a Tie!");
      if (playerIcon == "<img src='http://www.collinferry.com/codepen/o.png'>") {
        clear(1);
      } else {
        clear();
      }
    }

  }

  // Main function, runs upon player choosing their first move --------- //
  
  function playGame(square) {

    // Determine computers move (and play that move) --------- //

    function computerMove() {

      //If no strong moves are present, computer will move randomly
      
      var computerSquare = Math.ceil(Math.random() * 9);
      var corners = [1, 3, 7, 9];
      var counter = 0;
      
      // Lowest priorty: corner play --------- // 
      
      for (var f = 0; f < 4; f++){
        if (takenSquares.indexOf(corners[f]) < 0) {
          computerSquare = corners[f];
          break;
        }
      }
      
     // Next up: play the center -------------- // 
      
      for (var q = 0; q < 4; q++) {
        
        if (takenSquares.indexOf(corners[q]) > 0) {
          counter += 1;
        }
        if (counter == 4 && takenSquares.indexOf(5) < 0) {
          computerSquare = 5;
        }
      }
      
      // Higher priority: block the human --------- //
      
      for (var a = 0; a < 8; a++) {
        var winCheck = 0;
        var holder = 0;
        for (var b = 0; b < 3; b++) {
          if (humanMoves.indexOf(winningArray[a][b]) >= 0) {
            winCheck += 1;
            } else {
              holder = winningArray[a][b];
            }
          if (winCheck == 2 && holder > 0 && takenSquares.indexOf(holder) < 0) {
             computerSquare = holder;
          }
        }
      }
      


      if (takenSquares.indexOf(computerSquare) < 0) {
        computerSquare.toString();
        document.getElementById(computerSquare).innerHTML = pcIcon;
        takenSquares.push(computerSquare);
        pcMoves.push(computerSquare);
        gameOn();
      } else {
        computerMove();
      }

    }

    // Play human's move --------- //

    if (takenSquares.indexOf(parseInt(square)) < 0) {

      takenSquares.push(parseInt(square));
      humanMoves.push(parseInt(square));
      document.getElementById(square).innerHTML = playerIcon;
      gameOn();

      // Once user's move is played, wait .7 seconds then run computerMove --------- //

      if (winner === false) {
        var pcTimer = window.setTimeout(computerMove, 700);
      }

    } else {
      alert("That square is taken, choose another");
    }

  }

  $(".tic").click(function() {
    playGame(this.value);
  });

  $(".playx").click(function() {
    playX();
    clear();
  });

  $(".playo").click(function() {
    playO();
    clear(1);
  });

  $(".reset").click(function() {
    if (playerIcon == "<img src='http://www.collinferry.com/codepen/o.png'>") {
      clear(1);
    } else {
      clear();
    }
  });

});

/*

Future improvement:

1. Figure out how to preload the PNG files ( http://bit.ly/1nHn9Xs )

2. Improve AI :

         var win = false; // win = two computer pieces in a row
         var block = false; // block = two human pieces in a row
         var fork = false; // possibility to create two non-blocked lines of two
         var blockfork = false; // block an opponents fork
         var center = false; // center is open
         var corner = false; // play corner
         var side = false;

         if (win) {
           //play winning move
         } else if (block) {
           //block the human
         } else if (fork) {
           //play the fork
         } else if (blockfork) {
           //block humans fork
         } else if (center) {
           //play the center
         } else if (corner) {
           // if human holds a corner, play opposite first
         } else if (side) {
           // play a side
         } 
         
         // Old human wincheck code ----------------- // 

    if (humanMoves.length >= 3) {
      humanMoves.sort();
      var possibleWins = [];
      for (var a = 0; a < humanMoves.length - 2; a++) {
        var tempArray = [];
        for (var b = 0; b < 3; b++) {
          tempArray.push(humanMoves[a + b]);
        }
        tempArray.sort();
        possibleWins.push(tempArray);
      }
      for (var c = 0; c < possibleWins.length; c++) {
        for (var d = 0; d < winningArray.length; d++) {
          if (JSON.stringify(possibleWins[c]) === JSON.stringify(winningArray[d])) {
            winner = true;
            alert("You Win! Humans prevail over AI...for now!");
            clear();
          }
        }
      }
    } 
    
// Old PC wincheck code ----------------- // 
    
    if (pcMoves.length >= 3) {
      pcMoves.sort();
      possibleWins = [];
      for (var a = 0; a < pcMoves.length - 2; a++) {
        var tempArray = [];
        for (var b = 0; b < 3; b++) {
          tempArray.push(pcMoves[a + b]);
        }
        tempArray.sort();
        possibleWins.push(tempArray);
      }

      for (var c = 0; c < possibleWins.length; c++) {
        for (var d = 0; d < winningArray.length; d++) {
          console.log("PC - testing array: " + possibleWins[c] + " againt " + winningArray[d]);
          if (JSON.stringify(possibleWins[c]) === JSON.stringify(winningArray[d])) {
            winner = true;
            alert("Computer wins. Welcome your new robot overlords.");
            clear();
          }
        }
      }
    }  
         
*/