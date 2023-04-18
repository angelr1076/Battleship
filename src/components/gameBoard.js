import { createShip } from './ship';

const createGameboard = () => {
  const board = Array(10)
    .fill(null)
    .map(() => Array(10).fill(null));
  const ships = [];
  const missedAttacks = [];

  const placeShip = (length, x, y, orientation) => {
    const ship = createShip(length);

    const canPlaceShip = (x, y, length, orientation) => {
      if (orientation === 'horizontal') {
        for (let i = 0; i < length; i++) {
          if (y + i >= 10 || board[x][y + i] !== null) {
            return false;
          }
        }
      } else {
        for (let i = 0; i < length; i++) {
          if (x + i >= 10 || board[x + i][y] !== null) {
            return false;
          }
        }
      }
      return true;
    };

    if (!canPlaceShip(x, y, length, orientation)) {
      throw new Error('Ship already exists at this location');
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

    ships.push(ship);
  };

  const receiveAttack = (x, y) => {
    if (board[x][y]) {
      board[x][y].hit();
      return true; // Ship exists at these coordinates
    } else {
      missedAttacks.push({ x, y });
      return false; // Ship doesn't exist at these coordinates
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

export { createGameboard };
