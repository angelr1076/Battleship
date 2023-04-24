import { createGameboard } from '../components/gameBoard';

describe('createGameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = createGameboard();
  });

  test('creates a gameboard with a 10x10 grid', () => {
    expect(gameboard.board.length).toBe(10);
    expect(gameboard.board[0].length).toBe(10);
  });

  test('placeShip places a ship on the gameboard', () => {
    gameboard.placeShip(3, 'Cruiser', 0, 0, 'horizontal');
    expect(gameboard.ships.length).toBe(1);
  });

  test('receiveAttack returns the name of the ship when a ship is hit', () => {
    gameboard.placeShip(3, 'Cruiser', 0, 0, 'horizontal');
    const result = gameboard.receiveAttack(0, 0);
    expect(result.name).toBe('Cruiser');
  });

  test('receiveAttack returns false when the attack misses', () => {
    gameboard.placeShip(3, 'Cruiser', 0, 0, 'horizontal');
    const result = gameboard.receiveAttack(9, 9);
    expect(result).toBe(false);
  });

  test('allShipsSunk returns true when all ships are sunk', () => {
    gameboard.placeShip(1, 'Patrol Boat', 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  test('allShipsSunk returns false when not all ships are sunk', () => {
    gameboard.placeShip(3, 'Cruiser', 0, 0, 'horizontal');
    gameboard.receiveAttack(0, 0);
    expect(gameboard.allShipsSunk()).toBe(false);
  });
});
