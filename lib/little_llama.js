import GameView from './game_view.js';
import Game from './game.js';


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('canvas');

  const ctx = canvasEl.getContext("2d");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const game = new Game();

  new GameView(ctx, game).start();
});
