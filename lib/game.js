import Background from './background.js';
import Llama from './llama.js';
import Cloud from './cloud.js';
import Pig from './pig.js';
import Coin from './coin.js';
import Heart from './heart.js';


const CLOUDTRACKS = [
  ["left", 1],
  ["right", 2],
  ["left", 3],
  ["right", 4]
]

class Game {
  constructor() {
    this.background = new Background();
    this.llama = new Llama(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.coin = new Coin(100, 100);
    this.pigs =[new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),
    new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    this.pigs = [];
    this.clouds = [];
    this.specialObjects = [new Heart(100, 200)];
    // this.specialObjects = [];

    this.score = 0;
    this.shaking = false;
    this.shakingTimer = 0;

    this.status = "unPaused";
    this.gameOver = false;

    //audio sounds
    this.yeahSound = new Audio("./assets/audio/yeah.m4a");
    this.thatsAPig = new Audio("./assets/audio/thatspig.m4a");

    addEventListener("keydown", (e) => this.llama.keyDownHandler(e));
    addEventListener("keyup", (e) => this.llama.keyUpHandler(e));
  }

  draw(ctx) {
    if (this.llama.status === "dead" && this.llama.y > Game.DIM_Y) {
      this.gameOver = true;
    }

    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y)



    if (this.shaking === true && this.shakingTimer >= 6) {
      this.shaking = false;
      this.shakingTimer = 0;
      let canvas = document.getElementById("canvas");
      canvas.classList.remove("shake");
    } else if (this.shaking === true && this.shakingTimer < 6) {
      this.shakingTimer ++;
    }

    this.background.draw(ctx);
    //the bottom two lines create the floor
    ctx.fillStyle = "green";
    ctx.fillRect(0, Game.DIM_Y - Game.FLOOR_HEIGHT, 750, Game.FLOOR_HEIGHT);

    this.manageClouds();
    this.checkObjectCollisions();
    this.updateObjects(ctx);
  }


  updateObjects(ctx) {
    this.allObjects().forEach(object => {
      object.update(ctx)
    });
  }

  allObjects() {
    let gameObjects = [].concat(this.pigs).concat(this.clouds).concat(this.specialObjects).concat(this.llama, this.coin);
    return gameObjects;

  }
  //BELOW IS AN ALL PURPOSE FUNCTION TO CREATE RANDOM COORDINATES
  createRandomCoord(min, max) {
    return Math.random() * (max - min) + min;
  }

  //BELOW ARE CLOUD RELATED FUNCTIONS
  manageClouds() {

    //this for loop iterates through all the clouds and eliminates all clouds that have
    //gone outside of the canvas.
    for (let i = 0; i < this.clouds.length; i++) {
      if (this.clouds[i].direction === "right" && this.clouds[i].x > Game.DIM_X) {
        this.clouds.splice(i, 1);
      } else if (this.clouds[i].direction === "left" && this.clouds[i].x < -130) {
        this.clouds.splice(i, 1);
      }
    }


    if (!(this.clouds.length > 12)) {
      //why was this slpwing down and dying with while(this.clouds.length < number) after 3 it just coudlnt handle it
      CLOUDTRACKS.forEach((trackset) => {

        let trackNumber = trackset[1];
        if (trackNumber === 2 || trackNumber === 4 ){

          let startingX = this.createRandomCoord(-150, -500)
          let startingY;

          if (trackNumber === 2) {
            startingY = 160;
          } else if (trackNumber === 4) {
            startingY = 320;
          }

          if (this.cloudsOverlap(startingX, trackNumber) === false) {
            this.clouds.push(new Cloud(trackset[0], trackNumber, startingX, startingY, this.chooseCloudSpeed(trackNumber)));
          }
        } else if (trackNumber === 1 || trackNumber === 3) {

          let startingX = this.createRandomCoord(800, 1150);
          let startingY;

          if (trackNumber === 1) {
            startingY = 80;
          } else if (trackNumber === 3) {
            startingY = 240;
          }

          if (this.cloudsOverlap(startingX, trackNumber) === false) {
            this.clouds.push(new Cloud(trackset[0], trackNumber, startingX, startingY, this.chooseCloudSpeed(trackNumber)));
          }
        }
      });
    }
  }

