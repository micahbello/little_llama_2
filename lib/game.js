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

const SPAWNCIRCLES = [ //x, y, radius
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

const COINDEPOSITCOORD = {x: 10, y: 5};
const HEARTDEPOSITCOORD = {x: 95, y: 5};

class Game {
  constructor() {
    this.background = new Background(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.llama = new Llama(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.coins = [new Coin(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300))];
    this.pigs = [new Pig(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300), Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    this.platforms = [];
    this.specialObjects = [];

    this.score = 0;
    this.previousScore = 0;

    // NOTE: the next two are necessary to allow for hearts and score
    //to update in the game before they reach the counter at the top left.
    //The counter will display what has reached it (with the next two attributes),
    //but the game will still be able to update what the llama has
    //actually collected with game.score and llama.hearts
    this.llamaHeartsOnCounter = this.llama.hearts;
    this.scoreOnCounter = 0;

    this.shaking = false;
    this.shakingTimer = 0;

    this.status = "unPaused";
    this.gameOver = false;
    this.heartSpawnCycle = 0;

    this.yeahSound = new Audio("./assets/audio/yeah.m4a");
    this.thatsAPigSound = new Audio("./assets/audio/thatspig.m4a");
    this.youDeadSound = new Audio("./assets/audio/youdead.m4a");

    this.heartIcon = new Image();
    this.heartIcon.src = './assets/sprites/heart_icon.png';

    this.coinIcon = new Image();
    this.coinIcon.src = './assets/sprites/coin_icon.png';

    // NOTE: Uncomment indvidually for debugging/testing purposes
    // this.coins = [new Coin(10, 10)];
    // this.pigs = [new Pig(700, 400, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    // this.pigs = [new Pig(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300), Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT), new Pig(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300), Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT), new Pig(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300), Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT), new Pig(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300), Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    // this.specialObjects = [new Heart(300, 300, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];

    addEventListener("keydown", (e) => this.llama.keyDownHandler(e));
    addEventListener("keyup", (e) => this.llama.keyUpHandler(e));
  }


// NOTE: General flow functions
  update(ctx) {

    if (this.llama.status === "dead" && this.llama.y > Game.DIM_Y) {
      if (this.areNoCoinsInactive()) {
        this.gameOver = true;
        this.youDeadSound.play();
      }
    }

    // TODO: Come back to this and fix it
      if (this.shaking === true && this.shakingTimer >= 6) {
        this.shaking = false;
        this.shakingTimer = 0;
        let canvas = document.getElementById("canvas");
        canvas.classList.remove("shake");
      } else if (this.shaking === true && this.shakingTimer < 6) {
        this.shakingTimer ++;
      }
    //

    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);

    this.background.update(ctx);
    this.createGround(ctx);
      //NOTE: comment in to see pig spawn circles
      // this.showSpawnCircles(ctx);
    this.manageHearts();
    this.managePlatforms();
    this.checkObjectCollisions();
    this.manageOutBoundsPigsAndItems();
    this.manageInactiveItems();
    this.updateObjects(ctx);
    this.drawScore(ctx);
  }

  createGround(ctx) {
    ctx.fillStyle = "#6B8E23";
    ctx.fillRect(0, Game.DIM_Y - Game.FLOOR_HEIGHT, 750, Game.FLOOR_HEIGHT);
  }

  showSpawnCircles(ctx) {
    SPAWNCIRCLES.forEach(set => {
      ctx.beginPath();
      ctx.arc(set[0], set[1], set[2], 0, Math.PI*2);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
    });
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

  manageOutBoundsPigsAndItems() {
    //delete pigs, items and special objects that leave the canvasx
    for (let i = 0; i < this.pigs.length; i++) {
      if (this.pigs[i].x < - 50 || this.pigs[i].x > Game.DIM_X + 50) {
        this.pigs.splice(i, 1);
      }
    }
  }

  manageInactiveItems() {
    // NOTE: Delete inactive items (coins, hearts) as soon as they reach their
    //"depositpositions"
    for (let i = 0; i < this.specialObjects.length; i++) {
      if (this.specialObjects[i] instanceof Heart) {
        if (this.specialObjects[i].status === "inactive") {
          // NOTE: add radius to deposit coord to account for spheres'
          //x and y being in the center of sphere
          if (this.specialObjects[i].x < HEARTDEPOSITCOORD.x + this.specialObjects[i].radius && this.specialObjects[i].y < HEARTDEPOSITCOORD.y + this.specialObjects[i].radius) {
            this.specialObjects.splice(i, 1);
            this.llamaHeartsOnCounter ++;
          }
        }
      }
    }

    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].status === "inactive") {
        // NOTE: The two || in the conditional below is to account when sometimes
        //the y_velocity is so miniscule that the coin's y coord never falls
        //under the COINDEPOSITCOORD.y or the x_velocity is so minisucle that...
        //When this happens, the game fails to end
        //because the game only ends once all inactive coins are deleted out of the
        //this.coins array. That only happens once the coin's x and y falls below
        // the COINDEPOSITCOORDs
        if ((this.coins[i].x < COINDEPOSITCOORD.x && this.coins[i].y < COINDEPOSITCOORD.y) || (this.coins[i].x < -10) || (this.coins[i].y < -10)) {
          this.coins.splice(i, 1);
          this.scoreOnCounter ++;
        }
      }
    }
  }

  managePlatforms() {

    if (this.llama.status === "flightMode") {
      return;
    }

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

  checkObjectCollisions() {
    this.checkSphereSphereCollisions();
    this.checkLlamaPlatformCollision();
    this.checkLLamaCoinCollision();
    this.checkPigAndSpecialObjPlatformCollision();
    this.checkLlamaPigCollision();
    this.checkLlamaSpecialObjCollision();
  }

  updateObjects(ctx) {
    this.allObjects().forEach(object => {
      object.update(ctx)
    });
  }

  drawScore(ctx) {
    // NOTE: Old method of showing score
      // ctx.font = "16px Monospace";
      // ctx.fillStyle = "black";
      // ctx.fillText(`Score: ${this.score} | Health: ${this.llama.hearts}`, 8, 20);
    //
    ctx.drawImage(this.coinIcon, 0, 0, 35, 35, COINDEPOSITCOORD.x, COINDEPOSITCOORD.y, 26, 26);
    ctx.font = "17px Monospace";
    ctx.fillStyle = "black"
    ctx.fillText(`x ${this.scoreOnCounter}`, COINDEPOSITCOORD.x + 25, COINDEPOSITCOORD.y + 15);


    ctx.drawImage(this.heartIcon, 0, 0, 30, 30, HEARTDEPOSITCOORD.x, HEARTDEPOSITCOORD.y, 28, 28);
    ctx.font = "17px Monospace";
    ctx.fillStyle = "black";
    ctx.fillText(`x ${this.llamaHeartsOnCounter}`, HEARTDEPOSITCOORD.x + 32, HEARTDEPOSITCOORD.y + 15);
  }


  // NOTE: Collision detecion related functions

  // NOTE: This following function makes sure all pigs and specialObjects
  //bounce of each other
  checkSphereSphereCollisions(ctx) {

    if (this.llama.status === "normal") {
      return;
    }

    let sphericalObjects = this.pigs.concat(this.specialObjects);

    for (let i = 0; i < sphericalObjects.length; i++) {
      for (let j = 0; j < sphericalObjects.length; j++) {
        if (sphericalObjects[i] != sphericalObjects[j]) {

          if (sphericalObjects[i].status === "active" && sphericalObjects[j].status === "active") {
            if (this.areSpheresColliding(sphericalObjects[i], sphericalObjects[j])) {

              // NOTE: 1st line- no elastic response. 2nd line - elastic response
              // sphericalObjects[i].y_velocity = -sphericalObjects[i].y_velocity;
              this.resolveSphereSphereCollision(sphericalObjects[i], sphericalObjects[j]);
            }
          }
        }
      }
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

  checkLLamaCoinCollision() {

    //only checks collision with active coins
    let coin = this.returnActiveObject("coin");
    let llamaFront = this.llama.x + this.llama.width;
    let llamaBottom = this.llama.y + this.llama.height;
    let coinFront = coin.x + coin.width;
    let coinBottom = coin.y + coin.height;

    //TODO: compare this code to the llamapig collision detection and the sphere non sphere collsion detecion
    if ((this.llama.y < coinBottom && coin.y < llamaBottom && llamaFront > coin.x && coinFront > llamaFront) || (this.llama.y < coinBottom && coin.y < llamaBottom && this.llama.x < coinFront && llamaFront > coin.x)) {

      this.resolveLlamaItemsCollision(coin);
      //the creation of the new coin takes into account width and height, and ground height
      // coin = new Coin (this.createRandomCoord(0, Game.DIM_X - 25), this.createRandomCoord(0, Game.DIM_Y - Game.FLOOR_HEIGHT - 39));
      this.coins.push(new Coin(this.createRandomCoord(0, Game.DIM_X - 25), this.createRandomCoord(0, Game.DIM_Y - Game.FLOOR_HEIGHT - 39)));
      this.score ++;
      this.yeahSound.play();
      this.createNewPig();
    }
  }

  // NOTE: This next method will change the velocity vectors of certain
  //objects so that they become inactive and fly to the corner of the canvas
  resolveLlamaItemsCollision(object) {

    object.status = "inactive";

    let destination = {};

    if (object instanceof Coin) {
      destination.x = COINDEPOSITCOORD.x;
      destination.y = COINDEPOSITCOORD.y;
    } else if (object instanceof Heart) {
      destination.x = HEARTDEPOSITCOORD.x;
      destination.y = HEARTDEPOSITCOORD.y;
    }

    let collisionCoord = {x: object.x, y: object.y};

    let xDistance = destination.x - collisionCoord.x;
    let yDistance = destination.y - collisionCoord.y;

    let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
    let desiredVelocity = 7; //4 px per frame = 180px per second (4x60)
    let offset = desiredVelocity/distance;
    let newXVelocity = xDistance * offset;
    let newYVelocity = yDistance * offset;

    object.x_velocity = newXVelocity;
    object.y_velocity = newYVelocity;
  }

  checkPigAndSpecialObjPlatformCollision() {
    let objects = this.pigs.concat(this.specialObjects);

    for (let i = 0; i < this.platforms.length; i++) {
      for (let j = 0; j < objects.length; j++) {

        let platformFront = this.platforms[i].x + this.platforms[i].width;
        let platformBottom = this.platforms[i].y + this.platforms[i].height;
        let object = objects[j];
        let platform = this.platforms[i];

        // if (object instanceof Pig) {
          if (object.status === "active" && object.x + object.radius > platform.x && object.x - object.radius < platformFront && object.y + object.radius > platform.y && object.y - object.radius < platformBottom){

            if (object.y_velocity === Math.abs(object.y_velocity)) {
              object.y = platform.y - object.radius + 2
            } else {
              object.y = platformBottom + object.radius + 2
            }
            object.y_velocity = -object.y_velocity;
          }
        // } else if (!(object instanceof Pig) ){
        //   if (object.status === "active" && object.x + object.radius > platform.x && object.x - object.radius < platformFront && object.y + object.radius > platform.y && object.y - object.radius < platformBottom){
        //
        //     if (object.y_velocity === Math.abs(object.y_velocity)) {
        //       object.y = platform.y - object.radius + 2
        //     } else {
        //       object.y = platformBottom + object.radius + 2
        //     }
        //     object.y_velocity = -object.y_velocity;
        //   }
        // }
      }
    }
  }

  checkLlamaPigCollision() {

    for (let i = 0; i < this.pigs.length; i++) {
      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;

      if (this.pigs[i].status === "active") {

        if (this.llama.forceFieldOn === true) {
          if (this.areSpheresColliding(this.llama.forceField, this.pigs[i])) {
            this.pigs[i].status = "dead"

            this.pigs[i].x_velocity = 0;
            this.pigs[i].y_velocity = 0;
          }
        }


        // NOTE: This following conditional is not the same as the areSphereNonSphereColliding(sphere, fourSidedObj) function.
        //That function is the "correct" and strict way to do collision detecion on sides and spherical objects. This one allows
        //for a more "generous" collision detection between pig and llama. Use areSphereNonSphereColliding(sphere, fourSidedObj)
        //for collision detection between llama and spawncircles because that detection needs to be precise.
        if (this.pigs[i].x > this.llama.x && this.pigs[i].x < llamaFront && this.pigs[i].y > this.llama.y && this.pigs[i].y < llamaBottom) {
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
      this.llamaHeartsOnCounter --;
      pig.status = "inactive";
      this.thatsAPigSound.play();
    } else {
      this.shakingTimer ++;
      this.llama.hearts --;
      this.llamaHeartsOnCounter --;
      pig.status = "inactive";
      this.thatsAPigSound.play();
    }
  }

  checkLlamaSpecialObjCollision() {
    for (let i = 0; i < this.specialObjects.length; i++) {
      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;

      if (this.areSphereNonSphereColliding(this.specialObjects[i], this.llama)) {
        if(this.specialObjects[i] instanceof Heart && this.specialObjects[i].status === "active") {
          // this.specialObjects.splice(i, 1);
          this.resolveLlamaItemsCollision(this.specialObjects[i]);
          this.llama.hearts++;
        }
      }
    }
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

  resolveSphereSphereCollision(sphere1, sphere2) {
    // NOTE: Elastic collsision
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

      // NOTE: next few lines if commented in will offset the new velocities
      //so that pigs will maintain same overall velocity throughout
      //this portion was all my logic
        // let startingPigVelocity = Math.sqrt(18); //x_velocity = 3, y_velocity = 3
        // let newVelocity1 = Math.sqrt(vFinal1.x * vFinal1.x + vFinal1.y * vFinal1.y);
        // let newVelocity2 = Math.sqrt(vFinal2.x * vFinal2.x + vFinal2.y * vFinal2.y);
        // let offset1 = startingPigVelocity/newVelocity1;
        // let offset2 = startingPigVelocity/newVelocity2;
        //
        // vFinal1.x *= offset1;
        // vFinal1.y *= offset1;
        // vFinal2.x *= offset2;
        // vFinal2.y *= offset2;
      //

      sphere1.x_velocity = vFinal1.x;
      sphere1.y_velocity = vFinal1.y;

      sphere2.x_velocity = vFinal2.x;
      sphere2.y_velocity = vFinal2.y;
    }
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


// NOTE: Platform related functions
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


// NOTE: Miscellaneous functions
  returnActiveObject(objectType) {
    if (objectType === "coin") {
      //assumes that in the array of coins, the last one is the only active one
      return this.coins[this.coins.length - 1];
    }
  }


  returnEmptySpawnCircle() {
    //TODO: Refactor for better optomization

    let objects = [].concat(this.llama).concat(this.pigs).concat(this.specialObjects);

    let circles = [true,true,true,true,true,true,true,true,true,true,true];

    for (let i = 0; i < SPAWNCIRCLES.length; i++) {
      for (let j = 0; j < objects.length; j++) {
        if (objects[j] instanceof Pig){

          if (this.areSpheresColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1], radius: SPAWNCIRCLES[i][2]}, objects[j]) && (objects[j].status === "active" || objects[j].status === "testing")) {
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

  rotate(velocity, angle) {
    let rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
  }

  allObjects() {
    let gameObjects = [].concat(this.pigs).concat(this.platforms).concat(this.specialObjects).concat(this.llama).concat(this.coins);
    return gameObjects;
  }

  // NOTE: All-purpose function to create random coords
  createRandomCoord(min, max) {
    return Math.random() * (max - min) + min;
  }

  // NOTE: This checks to see if any coins on the canvas are currently
  //inactive and making their way to the deposit on the top left. The
  //game will not be over until no inactive coins exists. This makes sure
  //that all coins make it to the deposit (although the game will have already
  //registered it, it will not be showing on the screen unless it reaches the
  //deposit). Even if the llama has died and fallen below the canvas, the game
  // will wait for the coin to get to the deposit before ending.
  areNoCoinsInactive() {
    for (let i = 0; i < this.coins.length; i++) {
      if (this.coins[i].status === "inactive") {
        return false
      }
    }

    return true;
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
