import '../src/styles/style.css';
import { gameLoop } from './components/gameLoop';
import { reset } from './components/helpers';

document.addEventListener('DOMContentLoaded', () => {
  gameLoop();
  reset();
});
