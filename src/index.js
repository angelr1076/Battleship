import '../src/styles/style.css';
import { gameLoop } from './components/gameLoop';
import { reset } from './components/helpers';

const main = async () => {
  await gameLoop();
  await reset();
};

document.addEventListener('DOMContentLoaded', main);
