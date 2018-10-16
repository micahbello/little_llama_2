import GameView from './game_view.js';
import Game from './game.js';

// document.addEventListener("DOMContentLoaded", () => {
//   const canvasEl = document.getElementById('canvas');
//
//   const ctx = canvasEl.getContext("2d");
//   canvasEl.width = Game.DIM_X;
//   canvasEl.height = Game.DIM_Y;
//   const game = new Game();
//
//   new GameView(ctx, game).animate();
// });

document.getElementById("normal-mode-start").addEventListener("click", () => {
  document.getElementsByClassName("canvas-cover")[0].style.display = "none";

  const canvasEl = document.getElementById('canvas');
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const game = new Game("normal");

  new GameView(ctx, game).animate();
});


document.getElementById("flight-mode-start").addEventListener("click", () => {
  document.getElementsByClassName("canvas-cover")[0].style.display = "none";

  const canvasEl = document.getElementById('canvas');
  const ctx = canvasEl.getContext("2d");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;
  const game = new Game("flightMode");

  new GameView(ctx, game).animate();
});
