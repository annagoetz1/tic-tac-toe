const Gameboard = (() => {
  let board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  // Get the current state of the board
  const getBoard = () => board;

  // Reset the board
  const resetBoard = () => {
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
  };

  const makeMove = (row, col, player) => {
    if (board[row][col] === ' ') {
      board[row][col] = player;
      return true;
    }
    return false;
  };

  const checkWin = (player) => {
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

  const checkDraw = () => {
    return board.flat().every(cell => cell !== ' ');
  };

  return {
    getBoard,
    resetBoard,
    makeMove,
    checkWin,
    checkDraw
  };
})();

// Player factory
const Player = (name, marker) => {
  return { name, marker };
};

// Game module
const Game = (() => {
  let playerX = Player('Player X', 'X');
  let playerO = Player('Player O', 'O');
  let currentPlayer = playerX;

  const getCurrentPlayer = () => currentPlayer;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const playTurn = (row, col) => {
    if (Gameboard.makeMove(row, col, currentPlayer.marker)) {
      updateBoardDisplay();
      if (Gameboard.checkWin(currentPlayer.marker)) {
        setTimeout(() => {
          document.getElementById('resultDisplay').textContent = `${currentPlayer.name} wins!`;
          alert(`${currentPlayer.name} wins!`);
        }, 100);
      } else if (Gameboard.checkDraw()) {
        setTimeout(() => {
          document.getElementById('resultDisplay').textContent = 'The game is a draw.';
          alert('The game is a draw.');
        }, 100);
      } else {
        switchPlayer();
        alert(`${currentPlayer.name}, it's your turn.`);
      }
    } else {
      alert('Invalid move, try again.');
    }
  };

  const startGame = () => {
    const playerXName = prompt("Enter Player X's name:");
    const playerOName = prompt("Enter Player O's name:");

    playerX = Player(playerXName, 'X');
    playerO = Player(playerOName, 'O');
    currentPlayer = playerX;

    document.getElementById('firstPlayer').textContent = `Player X: ${playerX.name}`;
    document.getElementById('secondPlayer').textContent = `Player O: ${playerO.name}`;
    document.getElementById('resultDisplay').textContent = ''; // Clear the results display

    alert(`${currentPlayer.name}, it's your turn.`);
    gameDisplay();
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    document.getElementById('firstPlayer').textContent = 'Player X:';
    document.getElementById('secondPlayer').textContent = 'Player O:';
    document.getElementById('resultDisplay').textContent = ''; // Clear the results display
    gameDisplay();
  };

  return {
    getCurrentPlayer,
    playTurn,
    startGame,
    resetGame,
  };
})();

// Update the board display
const updateBoardDisplay = () => {
  const board = Gameboard.getBoard();
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    cell.textContent = board[row][col];
  });
};

const gameDisplay = () => {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = ''; // Clear existing cells
  const board = Gameboard.getBoard();

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = board[row][col];

      cell.addEventListener('click', () => {
        Game.playTurn(row, col);
      });

      gameBoard.appendChild(cell);
    }
  }
};

// Initialize the board display and start the game
document.addEventListener('DOMContentLoaded', () => {
  gameDisplay();
  Game.startGame();

  document.getElementById('resetGame').addEventListener('click', () => {
    Game.resetGame();
    Game.startGame();
  });
});




