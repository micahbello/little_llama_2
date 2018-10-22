const QUICK_TIPS = [
  "Colliding with a pig will result in that pig leaving the game screen...after eliminating one of your hearts",
  "Colliding with a red pig also results in temporarily inverted controls",
  "When Super Speed is activated, the world around Little Llama slows down",
  "Press 'DELETE' to get rid of a toggled weapon and make room for another one",
  "Available weapons bouncing around won't stay on the game screen forever",
  "Avoid the odd colored pigs and eventually they go away",
  "Colliding with a white pig also results in momentarily becoming invisible",
  "If you kill a pig with a weapon, it turns into bacon",
  "If you kill and odd colored pig a heart is also produced",
  "5 collected bacons result in one extra heart",
  "The Bubble Shield weapon behaves differently depending on the mode of play",
  "In Flight Mode, it is possible to kill a pig using Bubble Shield...",
  "Colliding with a black pig also results in a momentarily flipped game screen",
];

import GameView from './game_view.js';
import Game from './game.js';

let soundMuted = true;

  document.getElementById("landing-play-button").addEventListener("click", ()=> {
    document.getElementById("landing").style.display = "none";
    document.getElementById("current-stats").style.display = "flex";
    document.getElementById("instruction-buttons").style.display = "block";
    document.getElementById("left-side-panel").style.display = "flex";

  });

  let gameView = undefined;
  let ctx = undefined;

  document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById('canvas');
    ctx = canvasEl.getContext("2d");
    canvasEl.width = Game.DIM_X;
    canvasEl.height = Game.DIM_Y;
    const demo = new Game("normal", "background-demo");
    gameView = new GameView(ctx, demo, soundMuted);
    gameView.animate();


  });

  let i = 0;

  setInterval(()=> {
    document.getElementById("tips").innerHTML = QUICK_TIPS[i];
    if (i >= QUICK_TIPS.length - 1) {
      i = 0
    } else {
      i++
    }
  }, 5000);

// NOTE: normal mode start
  document.getElementById("normal-button").addEventListener("click", () => {
    gameView.gameStatus = "inactive";
    ctx.clearRect(0,0, 750, 450);
    document.getElementsByClassName("canvas-cover")[0].style.display = "none";
    document.getElementsByClassName("mode-descriptions")[0].style.display = "none";

    gameView = new GameView(ctx, new Game("normal", "normal-play"), soundMuted);
    gameView.animate();
  });

// NOTE: flight mode start
  document.getElementById("flight-button").addEventListener("click", () => {
    gameView.gameStatus = "inactive";
    ctx.clearRect(0,0, 750, 450);
    document.getElementsByClassName("canvas-cover")[0].style.display = "none";
    document.getElementsByClassName("mode-descriptions")[0].style.display = "none";

    gameView = new GameView(ctx, new Game("flightMode", "normal-play"), soundMuted);
    gameView.animate();
  });

// NOTE: Pause button
  document.getElementById("pause-button").addEventListener("click", () => {
    if (gameView.game.status === "background-demo") {
      return;
    }

    if (gameView.gameStatus != "paused") {
      gameView.gameStatus = "paused";
    } else {
      gameView.gameStatus = "unPaused";
    }
  });

  // NOTE: restart button

  document.getElementById("restart-button").addEventListener("click", () => {
    gameView.gameStatus = "inactive";
    ctx.clearRect(0,0, 750, 450);
    document.getElementsByClassName("canvas-cover")[0].style.display = "";
    document.getElementsByClassName("mode-descriptions")[0].style.display = "";

    gameView = new GameView(ctx, new Game("normal", "background-demo"), soundMuted);
    gameView.animate();
  });

  // NOTE: Sound buttons

  document.getElementById("sound-button-off").addEventListener("click", () => {
    document.getElementById("sound-button-off").style.display = "none";
    document.getElementById("sound-button-on").style.display = "flex";
    soundMuted = false;
    gameView.soundMuted = false;
  });

  document.getElementById("sound-button-on").addEventListener("click", () => {
    document.getElementById("sound-button-on").style.display = "none";
    document.getElementById("sound-button-off").style.display = "flex";
    soundMuted = true;
    gameView.soundMuted = true;
  });

// NOTE: description animations
  document.getElementById("normal-button").addEventListener("mouseover", () => {
    document.getElementsByClassName("regular-llama-figure")[0].classList.add("class", "jumping");
    document.getElementsByClassName("normal-mode-description")[0].style.display = "block";
    document.getElementsByClassName("normal-mode-description")[0].classList.add("description-display");
    document.getElementsByClassName("choose-mode-text")[0].style.display = "none";
  });

  document.getElementById("normal-button").addEventListener("mouseout", () => {
    document.getElementsByClassName("regular-llama-figure")[0].classList.remove("jumping");
    document.getElementsByClassName("normal-mode-description")[0].style.display = "";
    document.getElementsByClassName("choose-mode-text")[0].style.display = "";

  });

  document.getElementById("flight-button").addEventListener("mouseover", () => {
    document.getElementsByClassName("dressed-llama-figure")[0].classList.add("class", "flying");
    document.getElementsByClassName("flight-mode-description")[0].style.display = "block";
    document.getElementsByClassName("flight-mode-description")[0].classList.add("description-display");
    document.getElementsByClassName("choose-mode-text")[0].style.display = "none";
  });

  document.getElementById("flight-button").addEventListener("mouseout", () => {
    document.getElementsByClassName("dressed-llama-figure")[0].classList.remove("flying");
    document.getElementsByClassName("flight-mode-description")[0].style.display = "";
    document.getElementsByClassName("choose-mode-text")[0].style.display = "";
  });
