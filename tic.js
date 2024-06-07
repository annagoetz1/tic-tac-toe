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