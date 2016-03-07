var Board = {
  squares: [['','',''],
            ['','',''],
            ['','','']],
  moves: 0,
  placeMove: function(event) {
    console.log(event.target);
        Board.moves += 1;

    // 1. Update board array with the move [row,col]
    // 2. Refresh board display (based on the current array)
    // 3. Calculate if there is a winner

  },
  checkWinRow: function() {},
  checkWinColumn: function() {},
  checkWinDiagonal: function() {},

  whoseTurn: function() {
    if (moves %2 === 0) {
      return 'X';
    } else {
      return 'O';
    }
  },

  displayBoard: function() {}

};


$(document).ready(  function()  {
  $('.board').on('click', Board.placeMove);


});
