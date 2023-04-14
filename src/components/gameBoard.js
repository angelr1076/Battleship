import { createShip } from './ship';

const createGameBoard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  const ships = [];
  const missedAttacks = [];

  const placeShip = (length, x, y, orientation) => {
    const ship = createShip(length);
    ships.push(ship);

    // Prevent ships from overlapping
    if (board[x][y] !== null) {
      throw new Error('Ship already exists at this location');
    } else if (
      (orientation === 'horizontal' && y + length > 10) ||
      (orientation === 'vertical' && x + length > 10)
    ) {
      // Prevent ships from going off the board
      throw new Error('Ship cannot go off the board');
    } else if (orientation === 'horizontal') {
      for (let i = 0; i < length; i++) {
        board[x][y + i] = ship;
      }
    } else if (orientation === 'vertical') {
      for (let i = 0; i < length; i++) {
        board[x + i][y] = ship;
      }
    } else {
      throw new Error(
        "Invalid orientation. Must be 'horizontal' or 'vertical'.",
      );
    }
  };

  const receiveAttack = (x, y) => {
    if (board[x][y]) {
      board[x][y].hit();
    } else {
      missedAttacks.push({ x, y });
    }
  };

  const allShipsSunk = () => {
    return ships.every(ship => ship.isSunk());
  };

  const printBoard = () => {
    const display = board.map(row => row.map(cell => (cell ? 's' : '.')));
    console.log(display.map(row => row.join(' ')).join('\n'));
  };

  return {
    board,
    ships,
    missedAttacks,
    placeShip,
    receiveAttack,
    allShipsSunk,
    printBoard,
  };
};

// const gameboard = createGameBoard();
// gameboard.placeShip(3, 8, 2, 'horizontal');
// gameboard.placeShip(4, 5, 6, 'vertical');
// gameboard.printBoard();

export { createGameBoard };
