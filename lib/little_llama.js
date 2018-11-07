import Moon from './background/moon.js';

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
    const demo = new Game("", "background-demo");
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
      document.getElementById("paused-game-message").style.display = "block";
      document.getElementById("pause-button").innerHTML = "UNPAUSE";
      document.getElementById("press-p-command-text").innerHTML = "Press 'P' to unpause";
      if (gameView.game.background.luminary instanceof Moon) {
        document.getElementById("paused-game-message").style.color = "white";
      }
    } else {
      gameView.gameStatus = "unPaused";
      document.getElementById("paused-game-message").style.display = "";
      document.getElementById("pause-button").innerHTML = "PAUSE";
      document.getElementById("press-p-command-text").innerHTML = "Press 'P' to pause";
      document.getElementById("paused-game-message").style.color = "";
    }
  });

  // NOTE: restart button

  document.getElementById("restart-button").addEventListener("click", () => {

    if (gameView.game.status === "background-demo") {
      return;
    }

    gameView.gameStatus = "inactive";
    ctx.clearRect(0,0, 750, 450);
    document.getElementsByClassName("canvas-cover")[0].style.display = "";
    document.getElementsByClassName("mode-descriptions")[0].style.display = "";
    document.getElementById("game-over-display").style.display = "";
    document.getElementById("score-save-section").style.display = "";
    document.getElementById("name-to-save").value = "";

    gameView = new GameView(ctx, new Game("", "background-demo"), soundMuted);
    gameView.animate();
  });
  //

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

  // NOTE: how to modal handling

  let modal = document.getElementById("how-to-modal")
  let slide1 = document.getElementById("slide1");
  let slide2 = document.getElementById("slide2");
  let slide3 = document.getElementById("slide3");
  let slide4 = document.getElementById("slide4");

  let pausedBeforeClicked = false;

    document.getElementById("landing-how-play-button").addEventListener("click", () => {
      modal.style.display = "flex";
      slide1.style.display = "flex";
    });

    document.getElementById("how-to-play-button2").addEventListener("click", () => {
      modal.style.display = "flex";
      slide1.style.display = "flex";

      if (gameView.game.status === "normal-play") {

        if (gameView.gameStatus === "paused" ) {
          pausedBeforeClicked = true;
        }

        gameView.gameStatus = "paused";
      }
    });

    //slide 1 next button
    document.getElementById("slide1-next-button").addEventListener("click", () => {
      slide1.classList.remove("slide-back-from-left");
      slide2.classList.remove("slide-back-from-center");
      slide1.classList.add("slide-out");
      slide2.style.display = "flex";
    });

    //slide 2 next button
    document.getElementById("slide2-next-button").addEventListener("click", () => {
      slide2.classList.remove("slide-back-from-left");
      slide3.classList.remove("slide-back-from-center");
      slide2.classList.add("slide-out");
      slide3.style.display = "flex";
    });

    // slide 2 previous button
    document.getElementById("slide2-previous-button").addEventListener("click", () => {
      slide2.classList.remove("slide-out");
      slide2.classList.remove("slide-back-from-left");
      slide2.classList.add("slide-back-from-center");
      slide1.classList.remove("slide-out");
      slide1.classList.add("slide-back-from-left");

    });

    //slide 3 next button
    document.getElementById("slide3-next-button").addEventListener("click", () => {
      slide3.classList.remove("slide-back-from-left");
      slide4.classList.remove("slide-back-from-center");
      slide3.classList.add("slide-out");
      slide4.style.display = "flex";
    });

    // slide 3 previous button
    document.getElementById("slide3-previous-button").addEventListener("click", () => {
      slide3.classList.remove("slide-out");
      slide3.classList.add("slide-back-from-center");
      slide3.classList.remove("slide-back-from-left");
      slide2.classList.remove("slide-out");
      slide2.classList.add("slide-back-from-left");

    });

    //slide 4 finish button
    document.getElementById("slide4-finish-button").addEventListener("click", () => {
      modal.style.display = "";

      [slide1, slide2, slide3, slide4].forEach((slide) => {
        slide.style.display = "";
        slide.classList.remove("slide-out");
        slide.classList.remove("slide-back-from-left");
        slide.classList.remove("slide-back-from-center");
      });


      if (gameView.game.status === "normal-play") {
        if (!pausedBeforeClicked) {
          gameView.gameStatus = "unPaused";
        }
        pausedBeforeClicked = false;
      }

    });

    // slide 4 previous button
    document.getElementById("slide4-previous-button").addEventListener("click", () => {
      slide4.classList.remove("slide-out");
      slide4.classList.add("slide-back-from-center");
      slide4.classList.remove("slide-back-from-left");
      slide3.classList.remove("slide-out");
      slide3.classList.add("slide-back-from-left");

    });

//pause game if high scores window is open

  document.getElementById("high-scores-button").addEventListener("click", () => {
    if (gameView.game.status === "normal-play") {
      if (gameView.gameStatus === "paused" ) {
        pausedBeforeClicked = true;
      }
      gameView.gameStatus = "paused";
    }
  });

  document.getElementById("high-scores-close-button").addEventListener("click", () => {
    if (gameView.game.status === "normal-play") {
      if (!pausedBeforeClicked) {
        gameView.gameStatus = "unPaused";
      }
      pausedBeforeClicked = false;
    }
  });
