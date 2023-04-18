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

const setupClickHandlers = (player, enemy, playerGridSelector) => {
  const enemyGrid = document.querySelector('#player2-board .grid');
  const playerGrid = document.querySelector(playerGridSelector);

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
            const playerCell = playerGrid.querySelector(
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
};

export { renderGameboards, setupClickHandlers };
