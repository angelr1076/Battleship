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

  const lastHit = { x: -1, y: -1, adjacents: [] };

  const getNextAdjacentCoordinate = () => {
    if (lastHit.adjacents.length > 0) {
      return lastHit.adjacents.pop();
    }
    return null;
  };

  const updateAdjacents = (x, y) => {
    const possibleAdjacents = [
      { x: x - 1, y },
      { x: x + 1, y },
      { x, y: y - 1 },
      { x, y: y + 1 },
    ];
    lastHit.adjacents = possibleAdjacents.filter(
      coord =>
        coord.x >= 0 &&
        coord.x < 10 &&
        coord.y >= 0 &&
        coord.y < 10 &&
        !previousAttacks.has(`${coord.x},${coord.y}`),
    );
  };

  const aiAttack = enemyGameboard => {
    let x, y;
    const nextCoord = getNextAdjacentCoordinate();
    if (nextCoord) {
      x = nextCoord.x;
      y = nextCoord.y;
    } else {
      do {
        x = getRandomCoordinate();
        y = getRandomCoordinate();
      } while (previousAttacks.has(`${x},${y}`));
    }
    const attackResult = attack(enemyGameboard, x, y);
    const msg = document.querySelector('#message');
    if (attackResult) {
      const shipSunk = attackResult.ship.isSunk();
      showMsgTimed(`Your ${attackResult.name}'s been hit!`, msg, 1000);

      if (shipSunk) {
        showMsgTimed(`Your ${attackResult.name}'s been sunk!`, msg, 1000);
        lastHit.x = -1;
        lastHit.y = -1;
        lastHit.adjacents = [];
      } else {
        lastHit.x = x;
        lastHit.y = y;
        updateAdjacents(x, y);
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
