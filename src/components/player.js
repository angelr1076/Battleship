import { createGameboard } from './gameBoard';

const createPlayer = (name, isComputer = false) => {
  const gameboard = createGameboard();
  const previousAttacks = new Set();

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

  const makeMove = isComputer ? aiAttack : attack;

  return {
    name,
    gameboard,
    attack: makeMove,
    isComputer,
  };
};

export { createPlayer };
