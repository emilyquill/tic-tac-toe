var GameLogic = {
    squares: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    moves: 0,
    playerWins: {
        'X': 0,
        'O': 0
    },
    playerMoves: {
        'X': [],
        'O': []
    },

    placeMove: function(moveRow, moveCol) {
        var moveLocation = GameLogic.squares[moveRow][moveCol];
        GameLogic.playerMoves[GameLogic.whoseTurn()].push(moveRow+moveCol);
        if (moveLocation === '') { // space is free
            GameLogic.squares[moveRow][moveCol] = (GameLogic.whoseTurn());
            GameUI.displayBoard();
            if (GameLogic.checkWin(GameLogic.whoseTurn()) === true) {
                GameLogic.playerWins[GameLogic.whoseTurn()] += 1;
                GameLogic.winningMoves();
                GameUI.freezeBoard();
                setTimeout(GameLogic.finishGame, 2000);
            } else {
                GameLogic.moves += 1;
                GameUI.showCurrentPlayer();
                if (GameLogic.moves > 8) {
                    swal({
                        title: "Hmm..",
                        text: "Looks like nobody won that time... play again?",
                        imageUrl: "images/thinkingface.png",
                        confirmButtonText: "Ok, let's do it.."
                    });
                    GameLogic.resetBoard();
                }
            }
        } else { // space is not free
            swal({
                title: "Nope!",
                text: "That space is taken...",
                imageUrl: "images/facewithrollingeyes.png",
                confirmButtonText: "My bad"
            });
        }
    },
    checkWin: function(player) {
        return this.checkWinRow(player) || this.checkWinColumn(player) || this.checkWinDiagonal(player);
    },
    checkWinRow: function(player) {
        if (this.getCell(0, 0) === player && this.getCell(0, 1) === player && this.getCell(0, 2) === player ||
            this.getCell(1, 0) === player && this.getCell(1, 1) === player && this.getCell(1, 2) === player ||
            this.getCell(2, 0) === player && this.getCell(2, 1) === player && this.getCell(2, 2) === player) {
            return true;
        } else {
            return false;
        }
    },

    checkWinColumn: function(player) {
        if (this.getCell(0, 0) === player && this.getCell(1, 0) === player && this.getCell(2, 0) === player ||
            this.getCell(0, 1) === player && this.getCell(1, 1) === player && this.getCell(2, 1) === player ||
            this.getCell(0, 2) === player && this.getCell(1, 2) === player && this.getCell(2, 2) === player) {
            return true;
        } else {
            return false;
        }
    },
    checkWinDiagonal: function(player) {
        if (this.getCell(0, 0) === player && this.getCell(1, 1) === player && this.getCell(2, 2) === player ||
            this.getCell(0, 2) === player && this.getCell(1, 1) === player && this.getCell(2, 0) === player) {
            return true;
        } else {
            return false;
        }
    },
    getCell: function(vertical, horizontal) {
        return this.squares[vertical][horizontal];
    },
    whoseTurn: function() {
        if (this.moves % 2 === 0) {
            return 'X';
        } else {
            return 'O';
        }
    },
    resetBoard: function() {
        this.moves = 0;
        this.squares = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        this.playerMoves = {
            'X': [],
            'O': []
        };
        GameUI.displayBoard();

    },
    winningMoves: function() {
        var winner = this.whoseTurn();
        var array = this.playerMoves[winner];
        if (array.includes('00') && array.includes('01') && array.includes('02')) {
          GameUI.highlightCells('00', '01', '02');
        }
        if (array.includes('10') && array.includes('11') && array.includes('12')) {
          GameUI.highlightCells('10', '11', '12');
        }
        if (array.includes('20') && array.includes('21') && array.includes('22')) {
          GameUI.highlightCells('20', '21', '22');
        }
        if (array.includes('00') && array.includes('10') && array.includes('20')) {
          GameUI.highlightCells('00', '10', '20');
        }
        if (array.includes('01') && array.includes('11') && array.includes('21')) {
          GameUI.highlightCells('01', '11', '21');
        }
        if (array.includes('02') && array.includes('12') && array.includes('22')) {
          GameUI.highlightCells('02', '12', '22');
        }
        if (array.includes('00') && array.includes('11') && array.includes('22')) {
          GameUI.highlightCells('00', '11', '22');
        }
        if (array.includes('02') && array.includes('11') && array.includes('20')) {
          GameUI.highlightCells('02', '11', '20');
        }
      },
      finishGame: function() {
        swal("And the " + GameLogic.whoseTurn() + "'s have it!", "Rematch?", "success");
        GameUI.displayScore();
        GameLogic.winningMoves();
        GameLogic.resetBoard();
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

        if ( $('.board>div>div').hasClass('freeze') ) {
          // bail out, don't place move
        } else {
        GameLogic.placeMove(moveRow, moveCol);
        }

    },
    displayBoard: function() {
      swal.setDefaults({ confirmButtonColor: '#27A588' });
      $('.board>div>div').removeClass('animated infinite tada highlight freeze');
        for (var i = 0; i < GameLogic.squares.length; i++) {
            for (var j = 0; j < GameLogic.squares[0].length; j++) {
                var move = GameLogic.squares[i][j];
                $('div[data-row="' + [i] + '"][data-col="' + [j] + '"]').text(move);
                if (move !== '') {
                    $('div[data-row="' + [i] + '"][data-col="' + [j] + '"]').addClass('placed');
                } else {
                    $('div[data-row="' + [i] + '"][data-col="' + [j] + '"]').removeClass('placed');
                }
            }
        }
        GameUI.showCurrentPlayer();
    },
    displayScore: function() {
        $('.XScore').text("( " + GameLogic.playerWins.X + " )");
        $('.OScore').text("( " + GameLogic.playerWins.O + " )");
    },
    freezeBoard: function() {
      $('.board>div>div').addClass('freeze');
    },
    highlightCells: function(cell1, cell2, cell3) {
      var cell1Row = cell1.slice(0,1);
      var cell1Col = cell1.slice(1,2);
      var cell2Row = cell2.slice(0,1);
      var cell2Col = cell2.slice(1,2);
      var cell3Row = cell3.slice(0,1);
      var cell3Col = cell3.slice(1,2);
      $('div[data-row="' + cell1Row + '"][data-col="' + cell1Col + '"]').addClass('animated infinite tada highlight');
      $('div[data-row="' + cell2Row + '"][data-col="' + cell2Col + '"]').addClass('animated infinite tada highlight');
      $('div[data-row="' + cell3Row + '"][data-col="' + cell3Col + '"]').addClass('animated infinite tada highlight');
    }
};
$(document).ready(function() {
    GameLogic.resetBoard();
    $('.board>div>div').on('click', GameUI.getMove);
});
