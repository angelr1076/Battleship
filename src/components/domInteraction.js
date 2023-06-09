import { shipsObj } from './player';
import { showMsgTimed, showMsg, toggleModal } from './helpers';

let currentShipIndex = 0;
let currentOrientation = 'horizontal';
let gameStarted = false;
const changeOrientationBtn = document.getElementById('changeOriention');
const instructBtn = document.getElementById('start');
changeOrientationBtn.innerHTML = currentOrientation;

const createGridElement = (player, x, y) => {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.x = x;
  cell.dataset.y = y;

  return cell;
};

const updateBtnState = () => {
  const resetBtn = document.getElementById('reset');

  if (!gameStarted) {
    resetBtn.classList.add('disabled');
    resetBtn.disabled = true;
  } else {
    changeOrientationBtn.classList.add('disabled');
    resetBtn.classList.remove('disabled');
    changeOrientationBtn.disabled = true;
    resetBtn.disabled = false;
  }
};

const renderBoard = (player, containerSelector, secondaryContainer) => {
  const container = document.querySelector(containerSelector);
  const playerContainer = document.querySelector(secondaryContainer);
  const grid = document.createElement('div');
  grid.classList.add('grid');

  // Display the ships sunk count
  const shipsSunkCounter = document.createElement('div');
  shipsSunkCounter.classList.add('ships-sunk-counter');
  shipsSunkCounter.textContent = `Ships Sunk: 0`;
  playerContainer.appendChild(shipsSunkCounter);

  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      const cell = createGridElement(player, x, y);
      grid.appendChild(cell);
    }
  }

  container.appendChild(grid);

  updateBtnState();
};

const renderGameboards = (player1, player2) => {
  renderBoard(player1, '#player1-board', '.player1-board__container');
  renderBoard(player2, '#player2-board', '.player2-board__container');
};

const getCurrentlyHoveredCell = grid => {
  return grid.querySelector('.cell:hover');
};

