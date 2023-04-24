import { createGameboard } from './gameBoard';
import { showMsgTimed } from './helpers';

const shipsObj = {
  names: [
    'Carrier',
    'Battleship',
    'Cruiser',
    'Submarine',
    'Destroyer',
    'Patrol Boat',
  ],
  lengths: [5, 4, 3, 3, 2, 1],
};

const createPlayer = (name, isComputer = false) => {
  const gameboard = createGameboard();
  const previousAttacks = new Set();
  const { lengths } = shipsObj;

  const getRandomCoordinate = () => {
    return Math.floor(Math.random() * 10);
  };

  const aiAttack = enemyGameboard => {
    let x, y;
    do {
      x = getRandomCoordinate();
      y = getRandomCoordinate();
    } while (previousAttacks.has(`${x},${y}`));
    const attackResult = attack(enemyGameboard, x, y);
    const msg = document.querySelector('#message');
    if (attackResult) {
      const shipSunk = attackResult.ship.isSunk();
      showMsgTimed(`Your ${attackResult.name}'s been hit!`, msg, 1000);

      if (shipSunk) {
        showMsgTimed(`Your ${attackResult.name}'s been sunk!`, msg, 1000);
      }
    }
    return { x, y, attackResult };
  };

  const attack = (enemyGameboard, x, y) => {
    const attackKey = `${x},${y}`;
    if (previousAttacks.has(attackKey)) {
      return false;
    }

    previousAttacks.add(attackKey);
    return enemyGameboard.receiveAttack(x, y);
  };

  const allShipsPlaced = () => {
    return gameboard.ships.length === lengths.length;
  };

  const makeMove = isComputer ? aiAttack : attack;

  return {
    name,
    gameboard,
    attack: makeMove,
    isComputer,
    allShipsPlaced,
  };
};

export { shipsObj, createPlayer };
