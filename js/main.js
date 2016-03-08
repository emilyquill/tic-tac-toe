var GameLogic = {
  squares: [['','',''],
            ['','',''],
            ['','','']],
  moves: 0,
  placeMove: function(event) {
    var moveRow = event.target.dataset.row;
    var moveCol = event.target.dataset.col;
    var moveLocation = GameLogic.squares[moveRow][moveCol];

    if (moveLocation === '') { // space is free
      GameLogic.squares[moveRow][moveCol] = (GameLogic.whoseTurn());
      GameUI.displayBoard();
        if (GameLogic.checkWin(GameLogic.whoseTurn()) === true) {
        swal("And the " +GameLogic.whoseTurn()+ "'s have it!", "Rematch?", "success");
        GameLogic.resetBoard();
        } else {
          GameLogic.moves += 1;
          if (GameLogic.moves > 8) {
            swal({
                    title: "Hmm..",
                    text: "Looks like nobody won that time... play again?",
                    imageUrl: "images/thinkingface.png"
            });
            GameLogic.resetBoard();
          }
        }
      console.log("It's player " + GameLogic.whoseTurn() + "'s turn now");
    } else {  // space is not free
          swal({
                  title: "Nope!",
                  text: "That space is taken...",
                  imageUrl: "images/facewithrollingeyes.png"
          });
    }
  },

  checkWin: function(player) {
    return this.checkWinRow(player) || this.checkWinColumn(player) || this.checkWinDiagonal(player);
  },
  checkWinRow: function(player) {
    if (this.checkCell(0,0) === player && this.checkCell(0,1) === player && this.checkCell(0,2) === player ||
        this.checkCell(1,0) === player && this.checkCell(1,1) === player && this.checkCell(1,2) === player ||
        this.checkCell(2,0) === player && this.checkCell(2,1) === player && this.checkCell(2,2) === player ) {
          return true;
        } else {
          return false;
        }
  },

  checkWinColumn: function(player) {
    if (this.checkCell(0,0) === player && this.checkCell(1,0) === player && this.checkCell(2,0) === player ||
        this.checkCell(0,1) === player && this.checkCell(1,1) === player && this.checkCell(2,1) === player ||
        this.checkCell(0,2) === player && this.checkCell(1,2) === player && this.checkCell(2,2) === player ) {
          return true;
        } else {
          return false;
        }
  },
  checkWinDiagonal: function(player) {
    if (this.checkCell(0,0) === player && this.checkCell(1,1) === player && this.checkCell(2,2) === player ||
        this.checkCell(0,2) === player && this.checkCell(1,1) === player && this.checkCell(2,0) === player ) {
          return true;
        } else {
          return false;
        }
  },
  checkCell: function(vertical, horizontal) {
    return this.squares[vertical][horizontal];
  },
  whoseTurn: function() {
    if (GameLogic.moves %2 === 0) {
      return 'X';
    } else {
      return 'O';
    }
  },

  resetBoard: function() {
    this.moves = 0;
    this.squares = [['','',''],
              ['','',''],
              ['','','']];
    GameUI.displayBoard();
  }

};

var GameUI = {
  displayBoard: function() {
    for (var i = 0; i < GameLogic.squares.length ; i++) {
      for (var j = 0; j< GameLogic.squares[0].length; j++) {
      var move = GameLogic.squares[i][j];
      $('div[data-row="' +[i]+'"][data-col="' +[j]+'"]').text(move);
      }
    }
  }
};


$(document).ready(  function()  {
  $('.board').on('click', GameLogic.placeMove);
});
