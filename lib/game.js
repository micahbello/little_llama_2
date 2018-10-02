import Llama from './llama.js';
import Cloud from './cloud.js';
import Pig from './pig.js';
import Coin from './coin.js';


const CLOUDTRACKS = [
  [20, 60, "left", 1],
  [75, 115, "right", 2],
  [130, 170, "left", 3],
  [185, 225, "right", 4],
]

class Game {
  constructor() {
    this.llama = new Llama(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);

    this.coin = new Coin(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);


    // this.pigs = [new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT), new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT), new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT), new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];

    this.pigs =[new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    this.clouds = [];

    addEventListener("keydown", (e) => this.llama.keyDownHandler(e));
    addEventListener("keyup", (e) => this.llama.keyUpHandler(e));
  }

  allObjects() {
    return [].concat(this.llama, this.coin).concat(this.pigs).concat(this.clouds);
  }


  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y)

    //the bottom two lines create the floor
    ctx.fillStyle = "green";
    ctx.fillRect(0, Game.DIM_Y - Game.FLOOR_HEIGHT, 750, Game.FLOOR_HEIGHT);

    this.checkObjectCollisions();
    this.updateObjects(ctx);

    this.manageClouds()
  }


  updateObjects(ctx) {
    this.allObjects().forEach(object => {
      object.update(ctx)
    });
  }

  cloudsOverlap(startingX, trackNumber) {
    let overlapping = false;

    this.clouds.forEach(cloud => {

      if (cloud.trackNumber === trackNumber) {
        if (startingX === cloud.x) {
          overlapping = true;
        } else if (startingX > cloud.x && startingX < cloud.x + 150) {
          overlapping = true;
        } else if (startingX + 150 > cloud.x && cloud.x + 150 > startingX + 150) {
          overlapping = true;
        }
      }
    });

    return overlapping;

  }

  chooseCloudSpeed(trackNumber) {

    let randomSpeed = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < this.clouds.length; i++) {
      if (this.clouds[i].trackNumber === trackNumber) {
        return this.clouds[i].speed;
      }
    }
    return randomSpeed(1, 1.5);
  }

  manageClouds() {

    for (let i = 0; i < this.clouds.length; i++) {
      if (this.clouds[i].direction === "right" && this.clouds[i].x > Game.DIM_X) {
        this.clouds.splice(i, 1);
      } else if (this.clouds[i].direction === "left" && this.clouds[i].x < -130) {
        this.clouds.splice(i, 1);
      }
    }


    if (!(this.clouds.length > 15)) {
      //why was this slpwing down and dying with while(this.clouds.length < number) after 3 it just coudlnt handle it
      CLOUDTRACKS.forEach((trackset) => {

        let trackNumber = trackset[3];
          if (trackNumber === 2 || trackNumber === 4 ){

          let startingX = Math.floor(Math.random() * (-150 - -500) ) + -500;
          let startingY;

          if (trackNumber === 2) {
            startingY = 160;
          } else if (trackNumber === 4) {
            startingY = 320;
          }

          if (this.cloudsOverlap(startingX, trackNumber) === false) {
              this.clouds.push(new Cloud(trackset[2], trackNumber, startingX, startingY, this.chooseCloudSpeed(trackNumber)));
          }
        } else if (trackNumber === 1 || trackNumber === 3) {

          let startingX = Math.floor(Math.random() * (1150 - 800) ) + 800;
          let startingY;

          if (trackNumber === 1) {
            startingY = 80;
          } else if (trackNumber === 3) {
            startingY = 240;
          }

          if (this.cloudsOverlap(startingX, trackNumber) === false) {
              this.clouds.push(new Cloud(trackset[2], trackNumber, startingX, startingY, this.chooseCloudSpeed(trackNumber)));
          }
        }
      });
    }
  }

  checkObjectCollisions() {
    this.checkforPigPigCollisions();
    this.checkLlamaCloudCollision();
  }

  checkLlamaCloudCollision() {
    this.clouds.forEach(cloud => {
      let cloudFront = cloud.x + cloud.width;
      let cloudBottom = cloud.y + cloud.height;
      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;

      if (llamaFront > cloud.x && this.llama.x < cloudFront &&  llamaBottom < cloudBottom && cloud.y < llamaBottom && this.llama.y_velocity > 0) {
        this.llama.y = cloud.y - this.llama.height;
        this.llama.jumping = false;
        this.llama.y_velocity = 0;
        this.llama.x += cloud.speed;
      }
    });
  }

  checkforPigPigCollisions() {

    for (let i = 0; i < this.pigs.length; i++) {
      for (let j = 0; j < this.pigs.length; j++) {
        if (this.pigs[i] != this.pigs[j]) {

          let xDistance = this.pigs[i].x - this.pigs[j].x;
          let yDistance = this.pigs[i].y - this.pigs[j].y;

          let distance = Math.sqrt(Math.pow(xDistance, 2) +
          Math.pow(yDistance, 2));

          let minDistance = this.pigs[i].radius + this.pigs[j].radius;

          if (distance < minDistance) { //Collision has occured

            // let collisionAngle = Math.atan2(yDistance, xDistance);
            // let spread = minDistance - distance;
            //
            // let ax = spread * Math.cos(collisionAngle);
            // let ay = spread * Math.sin(collisionAngle);
            // this.pigs[i].x -= ax;
            // this.pigs[i].y -= ay;

            this.pigs[i].y_velocity = -this.pigs[i].y_velocity;

            //
            //

            // this.pigs[i].x_velocity += Math.cos(collisionAngle);
            // this.pigs[i].y_velocity += Math.sin(collisionAngle);
            // this.pigs[j].x_velocity -= Math.cos(collisionAngle);
            // this.pigs[j].y_velocity -= Math.sin(collisionAngle);

            // let direction1 = Math.atan2(this.pig.y_velocity, this.pig.x_velocity);
            // let direction2 = Math.atan2(this.pig2.y_velocity, this.pig2.x_velocity);

            // let v1 = Math.sqrt(this.pig.x_velocity * this.pig.x_velocity + this.pig.y_velocity * this.pig.y_velocity);
            //
            // let v2 = Math.sqrt(this.pig2.x_velocity * this.pig2.x_velocity + this.pig2.y_velocity * this.pig2.y_velocity);

            //   this.pig.x_velocity = Math.cos(direction1 - collisionAngle);
            //   this.pig.y_velocity = Math.sin(direction1 - collisionAngle);
            //
            //   this.pig2.x_velocity = Math.cos(direction2 - collisionAngle);
            //   this.pig2.y_velocity = Math.sin(direction2 - collisionAngle);
            // }
          }
        }
      }
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
