

class GameView {
  constructor(ctx, game) {
    this.game = game;
    this.ctx = ctx;

    this.animate = this.animate.bind(this);
  }


  start() {
    // this.bindKeyHandlers();
    this.lastTime = 0;
    // start the animation
    requestAnimationFrame(this.animate);
  }

  animate() {
    //WHERE IS THIS "TIME" COMING FROM???
    // const timeDelta = time - this.lastTime;

    // this.game.step(timeDelta);
    this.game.draw(this.ctx);
    // this.lastTime = time;

    requestAnimationFrame(this.animate);
  }

}


export default GameView;
