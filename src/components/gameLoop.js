// gameLoop.js
import { createPlayer } from './player';
import { renderGameboards, setupClickHandlers } from './domInteraction';

// A single ship five squares long (the aircraft carrier)
// A single ship four squares long (the battleship)
// Two ships three squares long (the cruiser and the submarine)
// A single ship two squares long (the destroyer)
// A single ship one square long (the patrol boat)

const gameLoop = () => {
  // Create players
  const player1 = createPlayer('Player 1');
  const player2 = createPlayer('Player 2', true);

  // Set up gameboards with predetermined coordinates to test
  // player1.gameboard.placeShip(4, 0, 0, 'horizontal');
  // player1.gameboard.placeShip(3, 2, 5, 'horizontal');
  // player1.gameboard.placeShip(2, 5, 8, 'vertical');

  player2.gameboard.placeShip(4, 1, 1, 'horizontal');
  player2.gameboard.placeShip(3, 3, 6, 'horizontal');
  player2.gameboard.placeShip(2, 6, 2, 'vertical');

  // Render gameboards
  renderGameboards(player1, player2);

  // Set up click handlers
  setupClickHandlers(player1, player2, '#player1-board .grid');
};

export { gameLoop };
