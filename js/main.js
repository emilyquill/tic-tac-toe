var GameLogic = {
  squares: [['','',''],
            ['','',''],
            ['','','']],
  moves: 0,

  placeMove: function(moveRow, moveCol) {
    var moveLocation = GameLogic.squares[moveRow][moveCol];

    if (moveLocation === '') { // space is free
      GameLogic.squares[moveRow][moveCol] = (GameLogic.whoseTurn());
      GameUI.displayBoard();

        if (GameLogic.checkWin(GameLogic.whoseTurn()) === true) {
            swal("And the " +GameLogic.whoseTurn()+ "'s have it!", "Rematch?", "success");
            GameLogic.resetBoard();
        } else {
          GameLogic.moves += 1;
          GameUI.showCurrentPlayer();
          if (GameLogic.moves > 8) {
            swal({
                    title: "Hmm..",
                    text: "Looks like nobody won that time... play again?",
                    imageUrl: "images/thinkingface.png",
                    confirmButtonColor: "#27A588",
                    confirmButtonText: "Ok, let's do it.."
            });
            GameLogic.resetBoard();
          }
        }
      console.log("It's player " + GameLogic.whoseTurn() + "'s turn now");
    } else {  // space is not free
          swal({
                  title: "Nope!",
                  text: "That space is taken...",
                  imageUrl: "images/facewithrollingeyes.png",
                  confirmButtonColor: "#27A588"
          });
    }
  },
  checkWin: function(player) {
    return this.checkWinRow(player) || this.checkWinColumn(player) || this.checkWinDiagonal(player);
  },
  checkWinRow: function(player) {
    if (this.getCell(0,0) === player && this.getCell(0,1) === player && this.getCell(0,2) === player ||
        this.getCell(1,0) === player && this.getCell(1,1) === player && this.getCell(1,2) === player ||
        this.getCell(2,0) === player && this.getCell(2,1) === player && this.getCell(2,2) === player ) {
          return true;
        } else {
          return false;
        }
  },

  checkWinColumn: function(player) {
    if (this.getCell(0,0) === player && this.getCell(1,0) === player && this.getCell(2,0) === player ||
        this.getCell(0,1) === player && this.getCell(1,1) === player && this.getCell(2,1) === player ||
        this.getCell(0,2) === player && this.getCell(1,2) === player && this.getCell(2,2) === player ) {
          return true;
        } else {
          return false;
        }
  },
  checkWinDiagonal: function(player) {
    if (this.getCell(0,0) === player && this.getCell(1,1) === player && this.getCell(2,2) === player ||
        this.getCell(0,2) === player && this.getCell(1,1) === player && this.getCell(2,0) === player ) {
          return true;
        } else {
          return false;
        }
  },
  getCell: function(vertical, horizontal) {
    return this.squares[vertical][horizontal];
  },
  whoseTurn: function() {
    if (this.moves %2 === 0) {
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
  showCurrentPlayer: function() {
    var classToAdd = GameLogic.whoseTurn();
    $('.board>div>div').removeClass('X').removeClass('O');
    $('.board>div>div').addClass(classToAdd);
  },
  getMove: function(event) {
    var moveRow = event.target.dataset.row;
    var moveCol = event.target.dataset.col;
    GameLogic.placeMove(moveRow, moveCol);
  },
  displayBoard: function() {
    for (var i = 0; i < GameLogic.squares.length ; i++) {
      for (var j = 0; j< GameLogic.squares[0].length; j++) {
      var move = GameLogic.squares[i][j];
      $('div[data-row="' +[i]+'"][data-col="' +[j]+'"]').text(move);
      if (move !== '') {
        $('div[data-row="' +[i]+'"][data-col="' +[j]+'"]').addClass('placed');
      } else {
        $('div[data-row="' +[i]+'"][data-col="' +[j]+'"]').removeClass('placed')
      }
      }
    }
  }
};
$(document).ready(  function()  {
  $('.board').on('click', GameUI.getMove);
});
