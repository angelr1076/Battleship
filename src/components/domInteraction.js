let currentShipIndex = 0;
let currentOrientation = 'horizontal';
let gameStarted = false;
const shipLengths = [4, 3, 2];

const createGridElement = (player, x, y) => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.x = x;
  cell.dataset.y = y;

  return cell;
};

const renderBoard = (player, containerSelector) => {
  const container = document.querySelector(containerSelector);
  const grid = document.createElement('div');
  grid.classList.add('grid');

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = createGridElement(player, x, y);
      grid.appendChild(cell);
    }
  }

  container.appendChild(grid);
};

const renderGameboards = (player1, player2) => {
  renderBoard(player1, '#player1-board');
  renderBoard(player2, '#player2-board');
};

const getCurrentlyHoveredCell = grid => {
  return grid.querySelector('.cell:hover');
};

const setupClickHandlers = (player, enemy, playerGridSelector) => {
  const enemyGrid = document.querySelector('#player2-board .grid');
  const player1Grid = document.querySelector(playerGridSelector);

  enemyGrid.addEventListener('click', event => {
    if (event.target.classList.contains('cell')) {
      const x = event.target.dataset.x;
      const y = event.target.dataset.y;

      if (!event.target.classList.contains('attacked')) {
        const attackResult = player.attack(
          enemy.gameboard,
          parseInt(x),
          parseInt(y),
        );

        event.target.classList.add('attacked');

        if (attackResult) {
          event.target.classList.add('hit');
        }

        if (enemy.gameboard.allShipsSunk()) {
          alert('Game Over! All ships have been sunk!');
        } else {
          setTimeout(() => {
            const { x, y, attackResult } = enemy.attack(player.gameboard);
            const playerCell = player1Grid.querySelector(
              `[data-x="${x}"][data-y="${y}"]`,
            );
            playerCell.classList.add('attacked');
            if (attackResult) {
              playerCell.classList.add('hit');
            }
            if (player.gameboard.allShipsSunk()) {
              alert('Game Over! All ships have been sunk!');
            }
          }, 1000);
        }
      }
    }
  });

  player1Grid.addEventListener('click', event => {
    if (!gameStarted && event.target.classList.contains('cell')) {
      const x = parseInt(event.target.dataset.x);
      const y = parseInt(event.target.dataset.y);
      try {
        player.gameboard.placeShip(
          shipLengths[currentShipIndex],
          x,
          y,
          currentOrientation,
        );
        event.target.classList.add('ship');
        currentShipIndex++;

        if (currentShipIndex === shipLengths.length) {
          gameStarted = true;
          alert('All ships placed! Game started.');
        }
      } catch (error) {
        alert(error.message);
      }
    }
  });

  const addShipPreviewClass = (cell, add) => {
    if (add) {
      cell.classList.add('ship-preview');
    } else {
      cell.classList.remove('ship-preview');
    }
  };

  const previewShipPlacement = (grid, x, y, length, orientation) => {
    if (orientation === 'horizontal') {
      for (let i = 0; i < length; i++) {
        if (y + i < 10) {
          const cell = grid.querySelector(`[data-x="${x}"][data-y="${y + i}"]`);
          addShipPreviewClass(cell, true);
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (x + i < 10) {
          const cell = grid.querySelector(`[data-x="${x + i}"][data-y="${y}"]`);
          addShipPreviewClass(cell, true);
        }
      }
    }
  };

  const removeShipPlacementPreview = (grid, x, y, length, orientation) => {
    if (orientation === 'horizontal') {
      for (let i = 0; i < length; i++) {
        if (y + i < 10) {
          const cell = grid.querySelector(`[data-x="${x}"][data-y="${y + i}"]`);
          addShipPreviewClass(cell, false);
        }
      }
    } else {
      for (let i = 0; i < length; i++) {
        if (x + i < 10) {
          const cell = grid.querySelector(`[data-x="${x + i}"][data-y="${y}"]`);
          addShipPreviewClass(cell, false);
        }
      }
    }
  };

  const initPreviewHandlers = player1Grid => {
    player1Grid.addEventListener('mouseover', event => {
      if (!gameStarted && event.target.classList.contains('cell')) {
        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        previewShipPlacement(
          player1Grid,
          x,
          y,
          shipLengths[currentShipIndex],
          currentOrientation,
        );
      }
    });

    player1Grid.addEventListener('mouseout', event => {
      if (!gameStarted && event.target.classList.contains('cell')) {
        const x = parseInt(event.target.dataset.x);
        const y = parseInt(event.target.dataset.y);
        removeShipPlacementPreview(
          player1Grid,
          x,
          y,
          shipLengths[currentShipIndex],
          currentOrientation,
        );
      }
    });

    document.addEventListener('keydown', event => {
      if (
        !gameStarted &&
        (event.key === 'ArrowUp' || event.key === 'ArrowDown')
      ) {
        const hoveredCell = getCurrentlyHoveredCell(player1Grid);
        if (hoveredCell) {
          const x = parseInt(hoveredCell.dataset.x);
          const y = parseInt(hoveredCell.dataset.y);

          // Remove the previous ship placement preview
          removeShipPlacementPreview(
            player1Grid,
            x,
            y,
            shipLengths[currentShipIndex],
            currentOrientation,
          );
        }

        // Change the orientation
        currentOrientation =
          currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';

        if (hoveredCell) {
          const x = parseInt(hoveredCell.dataset.x);
          const y = parseInt(hoveredCell.dataset.y);

          // Add the new ship placement preview
          previewShipPlacement(
            player1Grid,
            x,
            y,
            shipLengths[currentShipIndex],
            currentOrientation,
          );
        }
      }
    });
  };

  initPreviewHandlers(player1Grid);
};

export { renderGameboards, setupClickHandlers };
