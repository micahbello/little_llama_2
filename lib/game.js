import Background from './background/background.js';
import Llama from './animals/llama.js';
import Platform from './other_objects/platform.js';
import Pig from './animals/pig.js';
import Coin from './other_objects/coin.js';
import Heart from './other_objects/heart.js';
import Bacon from './other_objects/bacon.js';
import WeaponItem from './special_items/weapon_items.js';
import ForceField from './weapons/forcefield.js';
import BubbleShield from './weapons/bubble_shield.js';
import TimeController from './weapons/time_controller.js';
import Sun from './background/sun.js';
import Bird1 from './background/bird_1.js';
import WeaponsContainer from './special_items/weapons_container.js';
import {slowModeSpeedReducer, PLATFORMTRACKS, SPAWNCIRCLES, COINDEPOSITCOORD,
        HEARTDEPOSITCOORD, BACONDEPOSITCOORD, CANVAS_FONT} from './constants.js';
import Util from './util.js';

class Game extends Util {
  constructor(mode, displayType) {
    super();
    this.background = new Background(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.llama = new Llama(Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, mode);
    this.coins = [new Coin(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300))];
    this.platforms = [];
    this.itemsInPlay = [];
    this.weaponsContainer = new WeaponsContainer(this.llama.weaponsInPossession, this.llama.weaponTogglePosition, "black", this.llama.activeWeaponIndex);

    this.score = 0;
    this.previousScore = 0;

    // NOTE: the next 4 are necessary to allow for hearts and score
    //to update in the game before they reach the counter at the top left.
    //The counter will display what has reached it (with the next two attributes),
    //but the game will still be able to update what the llama has
    //actually collected with game.score and llama.hearts
    this.baconsCollected = 0;
    this.baconsOnCounter = 0;

    this.llamaHeartsOnCounter = this.llama.hearts;
    this.scoreOnCounter = 0;

    this.shaking = false;
    this.shakingTimer = 0;

    this.gameMode = mode;

    this.status = "unPaused";
    this.gameOver = false;
    this.heartSpawnCycle = 0;
    this.weaponsSpawnCycle = 0;

    this.specialPigCycleSpawning = 0;

    this.treesSpriteSheet = new Image();
    this.treesSpriteSheet.src = "./assets/sprites/floor/trees.png";

    this.yeahSound = new Audio("./assets/audio/yeah.m4a");
    this.thatsAPigSound = new Audio("./assets/audio/thatspig.m4a");
    this.youDeadSound = new Audio("./assets/audio/youdead.m4a");
    //
    this.heartIcon = new Image();
    this.heartIcon.src = './assets/sprites/other_objects/heart_icon.png';

    this.coinIcon = new Image();
    this.coinIcon.src = './assets/sprites/other_objects/coin_icon.png';

    this.baconIcon = new Image();
    this.baconIcon.src = './assets/sprites/other_objects/bacon.png';

    this.fps = 0;
    this.secondsElapsed = 0;
    //
    this.status = displayType || "normal-play"

    // // NOTE: Uncomment indvidually for debugging/testing purposes
    // // this.coins = [new Coin(50, 10)];
    // // this.itemsInPlay = [new Heart(300, 300, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT)];
    // this.itemsInPlay = [
    //   // new Pig(100, 100, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "invisibleLlama"),
    //   // new WeaponItem(600, 300, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "timeController"),new WeaponItem(600, 300, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "timeController"),
    //   // new WeaponItem(600, 25, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "forceFieldBlast"),new Pig(Math.floor(Math.random() * 500), Math.floor(Math.random() * 300), Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT),
      // new WeaponItem(600, 100, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "forceFieldBlast"), new WeaponItem(600, 50, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "forceFieldBlast")
    // ];
    // // this.itemsInPlay = [new WeaponItem(600, 300, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "timeController"),
    // // new WeaponItem(600, 300, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "timeController"),new WeaponItem(600, 300, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "timeController"),
    // // new WeaponItem(300, 100, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "bubbleShield"), new WeaponItem(300, 25, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "forceFieldBlast")
    // // ]

    addEventListener("keydown", (e) => this.llama.keyDownHandler(e));
    addEventListener("keyup", (e) => this.llama.keyUpHandler(e));
  }


// NOTE: General flow functions
  update(ctx) {

    this.updateDocumentSideStats();

    if (this.background.luminary instanceof Sun) {
      this.llama.weaponTextDisplayColor = "black";
    } else {
      this.llama.weaponTextDisplayColor = "white";
    }

    this.manageObjectsWhenInSlowMode();

    this.fps ++;
    if (this.fps > 60) {
      this.fps = 0;
      this.secondsElapsed ++;
    }

    if (this.llama.status === "dead") {

      this.llama.invisible = false;
      //if canvas is flipped, remove it
      this.llama.flippedCanvas = false;
      document.getElementById("canvas").classList.remove("flipped");

      if (this.llama.y > Game.DIM_Y) {
        if (this.areNoItemsInactive()) {
          this.gameOver = true;

          // this.youDeadSound.play();
        }
      }
    }


    // TODO: Come back to this and fix it
      if (this.shaking === true && this.shakingTimer >= 6) {
        this.shaking = false;
        this.shakingTimer = 0;
        let canvas = document.getElementById("canvas");
        canvas.classList.remove("shake");
        canvas.classList.remove("shakeflip")
      } else if (this.shaking === true && this.shakingTimer < 6) {
        this.shakingTimer ++;
      }
    //

    ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);

