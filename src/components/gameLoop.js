// gameLoop.js
import { shipsObj, createPlayer } from './player';
import { renderGameboards, setupClickHandlers } from './domInteraction';

const placeRandomShips = (player, shipObj) => {
  const orientations = ['horizontal', 'vertical'];
  const { lengths } = shipObj;

  for (let i = 0; i < lengths.length; i++) {
    const shipLength = shipsObj.lengths[i];
    const shipName = shipsObj.names[i];
    let placed = false;

    while (!placed) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);
      const orientation =
        orientations[Math.floor(Math.random() * orientations.length)];

      try {
        player.gameboard.placeShip(shipLength, shipName, x, y, orientation);
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

  placeRandomShips(player2, shipsObj);
  console.log({ player2 });

  // Render gameboards
  renderGameboards(player1, player2);

  // Set up click handlers
  setupClickHandlers(player1, player2, '#player1-board .grid');
};

export { gameLoop };
