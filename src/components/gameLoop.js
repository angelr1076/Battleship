// gameLoop.js
import { createPlayer } from './player';
import {
  shipLengths,
  renderGameboards,
  setupClickHandlers,
} from './domInteraction';

const placeRandomShips = (player, shipLengths) => {
  const orientations = ['horizontal', 'vertical'];

  for (const shipLength of shipLengths) {
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientation =
        orientations[Math.floor(Math.random() * orientations.length)];

      try {
        player.gameboard.placeShip(shipLength, x, y, orientation);
        placed = true;
      } catch (error) {
        // Ignore the error and try again with a different position and/or orientation
      }
    }
  }
};

const gameLoop = () => {
  // Create players
  const player1 = createPlayer('Player 1');
  const player2 = createPlayer('Player 2', true);

  placeRandomShips(player2, shipLengths);
  console.log({ player2, shipLengths });

  // Render gameboards
  renderGameboards(player1, player2);

  // Set up click handlers
  setupClickHandlers(player1, player2, '#player1-board .grid');
};

export { gameLoop };
