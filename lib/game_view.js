import Game from './game.js';
import Moon from './background/moon.js';

class GameView {
  constructor(ctx, game, soundMutedBoolean) {
    this.game = game;
    this.ctx = ctx;
    this.gameStatus = "unPaused"
    this.fps = 0;
    this.seconds = 0;
    this.requestId = undefined;

    this.time = new Date();
    this.soundMuted = soundMutedBoolean;

    this.backgroundMusic = new Audio("./assets/audio/electro.m4a");
    this.backgroundMusic.volume = .4;

    this.llamaAgainAudio = new Audio("./assets/audio/llama_again.mp3");
    this.llamaAgainAudio.volume = 1.0;

    addEventListener("keydown", (e) => this.keyDownHandler(e));
    this.animate = this.animate.bind(this);
    // this.stop = this.stop.bind(this);
    this.allowedForHighScoreInput = false;
  }

  animate() {
    // NOTE: the following if conditional was the only way to make the display dissapeaer
    //after clicking restart!
    if (document.getElementById("game-over-display").style.display === "flex" && this.game.gameOver === false) {
      document.getElementById("game-over-display").style.display = "";
    }

    if (this.game.status === "normal-play") {
      if (this.gameStatus === "unPaused") {
        if (this.soundMuted === false) {
          this.backgroundMusic.play();
        }else if (this.soundMuted === true) {
          this.backgroundMusic.pause();
        }

      } else {
        this.backgroundMusic.pause();
      }
    }

    //NOTE Uncomment this to see how many seconds have passed
      // this.fps ++;
      //
      // if (this.fps === 60) {
      //   this.fps = 0;
      //   this.seconds++;
      //   // console.log(this.seconds);
      //   let newTime = new Date();
      //   console.log(`${(newTime - this.time) /1000}......${this.seconds}`);
      //   this.time = newTime;
      // }
    //

    // TODO: Ask WHERE IS THIS "TIME" COMING FROM
    // const timeDelta = time - this.lastTime;
    // this.game.step(timeDelta);

    if (this.gameStatus === "unPaused" && this.game.gameOver === false) {
      this.game.update(this.ctx);
    }

    if (this.game.gameOver === true) {
      this.soundMuted = true;
      this.backgroundMusic.pause();
      this.allowRestart();
    }

    if (this.gameStatus === "inactive") {
        cancelAnimationFrame(this.requestId);
        return;
    }

    //TODO: This following radial gradient slows down the fps by 3x!
    //Why would this be? This was discovered when trying to test a
    //radial gradient for the forcefield
        // let time1 = new Date();
        //
        // if (this.seconds < 30) {
        //   let x = 100;
        //   let y = 75;
        //   // Radii of the white glow.
        //   let innerRadius = 40;
        //   let outerRadius = 80;
        //   // Radius of the entire circle.
        //   let radius = 70;
        //   var gradient = this.ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
        //   gradient.addColorStop(0, 'white');
        //   gradient.addColorStop(1, 'blue');
        //
        //   this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        //
        //   this.ctx.fillStyle = gradient;
        //   this.ctx.fill();
        // }
        // //
        // console.log((new Date() - time1)/1000);
    //

    this.requestId = requestAnimationFrame(this.animate);
    // this.lastTime = time;
  }

  allowRestart() {
    // TODO: write code for here
    document.getElementById("game-over-display").style.display = "flex";

    let finalScoreDisplayed = document.getElementById("final-coin-count");
    let modeDisplayed = document.getElementById("mode-played");
    finalScoreDisplayed.innerHTML = `${this.game.score}`;
    modeDisplayed.innerHTML = `${this.game.gameMode}`;

    this.checkIfPlayerCanSaveScore();
  }

  keyDownHandler(e) {
    if (e.keyCode === 80) { //the letter p
      if (this.game.status === "background-demo") {
        return;
      }

      if (this.gameStatus != "paused" && this.game.gameOver != true) {
        this.gameStatus = "paused";
        document.getElementById("paused-game-message").style.display = "block";
        document.getElementById("pause-button").innerHTML = "UNPAUSE";
        document.getElementById("press-p-command-text").innerHTML = "Press 'P' to unpause";
        if (this.game.background.luminary instanceof Moon) {
          document.getElementById("paused-game-message").style.color = "white";
        }
      } else if (this.gameStatus === "paused") {
        this.gameStatus = "unPaused";
        document.getElementById("paused-game-message").style.display = "";
        document.getElementById("pause-button").innerHTML = "PAUSE";
        document.getElementById("press-p-command-text").innerHTML = "Press 'P' to pause";
        document.getElementById("paused-game-message").style.color = "";
      }
    } else if (e.keyCode === 13) { //enter
      if (this.game.gameOver === true) {

        let newSoundBoolean = document.getElementById("sound-button-off").style.display === "none" ? false : true;
        let mode = this.game.gameMode

        this.game = new Game(mode, "normal-play", newSoundBoolean);

        if (document.getElementById("sound-button-off").style.display === "none") {
          this.soundMuted = false;
          this.llamaAgainAudio.play();
        }

        document.getElementById("game-over-display").style.display = "";
        document.getElementById("score-save-section").style.display = "";
        document.getElementById("name-to-save").value = "";
        this.allowedForHighScoreInput = false;
      }
    }
  }

  checkIfPlayerCanSaveScore() {

    let database = firebase.database();
    let ref = this.game.gameMode === "normal" ? database.ref("scores/normalMode") : database.ref("scores/flightMode");
    let numberOfEntries = undefined;
    let lowestScore = undefined;

    ref.on('value', (data) => {
      numberOfEntries = Object.values(data.val()).length;


      Object.values(data.val()).forEach(dataSet => {
        if (lowestScore === undefined) {
          lowestScore = [dataSet.name, dataSet.score];
        }

        if (dataSet.score < lowestScore[1]) {
          lowestScore = [dataSet.name, dataSet.score];
        }
      });
    });

    // NOTE: if current score is more than 1, and the high score entires are less than
    //10 or the score is higher than the lowest high score, allow to save, meaning the
    //html elements that allow it will be displayed
    if (this.game.score > 0) {
      if (numberOfEntries < 10 || (numberOfEntries >= 10 && this.game.score > lowestScore[1])) {
        if (!this.allowedForHighScoreInput)
        document.getElementById("score-save-section").style.display = "flex";
        this.allowedForHighScoreInput = true;
      }
    }
  }

  // start() {
  //   // this.bindKeyHandlers();
  //   this.lastTime = 0;
  //   // start the animation
  //   requestAnimationFrame(this.animate);
  // }

  // TODO: Incorporate this code for game over.
  // stop() {
  //
  //  cancelAnimationFrame(this.requestId);
  //  this.requestId = undefined;
  //
  // }
}

export default GameView;
