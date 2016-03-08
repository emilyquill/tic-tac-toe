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
      Board.moves += 1;
      console.log("It's player " + Board.whoseTurn() + "'s turn now");
    } else {
      alert("Nice try.. that place is taken..");
    }
    Board.displayBoard();
    // 3. Calculate if there is a winner

  },
  checkWinRow: function() {},
  checkWinColumn: function() {},
  checkWinDiagonal: function() {},

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


      //  Board.squares[moveRow][moveCol]
  },
  displayTurn: function() {},

};


$(document).ready(  function()  {
  $('.board').on('click', Board.placeMove);


});
