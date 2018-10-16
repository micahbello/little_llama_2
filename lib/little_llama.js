import GameView from './game_view.js';
import Game from './game.js';


if (document.location.pathname.split("/").includes("mode-selection.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById('canvas');
    const ctx = canvasEl.getContext("2d");
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    const demo = new Game("normal", "background-demo");
    new GameView(ctx, demo).animate();
  });
}

if (document.location.pathname.split("/").includes("normal-mode-game.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById('canvas');
    const ctx = canvasEl.getContext("2d");
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    const game = new Game("normal");
    new GameView(ctx, game).animate();
  });
}

if (document.location.pathname.split("/").includes("flight-mode-game.html")) {
  document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById('canvas');
    const ctx = canvasEl.getContext("2d");
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    const game = new Game("flightMode");
    new GameView(ctx, game).animate();
  });
}

document.getElementById("normal-link").addEventListener("mouseover", () => {
  document.getElementsByClassName("regular-llama-figure")[0].classList.add("class", "jumping");
});

document.getElementById("normal-link").addEventListener("mouseout", () => {
  console.log("hello")
  document.getElementsByClassName("regular-llama-figure")[0].classList.remove("jumping");
});

document.getElementById("flight-link").addEventListener("mouseover", () => {
  document.getElementsByClassName("dressed-llama-figure")[0].classList.add("class", "flying");
});

document.getElementById("flight-link").addEventListener("mouseout", () => {
  console.log("hello")
  document.getElementsByClassName("dressed-llama-figure")[0].classList.remove("flying");
});