const setupClickHandlers = (player, enemy, playerGridSelector) => {
  const enemyGrid = document.querySelector('#player2-board .grid');
  const player1Grid = document.querySelector(playerGridSelector);
  const msg = document.querySelector('#message');
  const { lengths, names } = shipsObj;

  enemyGrid.addEventListener('click', event => {
    if (!player.allShipsPlaced()) {
      showMsgTimed('Place your ships before starting the game!', msg, 1000);
      return;
    }

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
          const shipSunk = attackResult.ship.isSunk();
          event.target.classList.add('hit');
          showMsgTimed(`Enemy's ${attackResult.name} hit!`, msg, 1000);
          if (shipSunk) {
            showMsgTimed(`Enemy's ${attackResult.name} sunk!`, msg, 1000);
          }
        } else {
          event.target.classList.add('miss');
        }

        if (enemy.gameboard.allShipsSunk()) {
          toggleModal(
            `<h2>Game Over! All enemy ships have been destroyed!</h2>`,
          );
        } else {
          setTimeout(() => {
            const { x, y, attackResult } = enemy.attack(player.gameboard);
            const playerCell = player1Grid.querySelector(
              `[data-x="${x}"][data-y="${y}"]`,
            );
            playerCell.classList.add('attacked');
            if (attackResult) {
              playerCell.classList.add('hit');
            } else {
              playerCell.classList.add('miss');
            }

            if (player.gameboard.allShipsSunk()) {
              toggleModal(
                `<h2>Game Over! Your ships have been destroyed!</h2>`,
              );
            }

            document.querySelector(
              '#player1-board .ships-sunk-counter',
            ).textContent = `Ships Sunk: ${player.gameboard.shipsSunkCount()}`;
            document.querySelector(
              '#player2-board .ships-sunk-counter',
            ).textContent = `Ships Sunk: ${enemy.gameboard.shipsSunkCount()}`;
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
          lengths[currentShipIndex],
          shipsObj.names[currentShipIndex],
          x,
          y,
          currentOrientation,
        );

        // Log the name of the placed ship
        showMsg(`Placed ship: ${names[currentShipIndex]}`, msg);

        for (let i = 0; i < lengths[currentShipIndex]; i++) {
          let targetCell;
          if (currentOrientation === 'horizontal') {
            targetCell = player1Grid.querySelector(
              `[data-x="${x}"][data-y="${y + i}"]`,
            );
          } else {
            targetCell = player1Grid.querySelector(
              `[data-x="${x + i}"][data-y="${y}"]`,
            );
          }

          if (targetCell) {
            // Add the ship-placed class to highlight the entire ship
            targetCell.classList.add('ship-placed');
          }
        }

        currentShipIndex++;

        setTimeout(() => {
          if (
            currentShipIndex === lengths.length &&
            msg.textContent === 'Placed ship: Patrol Boat'
          ) {
            gameStarted = true;
            updateBtnState();
            msg.textContent = `All ships placed! Game started.`;
          }
        }, 3000);
      } catch (error) {
        toggleModal(`<h2>${error.message}</h2>`);
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
          lengths[currentShipIndex],
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
          lengths[currentShipIndex],
          currentOrientation,
        );
      }
    });

    document.addEventListener('keydown', event => {
      if (!gameStarted && event.key === ' ') {
        event.preventDefault();

        const hoveredCell = getCurrentlyHoveredCell(player1Grid);
        if (hoveredCell) {
          const x = parseInt(hoveredCell.dataset.x);
          const y = parseInt(hoveredCell.dataset.y);

          removeShipPlacementPreview(
            player1Grid,
            x,
            y,
            lengths[currentShipIndex],
            currentOrientation,
          );
        }

        currentOrientation =
          currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
        changeOrientationBtn.innerHTML = currentOrientation;

        if (hoveredCell) {
          const x = parseInt(hoveredCell.dataset.x);
          const y = parseInt(hoveredCell.dataset.y);

          previewShipPlacement(
            player1Grid,
            x,
            y,
            lengths[currentShipIndex],
            currentOrientation,
          );
        }
      }
    });

    changeOrientationBtn.addEventListener('click', () => {
      currentOrientation =
        currentOrientation === 'horizontal' ? 'vertical' : 'horizontal';
      changeOrientationBtn.innerHTML = currentOrientation;

      const hoveredCell = getCurrentlyHoveredCell(player1Grid);
      if (hoveredCell && !gameStarted) {
        const x = parseInt(hoveredCell.dataset.x);
        const y = parseInt(hoveredCell.dataset.y);

        removeShipPlacementPreview(
          player1Grid,
          x,
          y,
          lengths[currentShipIndex],
          currentOrientation === 'horizontal' ? 'vertical' : 'horizontal',
        );

        previewShipPlacement(
          player1Grid,
          x,
          y,
          lengths[currentShipIndex],
          currentOrientation,
        );
      }
    });

    instructBtn.addEventListener('click', () => {
      const instructions = `
        <h2>Instructions</h2>
          <ol type="1">
            <li>Set your ships by clicking on a Player 1 gameboard cell</li>
            <li>Press the spacebar or orientation button to change your ship orientation</li>
            <li>Once your ships are set, click on any of the computer's grid cells to attack its ship</li>
            <li>The first player to sink all enemy ships wins the game</li>
            <li>You can close any modal by clicking anywhere on the screen or by clicking the 'X' icon</li>
            <li><span style="color:#CD001A;">Good luck!</span></li>
          </ol>`;
      toggleModal(instructions);
    });
  };

  initPreviewHandlers(player1Grid);
};

const themeCheckbox = document.getElementById('theme-checkbox');
const body = document.body;
const header = document.querySelector('.header');

themeCheckbox.addEventListener('change', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
  header.classList.toggle('dark-theme');
  header.classList.toggle('light-theme');
});

export { shipsObj, showMsgTimed, renderGameboards, setupClickHandlers };
