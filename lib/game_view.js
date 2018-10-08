import Game from './game.js'

class GameView {
  constructor(ctx, game) {
    this.game = game;
    this.ctx = ctx;
    this.gameStatus = "unPaused"
    this.fps = 0;
    this.seconds = 0;

    addEventListener("keydown", (e) => this.keyDownHandler(e));
    this.animate = this.animate.bind(this);
    // this.stop = this.stop.bind(this);
  }

  animate() {
    //NOTE Uncomment this to see how many seconds have passed
    this.fps ++;

    if (this.fps === 60) {
      this.fps = 0;
      this.seconds++;
      console.log(this.seconds);
    }
    //

    // TODO: Ask WHERE IS THIS "TIME" COMING FROM
    // const timeDelta = time - this.lastTime;
    // this.game.step(timeDelta);

    if (this.gameStatus === "unPaused" && this.game.gameOver === false) {
      this.game.update(this.ctx);
    }

    if (this.game.gameOver === true) {
      this.allowRestart();
    }

    requestAnimationFrame(this.animate);
    // this.lastTime = time;
  }

  allowRestart() {
    // TODO: write code for here
  }

  keyDownHandler(e) {
    if (e.keyCode === 32) { //the spacebar
      if (this.gameStatus != "paused" && this.game.gameOver != true) {
        this.gameStatus = "paused";
      } else if (this.gameStatus === "paused") {
        this.gameStatus = "unPaused";
      }
    } else if (e.keyCode === 13) { //enter
      if (this.game.gameOver === true) {
        this.game = new Game();
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
