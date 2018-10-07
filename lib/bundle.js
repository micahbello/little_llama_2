/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__background_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__llama_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__platform_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pig_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__coin_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__heart_js__ = __webpack_require__(9);







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
    this.background = new __WEBPACK_IMPORTED_MODULE_0__background_js__["a" /* default */](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.llama = new __WEBPACK_IMPORTED_MODULE_1__llama_js__["a" /* default */](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.coin = new __WEBPACK_IMPORTED_MODULE_4__coin_js__["a" /* default */](Math.floor(Math.random() * 500), Math.floor(Math.random() * 300));
    this.pigs = [new __WEBPACK_IMPORTED_MODULE_3__pig_js__["a" /* default */](Math.floor(Math.random() * 500), Math.floor(Math.random() * 300), Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    this.platforms = [];
    this.specialObjects = [];

    this.score = 0;
    this.previousScore = 0;

    this.shaking = false;
    this.shakingTimer = 0;

    this.status = "unPaused";
    this.gameOver = false;
    this.heartSpawnCycle = 0;

    this.yeahSound = new Audio("./assets/audio/yeah.m4a");
    this.thatsAPig = new Audio("./assets/audio/thatspig.m4a");

    // NOTE: Uncomment indvidually for debugging/testing purposes
    // this.coin = new Coin(20, 20);
    // this.pigs = [new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),
    // new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),new Pig(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];

    addEventListener("keydown", (e) => this.llama.keyDownHandler(e));
    addEventListener("keyup", (e) => this.llama.keyUpHandler(e));
  }

  update(ctx) {

    if (this.llama.status === "dead" && this.llama.y > Game.DIM_Y) {
      this.gameOver = true;
    }

    if (this.shaking === true && this.shakingTimer >= 6) {
      this.shaking = false;
      this.shakingTimer = 0;
      let canvas = document.getElementById("canvas");
      canvas.classList.remove("shake");
    } else if (this.shaking === true && this.shakingTimer < 6) {
      this.shakingTimer ++;
    }

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);

    this.background.update(ctx);


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
    // Hearts potentially spawn every 20 seconds (1200/60fps)

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
            this.platforms.push(new __WEBPACK_IMPORTED_MODULE_2__platform_js__["a" /* default */](trackset[0], trackNumber, startingX, startingY, this.choosePlatformSpeed(trackNumber)));
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
            this.platforms.push(new __WEBPACK_IMPORTED_MODULE_2__platform_js__["a" /* default */](trackset[0], trackNumber, startingX, startingY, this.choosePlatformSpeed(trackNumber)));
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
        if (objects[j] instanceof __WEBPACK_IMPORTED_MODULE_3__pig_js__["a" /* default */]){

          if (this.areSpheresColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1], radius: SPAWNCIRCLES[i][2]}, objects[j]) && (objects[j].status === "normal" || objects[j].status === "testing")) {
            circles[i] = false;
          }
        } else if (objects[j] instanceof __WEBPACK_IMPORTED_MODULE_1__llama_js__["a" /* default */]) {
          if (this.areSphereNonSphereColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1], radius: SPAWNCIRCLES[i][2]}, objects[j])) {
            circles[i] = false;
          }
        } else if (objects[j] instanceof __WEBPACK_IMPORTED_MODULE_5__heart_js__["a" /* default */]) {
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
    this.pigs.push(new __WEBPACK_IMPORTED_MODULE_3__pig_js__["a" /* default */](spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
  }

  creatNewHeart() {
    let spawningCircle = this.returnEmptySpawnCircle();
    this.specialObjects.push(new __WEBPACK_IMPORTED_MODULE_5__heart_js__["a" /* default */](spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
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

        if (object instanceof __WEBPACK_IMPORTED_MODULE_3__pig_js__["a" /* default */] && object.status === "normal") {
          if (object.x + object.radius > platform.x && object.x - object.radius < platformFront && object.y + object.radius > platform.y && object.y - object.radius < platformBottom){

            if (object.y_velocity === Math.abs(object.y_velocity)) {
              object.y = platform.y - object.radius + 2
            } else {
              object.y = platformBottom + object.radius + 2
            }
            object.y_velocity = -object.y_velocity;
          }
        } else if (!(object instanceof __WEBPACK_IMPORTED_MODULE_3__pig_js__["a" /* default */]) ){
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
        if(this.specialObjects[i] instanceof __WEBPACK_IMPORTED_MODULE_5__heart_js__["a" /* default */]) {
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
      this.coin = new __WEBPACK_IMPORTED_MODULE_4__coin_js__["a" /* default */] (this.createRandomCoord(0, Game.DIM_X - 25), this.createRandomCoord(0, Game.DIM_Y - Game.FLOOR_HEIGHT - 39));
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

/* harmony default export */ __webpack_exports__["a"] = (Game);




// moveObjects(delta) {
//   this.allObjects().forEach((object) => {
//     object.move(delta);
//   });
// }

// step(delta) {
//   this.moveObjects(delta);
//   //check for collisions here
// }


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(0);



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('canvas');

  const ctx = canvasEl.getContext("2d");
  canvasEl.width = __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].DIM_Y;
  const game = new __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */]();

  new __WEBPACK_IMPORTED_MODULE_0__game_view_js__["a" /* default */](ctx, game).animate();
});


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);


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
    // this.fps ++;
    //
    // if (this.fps === 60) {
    //   this.fps = 0;
    //   this.seconds++;
    //   console.log(this.seconds);
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

    requestAnimationFrame(this.animate);
    // this.lastTime = time;
  }

  allowRestart() {
    // TODO: write code for here
  }

  keyDownHandler(e) {
    if (e.keyCode === 32) { //the spacebar
      if (this.gameStatus != "paused") {
        this.gameStatus = "paused";
      } else if (this.gameStatus === "paused") {
        this.gameStatus = "unPaused";
      }
    } else if (e.keyCode === 13) { //enter
      if (this.game.gameOver === true) {
        this.game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sun_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__moon_js__ = __webpack_require__(11);
//code borrowed from https://github.com/misun/bakku-runner/blob/master/lib/background.js
//clouds borrowed from https://whitlanier.artstation.com/projects/DdDL9




class Background {
  constructor(canvas_width, canvas_height) {
    this.canvas_height = canvas_height;
    this.canvas_width = canvas_width;

    this.cloudsX = 0
    this.cloudsY = -50;
    this.cloudsWidth = 800;
    this.cloudsImage = new Image();
    this.cloudsImage.src = "./assets/sprites/clouds_day.png";

    this.mountainX = 0;
    this.mountainY = 50;
    this.mountainImage = new Image();
    this.mountainImage.src =  './assets/sprites/mountain_day.png';

    this.starrySkyX = 0;
    this.starrySkyWidth = 800;
    this.starrySky = new Image();
    this.starrySky.src = "./assets/sprites/starry_sky.png";

    this.luminary = new __WEBPACK_IMPORTED_MODULE_0__sun_js__["a" /* default */](canvas_width, canvas_height);
  }

  update(ctx) {

    if (this.luminary.y - this.luminary.radius > 302) {
      if (this.luminary instanceof __WEBPACK_IMPORTED_MODULE_0__sun_js__["a" /* default */]) {
        this.luminary = new __WEBPACK_IMPORTED_MODULE_1__moon_js__["a" /* default */](this.canvas_width, this.canvas_height);
        this.cloudsImage.src = "./assets/sprites/clouds_night.png";
        this.mountainImage.src =  './assets/sprites/mountain_night.png';
      } else {
        this.luminary = new __WEBPACK_IMPORTED_MODULE_0__sun_js__["a" /* default */](this.canvas_width, this.canvas_height);
        this.cloudsImage.src = "./assets/sprites/clouds_day.png";
        this.mountainImage.src =  './assets/sprites/mountain_day.png';

      }

      this.luminary.x = -55;
      this.luminary.y = -55;
    }

    //ensures constant redrawing of the clouds
    if (this.cloudsX < this.cloudsWidth * -1){
      this.cloudsX = 0;
    }

    //ensures constant redrawing of the starry sky
    if (this.starrySkyX < this.starrySkyWidth * -1) {
      this.starrySkyX = 0;
    }

    this.draw(ctx);
    this.scrollImage();
  }

  draw(ctx) {

    if (this.luminary instanceof __WEBPACK_IMPORTED_MODULE_0__sun_js__["a" /* default */]) {
      let myGradient = ctx.createLinearGradient(0,0,0, this.canvas_height);
      myGradient.addColorStop(0, "#0158a8");
      myGradient.addColorStop(1, "#65c7ee");

      ctx.fillStyle = myGradient;
      ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);
    } else {
      ctx.drawImage(this.starrySky, this.starrySkyX, 0);
      ctx.drawImage(this.starrySky, this.starrySkyX + this.starrySkyWidth, 0);
    }

    this.luminary.update(ctx);
    ctx.drawImage(this.cloudsImage, this.cloudsX, this.cloudsY);
    ctx.drawImage(this.cloudsImage, this.cloudsX + this.cloudsWidth, this.cloudsY);

    ctx.drawImage(this.mountainImage, this.mountainX, this.mountainY);
  }

  scrollImage() {
    this.cloudsX = this.cloudsX - .2;
    this.starrySkyX = this.starrySkyX - .04;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Background);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object_js__ = __webpack_require__(5);


const SPRITES = {
  leftPosition1: [33, 137, 55, 55],
  leftPosition2: [146, 137, 55, 55],
  leftPosition3: [258, 137, 55, 55],
  leftPosition4: [371, 137, 55, 55],

  rightPosition1: [34, 362, 55, 55],
  rightPosition2: [147, 362, 55, 55],
  rightPosition3: [259, 362, 55, 55],
  rightPosition4: [372, 362, 55, 55],

  dead: [259, 259, 55, 55]
};

class Llama {
  constructor(canvas_width, canvas_height) {

    this.height = 52;
    this.width = 45;
    this.x = 0;
    this.y = canvas_height - this.height;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.hearts = 20;
    this.lastDirectionFaced = "right";
    this.jumpPower = -27;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.status = "flightMode";
    this.jumping = true;
    this.deadJumping = false;

    this.walkcycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/llama_run_sprite_sheet.png';

    this.keysPressed = [];
  }

  update(ctx) {

    //Update the status to dead if hearts fall below 0;
    //it will start a falling dead animation
    if (this.hearts < 1) {
      this.status = "dead";
      if (this.deadJumping === false) {
        this.deadJumping = true;
        this.y_velocity = this.jumpPower / 2;
      }
    }

    if (this.status === "dead") {
      this.y_velocity += 1;
      this.y_velocity *= 0.9;
      this.y += this.y_velocity;
    }

    //The code below updates movement
    if (this.status != "dead") {
      if (this.keysPressed[37]) {
        this.x_velocity -= 1;

      } else if (this.keysPressed[39]) {
        this.x_velocity += 1;
      }

      if (this.keysPressed[38] && this.jumping === false) {
        this.y_velocity = this.jumpPower;
        this.jumping = true;
      }

      this.move();
      this.checkCanvasBorderCollision();
    }

    this.draw(ctx)
  }

  draw(ctx) {

    // NOTE: Uncomment below to see llama hitbox
      // ctx.fillStyle = "blue";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
    //

    const sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3]);
  }

  move() {
    //Update x position
    this.x += this.x_velocity;
    this.x_velocity *= 0.8;

    //Update y position
    this.y_velocity += 1.5;
    this.y_velocity *= 0.9;
    this.y += this.y_velocity;
  }

  getSprite() {

    if (this.status === "dead") {
      this.spritesheet.src = './assets/sprites/llama_stand_sprite_sheet.png';
      return SPRITES.dead;
    }

    if (!this.keysPressed[37] && !this.keysPressed[39] && this.jumping === false) {
      this.walkcycle = 0;

      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama_stand_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama_stand_dressed_sprite_sheet.png';
      }

      if (this.lastDirectionFaced === "right") {
        return SPRITES.rightPosition1
      } else if (this.lastDirectionFaced === "left") {
        return SPRITES.leftPosition1
      }
    }

    if (this.keysPressed[37]) {
      this.walkcycle ++;

      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama_run_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama_run_dressed_sprite_sheet.png';
      }


      if (this.walkcycle < 6) {
        return SPRITES.leftPosition1
      } else if (this.walkcycle < 12) {
        return SPRITES.leftPosition2
      } else if (this.walkcycle < 18) {
        return SPRITES.leftPosition3
      } else if (this.walkcycle < 24) {
        return SPRITES.leftPosition4
      } else {
        this.walkcycle = 0;
        return SPRITES.leftPosition1
      }

    } else if (this.keysPressed[39]){
      this.walkcycle ++;

      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama_run_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama_run_dressed_sprite_sheet.png';
      }

      if (this.walkcycle < 6) {
        return SPRITES.rightPosition1
      } else if (this.walkcycle < 12) {
        return SPRITES.rightPosition2
      } else if (this.walkcycle < 18) {
        return SPRITES.rightPosition3
      } else if (this.walkcycle < 24) {
        return SPRITES.rightPosition4
      } else {
        this.walkcycle = 0;
        return SPRITES.rightPosition1
      }
    } else {
      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama_run_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama_run_dressed_sprite_sheet.png';
      }

      if (this.lastDirectionFaced === "right") {
        return SPRITES.rightPosition1;
      } else if (this.lastDirectionFaced === "left") {
        return SPRITES.leftPosition1;
      }
    }
  }

  keyDownHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown");
  }

  keyUpHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown"); //will return false

    if (e.keyCode === 37) {
      this.lastDirectionFaced = "left";
    } else if (e.keyCode === 39) {
      this.lastDirectionFaced = "right";
    }
  }

  checkCanvasBorderCollision () {
    //floor collisions
    if (this.y > this.canvas_height - this.height) {
      this.jumping = false;
      this.y = this.canvas_height - this.height;
      this.y_velocity = 0;
    }

    //sides collisions
    if (this.x > this.canvas_width - this.width) {
      this.x = this.canvas_width - this.width;
    } else if (this.x < 0) {
      this.x = 0;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Llama);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// TODO: DECIDE IF THIS WILL BE USED, THINK ABOUT WHICH CLASSES CAN INHERIT FROM OTHERS

class MovingObject {
  constructor(){
    // this.pos = options.pos;
    // this.vel = {'x':0, 'y':0}
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.x_velocity * velocityScale,
      offsetY = this.y_velocity * velocityScale;
    this.x = this.x + offsetX;
    this.y = this.y + offsetY;
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

/* unused harmony default export */ var _unused_webpack_default_export = (MovingObject);


/***/ }),
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const SPRITES = {
  leftPosition1: [30, 160, 100, 100],
  leftPosition2: [142, 160, 100, 100],
  leftPosition3: [253, 160, 100, 100],
  leftPosition4: [366, 160, 100, 100],

  rightPosition1: [33, 385, 100, 100],
  rightPosition2: [146, 385, 100, 100],
  rightPosition3: [257, 385, 100, 100],
  rightPosition4: [370, 385, 100, 100],
};

class Pig {
  constructor(x, y, canvas_width, canvas_height, status) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.mass = 5;
    this.x_velocity = 3;
    this.y_velocity = 3;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    // NOTE: Commented code was used for older collision mechanics
      // this.angle = 45;
      // this.radians = this.angle * Math.PI/180;
      // this.speed = 4;
      // this.x_velocity = Math.cos(this.radians) * this.speed;
      // this.y_velocity = Math.sin(this.radians) * this.speed;
    //

    this.direction = "right";
    this.status = status || "normal"

    this.spritecycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/pig_sprite_sheet.png';
  }

  update(ctx) {

    if (Math.abs(this.x_velocity) === this.x_velocity) {
      //pig is moving to the right
      this.direction = "right";
    } else {
      this.direction = "left";
    }

    this.move();
    this.canvasBorderCollision();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: Uncomment to see pig hit box
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";
      // ctx.fill();
      // ctx.closePath();
    //

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x - 24, this.y - 11, sprite[2], sprite[3]);
  }

  move() {
    if (this.status === "normal") {
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    } else if (this.status === "llamaCollided") {
      this.y_velocity = -2;
      if (this.direction === "right") {
        this.x_velocity = 7;
        this.x += this.x_velocity;
        this.y += this.y_velocity;
      } else {
        this.x_velocity = -7;
        this.x += this.x_velocity;
        this.y += this.y_velocity;
      }
    } else if (this.status === "testing") {
      null
    }
  }

  getSprite() {
    this.spritecycle ++;

    if (this.spritecycle < 10) {
      return this.direction === "right" ? SPRITES.rightPosition1 : SPRITES.leftPosition1
    } else if (this.spritecycle < 20) {
      return this.direction === "right" ? SPRITES.rightPosition2 : SPRITES.leftPosition2
    } else if (this.spritecycle < 30) {
      return this.direction === "right" ? SPRITES.rightPosition3 : SPRITES.leftPosition3
    } else if (this.spritecycle < 40) {
      return this.direction === "right" ? SPRITES.rightPosition4 : SPRITES.leftPosition4
    } else {
      this.spritecycle = 0;
      return this.direction === "right" ? SPRITES.rightPosition1 : SPRITES.leftPosition1
    }
  }

  canvasBorderCollision() {

    if (this.status != "normal") {
      return
    }

    if (this.x + this.radius > this.canvas_width || this.x - this.radius < 0 ){
      if (this.x + this.radius > this.canvas_width) {
        this.direction = "left";
        this.x = this.canvas_width - this.radius;
      } else {
        this.direction = "right";
        this.x = 0 + this.radius;
      }

      // NOTE: Commented code was used for older collision mechanics
        // this.angle = 180 - this.angle;
        // this.radians = this.angle * Math.PI/ 180;
        // this.x_velocity = Math.cos(this.radians) * this.speed;
        // this.y_velocity = Math.sin(this.radians) * this.speed;
      //

      this.x_velocity = -this.x_velocity;

      } else if (this.y - this.radius < 0 || this.y + this.radius > this.canvas_height) {

      if (Math.abs(this.y_velocity) != this.y_velocity) {
        //means it was traveling up
        this.y = 0 + this.radius;
      } else {
        this.y = this.canvas_height - this.radius;
      }

      // NOTE: Commented code was used for older collision mechanics
        // this.angle = 360 - this.angle;
        // this.radians = this.angle * Math.PI/ 180;
        // this.x_velocity = Math.cos(this.radians) * this.speed;
        // this.y_velocity = Math.sin(this.radians) * this.speed;
      //

      this.y_velocity = -this.y_velocity;

    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Pig);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SPRITES = {
  position1: [4, 4, 30, 40],
  position2: [37, 4, 30, 40],
  position3: [69, 4, 30, 40],
  position4: [102, 4, 30, 40],

  position5: [4, 50, 30, 40],
  position6: [37, 50, 30, 40],
  position7: [69, 50, 30, 40],
  position8: [102, 50, 30, 40],

  position9: [4, 96, 30, 40],
  position10: [37, 96, 30, 40],
  position11: [69, 96, 30, 40],
  position12: [102, 96, 30, 40],

  position13: [4, 143, 30, 40],
  position14: [37, 143, 30, 40],
  position15: [69, 143, 30, 40],
  position16: [102, 143, 30, 40]
};

class Coin {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 39;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/coin_sprite_sheet.png';

    this.spritecycle = 0;
  }

  update(ctx) {
    this.move();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: Uncomment to see the hit box of the object
      // ctx.fillStyle = "black";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
    //

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3]);

  }

  move() {
    //Move the coin if needs to be (it has been collected by the llama)
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  }

  getSprite() {
    this.spritecycle ++;

    if (this.spritecycle < 8) {
      return SPRITES.position1;
    } else if (this.spritecycle < 16) {
      return SPRITES.position2;
    } else if (this.spritecycle < 24) {
      return SPRITES.position3;
    } else if (this.spritecycle < 32) {
      return SPRITES.position4;
    } else if (this.spritecycle < 40) {
      return SPRITES.position5;
    } else if (this.spritecycle < 48) {
      return SPRITES.position6;
    } else if (this.spritecycle < 56) {
      return SPRITES.position7;
    } else if (this.spritecycle < 64) {
      return SPRITES.position8;
    } else if (this.spritecycle < 72) {
      return SPRITES.position9;
    } else if (this.spritecycle < 80) {
      return SPRITES.position10;
    } else if (this.spritecycle < 88) {
      return SPRITES.position11;
    } else if (this.spritecycle < 96) {
      return SPRITES.position12;
    } else if (this.spritecycle < 104) {
      return SPRITES.position13;
    } else if (this.spritecycle < 112) {
      return SPRITES.position14;
    } else if (this.spritecycle < 120) {
      return SPRITES.position15;
    } else if (this.spritecycle < 128) {
      return SPRITES.position16;
    } else {
      this.spritecycle = 0;
      return SPRITES.position1;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Coin);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const SPRITES = {
  number1: [58, 7, 40, 35],
  number2: [58, 45, 40, 35]
}

class Heart {
  constructor(x, y, canvas_width, canvas_height) {
    this.x = x;
    this.y = y;
    this.radius = 19;
    this.x_velocity = 3;
    this.y_velocity = 3;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.spritecycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/heart_sprite_sheet.png';
  }

  update(ctx) {
    this.move()
    this.canvasBorderCollision();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: uncomment this to show the hitcircle of the object
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";
      // ctx.fill();
      // ctx.closePath();
    //

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x - 18, this.y - 13, sprite[2], sprite[3]);
  }

  move() {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  }

  getSprite() {
    this.spritecycle ++;

    if (this.spritecycle < 20) {
      return SPRITES.number1;
    } else if (this.spritecycle < 40) {
      return SPRITES.number2;
    } else {
      this.spritecycle = 0;
      return SPRITES.number1;
    }

  }

  canvasBorderCollision() {

    //check left and right sides collision
    if (this.x + this.radius > this.canvas_width || this.x - this.radius < 0 ){

      //if collision detected, move object back
      if (this.x + this.radius > this.canvas_width) { //means it was traveling right
        this.x = this.canvas_width - this.radius;
      } else {
        this.x = 0 + this.radius;
      }
      //and change its x_velocity (direction)
      this.x_velocity = -this.x_velocity;

      //check up and bottom collision
      } else if (this.y - this.radius < 0 || this.y + this.radius > this.canvas_height) {

        //if collision detected, move object back
        if (Math.abs(this.y_velocity) != this.y_velocity) { //means it was traveling up
          this.y = 0 + this.radius;
        } else {
          this.y = this.canvas_height - this.radius
        }
      //and change its y_velocity (direction)
      this.y_velocity = -this.y_velocity;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Heart);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Sun {
  constructor(canvas_width, canvas_height) {

    this.x = -55;
    this.y = -55;
    this.radius = 55;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.image = new Image();
    this.image.src = "./assets/sprites/sun.png";
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }

  draw(ctx) {
    // NOTE: Uncomment to see sun borders
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";
      // ctx.fill();
      // ctx.closePath();
    //
    ctx.drawImage(this.image, this.x - 97, this.y - 100);
  }

  move() {
    this.x = this.x + .09;
    this.y = this.y + .05;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Sun);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Moon {
  constructor(canvas_width, canvas_height) {

    this.x = -55;
    this.y = -55;
    this.radius = 55;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.image = new Image();
    this.image.src = "./assets/sprites/moon.png";
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }

  draw(ctx) {
    // NOTE: Uncomment to see moon borders
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";     //comment in for tests
      // ctx.fill();                     //comment in for tests
      // ctx.closePath();
    //

    ctx.drawImage(this.image, this.x - 49, this.y - 49,);
  }

  move() {
    this.x = this.x + .09;
    this.y = this.y + .05;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Moon);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Platform {
  constructor(direction, trackNumber, x, y, speed) {
    this.direction = direction;
    this.trackNumber = trackNumber;
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.height = 22;
    this.width = 124;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/platform.png';
  }

  update(ctx) {
    this.move();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: Uncomment to see platform hitbox
      // let sprite = this.getSprite();
      // ctx.fillStyle = "black";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
      // ctx.drawImage(this.spritesheet, 233, 227, 300, 50, this.x, this.y - 12, 300, 50);
    //

    ctx.drawImage(this.spritesheet, 0, 0, 150, 150, this.x, this.y, 150, 150);
  }

  move() {
    if (this.direction === "right") {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Platform);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map