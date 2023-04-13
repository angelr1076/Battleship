import { shipFactory } from '../components/ship';

describe('Ship factory function tests', () => {
  it('should have a length of 3', () => {
    const ship = shipFactory(3);
    expect(ship.length).toBe(3);
  });

  it('should have a hit count of 0', () => {
    const ship = shipFactory(3);
    expect(ship.hits).toBe(0);
  });

  it('should have a hit count of 1', () => {
    const ship = shipFactory(3);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it('should have a sink status of false', () => {
    const ship = shipFactory(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it('should have a sink status of true', () => {
    const ship = shipFactory(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
