const Gameboard = (() => {
  const board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];

  // Get the current state of the board
  const getBoard = () => board;

  const printBoard = () => {
    console.clear();
    console.log('  0 1 2');
    board.forEach((row, index) => {
      console.log(`${index} ${row.join('|')}`);
      if (index < 2) console.log('  -----');
    });
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
    printBoard,
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
  let playerX;
  let playerO;
  let currentPlayer;

  // Switch player function to return the next player
  const switchPlayer = () => {
    currentPlayer = currentPlayer === playerX ? playerO : playerX;
  };

  const playTurn = (row, col) => {
    // Fix marker access and player update logic
    if (Gameboard.makeMove(row, col, currentPlayer.marker)) {
      updateBoardDisplay();
      if (Gameboard.checkWin(currentPlayer.marker)) {
        setTimeout(() => alert(`${currentPlayer.name} wins!`), 100);
      } else if (Gameboard.checkDraw()) {
        setTimeout(() => alert('The game is a draw.'), 100);
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

    alert(`${currentPlayer.name}, it's your turn.`);
    gameDisplay();
  };

  return {
    startGame,
    playTurn
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

//append the gameboard
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

      // Ensure currentPlayer is updated correctly
      cell.addEventListener('click', () => {
        Game.playTurn(row, col);
      });

      gameBoard.appendChild(cell);
    }
  }
};

// Initialize the game with prompts for player names
document.addEventListener('DOMContentLoaded', () => {
  Game.startGame();
});