  cloudsOverlap(startingX, trackNumber) {
    let overlapping = false;

    this.clouds.forEach(cloud => {

      if (cloud.trackNumber === trackNumber) {
        if (startingX === cloud.x) {
          overlapping = true;
        } else if (startingX > cloud.x && startingX < cloud.x + 300) {
          overlapping = true;
        } else if (startingX + 300 > cloud.x && cloud.x + 300 > startingX + 300) {
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
    return randomSpeed(1, 2);
  }
//special Object


//BELOW ARE COLLISION DETECTION RELATED FUNCTIONS
  checkObjectCollisions() {
    // this.checkPigPigCollisions();
    this.checkLlamaCloudCollision();
    this.checkLLamaCoinCollision();
    this.checkPigCloudCollision();
    this.checkLlamaSphereCollision();
  }

  checkPigCloudCollision() {
    for (let i = 0; i < this.clouds.length; i++) {
      for (let j = 0; j < this.pigs.length; j++) {

        let cloudFront = this.clouds[i].x + this.clouds[i].width;
        let cloudBottom = this.clouds[i].y + this.clouds[i].height;
        let pig = this.pigs[j];
        let cloud = this.clouds[i];

        if (pig.x + pig.radius > cloud.x && pig.x - pig.radius < cloudFront && pig.y + pig.radius > cloud.y && pig.y - pig.radius < cloudBottom){

          if (pig.y_velocity === Math.abs(pig.y_velocity)) {
            pig.y = cloud.y - pig.radius + 2
          } else {
            pig.y = cloudBottom + pig.radius + 2
          }

          // pig.angle = 360 - pig.angle;
          // pig.radians = pig.angle * Math.PI/ 180;
          // pig.x_velocity = Math.cos(pig.radians) * pig.speed;
          // pig.y_velocity = Math.sin(pig.radians) * pig.speed;

          pig.y_velocity = -pig.y_velocity;

        }
      }
    }
  }

  checkLlamaSphereCollision() {
    this.pigs.concat(this.specialObjects).forEach(object => {

      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;

      if (object.x > this.llama.x && object.x < llamaFront && object.y > this.llama.y && object.y < llamaBottom) {

        if (object instanceof Pig) {
          this.thatsAPig.play();
          this.llama.hearts --;

          if (this.shaking === false) {
            let canvas = document.getElementById("canvas");
            canvas.setAttribute("class", "shake");
            this.shaking = true;
            this.shakingTimer ++
          }
        } else if (object instanceof Heart) {
          this.llama.hearts++;
        }

      }
    });



  }

  checkLLamaCoinCollision() {

    let llamaFront = this.llama.x + this.llama.width;
    let llamaBottom = this.llama.y + this.llama.height;
    let coinFront = this.coin.x + this.coin.width;
    let coinBottom = this.coin.y + this.coin.height;

    if ((this.llama.y < coinBottom && this.coin.y < llamaBottom && llamaFront > this.coin.x && coinFront > llamaFront) || (this.llama.y < coinBottom && this.coin.y < llamaBottom && this.llama.x < coinFront && llamaFront > this.coin.x)) {
      //the creation of the new coin takes into account width and height, and ground height
      this.coin = new Coin (this.createRandomCoord(0, Game.DIM_X - 25), this.createRandomCoord(0, Game.DIM_Y - Game.FLOOR_HEIGHT - 39));
      //make a new pig here this.newBall("black");
      this.score ++;
      this.yeahSound.play();
      this.llama.hearts --;
    }
  }

  checkLlamaCloudCollision() {

    if (this.llama.status === "dead") {
      return;
    }

    this.clouds.forEach(cloud => {
      let cloudFront = cloud.x + cloud.width;
      let cloudBottom = cloud.y + cloud.height;
      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;

      if (llamaFront > cloud.x && this.llama.x < cloudFront &&  llamaBottom < cloudBottom && cloud.y < llamaBottom && this.llama.y_velocity > 0) {
        // this.llama.y = cloud.y - this.llama.height; //this makes the llama jittery?
        this.llama.jumping = false;
        this.llama.y_velocity = 0;

        if (cloud.direction === "right") {
          this.llama.x += cloud.speed;
        } else {
          this.llama.x -= cloud.speed;
        }
      }
    });
  }

  checkPigPigCollisions(ctx) {

    for (let i = 0; i < this.pigs.length; i++) {
      for (let j = 0; j < this.pigs.length; j++) {
        if (this.pigs[i] != this.pigs[j]) {

          let xDistance = this.pigs[i].x - this.pigs[j].x;
          let yDistance = this.pigs[i].y - this.pigs[j].y;

          let distance = Math.sqrt(Math.pow(xDistance, 2) +
          Math.pow(yDistance, 2));

          let minDistance = (this.pigs[i].radius + this.pigs[j].radius);

          if (distance <= minDistance) {

            // this.pigs[i].y_velocity = -this.pigs[i].y_velocity;
            this.resolveSphereSphereCollision(this.pigs[i], this.pigs[j]);
          }
        }
      }
    }
  }

  rotate(velocity, angle) {
    let rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
  }

  resolveSphereSphereCollision(sphere1, sphere2) {

    //code borrowed from https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc

    let xVelocityDiff = sphere1.x_velocity - sphere2.x_velocity;
    let yVelocityDiff = sphere1.y_velocity - sphere2.y_velocity;

    let xDist = sphere2.x - sphere1.x;
    let yDist = sphere2.y - sphere1.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      let angle = -Math.atan2(sphere2.y - sphere1.y, sphere2.x - sphere1.x);

      let m1 = sphere1.mass;
      let m2 = sphere2.mass;

      let u1 = this.rotate({x: sphere1.x_velocity, y: sphere1.y_velocity}, angle);
      let u2 = this.rotate({x: sphere2.x_velocity, y: sphere2.y_velocity}, angle);

      let v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      let v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      let vFinal1 = this.rotate(v1, -angle);
      let vFinal2 = this.rotate(v2, -angle);

      sphere1.x_velocity = vFinal1.x;
      sphere1.y_velocity = vFinal1.y;

      sphere2.x_velocity = vFinal2.x;
      sphere2.y_velocity = vFinal2.y;

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
