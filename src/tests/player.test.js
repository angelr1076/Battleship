import { createPlayer, shipsObj } from '../components/player';

describe('createPlayer', () => {
  let player;

  beforeEach(() => {
    player = createPlayer('Player 1');
  });

  test('creates a player with a name', () => {
    expect(player.name).toBe('Player 1');
  });

  test('assigns a gameboard to the player', () => {
    expect(player.gameboard).toBeTruthy();
  });

  test('player.allShipsPlaced() returns false when not all ships are placed', () => {
    expect(player.allShipsPlaced()).toBe(false);
  });

  test('player.allShipsPlaced() returns true when all ships are placed', () => {
    const { names, lengths } = shipsObj;
    names.forEach((shipName, index) => {
      player.gameboard.placeShip(
        lengths[index],
        shipName,
        index,
        0,
        'horizontal',
      );
    });
    expect(player.allShipsPlaced()).toBe(true);
  });
});
