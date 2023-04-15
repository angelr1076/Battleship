import { player } from '../components/player';

describe('Player factory function tests', () => {
  it('should have a name of "Player 1"', () => {
    const player1 = player('Player 1');
    expect(player1.name).toBe('Player 1');
  });
});
