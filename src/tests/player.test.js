import { createPlayer } from '../components/player';

describe('Player factory function tests', () => {
  it('should have a name of "Player 1"', () => {
    const player1 = createPlayer('Player 1');
    expect(player1.name).toBe('Player 1');
  });

  it('should have a name of "Computer"', () => {
    const computer = createPlayer('Computer', true);
    expect(computer.name).toBe('Computer');
  });

  it('should return true for isComputer', () => {
    const computer = createPlayer('Computer', true);
    expect(computer.isComputer).toBe(true);
  });

  it('should return false for isComputer', () => {
    const player1 = createPlayer('Player 1');
    expect(player1.isComputer).toBe(false);
  });

  it('should return false for previousAttacks.has("1,1")', () => {
    const player1 = createPlayer('Player 1');
    expect(player1.previousAttacks.has('1,1')).toBe(false);
  });
});
