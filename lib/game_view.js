import Game from './game.js'

class GameView {
  constructor(ctx, game) {
    this.game = game;
    this.ctx = ctx;
    this.gameStatus = "unPaused"
    this.requestId = undefined;

    addEventListener("keydown", (e) => this.keyDownHandler(e));
    this.animate = this.animate.bind(this);
    this.stope = this.stop.bind(this);
  }


  keyDownHandler(e) {
    if (e.keyCode === 80) {
      if (this.gameStatus != "paused") {
        this.gameStatus = "paused";
      } else if (this.gameStatus === "paused") {
        this.gameStatus = "unPaused";
      }
    } else if (e.keyCode === 13) {
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

  //I want to incorporate this for game over! But IDK how!
  stop() {

   cancelAnimationFrame(this.requestId);
   this.requestId = undefined;

  }

  allowRestart() {

  }

  animate() {
    //WHERE IS THIS "TIME" COMING FROM???
    // const timeDelta = time - this.lastTime;

    // this.game.step(timeDelta);
    if (this.gameStatus === "unPaused" && this.game.gameOver === false) {
      this.game.draw(this.ctx);
    }

    if (this.game.gameOver === true) {
      this.allowRestart();
    }

    this.requestId = requestAnimationFrame(this.animate);
    // this.lastTime = time;
  }

}


export default GameView;
