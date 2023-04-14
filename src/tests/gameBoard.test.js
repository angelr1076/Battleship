import { createGameBoard } from '../components/gameBoard';

describe('Gameboard factory function tests', () => {
  it('each array should have a length of 10', () => {
    const gameboard = createGameBoard();
    expect(gameboard.board.length).toBe(10);
  });

  it('should have a full length of 100', () => {
    const gameboard = createGameBoard();
    const flatBoard = gameboard.board.flat();
    expect(flatBoard.length).toBe(100);
  });

  it('should create a ship and place it on the board', () => {
    const gameboard = createGameBoard();
    gameboard.placeShip(3, 8, 2, 'horizontal');
    gameboard.placeShip(4, 5, 6, 'vertical');
    const ship = gameboard.board[8][2];
    const ship2 = gameboard.board[5][6];
    expect(ship.length).toBe(3);
    expect(ship2.length).toBe(4);
  });

  it('should throw an error if ship is placed off the board', () => {
    const gameboard = createGameBoard();
    expect(() => {
      gameboard.placeShip(3, 8, 8, 'horizontal');
    }).toThrow('Ship cannot go off the board');
  });

  it('should throw an error if ship is placed on top of another ship', () => {
    const gameboard = createGameBoard();
    gameboard.placeShip(3, 8, 2, 'horizontal');
    expect(() => {
      gameboard.placeShip(3, 8, 2, 'horizontal');
    }).toThrow('Ship already exists at this location');
  });

  it('should throw an error if ship is placed with an invalid orientation', () => {
    const gameboard = createGameBoard();
    expect(() => {
      gameboard.placeShip(3, 8, 2, 'diagonal');
    }).toThrow("Invalid orientation. Must be 'horizontal' or 'vertical'.");
  });
});
