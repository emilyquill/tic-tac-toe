var Board = {
  squares: [['','',''],
            ['','',''],
            ['','','']],
  moves: 0,
  placeMove: function(event) {
    var moveRow = event.target.dataset.row;
    var moveCol = event.target.dataset.col;
    console.log(moveRow, moveCol);
    var moveLocation = Board.squares[moveRow][moveCol];
    if (moveLocation === '') { // space free
      Board.squares[moveRow][moveCol] = (Board.whoseTurn());
      Board.displayBoard();
        if (Board.checkWin(Board.whoseTurn()) === true) {
        swal("And the " +Board.whoseTurn()+ "'s have it!", "Rematch?", "success");
        Board.resetBoard();

        } else {
          Board.moves += 1;
        }
      console.log("It's player " + Board.whoseTurn() + "'s turn now");
    } else {
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
    if (Board.moves %2 === 0) {
      return 'X';
    } else {
      return 'O';
    }
  },

  displayBoard: function() {
    for (var i = 0; i < Board.squares.length ; i++) {
      for (var j = 0; j< Board.squares[0].length; j++) {
      var move = Board.squares[i][j];
      $('div[data-row="' +[i]+'"][data-col="' +[j]+'"]').text(move);
      }
    }
  },
  resetBoard: function() {
    this.moves = 0;
    this.squares = [['','',''],
              ['','',''],
              ['','','']];
    this.displayBoard();
  }

};


$(document).ready(  function()  {
  $('.board').on('click', Board.placeMove);

});
