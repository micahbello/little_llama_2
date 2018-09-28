import Llama from './llama.js';

class Game {
  constructor() {
    this.llama = new Llama(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);

    addEventListener("keydown", (e) => this.llama.keyDownHandler(e));
    addEventListener("keyup", (e) => this.llama.keyUpHandler(e));
  }

  allObjects() {
    return [].concat(this.llama);
  }

  // moveObjects(delta) {
  //   this.allObjects().forEach((object) => {
  //     object.move(delta);
  //   });
  // }

  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y)

    //the bottom two lines create the floor
    ctx.fillStyle = "green";
    ctx.fillRect(0, Game.DIM_Y - Game.FLOOR_HEIGHT, 750, Game.FLOOR_HEIGHT);

    this.llama.draw(ctx);
  }

  // step(delta) {
  //   this.moveObjects(delta);
  //   //check for collisions here
  // }

}

Game.DIM_X = 750;
Game.DIM_Y = 450;
Game.FLOOR_HEIGHT = 30;

export default Game;
