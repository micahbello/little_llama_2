import Llama from './llama.js';
import Cloud from './cloud.js';
import Pig from './pig.js';

class Game {
  constructor() {
    this.llama = new Llama(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.pig = new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.pig2 = new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);

    addEventListener("keydown", (e) => this.llama.keyDownHandler(e));
    addEventListener("keyup", (e) => this.llama.keyUpHandler(e));
  }

  allObjects() {
    return [].concat(this.llama, this.pig, this.pig2);
  }




  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y)

    //the bottom two lines create the floor
    ctx.fillStyle = "green";
    ctx.fillRect(0, Game.DIM_Y - Game.FLOOR_HEIGHT, 750, Game.FLOOR_HEIGHT);


    this.checkObjectCollisions();
    this.updateObjects(ctx);
  }


  updateObjects(ctx) {
    this.allObjects().forEach(object => {
      object.update(ctx)
    });
  }

  checkObjectCollisions() {
    this.checkforPigPigCollisions();
  }

  checkforPigPigCollisions() {
    let xDistance = this.pig.x - this.pig2.x;
    let yDistance = this.pig.y - this.pig2.y;

    let distance = Math.sqrt(Math.pow(xDistance, 2) +
      Math.pow(yDistance, 2));

    let minDistance = this.pig.radius + this.pig2.radius;

    if (distance < minDistance) {
      console.log("coliiding")
    }
  }


}

Game.DIM_X = 750;
Game.DIM_Y = 450;
Game.FLOOR_HEIGHT = 30;

export default Game;




// moveObjects(delta) {
//   this.allObjects().forEach((object) => {
//     object.move(delta);
//   });
// }

// step(delta) {
//   this.moveObjects(delta);
//   //check for collisions here
// }
