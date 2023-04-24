import { createShip } from '../components/ship';

describe('createShip', () => {
  it('creates a ship object with the given length and name', () => {
    const ship = createShip(4, 'Battleship');
    expect(ship.length).toBe(4);
    expect(ship.name).toBe('Battleship');
  });

  it('creates a ship object with hits equal to 0 initially', () => {
    const ship = createShip(4, 'Battleship');
    expect(ship.hits).toBe(0);
  });

  it('increments hits when hit method is called', () => {
    const ship = createShip(3, 'Cruiser');
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
  });

  it('returns true when the ship is sunk', () => {
    const ship = createShip(2, 'Destroyer');
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  it('returns false when the ship is not sunk', () => {
    const ship = createShip(2, 'Destroyer');
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
