function Gameboard () {
    const board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
};

function printBoard () {
  console.clear();
  console.log('  0 1 2');
  board.forEach((row, index) => {
    console.log(`${index} ${row.join('|')}`);
    if (index < 2) console.log('  -----');
  });
};

function makeMove  (row, col, player)  {
  if (board[row][col] === ' ') {
    board[row][col] = player;
    return true;
  }
  return false;
};


function checkWin (player) {
  const winPatterns = [
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];

  return winPatterns.some(pattern => pattern.every(cell => cell === player));
};

function checkDraw () {
  return board.flat().every(cell => cell !== ' ');
};

return {
  printBoard,
  makeMove,
  checkWin,
  checkDraw
};
})();

function Player  (name, marker) {
  return { name, marker };
};

// Game module
function Game (()  {
  const playerX = Player('Player X', 'X');
  const playerO = Player('Player O', 'O');
  let currentPlayer = playerX;

  const playGame = () => {
    let gameWon = false;
    let gameDraw = false;

    while (!gameWon && !gameDraw) {
      Gameboard.printBoard();
      console.log(`${currentPlayer.name}, it's your turn.`);

      const row = parseInt(prompt('Enter row (0, 1, 2): '), 10);
      const col = parseInt(prompt('Enter column (0, 1, 2): '), 10);

      if (Gameboard.makeMove(row, col, currentPlayer.marker)) {
        gameWon = Gameboard.checkWin(currentPlayer.marker);
        if (gameWon) {
          Gameboard.printBoard();
          console.log(`${currentPlayer.name} wins!`);
        } else {
          gameDraw = Gameboard.checkDraw();
          if (gameDraw) {
            Gameboard.printBoard();
            console.log('The game is a draw.');
          } else {
            currentPlayer = currentPlayer === playerX ? playerO : playerX;
          }
        }
      } else {
        console.log('Invalid move, try again.');
      }
    }
  };

  return { playGame };
})();

// Start the game
Game.playGame();


