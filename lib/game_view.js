import Game from './game.js'

class GameView {
  constructor(ctx, game) {
    this.game = game;
    this.ctx = ctx;
    this.gameStatus = "unPaused"
    this.fps = 0;
    this.seconds = 0;
    this.requestId = undefined;

    this.time = new Date();

    addEventListener("keydown", (e) => this.keyDownHandler(e));
    this.animate = this.animate.bind(this);
    // this.stop = this.stop.bind(this);
  }

  animate() {
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
      this.allowRestart();
    }

    // if(this.gameStatus === "paused") {
    //   cancelAnimationFrame(this.requestId);
    //   return;
    // }

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
  }

  keyDownHandler(e) {
    if (e.keyCode === 80) { //the letter p
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
