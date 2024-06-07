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
