import Background from './background.js';
import Llama from './llama.js';
import Platform from './platform.js';
import Pig from './pig.js';
import Coin from './coin.js';
import Heart from './heart.js';


const PLATFORMTRACKS = [
  ["left", 1],
  ["right", 2],
  ["left", 3],
  ["right", 4]
];

const SPAWNCIRCLES = [
  [40, 40, 40],
  [710, 40, 40],
  [40, 380, 40],
  [710, 380, 40],
  [120, 40, 40],
  [200, 40, 40],
  [280, 40, 40],
  [360, 40, 40],
  [440, 40, 40],
  [520, 40, 40],
  [600, 40, 40]
];

class Game {
  constructor() {
    this.background = new Background(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.llama = new Llama(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.coin = new Coin(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300));
    // this.coin = new Coin(20, 20);

    // this.pigs =[new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),
    // new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    this.pigs = [new Pig(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300), Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    this.platforms = [];
    this.specialObjects = [];
    // this.specialObjects = [];

    this.heartSpawnCycle = 0;
    this.score = 0;
    this.previousScore = 0;

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
    ctx.fillStyle = "#6B8E23";
    ctx.fillRect(0, Game.DIM_Y - Game.FLOOR_HEIGHT, 750, Game.FLOOR_HEIGHT);

// NOTE: comment in to see pig spawn circles
    // SPAWNCIRCLES.forEach(set => {
    //   ctx.beginPath();
    //   ctx.arc(set[0], set[1], set[2], 0, Math.PI*2);
    //   ctx.fillStyle = "yellow";
    //   ctx.fill();
    //   ctx.closePath();
    // });
//

  this.manageHearts();
  this.managePigs();
  this.managePlatforms();
  this.checkObjectCollisions();
  this.updateObjects(ctx);
  this.drawScore(ctx);
  }

  manageHearts() {
    if (this.heartSpawnCycle < 1200) {
      this.heartSpawnCycle++;
    } else {
      this.heartSpawnCycle = 0;

      if (this.score - this.previousScore < 3) {
        null;
      } else if (this.score - this.previousScore < 5) {
        this.creatNewHeart();
        this.previousScore = this.score;
      } else if (this.score - this.previousScore < 10) {
        this.creatNewHeart();
        this.creatNewHeart();
        this.previousScore = this.score;
      } else if (this.score - this.previousScore < 15) {
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.previousScore = this.score;
      } else if (this.score - this.previousScore < 20) {
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.previousScore = this.score;
      } else if (this.score - this.previousScore < 30) {
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.previousScore = this.score;
      }
    }
  }

  drawScore(ctx) {
    ctx.font = "16px Monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${this.score} | Health: ${this.llama.hearts}`, 8, 20);
  }

  updateObjects(ctx) {
    this.allObjects().forEach(object => {
      object.update(ctx)
    });
  }

  allObjects() {
    let gameObjects = [].concat(this.pigs).concat(this.platforms).concat(this.specialObjects).concat(this.llama, this.coin);
    return gameObjects;

  }
  //BELOW IS AN ALL PURPOSE FUNCTION TO CREATE RANDOM COORDINATES
  createRandomCoord(min, max) {
    return Math.random() * (max - min) + min;
  }

  //BELOW ARE platform RELATED FUNCTIONS
  managePlatforms() {

    //this for loop iterates through all the platforms and eliminates all platforms that have
    //gone outside of the canvas.
    for (let i = 0; i < this.platforms.length; i++) {
      if (this.platforms[i].direction === "right" && this.platforms[i].x > Game.DIM_X) {
        this.platforms.splice(i, 1);
      } else if (this.platforms[i].direction === "left" && this.platforms[i].x < -130) {
        this.platforms.splice(i, 1);
      }
    }


    if (!(this.platforms.length > 12)) {
      //why was this slpwing down and dying with while(this.platforms.length < number) after 3 it just coudlnt handle it
      PLATFORMTRACKS.forEach((trackset) => {

        let trackNumber = trackset[1];
        if (trackNumber === 2 || trackNumber === 4 ){

          let startingX = this.createRandomCoord(-150, -500)
          let startingY;

          if (trackNumber === 2) {
            startingY = 160;
          } else if (trackNumber === 4) {
            startingY = 320;
          }

          if (this.platformsOverlap(startingX, trackNumber) === false) {
            this.platforms.push(new Platform(trackset[0], trackNumber, startingX, startingY, this.choosePlatformSpeed(trackNumber)));
          }
        } else if (trackNumber === 1 || trackNumber === 3) {

          let startingX = this.createRandomCoord(800, 1150);
          let startingY;

          if (trackNumber === 1) {
            startingY = 80;
          } else if (trackNumber === 3) {
            startingY = 240;
          }

          if (this.platformsOverlap(startingX, trackNumber) === false) {
            this.platforms.push(new Platform(trackset[0], trackNumber, startingX, startingY, this.choosePlatformSpeed(trackNumber)));
          }
        }
      });
    }
  }

  platformsOverlap(startingX, trackNumber) {
    let overlapping = false;

    this.platforms.forEach(platform => {

      if (platform.trackNumber === trackNumber) {
        if (startingX === platform.x) {
          overlapping = true;
        } else if (startingX > platform.x && startingX < platform.x + 300) {
          overlapping = true;
        } else if (startingX + 300 > platform.x && platform.x + 300 > startingX + 300) {
          overlapping = true;
        }
      }
    });

    return overlapping;

  }

  choosePlatformSpeed(trackNumber) {

    let randomSpeed = (min, max) => {
      return Math.random() * (max - min) + min;
    }

    for (let i = 0; i < this.platforms.length; i++) {
      if (this.platforms[i].trackNumber === trackNumber) {
        return this.platforms[i].speed;
      }
    }
    return randomSpeed(1, 2);
  }

// pig related functions

  managePigs() {
    //delete pigs that leave the canvas
    for (let i = 0; i < this.pigs.length; i++) {
      if (this.pigs[i].x < - 50 || this.pigs[i].x > Game.DIM_X + 50) {
        this.pigs.splice(i, 1);
      }
    }
  }

  returnEmptySpawnCircle() {
//REDO THIS LATER FOR BETTER OPTOMIZATION

    let objects = [].concat(this.llama).concat(this.pigs).concat(this.specialObjects);

    let circles = [true,true,true,true,true,true,true,true,true,true,true];

    for (let i = 0; i < SPAWNCIRCLES.length; i++) {
      for (let j = 0; j < objects.length; j++) {
        if (objects[j] instanceof Pig){

          if (this.areSpheresColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1], radius: SPAWNCIRCLES[i][2]}, objects[j]) && (objects[j].status === "normal" || objects[j].status === "testing")) {
            circles[i] = false;
          }
        } else if (objects[j] instanceof Llama) {
          if (this.areSphereNonSphereColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1], radius: SPAWNCIRCLES[i][2]}, objects[j])) {
            circles[i] = false;
          }
        } else if (objects[j] instanceof Heart) {
          if (this.areSpheresColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1], radius: SPAWNCIRCLES[i][2]}, objects[j])) {
            circles[i] = false;
          }
        }
      }
    }

    for (let i = 0; i < circles.length; i++) {
      if (circles[i] === true) {
        return SPAWNCIRCLES[i];
      }
    }

    return SPAWNCIRCLES[0];

  }

  createNewPig() {
    let spawningCircle = this.returnEmptySpawnCircle();
    this.pigs.push(new Pig(spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
  }

  creatNewHeart() {
    let spawningCircle = this.returnEmptySpawnCircle();
    this.specialObjects.push(new Heart(spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
  }

  areSphereNonSphereColliding(sphere, fourSidedObj) {
//NOTE: Code borrowed from http://jsfiddle.net/m1erickson/n6U8D/
        let distX = Math.abs(sphere.x - fourSidedObj.x - fourSidedObj.width / 2);
        let distY = Math.abs(sphere.y - fourSidedObj.y - fourSidedObj.height / 2);

        if (distX > (fourSidedObj.width / 2 + sphere.radius)) {
            return false;
        }
        if (distY > (fourSidedObj.height / 2 + sphere.radius)) {
            return false;
        }

        if (distX <= (fourSidedObj.width / 2)) {
            return true;
        }
        if (distY <= (fourSidedObj.height / 2)) {
            return true;
        }

        let dx = distX - fourSidedObj.width / 2;
        let dy = distY - fourSidedObj.height / 2;
        if (dx * dx + dy * dy <= (sphere.radius * sphere.radius)) {
          return true;
        }
    return false;
  }


  areSpheresColliding(sphere1, sphere2) {

    let xDistance = sphere1.x - sphere2.x;
    let yDistance = sphere1.y - sphere2.y;

    let distance = Math.sqrt(Math.pow(xDistance, 2) +
    Math.pow(yDistance, 2));

    let minDistance = (sphere1.radius + sphere2.radius);

    if (distance <= minDistance) {
      return true;
    }

    return false;

  }

//BELOW ARE COLLISION DETECTION RELATED FUNCTIONS
  checkObjectCollisions() {
    // this.checkPigPigCollisions();
    this.checkLlamaPlatformCollision();
    this.checkLLamaCoinCollision();
    this.checkPigAndSpecialObjPlatformCollision();
    this.checkLlamaPigCollision();
    this.checkLlamaSpecialObjCollision();
  }

  checkPigAndSpecialObjPlatformCollision() {
    let objects = this.pigs.concat(this.specialObjects);

    for (let i = 0; i < this.platforms.length; i++) {
      for (let j = 0; j < objects.length; j++) {

        let platformFront = this.platforms[i].x + this.platforms[i].width;
        let platformBottom = this.platforms[i].y + this.platforms[i].height;
        let object = objects[j];
        let platform = this.platforms[i];

        if (object instanceof Pig && object.status === "normal") {
          if (object.x + object.radius > platform.x && object.x - object.radius < platformFront && object.y + object.radius > platform.y && object.y - object.radius < platformBottom){

            if (object.y_velocity === Math.abs(object.y_velocity)) {
              object.y = platform.y - object.radius + 2
            } else {
              object.y = platformBottom + object.radius + 2
            }
            object.y_velocity = -object.y_velocity;
          }
        } else if (!(object instanceof Pig) ){
          if (object.x + object.radius > platform.x && object.x - object.radius < platformFront && object.y + object.radius > platform.y && object.y - object.radius < platformBottom){

            if (object.y_velocity === Math.abs(object.y_velocity)) {
              object.y = platform.y - object.radius + 2
            } else {
              object.y = platformBottom + object.radius + 2
            }
            object.y_velocity = -object.y_velocity;
          }
        }
      }
    }
  }

  checkLlamaPigCollision() {

    for (let i = 0; i < this.pigs.length; i++) {
      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;

      if (this.pigs[i].status === "normal") {
        if (this.areSphereNonSphereColliding(this.pigs[i], this.llama)) {
          this.resolveLlamaPigCollision(this.pigs[i]);
        }
      }
    }
  }

  resolveLlamaPigCollision(pig) {
    if (this.shaking === false) {
      let canvas = document.getElementById("canvas");
      canvas.setAttribute("class", "shake");
      this.shaking = true;
      this.shakingTimer ++;
      this.llama.hearts --;
      pig.status = "llamaCollided";
      this.thatsAPig.play();
    } else {
      this.shakingTimer ++;
      this.llama.hearts --;
      pig.status = "llamaCollided";
      this.thatsAPig.play();
    }
  }

  checkLlamaSpecialObjCollision() {
    for (let i = 0; i < this.specialObjects.length; i++) {
      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;

      if (this.areSphereNonSphereColliding(this.specialObjects[i], this.llama)) {
        if(this.specialObjects[i] instanceof Heart) {
          this.specialObjects.splice(i, 1);
          this.llama.hearts++;
        }
      }
    }
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
      this.createNewPig();
    }
  }

  checkLlamaPlatformCollision() {

    if (this.llama.status === "dead") {
      return;
    }

    this.platforms.forEach(platform => {
      let platformFront = platform.x + platform.width;
      let platformBottom = platform.y + platform.height;
      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;

      if (llamaFront > platform.x && this.llama.x < platformFront &&  llamaBottom < platformBottom && platform.y < llamaBottom && this.llama.y_velocity > 0) {
        this.llama.jumping = false;
        this.llama.y = platform.y - this.llama.height;
        this.llama.y_velocity = 0;

        if (platform.direction === "right") {
          this.llama.x += platform.speed;
        } else {
          this.llama.x -= platform.speed;
        }
      }
    });
  }

  checkPigPigCollisions(ctx) {

    for (let i = 0; i < this.pigs.length; i++) {
      for (let j = 0; j < this.pigs.length; j++) {
        if (this.pigs[i] != this.pigs[j]) {

          if (this.pigs[i].status === "normal" && this.pigs[j].status === "normal") {
            if (this.areSpheresColliding(this.pigs[i], this.pigs[j])) {
              // this.pigs[i].y_velocity = -this.pigs[i].y_velocity;
              this.resolveSphereSphereCollision(this.pigs[i], this.pigs[j]);
            }
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