    this.background.update(ctx);
    this.createGround(ctx);

    if (this.status === "normal-play") {
      //NOTE: comment in to see pig spawn circles
      // this.showSpawnCircles(ctx);
      this.manageHeartsSpawning();
      this.manageWeaponItemsSpawing();
      this.managePlatforms();
      this.checkObjectCollisions();
      this.manageInactiveAndDiscardedItems();
      this.manageSpecialPigSpawning();
      this.updateObjects(ctx);
      this.drawScore(ctx);
      this.updateBaconToHearts(ctx);
    }
  }

  createGround(ctx) {
    ctx.fillStyle = "#6B8E23";
    ctx.fillRect(0, Game.DIM_Y - Game.FLOOR_HEIGHT, 750, Game.FLOOR_HEIGHT);

    //create trees
    ctx.drawImage(this.treesSpriteSheet, 0, 0, 135, 135, 0, 380, 135, 135);
    ctx.drawImage(this.treesSpriteSheet, 250, 0, 145, 145, 300, 390, 145, 145);
    ctx.drawImage(this.treesSpriteSheet, 0, 70, 70, 700, 600, 260, 70, 700);
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

  manageHeartsSpawning() {
    // Hearts potentially spawn every 20 seconds (1200/60fps)

    if (this.heartSpawnCycle < 1200) { // 1200/60 = 20 second cycle
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
      } else if (this.score - this.previousScore < 28) {
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.previousScore = this.score;
      } else if (this.score - this.previousScore < 32) {
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.creatNewHeart();
        this.previousScore = this.score;
      }
    }
  }

  manageWeaponItemsSpawing() {

    if (this.weaponsSpawnCycle < 720) { // 720/60 = 12 second cycle
      this.weaponsSpawnCycle ++;
    } else {
      this.weaponsSpawnCycle = 0;
      this.spawnNewWeaponItem();
    }
  }

  // NOTE: this function makes sure that the total number of weapons that llama
  //has equipped, or available to grab does not exceed 3
  //THIS FUNCTION IS NO LONGER IN USE. It used to be used in the
  //manageWeaponItemsSpawing() method
  noMoreThanThreeWeaponsInPlay() {
    let numberOfItems = 0;

    this.llama.weaponsInPossession.forEach(weapon => {
        numberOfItems ++;
    });

    this.itemsInPlay.forEach(item => {
      if (item instanceof WeaponItem) {
        numberOfItems ++;
      }
    });

    if (numberOfItems < 3) {
      return true
    }

    return false;
  }

  manageInactiveAndDiscardedItems() {
    // NOTE: Delete inactive items (coins, hearts) as soon as they reach their
    //"depositpositions"
    for (let i = 0; i < this.itemsInPlay.length; i++) {
      if (this.itemsInPlay[i] instanceof Heart) {
        if (this.itemsInPlay[i].status === "inactive") {
          // NOTE: add radius to deposit coord to account for spheres'
          //x and y being in the center of sphere
          if (this.itemsInPlay[i].x < HEARTDEPOSITCOORD.x + this.itemsInPlay[i].radius && this.itemsInPlay[i].y < HEARTDEPOSITCOORD.y + this.itemsInPlay[i].radius) {
            this.itemsInPlay.splice(i, 1);
            this.llamaHeartsOnCounter ++;
          }
        }
      } else if (this.itemsInPlay[i] instanceof Bacon) {
        if (this.itemsInPlay[i].status === "inactive") {
          let bacon = this.itemsInPlay[i];
          if ((bacon.x < BACONDEPOSITCOORD.x && bacon.y < BACONDEPOSITCOORD.y) || (bacon.x < -10) || (bacon.y < -10)) {
            this.itemsInPlay.splice(i, 1);
            this.baconsOnCounter ++;
          }
        }
      } else if (this.itemsInPlay[i] instanceof Pig) {
        if (this.itemsInPlay[i].status === "inactive" || this.itemsInPlay[i].type != "normal") {
          if (this.itemsInPlay[i].x < - 50 || this.itemsInPlay[i].x > Game.DIM_X + 50 || this.itemsInPlay[i].y < -50 || this.itemsInPlay[i].y > this.canvas_height + 50) {
            this.itemsInPlay.splice(i, 1);
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

    for (let i = 0; i < this.llama.weaponsDiscarded.length; i++) {
      if (this.llama.weaponsDiscarded[i].status === "discarded") {
        if (this.llama.weaponsDiscarded[i].x > Game.DIM_X + 50) {
          this.llama.weaponsDiscarded.splice(i, 1);
        }
      }
    }
  }

  manageSpecialPigSpawning() {
    if (this.specialPigCycleSpawning < 2700) { //a cycle of 45 sec
      this.specialPigCycleSpawning ++;
    } else {
      this.specialPigCycleSpawning = 0;
      this.createNewSpecialPig();
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
    this.checkItemsInPlayCollisions();
    this.checkLlamaPlatformCollision();
    this.checkLLamaCoinCollision();
    this.checkPigAndItemsInPlayPlatformCollision();
    this.checkLlamaItemsInPlayCollision();
  }

  updateDocumentSideStats() {
    document.getElementById("current-heart-count").innerHTML = `${this.llamaHeartsOnCounter}`;
    document.getElementById("current-coin-count").innerHTML = `${this.scoreOnCounter}`;
    document.getElementById("current-bacon-count").innerHTML = `${this.baconsOnCounter} (total)`;
    document.getElementById("current-mode").innerHTML = `${this.gameMode}`;
  }

  updateObjects(ctx) {
    // NOTE: This if statement makes sure there is always at least one pig
    //in play

    if (this.status != "background-demo"){
      if (this.areNoPigsInPlay()) {
        this.createNewPig();
      }
    }


    this.allObjects().forEach(object => {
      if (object instanceof WeaponsContainer) {
        // NOTE: Next line is not necessary, so it is uncommented.
        //The  object.equippedLLamaWeapons references the same space in
        //memory as this.llama.weaponsInPossession so it updates itself
        // object.equippedLLamaWeapons = this.llama.weaponsInPossession;

        //same with the next line. When the llama.weaponsInPossession array is
        //unodated, it updates the one for the weapon Container
        this.llama.activeWeaponIndex[0] = -1;
        for (let i = 0; i < this.llama.weaponsInPossession.length; i ++) {
          if (this.llama.weaponsInPossession[i].status === "activated") {
            this.llama.activeWeaponIndex[0] = i;
          }
        }

        object.weaponTogglePosition = this.llama.weaponTogglePosition;
        object.outlineColor = this.background.luminary instanceof Sun ? "black" : "white";
      }

      object.update(ctx)
    });
  }

  drawScore(ctx) {
    let outlineColor = this.background.luminary instanceof Sun ? "black" : "white"

    //coin
    ctx.drawImage(this.coinIcon, 0, 0, 35, 35, COINDEPOSITCOORD.x, COINDEPOSITCOORD.y, 26, 26);
    ctx.font = `17px ${CANVAS_FONT}`;
    ctx.textAlign = "left"
    ctx.fillStyle = outlineColor
    ctx.fillText(`x ${this.scoreOnCounter}`, COINDEPOSITCOORD.x + 25, COINDEPOSITCOORD.y + 15);

    //heart
    ctx.drawImage(this.heartIcon, 0, 0, 30, 30, HEARTDEPOSITCOORD.x, HEARTDEPOSITCOORD.y, 28, 28);
    ctx.font = `17px ${CANVAS_FONT}`;
    ctx.fillStyle = outlineColor;
    ctx.fillText(`x ${this.llamaHeartsOnCounter}`, HEARTDEPOSITCOORD.x + 32, HEARTDEPOSITCOORD.y + 15);

    //bacons
    ctx.drawImage(this.baconIcon, 10, 10, 300, 300, BACONDEPOSITCOORD.x, BACONDEPOSITCOORD.y, 50, 50);
    ctx.font = `17px ${CANVAS_FONT}`;
    ctx.fillStyle = outlineColor;
    ctx.fillText(`x ${this.baconsOnCounter}`, BACONDEPOSITCOORD.x + 43, BACONDEPOSITCOORD.y + 15);

    //seconds elapsed
    ctx.font = `14px ${CANVAS_FONT}`;
    ctx.fillStyle = outlineColor;
    ctx.textAlign="right";
    ctx.fillText(`time elapsed: ${this.secondsElapsed}`, 570, 21);
  }

  updateBaconToHearts(ctx) {
    if (this.baconsOnCounter === 5) {
      this.baconsOnCounter = 0;

      let heartFromBacon = new Heart(BACONDEPOSITCOORD.x, BACONDEPOSITCOORD.y, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "inactive");

      this.resolveLlamaItemsWithDepositSpacesCollision(heartFromBacon)

      this.itemsInPlay.push(heartFromBacon);
      this.llama.hearts ++;

    }
  }

  // NOTE: Collision detecion related functions
  // NOTE: This following function makes sure all pigs and specialObjects
  //bounce of each other
  checkItemsInPlayCollisions(ctx) {
    // NOTE: llama status will be normal only in the day
    if (this.llama.status === "normal") {
      return;
    }

    let sphericalObjects = this.itemsInPlay;

    for (let i = 0; i < sphericalObjects.length; i++) {
      for (let j = 0; j < sphericalObjects.length; j++) {
        if (sphericalObjects[i] != sphericalObjects[j]) {

          if (sphericalObjects[i] instanceof Bacon || sphericalObjects[j] instanceof Bacon) {
            // NOTE: Bacon is not spherical
            continue;
          }

          if (sphericalObjects[i].status === "available" && sphericalObjects[j].status === "available") {
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

          if (this.llama.returnCurrentActivatedWeapon() instanceof TimeController) {
            this.llama.x += platform.speed * slowModeSpeedReducer;
          } else {
            this.llama.x += platform.speed;
          }
        } else {
          if (this.llama.returnCurrentActivatedWeapon() instanceof TimeController) {
            this.llama.x -= platform.speed * slowModeSpeedReducer;
          } else {
            this.llama.x -= platform.speed;
          }
        }
      }
    });
  }

  checkLLamaCoinCollision() {

    //only checks collision with active coins
    let coin = this.returnActiveCoin("coin");
    let llamaFront = this.llama.x + this.llama.width;
    let llamaBottom = this.llama.y + this.llama.height;
    let coinFront = coin.x + coin.width;
    let coinBottom = coin.y + coin.height;

    //TODO: compare this code to the llamapig collision detection and the sphere non sphere collision detecion
    if ((this.llama.y < coinBottom && coin.y < llamaBottom && llamaFront > coin.x && coinFront > llamaFront) || (this.llama.y < coinBottom && coin.y < llamaBottom && this.llama.x < coinFront && llamaFront > coin.x)) {
      this.resolveLlamaItemsWithDepositSpacesCollision(coin);
      //the creation of the new coin takes into account width and height, and ground height
      // coin = new Coin (this.createRandomCoord(0, Game.DIM_X - 25), this.createRandomCoord(0, Game.DIM_Y - Game.FLOOR_HEIGHT - 39));
      this.coins.push(new Coin(this.createRandomCoord(50, Game.DIM_X - 25), this.createRandomCoord(20, Game.DIM_Y - Game.FLOOR_HEIGHT - 39)));
      this.score ++;
      // this.yeahSound.play();
      this.createNewPig();
    }
  }

  // NOTE: This next method will change the velocity vectors of certain
  //objects so that they become inactive and fly to the corner of the canvas
  resolveLlamaItemsWithDepositSpacesCollision(object) {

    if (!(object instanceof WeaponItem)) {
      object.status = "inactive";
    }
    // else if (object instanceof WeaponItem) {
    //   object.status = "unequipped";
    // }

    let destination = {};

    if (object instanceof Coin) {
      destination.x = COINDEPOSITCOORD.x;
      destination.y = COINDEPOSITCOORD.y;
    } else if (object instanceof Heart) {
      destination.x = HEARTDEPOSITCOORD.x;
      destination.y = HEARTDEPOSITCOORD.y;
    } else if (object instanceof Bacon) {
      destination.x = BACONDEPOSITCOORD.x;
      destination.y = BACONDEPOSITCOORD.y;
    }
    // else if (object instanceof WeaponItem) {
    //   let emptyWeaponSlot = this.returnEmptyWeaponSlot();
    //   object.assignedWeaponContainerCoord = {x: emptyWeaponSlot.x, y: emptyWeaponSlot.y};
    //   object.x = emptyWeaponSlot.x;
    //   object.y = emptyWeaponSlot.y;
    //   object.x_velocity = 0;
    //   object.y_velocity = 0;
    //   return;
    // }

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

  checkPigAndItemsInPlayPlatformCollision() {
    let objects = this.itemsInPlay;

    for (let i = 0; i < this.platforms.length; i++) {
      for (let j = 0; j < objects.length; j++) {

        let platformFront = this.platforms[i].x + this.platforms[i].width;
        let platformBottom = this.platforms[i].y + this.platforms[i].height;
        let object = objects[j];
        let platform = this.platforms[i];

        if (object instanceof Bacon) {
          continue;
        }

        // NOTE: Old method of detecting collision:
        // if (object.status === "available" && object.x + object.radius > platform.x && object.x - object.radius < platformFront && object.y + object.radius > platform.y && object.y - object.radius < platformBottom){

        if (object.status === "available" && this.areSphereNonSphereColliding(object, platform)) {
          // NOTE: Old wonky method of handling collision
          // if (object.y_velocity === Math.abs(object.y_velocity)) {
          //   object.y = platform.y - object.radius + 2
          // } else {
          //   object.y = platformBottom + object.radius + 2
          // }
          // object.y_velocity = -object.y_velocity;


          if (object.x > platform.x && object.y < platform.y && object.x < platformFront) { //collision with top of platform
            object.y = platform.y - object.radius;
            object.y_velocity = -object.y_velocity;
          } else if (object.x > platform.x && object.y > platform.y && object.x < platformFront) { //with bottom
            object.y = platformBottom + object.radius;
            object.y_velocity = -object.y_velocity;

            // NOTE: Because the platforms are moving, need to take into acount direction platform and pig are
            //moving. Example. If platform is moving right and pig hits  the right side, because the platform continues
            //moving rigth, the two objects will continue colliding for more than one frame even after popping the pig
            //out of the platform
          } else if (object.x < platform.x && object.y > platform.y && object.y < platformBottom) { //with left side
            // debugger
            //
            // if (platform.direction === "left") {
            //
            // }

             object.x = platform.x - object.radius;
             object.x_velocity = -object.x_velocity;
          } else if (object.x > platform.x && object.y > platform.y && object.y < platformBottom) { //with right
            // debugger
            object.x = platformFront + object.radius;
            object.x_velocity = -object.x_velocity;
          }
        }
      }
    }
  }

  checkLlamaItemsInPlayCollision() {

    for (let i = 0; i < this.itemsInPlay.length; i++) {
      let llamaFront = this.llama.x + this.llama.width;
      let llamaBottom = this.llama.y + this.llama.height;
      let currentActivatedWeapon = this.returnCurrentActivatedWeapon();

      if (this.itemsInPlay[i].status === "available") {

        if (this.itemsInPlay[i] instanceof Pig) {
          // NOTE: No collision if llama is already dead
          if (this.llama.status === "dead") {
            continue;
          }

          // NOTE: Otherwise first check if any pigs are colliding with weapons

          if (currentActivatedWeapon instanceof ForceField) {
            if (this.areSpheresColliding(currentActivatedWeapon, this.itemsInPlay[i])) {
              // NOTE: delete pig and create a bacon that will appear where
              //pig was last. If the pig was a type other than "normal", create three 2 bacons, else
              //just one
              if (this.itemsInPlay[i].type != "normal") {
                this.itemsInPlay.push(new Bacon(this.itemsInPlay[i].x - this.itemsInPlay[i].radius, this.itemsInPlay[i].y - this.itemsInPlay[i].radius, Game.DIM_Y - Game.FLOOR_HEIGHT));
                this.itemsInPlay.push(new Heart(this.itemsInPlay[i].x - this.itemsInPlay[i].radius, this.itemsInPlay[i].y - this.itemsInPlay[i].radius, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
              } else {
                this.itemsInPlay.push(new Bacon(this.itemsInPlay[i].x - this.itemsInPlay[i].radius, this.itemsInPlay[i].y - this.itemsInPlay[i].radius, Game.DIM_Y - Game.FLOOR_HEIGHT));
              }

              if (this.itemsInPlay.splice(i, 1)) {
                continue;
              }
            }
          } if (currentActivatedWeapon instanceof BubbleShield) {
            if (this.areSpheresColliding(currentActivatedWeapon, this.itemsInPlay[i])) {
              // NOTE: When llama is in normal mode, the pigs will just not hurt llama,
              //in flightmode, the bounce off the bubble
              if (this.llama.status === "normal") {
                return;
              }
              this.resolveSphereSphereCollision(currentActivatedWeapon, this.itemsInPlay[i]);
            }
          }
          // NOTE: This following conditional is not the same as the areSphereNonSphereColliding(sphere, fourSidedObj) function.
          //That function is the "correct" and strict way to do collision detecion on sides and spherical objects. This one allows
          //for a more "generous" collision detection between pig and llama. Use areSphereNonSphereColliding(sphere, fourSidedObj)
          //for collision detection between llama and spawncircles because that detection needs to be precise.
          if (this.itemsInPlay[i].x > this.llama.x && this.itemsInPlay[i].x < llamaFront && this.itemsInPlay[i].y > this.llama.y && this.itemsInPlay[i].y < llamaBottom) {
            // NOTE: If llama is in bubble and collides with pig bc pig is in a corner, turn pig to bacon
            if (currentActivatedWeapon instanceof BubbleShield) {
              this.itemsInPlay.push(new Bacon(this.itemsInPlay[i].x - this.itemsInPlay[i].radius, this.itemsInPlay[i].y - this.itemsInPlay[i].radius, Game.DIM_Y - Game.FLOOR_HEIGHT));
              this.itemsInPlay.splice(i, 1);
            } else {
              this.resolveLlamaPigCollision(this.itemsInPlay[i]);
            }
          }

        } else if (this.itemsInPlay[i] instanceof Heart) {
          if (this.areSphereNonSphereColliding(this.itemsInPlay[i], this.llama)) {
            this.resolveLlamaItemsWithDepositSpacesCollision(this.itemsInPlay[i]);
            this.llama.hearts++;
          }
        } else if (this.itemsInPlay[i] instanceof Bacon) {
          let bacon = this.itemsInPlay[i];
          let baconFront = bacon.x + bacon.width;
          let baconBottom = bacon.y + bacon.height;

          if ((this.llama.y < baconBottom && bacon.y < llamaBottom && llamaFront > bacon.x && baconFront > llamaFront) || (this.llama.y < baconBottom && bacon.y < llamaBottom && this.llama.x < baconFront && llamaFront > bacon.x)) {
            this.resolveLlamaItemsWithDepositSpacesCollision(bacon);
            this.baconsCollected ++;
          }
        } else if (this.itemsInPlay[i] instanceof WeaponItem) {
          if (this.areSphereNonSphereColliding(this.itemsInPlay[i], this.llama)) {

            // NOTE: Does not allow for collection if llama already has three
            //colected/equipped weapons
             if (this.llama.weaponsInPossession.length > 2) {
               return;
             }

            this.convertCollectedWeaponToLlamaWeapon(this.itemsInPlay[i].type);
            this.itemsInPlay.splice(i, 1);
          }
        }
      }
    }
  }

  resolveLlamaPigCollision(pig) {
    if (this.shaking === false) {
      let canvas = document.getElementById("canvas");
      if (this.llama.flippedCanvas) {
        canvas.setAttribute("class", "shakeflip");
      } else {
        canvas.setAttribute("class", "shake");
      }
      this.shaking = true;
      this.shakingTimer ++;
      this.llama.hearts --;
      this.llamaHeartsOnCounter --;
      pig.status = "inactive";
      // this.thatsAPigSound.play();
    } else {
      this.shakingTimer ++;
      this.llama.hearts --;
      this.llamaHeartsOnCounter --;
      pig.status = "inactive";
      // this.thatsAPigSound.play();
    }

    if(pig.type === "invertedCommands") {
      this.llama.invertedCommands = true;
    } else if (pig.type === "invisibleLlama") {
      this.llama.invisible = true;
    } else if (pig.type === "flippedCanvas") {
      this.llama.flippedCanvas = true;
    }
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

  returnCurrentActivatedWeapon() {
    for (let i = 0; i < this.llama.weaponsInPossession.length; i++) {
      if (this.llama.weaponsInPossession[i].status === "activated") {
        return this.llama.weaponsInPossession[i];
      }
    }
  }

  returnEmptyWeaponSlot() {
    if (this.llama.weaponsInPossession.length === 0) {
      return WEAPON1COORD;
    } else if (this.llama.weaponsInPossession.length === 1) {
      return WEAPON2COORD;
    } else if (this.llama.weaponsInPossession.length === 2) {
      return WEAPON3COORD;
    }
  }

  convertCollectedWeaponToLlamaWeapon(weaponType) {
    if (weaponType === "forceFieldBlast"){
      this.llama.weaponsInPossession.push(new ForceField());
    } else if (weaponType === "bubbleShield") {
      this.llama.weaponsInPossession.push(new BubbleShield());
    } else if (weaponType === "timeController") {
      this.llama.weaponsInPossession.push(new TimeController());
    }
  }

  returnActiveCoin(objectType) {
    if (objectType === "coin") {
      //assumes that in the array of coins, the last one is the only active one
      return this.coins[this.coins.length - 1];
    }
  }


  returnEmptySpawnCircle() {
    //TODO: Refactor for better optomization

    let objects = [].concat(this.llama).concat(this.itemsInPlay);

    let circles = [true,true,true,true,true,true,true,true,true,true,true];

    for (let i = 0; i < SPAWNCIRCLES.length; i++) {
      for (let j = 0; j < objects.length; j++) {
        if (objects[j] instanceof Pig){

          if (this.areSpheresColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1], radius: SPAWNCIRCLES[i][2]}, objects[j]) && (objects[j].status === "available" || objects[j].status === "testing")) {
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
    this.itemsInPlay.push(new Pig(spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
  }

  createNewSpecialPig() {
    let availableSpecialPigs = ["invertedCommands", "invisibleLlama", "flippedCanvas"];
    let randomIndex = Math.floor(Math.random() * Math.floor(3));
    let spawningCircle = this.returnEmptySpawnCircle();
    this.itemsInPlay.push(new Pig(spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, availableSpecialPigs[randomIndex]));
  }

  creatNewHeart() {
    let spawningCircle = this.returnEmptySpawnCircle();
    this.itemsInPlay.push(new Heart(spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
  }

  spawnNewWeaponItem() {
    let randomDayWeapons = ["forceFieldBlast", "timeController", "bubbleShield"];
    let randomNightWeapons = ["bubbleShield", "forceFieldBlast", "timeController"];

    let spawnCircle = this.returnEmptySpawnCircle();
    let spawnX = spawnCircle[0];
    let spawnY = spawnCircle[1];



    if (this.llama.status === "normal") {
      let randomIndex = Math.floor(Math.random() * Math.floor(3));
      this.itemsInPlay.push(new WeaponItem(spawnX, spawnY, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, randomDayWeapons[randomIndex]));
    } else if (this.llama.status === "flightMode") {
      let randomIndex = Math.floor(Math.random() * Math.floor(3));
      this.itemsInPlay.push(new WeaponItem(spawnX, spawnY, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, randomNightWeapons[randomIndex]));
    }

  }

  allObjects() {
    let gameObjects = [].concat(this.platforms).concat(this.itemsInPlay)
                      .concat(this.coins).concat(this.llama.weaponsDiscarded)
                      .concat(this.llama).concat(this.weaponsContainer);
    return gameObjects;
  }

  // NOTE: This checks to see if any coins on the canvas are currently
  //inactive and making their way to the deposit on the top left. The
  //game will not be over until no inactive coins exists. This makes sure
  //that all coins make it to the deposit (although the game will have already
  //registered it, it will not be showing on the screen unless it reaches the
  //deposit). Even if the llama has died and fallen below the canvas, the game
  // will wait for the coin to get to the deposit before ending.
  areNoItemsInactive() {
    let objects = [].concat(this.coins).concat(this.itemsInPlay);

    for (let i = 0; i < objects.length; i++) {
      if (objects[i].status === "inactive") {
        return false
      }
    }

    return true;
  }

  areNoPigsInPlay() {
    let results = true;
    this.itemsInPlay.forEach(object => {
      if (object instanceof Pig){
        results = false;
      }
    });
    return results;
  }

  manageObjectsWhenInSlowMode() {
    let slowModeOn =  this.llama.returnCurrentActivatedWeapon() instanceof TimeController;

    let objects = [].concat(this.platforms).concat(this.itemsInPlay).concat(this.coins)
                    .concat(this.background.luminary).concat(this.background)
                    .concat(this.background.meteor).concat(this.background.bird)
                    .concat(this.llama.weaponsDiscarded);

    objects.forEach(object => {
      if (slowModeOn && this.llama.status != "dead") {
        if (object instanceof Coin || object instanceof Bird1) {
          if (!object.spritecycleOffsetForSlowMode) {
            object.spritecycle = object.spritecycle / slowModeSpeedReducer;
            object.spritecycleOffsetForSlowMode = true;
          }
        }
        object.slowMode = true;
      } else {
        if (object instanceof Coin || object instanceof Bird1) {
          if (!object.spritecycleOffsetForNormalMode) {
            object.spritecycle = object.spritecycle * slowModeSpeedReducer;
            object.spritecycleOffsetForNormalMode = true;
          }
        }
        object.slowMode = false;
      }
    });
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
