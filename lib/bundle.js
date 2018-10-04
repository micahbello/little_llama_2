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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_view_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_js__ = __webpack_require__(2);




document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById('canvas');

  const ctx = canvasEl.getContext("2d");
  canvasEl.width = __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].DIM_X;
  canvasEl.height = __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */].DIM_Y;
  const game = new __WEBPACK_IMPORTED_MODULE_1__game_js__["a" /* default */]();

  new __WEBPACK_IMPORTED_MODULE_0__game_view_js__["a" /* default */](ctx, game).start();
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


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


/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__llama_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cloud_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pig_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coin_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__special_object_js__ = __webpack_require__(8);







const CLOUDTRACKS = [
  ["left", 1],
  ["right", 2],
  ["left", 3],
  ["right", 4]
]

class Game {
  constructor() {
    this.llama = new __WEBPACK_IMPORTED_MODULE_0__llama_js__["a" /* default */](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.coin = new __WEBPACK_IMPORTED_MODULE_3__coin_js__["a" /* default */](100, 100);
    this.pigs =[new __WEBPACK_IMPORTED_MODULE_2__pig_js__["a" /* default */](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),
    new __WEBPACK_IMPORTED_MODULE_2__pig_js__["a" /* default */](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),new __WEBPACK_IMPORTED_MODULE_2__pig_js__["a" /* default */](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),new __WEBPACK_IMPORTED_MODULE_2__pig_js__["a" /* default */](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    this.clouds = [];
    // this.specialObjects = [new SpecialObject(100, 200, "heart")];
    this.specialObjects = [];

    this.score = 0;

    //audio sounds
    this.yeahSound = new Audio("./assets/audio/yeah.m4a");
    this.thatsAPig = new Audio("./assets/audio/thatspig.m4a");

    addEventListener("keydown", (e) => this.llama.keyDownHandler(e));
    addEventListener("keyup", (e) => this.llama.keyUpHandler(e));
  }

  draw(ctx) {
    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y)

    //the bottom two lines create the floor
    ctx.fillStyle = "green";
    ctx.fillRect(0, Game.DIM_Y - Game.FLOOR_HEIGHT, 750, Game.FLOOR_HEIGHT);

    this.checkObjectCollisions();
    this.updateObjects(ctx);
    // this.manageClouds();
  }


  updateObjects(ctx) {
    this.allObjects().forEach(object => {
      object.update(ctx)
    });
  }

  allObjects() {
    return [].concat(this.llama, this.coin).concat(this.pigs).concat(this.clouds).concat(this.specialObjects);
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
            this.clouds.push(new __WEBPACK_IMPORTED_MODULE_1__cloud_js__["a" /* default */](trackset[0], trackNumber, startingX, startingY, this.chooseCloudSpeed(trackNumber)));
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
            this.clouds.push(new __WEBPACK_IMPORTED_MODULE_1__cloud_js__["a" /* default */](trackset[0], trackNumber, startingX, startingY, this.chooseCloudSpeed(trackNumber)));
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
        console.log("colliding")
        this.thatsAPig.play();
        this.llama.y = this.llama.y - 5;
        this.llama.jumping = true;

        let canvas = document.getElementById("canvas");
        debugger
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
      this.coin = new __WEBPACK_IMPORTED_MODULE_3__coin_js__["a" /* default */] (this.createRandomCoord(0, Game.DIM_X - 25), this.createRandomCoord(0, Game.DIM_Y - Game.FLOOR_HEIGHT - 39));
      //make a new pig here this.newBall("black");
      this.score ++;
      this.yeahSound.play();
      this.llama.hearts --;
    }
  }

  checkLlamaCloudCollision() {
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
            // console.log("collision detected")
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_object_js__ = __webpack_require__(4);


//
const SPRITES = {
  leftPosition1: [33, 137, 55, 55],
  leftPosition2: [146, 137, 55, 55],
  leftPosition3: [258, 137, 55, 55],
  leftPosition4: [371, 137, 55, 55],

  rightPosition1: [34, 362, 55, 55],
  rightPosition2: [147, 362, 55, 55],
  rightPosition3: [259, 362, 55, 55],
  rightPosition4: [372, 362, 55, 55]
}

class Llama extends __WEBPACK_IMPORTED_MODULE_0__moving_object_js__["a" /* default */] {
  constructor(canvas_width, canvas_height) {
    super();

    this.x = 30;
    this.y = 0;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.height = 52;
    this.width = 45;
    this.jumping = true;
    this.walkcycle = 0;
    this.hearts = 4;
    this.lastDirectionFaced = "right";
    this.jumpPower = -27;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/llama_run_sprite_sheet.png';
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.keysPressed = [];
  }

  getSprite() {

    if (!this.keysPressed[37] && !this.keysPressed[39] && this.jumping === false) {
      this.walkcycle = 0;
      this.spritesheet.src = './assets/sprites/llama_stand_sprite_sheet.png';

      if (this.lastDirectionFaced === "right") {
        return SPRITES.rightPosition1
      } else if (this.lastDirectionFaced === "left") {
        return SPRITES.leftPosition1
      }
    }


    if (this.keysPressed[37]) {
      this.walkcycle ++;
      this.spritesheet.src = './assets/sprites/llama_run_sprite_sheet.png';

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
      this.spritesheet.src = './assets/sprites/llama_run_sprite_sheet.png';

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
      this.spritesheet.src = './assets/sprites/llama_run_sprite_sheet.png';

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

  draw(ctx) {
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    const sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3]);
  }


  update(ctx) {
    if (this.keysPressed[37]) {
      this.x_velocity -= 1;

    } else if (this.keysPressed[39]) {
      this.x_velocity += 1;
    }

    if (this.keysPressed[38] && this.jumping === false) {
      this.y_velocity = this.jumpPower;
      this.jumping = true;
    }

    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.y_velocity += 1.5;
    this.x_velocity *= 0.8;
    this.y_velocity *= 0.9;

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


    this.draw(ctx)
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Llama);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Cloud {
  constructor(direction, trackNumber, x, y, speed) {
    this.x = x;
    this.y = y;
    this.height = 20;
    this.width = 124;
    this.direction = direction;
    this.trackNumber = trackNumber;
    this.speed = speed;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/clouds_sprite_sheet.png';
  }

  draw(ctx) {

    // let sprite = this.getSprite();
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.spritesheet, 233, 227, 300, 50, this.x, this.y - 12, 300, 50);

    // if (this.x > 300) {
    //   this.speed = 0;
    // }
  }

  update(ctx) {

    if (this.direction === "right") {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }

    this.draw(ctx);
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Cloud);


/***/ }),
/* 6 */
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
  rightPosition4: [370, 385, 100, 100]

}

class Pig {
  constructor(canvas_width, canvas_height) {
    this.x = Math.floor(Math.random() * 500);
    this.y = Math.floor(Math.random() * 300);;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    // this.angle = 45;
    // this.radians = this.angle * Math.PI/180;
    this.radius = 15;
    // this.speed = 4;


    // this.x_velocity = Math.cos(this.radians) * this.speed;
    // this.y_velocity = Math.sin(this.radians) * this.speed;

    this.x_velocity = 3;
    this.y_velocity = 3;

    this.spritecycle = 0;
    this.direction = "right";

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/pig_sprite_sheet.png';
  }

