import { createGameboard } from '../components/gameBoard';

describe('Gameboard factory function tests', () => {
  it('each array should have a length of 10', () => {
    const gameboard = createGameboard();
    expect(gameboard.board.length).toBe(10);
  });

  it('should have a full length of 100', () => {
    const gameboard = createGameboard();
    const flatBoard = gameboard.board.flat();
    expect(flatBoard.length).toBe(100);
  });

  it('should create a ship and place it on the board', () => {
    const gameboard = createGameboard();
    gameboard.placeShip(3, 8, 2, 'horizontal');
    gameboard.placeShip(4, 5, 6, 'vertical');
    const ship = gameboard.board[8][2];
    const ship2 = gameboard.board[5][6];
    expect(ship.length).toBe(3);
    expect(ship2.length).toBe(4);
  });

  it('should throw an error if ship is placed off the board', () => {
    const gameboard = createGameboard();
    expect(() => {
      gameboard.placeShip(3, 8, 8, 'horizontal');
    }).toThrow('Ship cannot go off the board');
  });

  it('should throw an error if ship is placed on top of another ship', () => {
    const gameboard = createGameboard();
    gameboard.placeShip(3, 8, 2, 'horizontal');
    expect(() => {
      gameboard.placeShip(3, 8, 2, 'horizontal');
    }).toThrow('Ship already exists at this location');
  });

  it('should throw an error if ship is placed with an invalid orientation', () => {
    const gameboard = createGameboard();
    expect(() => {
      gameboard.placeShip(3, 8, 2, 'diagonal');
    }).toThrow("Invalid orientation. Must be 'horizontal' or 'vertical'.");
  });

  it('should be able to report whether or not all of their ships have been sunk', () => {
    const gameboard = createGameboard();
    gameboard.placeShip(3, 8, 2, 'horizontal');
    gameboard.placeShip(4, 5, 6, 'vertical');
    gameboard.receiveAttack(8, 2);
    gameboard.receiveAttack(8, 3);
    gameboard.receiveAttack(8, 4);
    gameboard.receiveAttack(5, 6);
    gameboard.receiveAttack(6, 6);
    gameboard.receiveAttack(7, 6);
    gameboard.receiveAttack(8, 6);
    expect(gameboard.allShipsSunk()).toBe(true);
  });

  it('should keep track of missed attacks', () => {
    const gameboard = createGameboard();
    gameboard.placeShip(3, 8, 2, 'horizontal');
    gameboard.receiveAttack(2, 3);
    gameboard.receiveAttack(5, 1);
    expect(gameboard.missedAttacks).toEqual([
      { x: 2, y: 3 },
      { x: 5, y: 1 },
    ]);
  });
});