  //functions

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

  draw(ctx) {
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    // ctx.fillStyle = "black";     //comment in for tests
    // ctx.fill();                     //comment in for tests
    // ctx.closePath();

    this.x += this.x_velocity;
    this.y += this.y_velocity;

    if (Math.abs(this.x_velocity) === this.x_velocity) {
      //pig is moving to the right
      this.direction = "right";
    } else {
      this.direction = "left";
    }

    this.mass = 5;
    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x - 24, this.y - 11, sprite[2], sprite[3]);
  }

  update(ctx) {
    this.canvasBorderCollision()
    this.draw(ctx);
  }

  canvasBorderCollision() {

    if (this.x + this.radius > this.canvas_width || this.x - this.radius < 0 ){
      if (this.x + this.radius > this.canvas_width) {
        this.direction = "left";
        this.x = this.canvas_width - this.radius;
      } else {
        this.direction = "right";
        this.x = 0 + this.radius;
      }

      // this.angle = 180 - this.angle;
      // this.radians = this.angle * Math.PI/ 180;
      // this.x_velocity = Math.cos(this.radians) * this.speed;
      // this.y_velocity = Math.sin(this.radians) * this.speed;

      this.x_velocity = -this.x_velocity;

      } else if (this.y - this.radius < 0 || this.y + this.radius > this.canvas_height) {

      if (Math.abs(this.y_velocity) != this.y_velocity) {
        //means it was traveling up
        this.y = 0 + this.radius;
      } else {
        this.y = this.canvas_height - this.radius
      }

      // this.angle = 360 - this.angle;
      // this.radians = this.angle * Math.PI/ 180;
      // this.x_velocity = Math.cos(this.radians) * this.speed;
      // this.y_velocity = Math.sin(this.radians) * this.speed;

      this.y_velocity = -this.y_velocity;

    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Pig);


/***/ }),
/* 7 */
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
}


class Coin {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 39;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/coin_sprite_sheet.png';

    this.spritecycle = 0;
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


  draw(ctx) {
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3]);

  }

  update(ctx) {
    this.draw(ctx);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Coin);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Sprites = {

}


class SpecialObject {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 31;
    this.type = type;
    this.spritecycle = 0;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/heart_sprite_sheet.png';
  }

  getSprite() {

  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, 8, 7, 40, 35, this.x, this.y, 40, 35);
  }

  update(ctx) {
    this.draw(ctx);
  }

}

/* unused harmony default export */ var _unused_webpack_default_export = (SpecialObject);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map