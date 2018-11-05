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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/little_llama.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/animals/llama.js":
/*!******************************!*\
  !*** ./lib/animals/llama.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../weapons/forcefield.js */ "./lib/weapons/forcefield.js");
/* harmony import */ var _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../weapons/bubble_shield.js */ "./lib/weapons/bubble_shield.js");
/* harmony import */ var _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../weapons/time_controller.js */ "./lib/weapons/time_controller.js");
/* harmony import */ var _special_items_weapon_items_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../special_items/weapon_items.js */ "./lib/special_items/weapon_items.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");
// import MovingObject from './moving_object.js';






class Llama {
  constructor(canvas_width, canvas_height, mode) {

    this.height = 52;
    this.width = 45;
    this.x = 0;
    this.y = canvas_height - this.height;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.hearts = 10;
    this.lastDirectionFaced = "right";
    this.jumpPower = -27;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.status = mode;

    this.invertedCommands = false;
    this.invertedCommandsCountdown = 350; //5 seconds

    this.invisible = false;
    this.invisibleCountdown = 240 // 3 seconds

    this.flippedCanvas = false;
    this.flippedCanvasCountdown = 350; //5 seconds

    this.jumping = true;
    this.deadJumping = false;

    this.weaponsInPossession = [];
    this.weaponTogglePosition = 0;
    this.activeWeaponIndex = [-1];
    this.weaponToggleUpdated = true;

    // NOTE: discarded weapon will have weapons that
    //llama chooses to get rid of. They will appear on canvas
    //flying out of the borders. Game.js will delete the from
    //this array once they are out of the bounds of the canvas
    this.weaponsDiscarded = [];

    this.activatedWeaponCountDown = 11 * 60; //10 seconds * 60fps

    this.weaponTextDisplayColor = "black";
    this.walkcycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = "";

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

    if (!this.weaponsInPossession[this.weaponTogglePosition]) {
      this.weaponTogglePosition = 0
    }


    // NOTE: This makes sure that when a weapon is done being used (it is inactive),
    //and the container updates, the indexed weapon continues being the one being
    //indexed while a weapon was active
    // if (this.activeWeaponIndex[0] === -1 && this.weaponToggleUpdated === false) {
    //   if (this.weaponTogglePosition === 0) {
    //     null;
    //   } else {
    //     this.weaponTogglePosition --;
    //   }
    //   this.weaponToggleUpdated === true;
    // }

    this.manageInvertedCommandsCountdown(ctx);
    this.manageInvisibleCountdown(ctx);
    this.manageFlippedCanvas(ctx);

    if (this.status === "dead") {
      this.y_velocity += 1;
      this.y_velocity *= 0.9;
      this.y += this.y_velocity;
    }

    //The code below updates movement
    if (this.status != "dead") {

      if (this.keysPressed[37]) {
        if (this.status === "normal") {
          if (!this.invertedCommands) {
            this.x_velocity -= 1;
          } else {
            this.x_velocity += 1;
          }
        } else if (this.status === "flightMode") {
          if (!this.invertedCommands) {
            this.x_velocity -= .8;
          } else {
            this.x_velocity += .8;
          }
        }

      } else if (this.keysPressed[39]) {
        if(this.status === "normal") {
          if (!this.invertedCommands) {
            this.x_velocity += 1;
          } else {
            this.x_velocity -= 1;
          }
        } else if (this.status === "flightMode") {
          if (!this.invertedCommands) {
            this.x_velocity += .8;
          } else {
            this.x_velocity -=.8;
          }
        }
      }

      if (this.keysPressed[38] && this.jumping === false) {
        if (this.status === "normal") {
          if (!this.invertedCommands) {
            this.y_velocity = this.jumpPower;
            this.jumping = true;
          } else {
            null;
          }
        } else if (this.status === "flightMode") {
          if (!this.invertedCommands) {
            this.y_velocity = this.jumpPower / 2.5;
          } else {
            this.y_velocity = Math.abs(this.jumpPower / 3);
          }
        }
      }

      if (this.keysPressed[40]) {
        if (this.status === "normal" && this.jumping === false) {
          if (this.invertedCommands) {
            this.y_velocity = this.jumpPower;
            this.jumping = true;
          }
        } else if (this.status === "flightMode") {
          if (!this.invertedCommands) {
            this.y_velocity = Math.abs(this.jumpPower / 3);
          } else {
            this.y_velocity = this.jumpPower / 2.5;
          }
        }
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

    if (!this.invisible) {
      const sprite = this.getSprite();
      ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3]);
    }

    this.updateWeapons(ctx);
  }

  move() {
    //Update y position
    if (this.status === "normal") {
      //Update x position
      this.x += this.x_velocity;
      this.x_velocity *= 0.8;

      this.y_velocity += 1.5; //simulates gravity
      this.y_velocity *= 0.9; //lessens the height of jump
      this.y += this.y_velocity;
    } else if (this.status === "flightMode") {
      this.x += this.x_velocity;
      this.x_velocity *= .9;

      this.y_velocity += 0.9;
      this.y_velocity *= 0.7;
      this.y += this.y_velocity;
    }
  }

  getSprite() {

    if (this.status === "dead") {
      this.spritesheet.src = './assets/sprites/llama/llama_stand_sprite_sheet.png';
      return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].dead;
    }

    if (!this.keysPressed[37] && !this.keysPressed[39] && this.jumping === false) {
      this.walkcycle = 0;

      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama/llama_stand_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama/llama_stand_dressed_sprite_sheet.png';
      }

      if (this.lastDirectionFaced === "right") {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].rightPosition1
      } else if (this.lastDirectionFaced === "left") {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].leftPosition1
      }
    }

    if (this.keysPressed[37]) {
      this.walkcycle ++;

      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_dressed_sprite_sheet.png';
      }


      if (this.walkcycle < 6) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].leftPosition1
      } else if (this.walkcycle < 12) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].leftPosition2
      } else if (this.walkcycle < 18) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].leftPosition3
      } else if (this.walkcycle < 24) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].leftPosition4
      } else {
        this.walkcycle = 0;
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].leftPosition1
      }

    } else if (this.keysPressed[39]){
      this.walkcycle ++;

      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_dressed_sprite_sheet.png';
      }

      if (this.walkcycle < 6) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].rightPosition1
      } else if (this.walkcycle < 12) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].rightPosition2
      } else if (this.walkcycle < 18) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].rightPosition3
      } else if (this.walkcycle < 24) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].rightPosition4
      } else {
        this.walkcycle = 0;
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].rightPosition1
      }
    } else {
      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_dressed_sprite_sheet.png';
      }

      if (this.lastDirectionFaced === "right") {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].rightPosition1;
      } else if (this.lastDirectionFaced === "left") {
        return _constants_js__WEBPACK_IMPORTED_MODULE_4__["LLAMA_SPRITES"].leftPosition1;
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

      // NOTE: Weapons container controls
      else if (e.keyCode === 16) { // shift key - toggle weapons

      // if (this.returnCurrentActivatedWeapon()) {
      //    return;
      // }

      if (this.weaponsInPossession.length === 1) {
        null;
      } else if (this.weaponsInPossession.length === 2) {
        if (this.weaponTogglePosition < 1) {
          this.weaponTogglePosition ++;
        } else {
          this.weaponTogglePosition = 0;
        }
      } else if (this.weaponsInPossession.length === 3) {
        if (this.weaponTogglePosition < 2) {
          this.weaponTogglePosition ++;
        } else {
          this.weaponTogglePosition = 0;
        }
      }
    } else if (e.keyCode === 32) { //spacebar - weapon deployment
      if(this.weaponsInPossession.length > 0) {
        this.activateWeapon(this.weaponTogglePosition);
      }
    } else if (e.keyCode === 8 ) { //option button - get rid of weapon
      this.getRidOfWeapon(this.weaponTogglePosition);
    }
  }

  activateWeapon(weaponIndex) {
    if (this.status === "dead") {
      return;
    }

    // NOTE: first check if no weapons are active

    for (let i = 0; i < this.weaponsInPossession.length; i++) {
      if (this.weaponsInPossession[i].status === "activated") {
        return;
      }
    }

    this.weaponsInPossession[weaponIndex].status = "activated";
    // this.weaponToggleUpdated = false;
  }

  getRidOfWeapon(weaponIndex) {
    if (this.status === "dead") {
      return;
    }

    // NOTE: First check that the weapon at that index is not currently active

    let weapon = this.weaponsInPossession[weaponIndex];
    let weaponItemType = "";

    if (weapon instanceof _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      weaponItemType = "forceFieldBlast";
    } else if (weapon instanceof _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      weaponItemType = "bubbleShield";
    } else if (weapon instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      weaponItemType = "timeController";
    }

    if (this.weaponsInPossession[weaponIndex].status === "activated") {
      return;
    } else {


      this.weaponsDiscarded.push(new _special_items_weapon_items_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.x + (this.width/2), this.y + (this.height/2), this.canvas_width,
                                  this.canvas_height, weaponItemType, "discarded"));
      this.weaponsInPossession.splice(weaponIndex, 1);

    }
  }

  updateWeapons(ctx) {

    if (this.returnCurrentActivatedWeapon() instanceof _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      if (this.activatedWeaponCountDown < 0) {
        this.returnCurrentActivatedWeapon().status = "inactive";
        this.activatedWeaponCountDown = 11 * 60;
      } else {
        //countdown display
        ctx.font = `20px ${_constants_js__WEBPACK_IMPORTED_MODULE_4__["CANVAS_FONT"]}`;
        let countDownColor = "";
        if (this.activatedWeaponCountDown / 60 < 6) {
          countDownColor = "red";
        } else {
          countDownColor = this.weaponTextDisplayColor;
        }

        ctx.beginPath();
        ctx.fillStyle = countDownColor;
        ctx.textAlign="right";
        ctx.fillText(`Bubble Shield: ${Math.trunc(this.activatedWeaponCountDown / 60)}`, 570, 45);
        ctx.closePath();

        this.activatedWeaponCountDown --;
      }
    } else if (this.returnCurrentActivatedWeapon() instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      if (this.activatedWeaponCountDown < 0) {
        this.returnCurrentActivatedWeapon().status = "inactive";
        this.activatedWeaponCountDown = 11 * 60;
      } else {
        //countdown display
        ctx.font = `20px ${_constants_js__WEBPACK_IMPORTED_MODULE_4__["CANVAS_FONT"]}`;
        let countDownColor = "";
        if (this.activatedWeaponCountDown / 60 < 6) {
          countDownColor = "red";
        } else {
          countDownColor = this.weaponTextDisplayColor;
        }

        ctx.beginPath();
        ctx.fillStyle = countDownColor;
        ctx.textAlign="right";
        ctx.fillText(`Super Speed: ${Math.trunc(this.activatedWeaponCountDown / 60)}`, 570, 45);
        ctx.closePath();

        this.activatedWeaponCountDown --;
      }
    }

    for (let i = 0; i < this.weaponsInPossession.length; i++) {
      if (this.weaponsInPossession[i].status === "inactive") {
        this.weaponsInPossession.splice(i, 1);
      } else {
        this.weaponsInPossession[i].update(ctx, this.x, this.y, this.x_velocity, this.y_velocity);
      }
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

    //top collisions for when in flightMode status
    if (this.y < -25 && this.status === "flightMode") {
      this.y = -25;
    }
  }

  returnCurrentActivatedWeapon() {
    for (let i = 0; i < this.weaponsInPossession.length; i++) {
      if (this.weaponsInPossession[i].status === "activated") {
        return this.weaponsInPossession[i];
      }
    }
  }

  manageInvertedCommandsCountdown(ctx) {
    if (!this.invertedCommands) {
      return;
    } else {
      if (this.invertedCommandsCountdown < 0) {
        this.invertedCommands = false;
        this.invertedCommandsCountdown = 300;
      } else {
        ctx.font = `20px ${_constants_js__WEBPACK_IMPORTED_MODULE_4__["CANVAS_FONT"]}`;
        ctx.textAlign="right";
        ctx.fillStyle = "red";
        ctx.fillText(`Inverted Controls: ${Math.trunc(this.invertedCommandsCountdown / 60)}`, 490, 225);
        this.invertedCommandsCountdown--;
      }
    }
  }

  manageInvisibleCountdown(ctx) {
    if (!this.invisible) {
      return;
    } else {
      if (this.invisibleCountdown < 0) {
        this.invisible = false;
        this.invisibleCountdown = 300;
      } else {
        ctx.font = `20px ${_constants_js__WEBPACK_IMPORTED_MODULE_4__["CANVAS_FONT"]}`;
        ctx.textAlign="right";
        ctx.fillStyle = "red";
        ctx.fillText(`Invisible: ${Math.trunc(this.invisibleCountdown / 60)}`, 447, 225);
        this.invisibleCountdown--;
      }
    }
  }

  manageFlippedCanvas(ctx) {
    if (!this.flippedCanvas) {
      return;
    } else {
      if (this.flippedCanvasCountdown < 0) {
        document.getElementById("canvas").classList.remove("flipped");
        this.flippedCanvas = false;
        this.flippedCanvasCountdown = 300;
      } else {

        document.getElementById("canvas").classList.add("flipped");
        ctx.font = `20px ${_constants_js__WEBPACK_IMPORTED_MODULE_4__["CANVAS_FONT"]}`;
        ctx.textAlign="right";
        ctx.fillStyle = "red";
        ctx.fillText(`Flipped Screen: ${Math.trunc(this.flippedCanvasCountdown / 60)}`, 447, 225);
        this.flippedCanvasCountdown--;
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Llama);


/***/ }),

/***/ "./lib/animals/pig.js":
/*!****************************!*\
  !*** ./lib/animals/pig.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");


class Pig {
  constructor(x, y, canvas_width, canvas_height, type) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.mass = 5;
    this.x_velocity = 2.5;
    this.y_velocity = 2.5;
    this.slowMode = false;

    // NOTE: borderHitCollisionCountis used for pigs other than type "normal"
    //these other pigs will only stay in play while their collision with
    //the borders of the canvas has not exceeded 4 times.
    this.borderHitCollisionCount = 0;

    this.type = type || "normal";

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
    this.status = "available"

    this.spritecycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/pigs/pig_sprite_sheet.png';
  }

  update(ctx) {

    if (Math.abs(this.x_velocity) === this.x_velocity) {
      //pig is moving to the right
      this.direction = "right";
    } else {
      this.direction = "left";
    }

    // if (this.status === "dead") {
    //
    // }

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
    if (this.status === "available") {
      if (this.slowMode) {
        this.x += this.x_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
        this.y += this.y_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      } else {
        this.x += this.x_velocity;
        this.y += this.y_velocity;
      }
    } else if (this.status === "inactive") {
      this.y_velocity = -2;
      if (this.direction === "right") {
        this.x_velocity = 7;
        if (this.slowMode) {
          this.x += this.x_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
          this.y += this.y_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
        } else {
          this.x += this.x_velocity;
          this.y += this.y_velocity;
        }
      } else {
        this.x_velocity = -7;
        if (this.slowMode) {
          this.x += this.x_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
          this.y += this.y_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
        } else {
          this.x += this.x_velocity;
          this.y += this.y_velocity;
        }
      }
    } else if (this.status === "testing") {
      null
    }
  }

  getSprite() {

    if (this.type === "invertedCommands") {
      this.spritesheet.src = "./assets/sprites/pigs/red_pig_sprite_sheet.png";
    } else if (this.type === "flippedCanvas") {
      this.spritesheet.src = "./assets/sprites/pigs/black_pig_sprite_sheet.png";
    } else if (this.type === "invisibleLlama") {
      this.spritesheet.src = "./assets/sprites/pigs/white_pig_sprite_sheet.png";
    } else {
      this.spritesheet.src = "./assets/sprites/pigs/pig_sprite_sheet.png";
    }

    this.spritecycle ++;

    let framesUntilNextSprite = 10;
    let framesUntilNextSpriteSlowMode = framesUntilNextSprite / _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];

    if (this.slowMode) {
      if (this.spritecycle < framesUntilNextSpriteSlowMode) {
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition1 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition1
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 2) {
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition2 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition2
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 3) {
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition3 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition3
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 4) {
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition4 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition4
      } else {
        this.spritecycle = 0;
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition1 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition1
      }
    } else {
      if (this.spritecycle < framesUntilNextSprite) {
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition1 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition1
      } else if (this.spritecycle < framesUntilNextSprite * 2) {
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition2 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition2
      } else if (this.spritecycle < framesUntilNextSprite * 3) {
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition3 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition3
      } else if (this.spritecycle < framesUntilNextSprite * 4) {
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition4 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition4
      } else {
        this.spritecycle = 0;
        return this.direction === "right" ? _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].rightPosition1 : _constants_js__WEBPACK_IMPORTED_MODULE_0__["PIG_SPRITES"].leftPosition1
      }
    }

  }

  canvasBorderCollision() {

    if (this.status != "available" || this.borderHitCollisionCount >= 8) {
      return
    }

    if (this.x + this.radius > this.canvas_width || this.x - this.radius < 0 ){

      if (this.type != "normal") {
        this.borderHitCollisionCount ++;
      }

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

      if (this.type != "normal") {
        this.borderHitCollisionCount ++;
      }

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

/* harmony default export */ __webpack_exports__["default"] = (Pig);


/***/ }),

/***/ "./lib/background/background.js":
/*!**************************************!*\
  !*** ./lib/background/background.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sun_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sun.js */ "./lib/background/sun.js");
/* harmony import */ var _moon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moon.js */ "./lib/background/moon.js");
/* harmony import */ var _bird_1_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bird_1.js */ "./lib/background/bird_1.js");
/* harmony import */ var _meteor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./meteor.js */ "./lib/background/meteor.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");
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
    this.cloudsImage.src = "./assets/sprites/background/clouds_day.png";

    this.mountainX = 0;
    this.mountainY = 50;
    this.mountainImage = new Image();
    this.mountainImage.src =  './assets/sprites/background/mountain_day.png';

    this.starrySkyX = 0;
    this.starrySkyWidth = 750;
    this.starrySky = new Image();
    this.starrySky.src = "./assets/sprites/background/starry_sky.png";

    this.bird = new _bird_1_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.birdCycle = 0;
    this.isBirdOnScreen = false;

    this.luminary = new _sun_js__WEBPACK_IMPORTED_MODULE_0__["default"](canvas_width, canvas_height);

    this.meteor = new _meteor_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.meteorCycle = 0;
    this.isMeteorOnScreen = false;

    this.slowMode = false
  }

  update(ctx) {

    if (this.luminary.y - this.luminary.radius > 302) {
      if (this.luminary instanceof _sun_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        this.luminary = new _moon_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.canvas_width, this.canvas_height);
        this.cloudsImage.src = "./assets/sprites/background/clouds_night.png";
        this.mountainImage.src =  './assets/sprites/background/mountain_night.png';
      } else {
        this.luminary = new _sun_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.canvas_width, this.canvas_height);
        this.cloudsImage.src = "./assets/sprites/background/clouds_day.png";
        this.mountainImage.src =  './assets/sprites/background/mountain_day.png';

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
    this.manageBirdCycle(ctx);
  }

  draw(ctx) {
    if (this.luminary instanceof _sun_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
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
    // this.meteor.update(ctx);
    this.manageMeteorCycle(ctx);
    ctx.drawImage(this.cloudsImage, this.cloudsX, this.cloudsY);
    ctx.drawImage(this.cloudsImage, this.cloudsX + this.cloudsWidth, this.cloudsY);

    ctx.drawImage(this.mountainImage, this.mountainX, this.mountainY);

  }

  scrollImage() {
    if (this.slowMode) {
      this.cloudsX = this.cloudsX - .2 * _constants_js__WEBPACK_IMPORTED_MODULE_4__["slowModeSpeedReducer"];
      this.starrySkyX = this.starrySkyX - .04 * _constants_js__WEBPACK_IMPORTED_MODULE_4__["slowModeSpeedReducer"];
    } else {
      this.cloudsX = this.cloudsX - .2;
      this.starrySkyX = this.starrySkyX - .04;
    }
  }

  createRandomCoord(min, max) {
    return Math.random() * (max - min) + min;
  }

  manageBirdCycle(ctx) {
    // NOTE: Bird should only come out in the day
    if (this.luminary instanceof _moon_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
      return;
    }

    if (this.birdCycle < 1500 && this.isBirdOnScreen === false) {
      this.birdCycle ++;
      this.bird.x = this.canvas_width + 10;
      this.bird.y = this.createRandomCoord(50, 200);
    } else {
      this.birdCycle = 0;
      this.isBirdOnScreen = true;
      this.bird.update(ctx);
      if(this.bird.x < -10) {
        this.isBirdOnScreen = false;
      }
    }
  }

  manageMeteorCycle(ctx) {
    // NOTE: Meteor should only come out in the day
    if (this.luminary instanceof _sun_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      return;
    }

    if (this.meteorCycle < 600 && this.isMeteorOnScreen === false) {
      this.meteorCycle ++;
      this.meteor.x = this.createRandomCoord(100, 800);
      this.meteor.y = -10;
    } else {
      this.meteorCycle = 0;
      this.isMeteorOnScreen = true;
      this.meteor.update(ctx);
      if(this.meteor.y > 500) {
        this.isMeteorOnScreen = false;
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Background);


/***/ }),

/***/ "./lib/background/bird_1.js":
/*!**********************************!*\
  !*** ./lib/background/bird_1.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");


class Bird1 {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.width = 25;
    this.height = 25;

    this.slowMode = false;
    this.spritecycleOffsetForSlowMode = false;
    this.spritecycleOffsetForNormalMode = true;

    this.spriteCycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/background/bird1.png';
  }

  update(ctx) {

    if (!this.slowMode) {
      this.spritecycleOffsetForSlowMode = false;
    }

    if (this.slowMode) {
      this.spritecycleOffsetForNormalMode = false;
    }

    this.move();
    this.draw(ctx);
  }

  draw(ctx) {

    // NOTE: Uncomment below to see bird borders
      // ctx.fillStyle = "blue";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
    //
    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3]);
    // ctx.drawImage(this.spritesheet, 0, 0, 1200, 1200, 0, 0, 300, 300);

  }

  move() {
    if (this.slowMode) {
      this.x = this.x - .5 * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
    } else {
      this.x = this.x - .5;
    }
  }

  getSprite() {
    this.spriteCycle ++;

    let framesUntilNextSprite = 3;
    let framesUntilNextSpriteSlowMode = 3 / _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];

    if (this.slowMode) {
      if (this.spriteCycle < framesUntilNextSpriteSlowMode * 1) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position1;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 2) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position2;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 3) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position3;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 4) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position4;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 5) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position5;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 6) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position6;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 7) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position7;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 8) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position8;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 9) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position9;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 10) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position10;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 11) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position11;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 12) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position12;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 13) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position13;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 14) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position14;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 15) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position15;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 16) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position16;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 17) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position17;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 18) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position18;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 29) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position19;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 20) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position20;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 21) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position21;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 22) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position22;
      } else {
        this.spriteCycle = 0;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position1;
      }
    } else {
      if (this.spriteCycle < framesUntilNextSprite * 1) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position1;
      } else if (this.spriteCycle < framesUntilNextSprite * 2) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position2;
      } else if (this.spriteCycle < framesUntilNextSprite * 3) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position3;
      } else if (this.spriteCycle < framesUntilNextSprite * 4) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position4;
      } else if (this.spriteCycle < framesUntilNextSprite * 5) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position5;
      } else if (this.spriteCycle < framesUntilNextSprite * 6) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position6;
      } else if (this.spriteCycle < framesUntilNextSprite * 7) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position7;
      } else if (this.spriteCycle < framesUntilNextSprite * 8) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position8;
      } else if (this.spriteCycle < framesUntilNextSprite * 9) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position9;
      } else if (this.spriteCycle < framesUntilNextSprite * 10) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position10;
      }else if (this.spriteCycle < framesUntilNextSprite * 11) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position11;
      }else if (this.spriteCycle < framesUntilNextSprite * 12) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position12;
      }else if (this.spriteCycle < framesUntilNextSprite * 13) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position13;
      }else if (this.spriteCycle < framesUntilNextSprite * 14) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position14;
      }else if (this.spriteCycle < framesUntilNextSprite * 15) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position15;
      }else if (this.spriteCycle < framesUntilNextSprite * 16) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position16;
      }else if (this.spriteCycle < framesUntilNextSprite * 17) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position17;
      }else if (this.spriteCycle < framesUntilNextSprite * 18) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position18;
      }else if (this.spriteCycle < framesUntilNextSprite * 19) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position19;
      }else if (this.spriteCycle < framesUntilNextSprite * 20) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position20;
      }else if (this.spriteCycle < framesUntilNextSprite * 21) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position21;
      }else if (this.spriteCycle < framesUntilNextSprite * 22) {
        this.spriteCycle ++;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position22;
      } else {
        this.spriteCycle = 0;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["BIRD1_SPRITES"].position1;
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Bird1);


/***/ }),

/***/ "./lib/background/luminary.js":
/*!************************************!*\
  !*** ./lib/background/luminary.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");


class Luminary {
  constructor(canvas_width, canvas_height) {
    this.x = -55;
    this.y = -55;
    this.radius = 55;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.slowMode = false;

    this.image = new Image();
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }

  move() {
    if (this.slowMode) {
      this.x = this.x + (.09 * 2) * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      this.y = this.y + (.05 * 2) * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
    } else {
      this.x = this.x + (.09 * 2);
      this.y = this.y + (.05 * 2);
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Luminary);


/***/ }),

/***/ "./lib/background/meteor.js":
/*!**********************************!*\
  !*** ./lib/background/meteor.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");


class Meteor {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.height = 100;
    this.width = 100;

    this.slowMode = false;

    this.meteorImage = new Image();
    this.meteorImage.src = "./assets/sprites/background/meteor.png";
    }

  update(ctx) {

    this.move();
    this.draw(ctx);
  }

  draw(ctx) {
    // // NOTE: Uncomment below to see  meteor boundaries
    //   ctx.fillStyle = "blue";
    //   ctx.fillRect(this.x, this.y, this.width, this.height);
    // //

    ctx.drawImage(this.meteorImage, 10, 60, 350, 500, this.x, this.y - 95, 110, 110);
  }

  move() {
    if (this.slowMode) {
      this.y = this.y + 1 * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      this.x = this.x - 1 * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
    } else {
      this.y = this.y + 1;
      this.x = this.x - 1;
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Meteor);


/***/ }),

/***/ "./lib/background/moon.js":
/*!********************************!*\
  !*** ./lib/background/moon.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _luminary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./luminary.js */ "./lib/background/luminary.js");


class Moon extends _luminary_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(canvas_width, canvas_height) {
    super(canvas_width, canvas_height);

    // this.x = -55;
    // this.y = -55;
    // this.radius = 55;
    //
    // this.canvas_width = canvas_width;
    // this.canvas_height = canvas_height;
    //
    // this.slowMode = false;
    //
    // this.image = new Image();
    this.image.src = "./assets/sprites/background/moon.png";
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
}

/* harmony default export */ __webpack_exports__["default"] = (Moon);


/***/ }),

/***/ "./lib/background/sun.js":
/*!*******************************!*\
  !*** ./lib/background/sun.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _luminary_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./luminary.js */ "./lib/background/luminary.js");


class Sun extends _luminary_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(canvas_width, canvas_height) {
    super(canvas_width, canvas_height);

    // this.x = -55;
    // this.y = -55;
    // this.radius = 55;
    //
    // this.canvas_width = canvas_width;
    // this.canvas_height = canvas_height;
    //
    // this.slowMode = false;
    //
    // this.image = new Image();
    this.image.src = "./assets/sprites/background/sun.png";
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
}

/* harmony default export */ __webpack_exports__["default"] = (Sun);


/***/ }),

/***/ "./lib/constants.js":
/*!**************************!*\
  !*** ./lib/constants.js ***!
  \**************************/
/*! exports provided: slowModeSpeedReducer, CANVAS_FONT, LLAMA_SPRITES, PIG_SPRITES, BIRD1_SPRITES, COIN_SPRITES, HEART_SPRITES, PLATFORMTRACKS, SPAWNCIRCLES, COINDEPOSITCOORD, HEARTDEPOSITCOORD, BACONDEPOSITCOORD, WEAPON1COORD, WEAPON2COORD, WEAPON3COORD */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "slowModeSpeedReducer", function() { return slowModeSpeedReducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CANVAS_FONT", function() { return CANVAS_FONT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LLAMA_SPRITES", function() { return LLAMA_SPRITES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PIG_SPRITES", function() { return PIG_SPRITES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BIRD1_SPRITES", function() { return BIRD1_SPRITES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COIN_SPRITES", function() { return COIN_SPRITES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEART_SPRITES", function() { return HEART_SPRITES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PLATFORMTRACKS", function() { return PLATFORMTRACKS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPAWNCIRCLES", function() { return SPAWNCIRCLES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COINDEPOSITCOORD", function() { return COINDEPOSITCOORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEARTDEPOSITCOORD", function() { return HEARTDEPOSITCOORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BACONDEPOSITCOORD", function() { return BACONDEPOSITCOORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEAPON1COORD", function() { return WEAPON1COORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEAPON2COORD", function() { return WEAPON2COORD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEAPON3COORD", function() { return WEAPON3COORD; });
const slowModeSpeedReducer = .2;
const CANVAS_FONT = "Monospace";

const LLAMA_SPRITES = {
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

const PIG_SPRITES = {
  leftPosition1: [30, 160, 100, 100],
  leftPosition2: [142, 160, 100, 100],
  leftPosition3: [253, 160, 100, 100],
  leftPosition4: [366, 160, 100, 100],

  rightPosition1: [33, 385, 100, 100],
  rightPosition2: [146, 385, 100, 100],
  rightPosition3: [257, 385, 100, 100],
  rightPosition4: [370, 385, 100, 100],
};

const BIRD1_SPRITES = {
  position1: [2, 0, 30, 35],
  position2: [31, 0, 30, 35],
  position3: [60, 0, 30, 35],
  position4: [88, 0, 30, 35],
  position5: [118, 0, 30, 35],

  position6: [2, 37, 30, 35],
  position7: [31, 37, 30, 35],
  position8: [60, 37, 30, 35],
  position9: [88, 37, 30, 35],
  position10: [118, 37, 30, 35],

  position11: [2, 75, 30, 35],
  position12: [31, 75, 30, 35],
  position13: [60, 75, 30, 35],
  position14: [88, 75, 30, 35],
  position15: [118, 75, 30, 35],

  position16: [2, 113, 30, 35],
  position17: [31, 113, 30, 35],
  position18: [60, 113, 30, 35],
  position19: [88, 113, 30, 35],
  position20: [118, 113, 30, 35],

  position21: [2, 152, 30, 35],
  position22: [31, 152, 30, 35],
};

const COIN_SPRITES = {
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

const HEART_SPRITES = {
  number1: [58, 7, 40, 35],
  number2: [58, 45, 40, 35]
};

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
const BACONDEPOSITCOORD = {x: 190, y: 5};

const WEAPON1COORD = {x: 602.5 , y: 26};
const WEAPON2COORD = {x: 657.5, y: 26};
const WEAPON3COORD = {x: 713.5, y: 26};

// const WEAPON1COORD = {x: 575, y: 5}; each box is 55x5
// const WEAPON2COORD = {x: 630, y: 5};
// const WEAPON3COORD = {x: 685, y: 5};


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background_background_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background/background.js */ "./lib/background/background.js");
/* harmony import */ var _animals_llama_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./animals/llama.js */ "./lib/animals/llama.js");
/* harmony import */ var _other_objects_platform_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./other_objects/platform.js */ "./lib/other_objects/platform.js");
/* harmony import */ var _animals_pig_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animals/pig.js */ "./lib/animals/pig.js");
/* harmony import */ var _other_objects_coin_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./other_objects/coin.js */ "./lib/other_objects/coin.js");
/* harmony import */ var _other_objects_heart_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./other_objects/heart.js */ "./lib/other_objects/heart.js");
/* harmony import */ var _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./other_objects/bacon.js */ "./lib/other_objects/bacon.js");
/* harmony import */ var _special_items_weapon_items_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./special_items/weapon_items.js */ "./lib/special_items/weapon_items.js");
/* harmony import */ var _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./weapons/forcefield.js */ "./lib/weapons/forcefield.js");
/* harmony import */ var _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./weapons/bubble_shield.js */ "./lib/weapons/bubble_shield.js");
/* harmony import */ var _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./weapons/time_controller.js */ "./lib/weapons/time_controller.js");
/* harmony import */ var _background_sun_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./background/sun.js */ "./lib/background/sun.js");
/* harmony import */ var _background_bird_1_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./background/bird_1.js */ "./lib/background/bird_1.js");
/* harmony import */ var _special_items_weapons_container_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./special_items/weapons_container.js */ "./lib/special_items/weapons_container.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./constants.js */ "./lib/constants.js");
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./util.js */ "./lib/util.js");

















class Game extends _util_js__WEBPACK_IMPORTED_MODULE_15__["default"] {
  constructor(mode, displayType) {
    super();
    this.background = new _background_background_js__WEBPACK_IMPORTED_MODULE_0__["default"](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT);
    this.llama = new _animals_llama_js__WEBPACK_IMPORTED_MODULE_1__["default"](Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, mode);
    this.coins = [new _other_objects_coin_js__WEBPACK_IMPORTED_MODULE_4__["default"](Math.floor(Math.random() * 500), Math.floor(Math.random() * 300))];
    this.platforms = [];
    this.itemsInPlay = [];
    this.weaponsContainer = new _special_items_weapons_container_js__WEBPACK_IMPORTED_MODULE_13__["default"](this.llama.weaponsInPossession, this.llama.weaponTogglePosition, "black", this.llama.activeWeaponIndex);

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

    if (this.background.luminary instanceof _background_sun_js__WEBPACK_IMPORTED_MODULE_11__["default"]) {
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
    _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"].forEach(set => {
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
      if (item instanceof _special_items_weapon_items_js__WEBPACK_IMPORTED_MODULE_7__["default"]) {
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
      if (this.itemsInPlay[i] instanceof _other_objects_heart_js__WEBPACK_IMPORTED_MODULE_5__["default"]) {
        if (this.itemsInPlay[i].status === "inactive") {
          // NOTE: add radius to deposit coord to account for spheres'
          //x and y being in the center of sphere
          if (this.itemsInPlay[i].x < _constants_js__WEBPACK_IMPORTED_MODULE_14__["HEARTDEPOSITCOORD"].x + this.itemsInPlay[i].radius && this.itemsInPlay[i].y < _constants_js__WEBPACK_IMPORTED_MODULE_14__["HEARTDEPOSITCOORD"].y + this.itemsInPlay[i].radius) {
            this.itemsInPlay.splice(i, 1);
            this.llamaHeartsOnCounter ++;
          }
        }
      } else if (this.itemsInPlay[i] instanceof _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
        if (this.itemsInPlay[i].status === "inactive") {
          let bacon = this.itemsInPlay[i];
          if ((bacon.x < _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].x && bacon.y < _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].y) || (bacon.x < -10) || (bacon.y < -10)) {
            this.itemsInPlay.splice(i, 1);
            this.baconsOnCounter ++;
          }
        }
      } else if (this.itemsInPlay[i] instanceof _animals_pig_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
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
        if ((this.coins[i].x < _constants_js__WEBPACK_IMPORTED_MODULE_14__["COINDEPOSITCOORD"].x && this.coins[i].y < _constants_js__WEBPACK_IMPORTED_MODULE_14__["COINDEPOSITCOORD"].y) || (this.coins[i].x < -10) || (this.coins[i].y < -10)) {
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
      _constants_js__WEBPACK_IMPORTED_MODULE_14__["PLATFORMTRACKS"].forEach((trackset) => {

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
            this.platforms.push(new _other_objects_platform_js__WEBPACK_IMPORTED_MODULE_2__["default"](trackset[0], trackNumber, startingX, startingY, this.choosePlatformSpeed(trackNumber)));
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
            this.platforms.push(new _other_objects_platform_js__WEBPACK_IMPORTED_MODULE_2__["default"](trackset[0], trackNumber, startingX, startingY, this.choosePlatformSpeed(trackNumber)));
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
      if (object instanceof _special_items_weapons_container_js__WEBPACK_IMPORTED_MODULE_13__["default"]) {
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
        object.outlineColor = this.background.luminary instanceof _background_sun_js__WEBPACK_IMPORTED_MODULE_11__["default"] ? "black" : "white";
      }

      object.update(ctx)
    });
  }

  drawScore(ctx) {
    let outlineColor = this.background.luminary instanceof _background_sun_js__WEBPACK_IMPORTED_MODULE_11__["default"] ? "black" : "white"

    //coin
    ctx.drawImage(this.coinIcon, 0, 0, 35, 35, _constants_js__WEBPACK_IMPORTED_MODULE_14__["COINDEPOSITCOORD"].x, _constants_js__WEBPACK_IMPORTED_MODULE_14__["COINDEPOSITCOORD"].y, 26, 26);
    ctx.font = `17px ${_constants_js__WEBPACK_IMPORTED_MODULE_14__["CANVAS_FONT"]}`;
    ctx.textAlign = "left"
    ctx.fillStyle = outlineColor
    ctx.fillText(`x ${this.scoreOnCounter}`, _constants_js__WEBPACK_IMPORTED_MODULE_14__["COINDEPOSITCOORD"].x + 25, _constants_js__WEBPACK_IMPORTED_MODULE_14__["COINDEPOSITCOORD"].y + 15);

    //heart
    ctx.drawImage(this.heartIcon, 0, 0, 30, 30, _constants_js__WEBPACK_IMPORTED_MODULE_14__["HEARTDEPOSITCOORD"].x, _constants_js__WEBPACK_IMPORTED_MODULE_14__["HEARTDEPOSITCOORD"].y, 28, 28);
    ctx.font = `17px ${_constants_js__WEBPACK_IMPORTED_MODULE_14__["CANVAS_FONT"]}`;
    ctx.fillStyle = outlineColor;
    ctx.fillText(`x ${this.llamaHeartsOnCounter}`, _constants_js__WEBPACK_IMPORTED_MODULE_14__["HEARTDEPOSITCOORD"].x + 32, _constants_js__WEBPACK_IMPORTED_MODULE_14__["HEARTDEPOSITCOORD"].y + 15);

    //bacons
    ctx.drawImage(this.baconIcon, 10, 10, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].x, _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].y, 50, 50);
    ctx.font = `17px ${_constants_js__WEBPACK_IMPORTED_MODULE_14__["CANVAS_FONT"]}`;
    ctx.fillStyle = outlineColor;
    ctx.fillText(`x ${this.baconsOnCounter}`, _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].x + 43, _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].y + 15);

    //seconds elapsed
    ctx.font = `14px ${_constants_js__WEBPACK_IMPORTED_MODULE_14__["CANVAS_FONT"]}`;
    ctx.fillStyle = outlineColor;
    ctx.textAlign="right";
    ctx.fillText(`time elapsed: ${this.secondsElapsed}`, 570, 21);
  }

  updateBaconToHearts(ctx) {
    if (this.baconsOnCounter === 5) {
      this.baconsOnCounter = 0;

      let heartFromBacon = new _other_objects_heart_js__WEBPACK_IMPORTED_MODULE_5__["default"](_constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].x, _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].y, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, "inactive");

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

          if (sphericalObjects[i] instanceof _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"] || sphericalObjects[j] instanceof _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
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

          if (this.llama.returnCurrentActivatedWeapon() instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
            this.llama.x += platform.speed * _constants_js__WEBPACK_IMPORTED_MODULE_14__["slowModeSpeedReducer"];
          } else {
            this.llama.x += platform.speed;
          }
        } else {
          if (this.llama.returnCurrentActivatedWeapon() instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_10__["default"]) {
            this.llama.x -= platform.speed * _constants_js__WEBPACK_IMPORTED_MODULE_14__["slowModeSpeedReducer"];
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
      this.coins.push(new _other_objects_coin_js__WEBPACK_IMPORTED_MODULE_4__["default"](this.createRandomCoord(50, Game.DIM_X - 25), this.createRandomCoord(20, Game.DIM_Y - Game.FLOOR_HEIGHT - 39)));
      this.score ++;
      // this.yeahSound.play();
      this.createNewPig();
    }
  }

  // NOTE: This next method will change the velocity vectors of certain
  //objects so that they become inactive and fly to the corner of the canvas
  resolveLlamaItemsWithDepositSpacesCollision(object) {

    if (!(object instanceof _special_items_weapon_items_js__WEBPACK_IMPORTED_MODULE_7__["default"])) {
      object.status = "inactive";
    }
    // else if (object instanceof WeaponItem) {
    //   object.status = "unequipped";
    // }

    let destination = {};

    if (object instanceof _other_objects_coin_js__WEBPACK_IMPORTED_MODULE_4__["default"]) {
      destination.x = _constants_js__WEBPACK_IMPORTED_MODULE_14__["COINDEPOSITCOORD"].x;
      destination.y = _constants_js__WEBPACK_IMPORTED_MODULE_14__["COINDEPOSITCOORD"].y;
    } else if (object instanceof _other_objects_heart_js__WEBPACK_IMPORTED_MODULE_5__["default"]) {
      destination.x = _constants_js__WEBPACK_IMPORTED_MODULE_14__["HEARTDEPOSITCOORD"].x;
      destination.y = _constants_js__WEBPACK_IMPORTED_MODULE_14__["HEARTDEPOSITCOORD"].y;
    } else if (object instanceof _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
      destination.x = _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].x;
      destination.y = _constants_js__WEBPACK_IMPORTED_MODULE_14__["BACONDEPOSITCOORD"].y;
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

        if (object instanceof _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
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

        if (this.itemsInPlay[i] instanceof _animals_pig_js__WEBPACK_IMPORTED_MODULE_3__["default"]) {
          // NOTE: No collision if llama is already dead
          if (this.llama.status === "dead") {
            continue;
          }

          // NOTE: Otherwise first check if any pigs are colliding with weapons

          if (currentActivatedWeapon instanceof _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_8__["default"]) {
            if (this.areSpheresColliding(currentActivatedWeapon, this.itemsInPlay[i])) {
              // NOTE: delete pig and create a bacon that will appear where
              //pig was last. If the pig was a type other than "normal", create three 2 bacons, else
              //just one
              if (this.itemsInPlay[i].type != "normal") {
                this.itemsInPlay.push(new _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.itemsInPlay[i].x - this.itemsInPlay[i].radius, this.itemsInPlay[i].y - this.itemsInPlay[i].radius, Game.DIM_Y - Game.FLOOR_HEIGHT));
                this.itemsInPlay.push(new _other_objects_heart_js__WEBPACK_IMPORTED_MODULE_5__["default"](this.itemsInPlay[i].x - this.itemsInPlay[i].radius, this.itemsInPlay[i].y - this.itemsInPlay[i].radius, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
              } else {
                this.itemsInPlay.push(new _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.itemsInPlay[i].x - this.itemsInPlay[i].radius, this.itemsInPlay[i].y - this.itemsInPlay[i].radius, Game.DIM_Y - Game.FLOOR_HEIGHT));
              }

              if (this.itemsInPlay.splice(i, 1)) {
                continue;
              }
            }
          } if (currentActivatedWeapon instanceof _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
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
            if (currentActivatedWeapon instanceof _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_9__["default"]) {
              this.itemsInPlay.push(new _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"](this.itemsInPlay[i].x - this.itemsInPlay[i].radius, this.itemsInPlay[i].y - this.itemsInPlay[i].radius, Game.DIM_Y - Game.FLOOR_HEIGHT));
              this.itemsInPlay.splice(i, 1);
            } else {
              this.resolveLlamaPigCollision(this.itemsInPlay[i]);
            }
          }

        } else if (this.itemsInPlay[i] instanceof _other_objects_heart_js__WEBPACK_IMPORTED_MODULE_5__["default"]) {
          if (this.areSphereNonSphereColliding(this.itemsInPlay[i], this.llama)) {
            this.resolveLlamaItemsWithDepositSpacesCollision(this.itemsInPlay[i]);
            this.llama.hearts++;
          }
        } else if (this.itemsInPlay[i] instanceof _other_objects_bacon_js__WEBPACK_IMPORTED_MODULE_6__["default"]) {
          let bacon = this.itemsInPlay[i];
          let baconFront = bacon.x + bacon.width;
          let baconBottom = bacon.y + bacon.height;

          if ((this.llama.y < baconBottom && bacon.y < llamaBottom && llamaFront > bacon.x && baconFront > llamaFront) || (this.llama.y < baconBottom && bacon.y < llamaBottom && this.llama.x < baconFront && llamaFront > bacon.x)) {
            this.resolveLlamaItemsWithDepositSpacesCollision(bacon);
            this.baconsCollected ++;
          }
        } else if (this.itemsInPlay[i] instanceof _special_items_weapon_items_js__WEBPACK_IMPORTED_MODULE_7__["default"]) {
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
      this.llama.weaponsInPossession.push(new _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_8__["default"]());
    } else if (weaponType === "bubbleShield") {
      this.llama.weaponsInPossession.push(new _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_9__["default"]());
    } else if (weaponType === "timeController") {
      this.llama.weaponsInPossession.push(new _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_10__["default"]());
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

    for (let i = 0; i < _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"].length; i++) {
      for (let j = 0; j < objects.length; j++) {
        if (objects[j] instanceof _animals_pig_js__WEBPACK_IMPORTED_MODULE_3__["default"]){

          if (this.areSpheresColliding({x: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][0], y: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][1], radius: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][2]}, objects[j]) && (objects[j].status === "available" || objects[j].status === "testing")) {
            circles[i] = false;
          }
        } else if (objects[j] instanceof _animals_llama_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
          if (this.areSphereNonSphereColliding({x: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][0], y: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][1], radius: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][2]}, objects[j])) {
            circles[i] = false;
          }
        } else if (objects[j] instanceof _other_objects_heart_js__WEBPACK_IMPORTED_MODULE_5__["default"]) {
          if (this.areSpheresColliding({x: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][0], y: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][1], radius: _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i][2]}, objects[j])) {
            circles[i] = false;
          }
        }
      }
    }

    for (let i = 0; i < circles.length; i++) {
      if (circles[i] === true) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][i];
      }
    }

    return _constants_js__WEBPACK_IMPORTED_MODULE_14__["SPAWNCIRCLES"][0];
  }

  createNewPig() {
    let spawningCircle = this.returnEmptySpawnCircle();
    this.itemsInPlay.push(new _animals_pig_js__WEBPACK_IMPORTED_MODULE_3__["default"](spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
  }

  createNewSpecialPig() {
    let availableSpecialPigs = ["invertedCommands", "invisibleLlama", "flippedCanvas"];
    let randomIndex = Math.floor(Math.random() * Math.floor(3));
    let spawningCircle = this.returnEmptySpawnCircle();
    this.itemsInPlay.push(new _animals_pig_js__WEBPACK_IMPORTED_MODULE_3__["default"](spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, availableSpecialPigs[randomIndex]));
  }

  creatNewHeart() {
    let spawningCircle = this.returnEmptySpawnCircle();
    this.itemsInPlay.push(new _other_objects_heart_js__WEBPACK_IMPORTED_MODULE_5__["default"](spawningCircle[0], spawningCircle[1] , Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT));
  }

  spawnNewWeaponItem() {
    let randomDayWeapons = ["forceFieldBlast", "timeController", "bubbleShield"];
    let randomNightWeapons = ["bubbleShield", "forceFieldBlast", "timeController"];

    let spawnCircle = this.returnEmptySpawnCircle();
    // let spawnX = spawnCircle[0];
    // let spawnY = spawnCircle[1];

    let [spawnX, spawnY] = spawnCircle;


    if (this.llama.status === "normal") {
      let randomIndex = Math.floor(Math.random() * Math.floor(3));
      this.itemsInPlay.push(new _special_items_weapon_items_js__WEBPACK_IMPORTED_MODULE_7__["default"](spawnX, spawnY, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, randomDayWeapons[randomIndex]));
    } else if (this.llama.status === "flightMode") {
      let randomIndex = Math.floor(Math.random() * Math.floor(3));
      this.itemsInPlay.push(new _special_items_weapon_items_js__WEBPACK_IMPORTED_MODULE_7__["default"](spawnX, spawnY, Game.DIM_X, Game.DIM_Y - Game.FLOOR_HEIGHT, randomNightWeapons[randomIndex]));
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
      if (object instanceof _animals_pig_js__WEBPACK_IMPORTED_MODULE_3__["default"]){
        results = false;
      }
    });
    return results;
  }

  manageObjectsWhenInSlowMode() {
    let slowModeOn =  this.llama.returnCurrentActivatedWeapon() instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_10__["default"];

    let objects = [].concat(this.platforms).concat(this.itemsInPlay).concat(this.coins)
                    .concat(this.background.luminary).concat(this.background)
                    .concat(this.background.meteor).concat(this.background.bird)
                    .concat(this.llama.weaponsDiscarded);

    objects.forEach(object => {
      if (slowModeOn && this.llama.status != "dead") {
        if (object instanceof _other_objects_coin_js__WEBPACK_IMPORTED_MODULE_4__["default"] || object instanceof _background_bird_1_js__WEBPACK_IMPORTED_MODULE_12__["default"]) {
          if (!object.spritecycleOffsetForSlowMode) {
            object.spritecycle = object.spritecycle / _constants_js__WEBPACK_IMPORTED_MODULE_14__["slowModeSpeedReducer"];
            object.spritecycleOffsetForSlowMode = true;
          }
        }
        object.slowMode = true;
      } else {
        if (object instanceof _other_objects_coin_js__WEBPACK_IMPORTED_MODULE_4__["default"] || object instanceof _background_bird_1_js__WEBPACK_IMPORTED_MODULE_12__["default"]) {
          if (!object.spritecycleOffsetForNormalMode) {
            object.spritecycle = object.spritecycle * _constants_js__WEBPACK_IMPORTED_MODULE_14__["slowModeSpeedReducer"];
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

/* harmony default export */ __webpack_exports__["default"] = (Game);

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

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");
/* harmony import */ var _background_moon_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background/moon.js */ "./lib/background/moon.js");



class GameView {
  constructor(ctx, game, soundMutedBoolean) {
    this.game = game;
    this.ctx = ctx;
    this.gameStatus = "unPaused"
    this.fps = 0;
    this.seconds = 0;
    this.requestId = undefined;

    this.time = new Date();
    this.soundMuted = soundMutedBoolean;

    this.backgroundMusic = new Audio("./assets/audio/electro.m4a");

    addEventListener("keydown", (e) => this.keyDownHandler(e));
    this.animate = this.animate.bind(this);
    // this.stop = this.stop.bind(this);
    this.allowedForHighScoreInput = false;
  }

  animate() {

    // NOTE: the following if conditional was the only way to make the display dissapeaer
    //after clicking restart!
    if (document.getElementById("game-over-display").style.display === "flex" && this.game.gameOver === false) {
      document.getElementById("game-over-display").style.display = "";
    }

    if (this.game.status === "normal-play") {
      if (this.gameStatus === "unPaused") {
        if (this.soundMuted === false) {
          this.backgroundMusic.play();
        }else if (this.soundMuted === true) {
          this.backgroundMusic.pause();
        }

      } else {
        this.backgroundMusic.pause();
      }
    }

    //NOTE Uncomment this to see how many seconds have passed
      // this.fps ++;
      //
      // if (this.fps === 60) {
      //   this.fps = 0;
      //   this.seconds++;
      //   // console.log(this.seconds);
      //   let newTime = new Date();
      //   console.log(`${(newTime - this.time) /1000}......${this.seconds}`);
      //   this.time = newTime;
      // }
    //

    // TODO: Ask WHERE IS THIS "TIME" COMING FROM
    // const timeDelta = time - this.lastTime;
    // this.game.step(timeDelta);

    if (this.gameStatus === "unPaused" && this.game.gameOver === false) {
      this.game.update(this.ctx);
    }

    if (this.game.gameOver === true) {
      this.soundMuted = true;
      this.backgroundMusic.pause();
      this.allowRestart();
    }

    if (this.gameStatus === "inactive") {
        cancelAnimationFrame(this.requestId);
        return;
    }

    //TODO: This following radial gradient slows down the fps by 3x!
    //Why would this be? This was discovered when trying to test a
    //radial gradient for the forcefield
        // let time1 = new Date();
        //
        // if (this.seconds < 30) {
        //   let x = 100;
        //   let y = 75;
        //   // Radii of the white glow.
        //   let innerRadius = 40;
        //   let outerRadius = 80;
        //   // Radius of the entire circle.
        //   let radius = 70;
        //   var gradient = this.ctx.createRadialGradient(x, y, innerRadius, x, y, outerRadius);
        //   gradient.addColorStop(0, 'white');
        //   gradient.addColorStop(1, 'blue');
        //
        //   this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
        //
        //   this.ctx.fillStyle = gradient;
        //   this.ctx.fill();
        // }
        // //
        // console.log((new Date() - time1)/1000);
    //

    this.requestId = requestAnimationFrame(this.animate);
    // this.lastTime = time;
  }

  allowRestart() {
    // TODO: write code for here
    document.getElementById("game-over-display").style.display = "flex";

    let finalScoreDisplayed = document.getElementById("final-coin-count");
    let modeDisplayed = document.getElementById("mode-played");
    finalScoreDisplayed.innerHTML = `${this.game.score}`;
    modeDisplayed.innerHTML = `${this.game.gameMode}`;

    this.checkIfPlayerCanSaveScore();
  }

  keyDownHandler(e) {
    if (e.keyCode === 80) { //the letter p
      if (this.game.status === "background-demo") {
        return;
      }

      if (this.gameStatus != "paused" && this.game.gameOver != true) {
        this.gameStatus = "paused";
        document.getElementById("paused-game-message").style.display = "block";
        document.getElementById("pause-button").innerHTML = "UNPAUSE";
        document.getElementById("press-p-command-text").innerHTML = "Press 'P' to unpause";
        if (this.game.background.luminary instanceof _background_moon_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
          document.getElementById("paused-game-message").style.color = "white";
        }
      } else if (this.gameStatus === "paused") {
        this.gameStatus = "unPaused";
        document.getElementById("paused-game-message").style.display = "";
        document.getElementById("pause-button").innerHTML = "PAUSE";
        document.getElementById("press-p-command-text").innerHTML = "Press 'P' to pause";
        document.getElementById("paused-game-message").style.color = "";
      }
    } else if (e.keyCode === 13) { //enter
      if (this.game.gameOver === true) {

        this.game = new _game_js__WEBPACK_IMPORTED_MODULE_0__["default"]("normal", "normal-play");

        if (document.getElementById("sound-button-off").style.display === "none") {
          this.soundMuted = false;
        }

        document.getElementById("game-over-display").style.display = "";
        document.getElementById("score-save-section").style.display = "";
        document.getElementById("name-to-save").value = "";
        this.allowedForHighScoreInput = false;
      }
    }
  }

  checkIfPlayerCanSaveScore() {

    let database = firebase.database();
    let ref = this.game.gameMode === "normal" ? database.ref("scores/normalMode") : database.ref("scores/flightMode");
    let numberOfEntries = undefined;
    let lowestScore = undefined;

    ref.on('value', (data) => {
      numberOfEntries = Object.values(data.val()).length;


      Object.values(data.val()).forEach(dataSet => {
        if (lowestScore === undefined) {
          lowestScore = [dataSet.name, dataSet.score];
        }

        if (dataSet.score < lowestScore[1]) {
          lowestScore = [dataSet.name, dataSet.score];
        }
      });
    });

    // NOTE: if current score is more than 1, and the high score entires are less than
    //10 or the score is higher than the lowest high score, allow to save, meaning the
    //html elements that allow it will be displayed
    if (this.game.score > 0) {
      if (numberOfEntries < 10 || (numberOfEntries >= 10 && this.game.score > lowestScore[1])) {
        if (!this.allowedForHighScoreInput)
        document.getElementById("score-save-section").style.display = "flex";
        this.allowedForHighScoreInput = true;
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

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ }),

/***/ "./lib/little_llama.js":
/*!*****************************!*\
  !*** ./lib/little_llama.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _background_moon_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./background/moon.js */ "./lib/background/moon.js");
/* harmony import */ var _game_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view.js */ "./lib/game_view.js");
/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.js */ "./lib/game.js");


const QUICK_TIPS = [
  "Colliding with a pig will result in that pig leaving the game screen...after eliminating one of your hearts",
  "Colliding with a red pig also results in temporarily inverted controls",
  "When Super Speed is activated, the world around Little Llama slows down",
  "Press 'DELETE' to get rid of a toggled weapon and make room for another one",
  "Available weapons bouncing around won't stay on the game screen forever",
  "Avoid the odd colored pigs and eventually they go away",
  "Colliding with a white pig also results in momentarily becoming invisible",
  "If you kill a pig with a weapon, it turns into bacon",
  "If you kill and odd colored pig a heart is also produced",
  "5 collected bacons result in one extra heart",
  "The Bubble Shield weapon behaves differently depending on the mode of play",
  "In Flight Mode, it is possible to kill a pig using Bubble Shield...",
  "Colliding with a black pig also results in a momentarily flipped game screen",
];




let soundMuted = true;

  document.getElementById("landing-play-button").addEventListener("click", ()=> {
    document.getElementById("landing").style.display = "none";
    document.getElementById("current-stats").style.display = "flex";
    document.getElementById("instruction-buttons").style.display = "block";
    document.getElementById("left-side-panel").style.display = "flex";

  });

  let gameView = undefined;
  let ctx = undefined;

  document.addEventListener("DOMContentLoaded", () => {
    const canvasEl = document.getElementById('canvas');
    ctx = canvasEl.getContext("2d");
    canvasEl.width = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].DIM_X;
    canvasEl.height = _game_js__WEBPACK_IMPORTED_MODULE_2__["default"].DIM_Y;
    const demo = new _game_js__WEBPACK_IMPORTED_MODULE_2__["default"]("", "background-demo");
    gameView = new _game_view_js__WEBPACK_IMPORTED_MODULE_1__["default"](ctx, demo, soundMuted);
    gameView.animate();
  });

  let i = 0;

  setInterval(()=> {
    document.getElementById("tips").innerHTML = QUICK_TIPS[i];
    if (i >= QUICK_TIPS.length - 1) {
      i = 0
    } else {
      i++
    }
  }, 5000);

// NOTE: normal mode start
  document.getElementById("normal-button").addEventListener("click", () => {
    gameView.gameStatus = "inactive";
    ctx.clearRect(0,0, 750, 450);
    document.getElementsByClassName("canvas-cover")[0].style.display = "none";
    document.getElementsByClassName("mode-descriptions")[0].style.display = "none";

    gameView = new _game_view_js__WEBPACK_IMPORTED_MODULE_1__["default"](ctx, new _game_js__WEBPACK_IMPORTED_MODULE_2__["default"]("normal", "normal-play"), soundMuted);
    gameView.animate();
  });

// NOTE: flight mode start
  document.getElementById("flight-button").addEventListener("click", () => {
    gameView.gameStatus = "inactive";
    ctx.clearRect(0,0, 750, 450);
    document.getElementsByClassName("canvas-cover")[0].style.display = "none";
    document.getElementsByClassName("mode-descriptions")[0].style.display = "none";

    gameView = new _game_view_js__WEBPACK_IMPORTED_MODULE_1__["default"](ctx, new _game_js__WEBPACK_IMPORTED_MODULE_2__["default"]("flightMode", "normal-play"), soundMuted);
    gameView.animate();
  });

// NOTE: Pause button
  document.getElementById("pause-button").addEventListener("click", () => {
    if (gameView.game.status === "background-demo") {
      return;
    }

    if (gameView.gameStatus != "paused") {
      gameView.gameStatus = "paused";
      document.getElementById("paused-game-message").style.display = "block";
      document.getElementById("pause-button").innerHTML = "UNPAUSE";
      document.getElementById("press-p-command-text").innerHTML = "Press 'P' to unpause";
      if (gameView.game.background.luminary instanceof _background_moon_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        document.getElementById("paused-game-message").style.color = "white";
      }
    } else {
      gameView.gameStatus = "unPaused";
      document.getElementById("paused-game-message").style.display = "";
      document.getElementById("pause-button").innerHTML = "PAUSE";
      document.getElementById("press-p-command-text").innerHTML = "Press 'P' to pause";
      document.getElementById("paused-game-message").style.color = "";
    }
  });

  // NOTE: restart button

  document.getElementById("restart-button").addEventListener("click", () => {
    gameView.gameStatus = "inactive";
    ctx.clearRect(0,0, 750, 450);
    document.getElementsByClassName("canvas-cover")[0].style.display = "";
    document.getElementsByClassName("mode-descriptions")[0].style.display = "";
    document.getElementById("game-over-display").style.display = "";
    document.getElementById("score-save-section").style.display = "";
    document.getElementById("name-to-save").value = "";

    gameView = new _game_view_js__WEBPACK_IMPORTED_MODULE_1__["default"](ctx, new _game_js__WEBPACK_IMPORTED_MODULE_2__["default"]("", "background-demo"), soundMuted);
    gameView.animate();
  });
  //

  // NOTE: Sound buttons

  document.getElementById("sound-button-off").addEventListener("click", () => {
    document.getElementById("sound-button-off").style.display = "none";
    document.getElementById("sound-button-on").style.display = "flex";
    soundMuted = false;
    gameView.soundMuted = false;
  });

  document.getElementById("sound-button-on").addEventListener("click", () => {
    document.getElementById("sound-button-on").style.display = "none";
    document.getElementById("sound-button-off").style.display = "flex";
    soundMuted = true;
    gameView.soundMuted = true;
  });

// NOTE: description animations
  document.getElementById("normal-button").addEventListener("mouseover", () => {
    document.getElementsByClassName("regular-llama-figure")[0].classList.add("class", "jumping");
    document.getElementsByClassName("normal-mode-description")[0].style.display = "block";
    document.getElementsByClassName("normal-mode-description")[0].classList.add("description-display");
    document.getElementsByClassName("choose-mode-text")[0].style.display = "none";
  });

  document.getElementById("normal-button").addEventListener("mouseout", () => {
    document.getElementsByClassName("regular-llama-figure")[0].classList.remove("jumping");
    document.getElementsByClassName("normal-mode-description")[0].style.display = "";
    document.getElementsByClassName("choose-mode-text")[0].style.display = "";

  });

  document.getElementById("flight-button").addEventListener("mouseover", () => {
    document.getElementsByClassName("dressed-llama-figure")[0].classList.add("class", "flying");
    document.getElementsByClassName("flight-mode-description")[0].style.display = "block";
    document.getElementsByClassName("flight-mode-description")[0].classList.add("description-display");
    document.getElementsByClassName("choose-mode-text")[0].style.display = "none";
  });

  document.getElementById("flight-button").addEventListener("mouseout", () => {
    document.getElementsByClassName("dressed-llama-figure")[0].classList.remove("flying");
    document.getElementsByClassName("flight-mode-description")[0].style.display = "";
    document.getElementsByClassName("choose-mode-text")[0].style.display = "";
  });

  // NOTE: how to modal handling

  let modal = document.getElementById("how-to-modal")
  let slide1 = document.getElementById("slide1");
  let slide2 = document.getElementById("slide2");
  let slide3 = document.getElementById("slide3");
  let slide4 = document.getElementById("slide4");

  let pausedBeforeClicked = false;

    document.getElementById("landing-how-play-button").addEventListener("click", () => {
      modal.style.display = "flex";
      slide1.style.display = "flex";
    });

    document.getElementById("how-to-play-button2").addEventListener("click", () => {
      modal.style.display = "flex";
      slide1.style.display = "flex";

      if (gameView.game.status === "normal-play") {

        if (gameView.gameStatus === "paused" ) {
          pausedBeforeClicked = true;
        }

        gameView.gameStatus = "paused";
      }
    });

    //slide 1 next button
    document.getElementById("slide1-next-button").addEventListener("click", () => {
      slide1.classList.remove("slide-back-from-left");
      slide2.classList.remove("slide-back-from-center");
      slide1.classList.add("slide-out");
      slide2.style.display = "flex";
    });

    //slide 2 next button
    document.getElementById("slide2-next-button").addEventListener("click", () => {
      slide2.classList.remove("slide-back-from-left");
      slide3.classList.remove("slide-back-from-center");
      slide2.classList.add("slide-out");
      slide3.style.display = "flex";
    });

    // slide 2 previous button
    document.getElementById("slide2-previous-button").addEventListener("click", () => {
      slide2.classList.remove("slide-out");
      slide2.classList.remove("slide-back-from-left");
      slide2.classList.add("slide-back-from-center");
      slide1.classList.remove("slide-out");
      slide1.classList.add("slide-back-from-left");

    });

    //slide 3 next button
    document.getElementById("slide3-next-button").addEventListener("click", () => {
      slide3.classList.remove("slide-back-from-left");
      slide4.classList.remove("slide-back-from-center");
      slide3.classList.add("slide-out");
      slide4.style.display = "flex";
    });

    // slide 3 previous button
    document.getElementById("slide3-previous-button").addEventListener("click", () => {
      slide3.classList.remove("slide-out");
      slide3.classList.add("slide-back-from-center");
      slide3.classList.remove("slide-back-from-left");
      slide2.classList.remove("slide-out");
      slide2.classList.add("slide-back-from-left");

    });

    //slide 4 finish button
    document.getElementById("slide4-finish-button").addEventListener("click", () => {
      modal.style.display = "";

      [slide1, slide2, slide3, slide4].forEach((slide) => {
        slide.style.display = "";
        slide.classList.remove("slide-out");
        slide.classList.remove("slide-back-from-left");
        slide.classList.remove("slide-back-from-center");
      });


      if (gameView.game.status === "normal-play") {
        if (!pausedBeforeClicked) {
          gameView.gameStatus = "unPaused";
        }
        pausedBeforeClicked = false;
      }

    });

    // slide 4 previous button
    document.getElementById("slide4-previous-button").addEventListener("click", () => {
      slide4.classList.remove("slide-out");
      slide4.classList.add("slide-back-from-center");
      slide4.classList.remove("slide-back-from-left");
      slide3.classList.remove("slide-out");
      slide3.classList.add("slide-back-from-left");

    });


/***/ }),

/***/ "./lib/other_objects/bacon.js":
/*!************************************!*\
  !*** ./lib/other_objects/bacon.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");
//image source: http://herebemonsters.wikia.com/wiki/File:Bacon-Sprite.png


class Bacon {
  constructor(x, y, canvas_height) {
    this.x = x;
    this.y = y;
    this.y_velocity = 6;
    this.x_velocity = 0;
    this.height = 40;
    this.width = 50;
    this.status = "available"

    this.canvas_height = canvas_height

    this.slowMode = false;

    this.baconImage = new Image();
    this.baconImage.src = "./assets/sprites/other_objects/bacon.png";
  }

  update(ctx) {
    this.checkCanvasBorderCollision();
    this.move();
    this.draw(ctx);
  }

  draw(ctx){
    // NOTE: Uncomment below to see bacon hitbox
      // ctx.fillStyle = "blue";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
    //

    ctx.drawImage(this.baconImage, 0, 0, 300, 300, this.x, this.y, 60, 60);
  }

  move() {
    if (this.slowMode) {
      this.x += this.x_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      this.y += this.y_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
    } else {
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    }
  }

  checkCanvasBorderCollision() {
    // NOTE: add a few fixels for better visual resting on floor
    if (this.y > this.canvas_height - this.height + 15) {
      this.y = this.canvas_height - this.height + 15;
      this.y_velocity = 0;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Bacon);


/***/ }),

/***/ "./lib/other_objects/coin.js":
/*!***********************************!*\
  !*** ./lib/other_objects/coin.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");


class Coin {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 39;
    this.x_velocity = 0;
    this.y_velocity = 0;

    this.status = "available";

    this.slowMode = false;
    // NOTE: This next one is necessary otherwise in the start of slow
    //mode, the coin sprite will usually jump back to the first one;
    this.spritecycleOffsetForSlowMode = false;
    this.spritecycleOffsetForNormalMode = true;

    this.spritecycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/other_objects/coin_sprite_sheet.png';
  }

  update(ctx) {

    if (!this.slowMode) {
      this.spritecycleOffsetForSlowMode = false;
    }

    if (this.slowMode) {
      this.spritecycleOffsetForNormalMode = false;
    }

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
    //Move the coin if needs to be (it is desposit)
    if (this.slowMode) {
      this.x += this.x_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      this.y += this.y_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
    } else {
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    }
  }

  getSprite() {
    this.spritecycle ++;

    let framesUntilNextSprite = 8;
    let framesUntilNextSpriteSlowMode = 8 / _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];

    if (this.slowMode) {
      if (this.spritecycle < framesUntilNextSpriteSlowMode * 1) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position1;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 2) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position2;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 3) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position3;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 4) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position4;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 5) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position5;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 6) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position6;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 7) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position7;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 8) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position8;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 9) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position9;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 10) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position10;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 11) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position11;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 12) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position12;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 13) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position13;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 14) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position14;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 15) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position15;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 16) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position16;
      } else {
        this.spritecycle = 0;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position1;
      }
    } else {
      if (this.spritecycle < framesUntilNextSprite * 1) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position1;
      } else if (this.spritecycle < framesUntilNextSprite * 2) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position2;
      } else if (this.spritecycle < framesUntilNextSprite * 3) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position3;
      } else if (this.spritecycle < framesUntilNextSprite * 4) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position4;
      } else if (this.spritecycle < framesUntilNextSprite * 5) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position5;
      } else if (this.spritecycle < framesUntilNextSprite * 6) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position6;
      } else if (this.spritecycle < framesUntilNextSprite * 7) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position7;
      } else if (this.spritecycle < framesUntilNextSprite * 8) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position8;
      } else if (this.spritecycle < framesUntilNextSprite * 9) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position9;
      } else if (this.spritecycle < framesUntilNextSprite * 10) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position10;
      } else if (this.spritecycle < framesUntilNextSprite * 11) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position11;
      } else if (this.spritecycle < framesUntilNextSprite * 12) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position12;
      } else if (this.spritecycle < framesUntilNextSprite * 13) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position13;
      } else if (this.spritecycle < framesUntilNextSprite * 14) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position14;
      } else if (this.spritecycle < framesUntilNextSprite * 15) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position15;
      } else if (this.spritecycle < framesUntilNextSprite * 16) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position16;
      } else {
        this.spritecycle = 0;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["COIN_SPRITES"].position1;
      }
    }

  }

}

/* harmony default export */ __webpack_exports__["default"] = (Coin);


/***/ }),

/***/ "./lib/other_objects/heart.js":
/*!************************************!*\
  !*** ./lib/other_objects/heart.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");



class Heart {
  constructor(x, y, canvas_width, canvas_height, status) {
    this.x = x;
    this.y = y;
    this.radius = 19;
    this.x_velocity = 3;
    this.y_velocity = 3;
    this.mass = 5;

    this.slowMode = false;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.status = status || "available";

    this.spritecycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/other_objects/heart_sprite_sheet.png';
  }

  update(ctx) {
    this.move()
    this.checkCanvasBorderCollision();
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
    if (this.slowMode) {
      this.x += this.x_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      this.y += this.y_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
    } else {
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    }
  }

  getSprite() {

    let framesUntilNextSprite = 20;
    let framesUntilNextSpriteSlowMode = framesUntilNextSprite / _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];

    this.spritecycle ++;

    if (this.slowMode) {
      if (this.spritecycle < framesUntilNextSpriteSlowMode) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["HEART_SPRITES"].number1;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 2) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["HEART_SPRITES"].number2;
      } else {
        this.spritecycle = 0;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["HEART_SPRITES"].number1;
      }
    } else {
      if (this.spritecycle < framesUntilNextSprite) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["HEART_SPRITES"].number1;
      } else if (this.spritecycle < framesUntilNextSprite * 2) {
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["HEART_SPRITES"].number2;
      } else {
        this.spritecycle = 0;
        return _constants_js__WEBPACK_IMPORTED_MODULE_0__["HEART_SPRITES"].number1;
      }
    }
  }

  checkCanvasBorderCollision() {

    if (this.status != "available") {
      return;
    }

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

/* harmony default export */ __webpack_exports__["default"] = (Heart);


/***/ }),

/***/ "./lib/other_objects/platform.js":
/*!***************************************!*\
  !*** ./lib/other_objects/platform.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");


class Platform {
  constructor(direction, trackNumber, x, y, speed) {
    this.direction = direction;
    this.trackNumber = trackNumber;
    this.speed = speed;
    this.originalSpeed = speed;
    this.x = x;
    this.y = y;
    this.height = 22;
    this.width = 124;
    this.reducedSpeed = this.speed * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
    this.slowMode = false;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/other_objects/platform.png';
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
      if (this.slowMode) {
        this.x += this.speed * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      } else {
        this.x += this.speed;
      }
    } else {
      if (this.slowMode) {
        this.x -= this.speed * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      } else {
        this.x -= this.speed;
      }
    }
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Platform);


/***/ }),

/***/ "./lib/special_items/weapon_items.js":
/*!*******************************************!*\
  !*** ./lib/special_items/weapon_items.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");
// NOTE: two statuses = availabe and discarded. Available is when
//it is bouncing around. Discarded is when llama has decided to get rid of it
//after collecting it and it was never used.



class WeaponItem {
  constructor(x, y, canvas_width, canvas_height, type, status) {
    this.x = x;
    this.y = y;
    this.radius = 24;
    this.x_velocity = 2.5;
    this.y_velocity = 2.5;
    this.mass = 5;
    this.type = type;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.status = status || "available";
    this.assignedWeaponContainerCoord = {};

    this.slowMode = false;

    // NOTE: items are to stay in play while it has hit the border less
    //than 10 times
    this.borderHitCollisionCount = 0;

    this.weaponImage = new Image();
    this.weaponImage.src = "";
  }

  update(ctx) {

    if (this.status === "discarded") {
      this.x_velocity = 6;
      this.y_velocity = -2;
    }

    this.move();
    this.checkCanvasBorderCollision();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: uncomment this to show the hitcircle of the object
    if (this.type === "timeController") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.fillStyle = "#BC8F8F";
      ctx.fill();
      ctx.closePath();
    }
    //

    this.getSprite();
    // let sprite = this.getSprite();
    if(this.type === "forceFieldBlast") {
      ctx.drawImage(this.weaponImage, 0, 0, 300, 300, this.x - 25, this.y - 24, 63, 63);
    } else if (this.type === "bubbleShield") {
      ctx.drawImage(this.weaponImage, 0, 0, 300, 300, this.x - 29, this.y - 27, 63, 63);
    } else if (this.type === "timeController") {
      ctx.drawImage(this.weaponImage, 0, 0, 800, 800, this.x - 20, this.y - 27, 62, 62);
    }
  }

  move() {
      if (this.slowMode) {
        this.x += this.x_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
        this.y += this.y_velocity * _constants_js__WEBPACK_IMPORTED_MODULE_0__["slowModeSpeedReducer"];
      } else {
        this.x += this.x_velocity;
        this.y += this.y_velocity;
      }
  }

  getSprite() {
    if (this.type === "forceFieldBlast") {
      this.weaponImage.src = './assets/sprites/weapon_related/forcefield_blast_icon.png';
    } else if (this.type === "bubbleShield") {
      this.weaponImage.src = './assets/sprites/weapon_related/bubble.png';
    } else if (this.type === "timeController") {
      this.weaponImage.src = './assets/sprites/weapon_related/hourglass.png';
    }
  }

  checkCanvasBorderCollision() {

    if (this.status != "available" || this.borderHitCollisionCount > 15) {
      return;
    }

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
      //increment bordercollision count
      this.borderHitCollisionCount ++;

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
      //increment bordercollision count
      this.borderHitCollisionCount ++;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (WeaponItem);


/***/ }),

/***/ "./lib/special_items/weapons_container.js":
/*!************************************************!*\
  !*** ./lib/special_items/weapons_container.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../weapons/bubble_shield.js */ "./lib/weapons/bubble_shield.js");
/* harmony import */ var _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../weapons/forcefield.js */ "./lib/weapons/forcefield.js");
/* harmony import */ var _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../weapons/time_controller.js */ "./lib/weapons/time_controller.js");
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants.js */ "./lib/constants.js");






class WeaponsContainer {
  constructor(equippedLLamaWeapons, weaponTogglePosition, outlineColor, activeWeaponIndex) {
    this.equippedLLamaWeapons = equippedLLamaWeapons;
    this.outlineColor = outlineColor;
    this.weaponTogglePosition = weaponTogglePosition;
    this.activeWeaponIndex = activeWeaponIndex;
  }

  update(ctx) {
    this.draw(ctx);
  }

  draw(ctx) {
    //weapons container
    ctx.beginPath();
    ctx.rect(575, 5, 165, 40);
    ctx.lineWidth="1";
    ctx.strokeStyle= this.outlineColor;
    ctx.strokeStyle = "10px";
    ctx.stroke();
    ctx.closePath();

    // NOTE: Comment in to see where each collected weapon should go,
    //and the size of the icon
    // NOTE: weapons in conatiner are about 8px smaller than the floaing icons.
        // ctx.beginPath();
        // ctx.arc(WEAPON1COORD.x, WEAPON1COORD.y, 16, 0, Math.PI*2);
        // ctx.fillStyle = "black";
        // ctx.fill();
        // ctx.closePath();
        //
        // ctx.beginPath();
        // ctx.arc(WEAPON2COORD.x, WEAPON2COORD.y, 16, 0, Math.PI*2);
        // ctx.fillStyle = "black";
        // ctx.fill();
        // ctx.closePath();
        //
        // ctx.beginPath();
        // ctx.arc(WEAPON3COORD.x, WEAPON3COORD.y, 16, 0, Math.PI*2);
        // ctx.fillStyle = "black";
        // ctx.fill();
        // ctx.closePath();
    //


    if (this.activeWeaponIndex[0] === -1) {
      ctx.beginPath();
      ctx.font = `18px ${_constants_js__WEBPACK_IMPORTED_MODULE_3__["CANVAS_FONT"]}`;
      ctx.fillStyle = this.outlineColor;
      ctx.textAlign="right";
      if (this.equippedLLamaWeapons[this.weaponTogglePosition] instanceof _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        ctx.fillText("SPACEBAR for Bubble Shield", 570, 45);
      } else if (this.equippedLLamaWeapons[this.weaponTogglePosition] instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        ctx.fillText("SPACEBAR for Super Speed", 570, 45);
      } else if (this.equippedLLamaWeapons[this.weaponTogglePosition] instanceof _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        ctx.fillText("SPACEBAR for Force Field Blast", 570, 45);
      }
      ctx.closePath();
    }



    if (this.equippedLLamaWeapons[0]) {

      let isIndexToggled = this.weaponTogglePosition === 0;
      let weapon = this.equippedLLamaWeapons[0];

      if (isIndexToggled) {
        if (this.activeWeaponIndex[0] === 0) { //this one is active
          ctx.fillStyle = 'rgba(225, 0, 0, .8)'; //red
          ctx.fillRect(575, 5, 55, 40);
        } else if (this.activeWeaponIndex[0] != -1) { //one is active but not this one
          ctx.fillStyle = 'rgba(255, 69, 0, .8)'; //orange
          ctx.fillRect(575, 5, 55, 40);
        } else { //none is active
          ctx.fillStyle = 'rgba(0, 225, 0, .8)'; //green
          ctx.fillRect(575, 5, 55, 40);
        }

      }

      if (weapon instanceof _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].y - 22, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].y - 22, 50, 50);
        }

      } else if (weapon instanceof _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].y - 22, 58, 58);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].y - 22, 48, 48);
        }
      } else if (weapon instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].x - 17, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].y - 24, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].x - 17, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON1COORD"].y - 24, 50, 50);
        }
      }
    }

    if (this.equippedLLamaWeapons[1]) {

      let isIndexToggled = this.weaponTogglePosition === 1;
      let weapon = this.equippedLLamaWeapons[1];

      if (isIndexToggled) {
        if (this.activeWeaponIndex[0] === 1) { //this one is active
          ctx.fillStyle = 'rgba(225, 0, 0, .8)'; //red
          ctx.fillRect(630, 5, 55, 40);
        } else if (this.activeWeaponIndex[0] != -1) { //one is active but not this one
          ctx.fillStyle = 'rgba(255, 69, 0, .8)'; //orange
          ctx.fillRect(630, 5, 55, 40);
        } else { //none is active
          ctx.fillStyle = 'rgba(0, 225, 0, .8)'; //green
          ctx.fillRect(630, 5, 55, 40);
        }
      }

      if (weapon instanceof _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].y - 22, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].y - 22, 50, 50);
        }
      } else if (weapon instanceof _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].y - 22, 58, 58);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].y - 22, 48, 48);
        }
      } else if (weapon instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].x - 17, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].y - 24, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].x - 17, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON2COORD"].y - 24, 50, 50);
        }
      }
    }

    if (this.equippedLLamaWeapons[2]) {

      let isIndexToggled = this.weaponTogglePosition === 2;
      let weapon = this.equippedLLamaWeapons[2];

      if (isIndexToggled) {
        if (this.activeWeaponIndex[0] === 2) { //this one is active
          ctx.fillStyle = 'rgba(225, 0, 0, .8)'; //red
          ctx.fillRect(685, 5, 55, 40);
        } else if (this.activeWeaponIndex[0] != -1) { //one is active but not this one
          ctx.fillStyle = 'rgba(255, 69, 0, .8)'; //orange
          ctx.fillRect(685, 5, 55, 40);
        } else { //none is active
          ctx.fillStyle = 'rgba(0, 225, 0, .8)'; //green
          ctx.fillRect(685, 5, 55, 40);
        }
      }

      if (weapon instanceof _weapons_forcefield_js__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].y - 22, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].y - 22, 50, 50);
        }
      } else if (weapon instanceof _weapons_bubble_shield_js__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].y - 22, 58, 58);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].x - 24, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].y - 22, 48, 48);
        }
      } else if (weapon instanceof _weapons_time_controller_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].x - 17, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].y - 24, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].x - 17, _constants_js__WEBPACK_IMPORTED_MODULE_3__["WEAPON3COORD"].y - 24, 50, 50);
        }
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (WeaponsContainer);


/***/ }),

/***/ "./lib/util.js":
/*!*********************!*\
  !*** ./lib/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Util {
  constructor() {

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

//taken from http://2000clicks.com/MathHelp/GeometryPointAndTriangle3.aspx
// NOTE: Currently not being used
  areCoordsWithinTriangle(coord, pointA, pointB, pointC) {
    let calcPointAB = ((coord.y - pointA.y) * (pointB.x - pointA.x) - (coord.x - pointA.x) * (pointB.y - pointA.y));
    let calcPointBC = ((coord.y - pointB.y) * (pointC.x - pointB.x) - (coord.x - pointB.x) * (pointC.y - pointB.y));
    let calcPointCA = ((coord.y - pointC.y) * (pointA.x - pointC.x) - (coord.x - pointC.x) * (pointA.y - pointC.y));

    if (calcPointAB * calcPointBC > 0 && calcPointBC * calcPointCA > 0) {
      return true;
    } else {
      return false;
    }
  }

  rotate(velocity, angle) {
    let rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
  }

  // NOTE: All-purpose function to create random coords
  createRandomCoord(min, max) {
    return Math.random() * (max - min) + min;
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Util);


/***/ }),

/***/ "./lib/weapons/bubble_shield.js":
/*!**************************************!*\
  !*** ./lib/weapons/bubble_shield.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// NOTE: weapons have 2 statuses: equipped, activated

class BubbleShield {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 45;
    this.status = "equipped";
    this.mass = 5;
    this.x_velocity = 0;
    this.y_velocity = 0;

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/weapon_related/bubble.png';
  }

  update(ctx, x, y, x_velocity, y_velocity) {

    if (this.status === "activated") {
      this.x = x + (52/2);
      this.y = y + (45/2);
      this.x_velocity = x_velocity;
      this.y_velocity = y_velocity;
      this.draw(ctx, this.x, this.y);
    }
  }

  draw(ctx, x, y) {
    // NOTE: Uncomment to see shield hit box
      // ctx.beginPath();
      // ctx.arc(x, y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = 'rgba(48, 47, 7, .9)';
      // ctx.fill();
      // ctx.closePath();
    //

    ctx.drawImage(this.weaponImage, 20, 10, 400, 400, x - 45, y - 46, 150, 150);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (BubbleShield);


/***/ }),

/***/ "./lib/weapons/forcefield.js":
/*!***********************************!*\
  !*** ./lib/weapons/forcefield.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// NOTE: weapons have 2 statuses: equipped, activated

class ForceField {
  constructor() {
    this.x = 500;
    this.y = 250;
    this.radius = 35;
    this.status = "equipped";

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/weapon_related/forcefield_blast_icon.png';
  }

  update(ctx, x, y) {

    if (this.status === "activated") {
      this.x = x + (52/2);
      this.y = y + (45/2);
      this.radius += 4;
      if (this.radius > 150) {
        this.radius = 0;
        this.status = "inactive";
      }
      this.draw(ctx, this.x, this.y);
    }
  }

  draw(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(48, 47, 7, .5)';
    ctx.fill();
    ctx.lineWidth =  3;
    ctx.strokeStyle = "#edf352";
    ctx.stroke();
    ctx.closePath();
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ForceField);


/***/ }),

/***/ "./lib/weapons/time_controller.js":
/*!****************************************!*\
  !*** ./lib/weapons/time_controller.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// NOTE: weapons have 2 statuses: equipped, activated

class TimeController {
  constructor() {
    this.x = 500;
    this.y = 250;
    this.radius = 35;
    this.status = "equipped";

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/weapon_related/hourglass.png';
  }

  update(ctx, x, y) {

    // if (this.status === "activated") {
    //   this.x = x + (52/2);
    //   this.y = y + (45/2);
    //   this.radius += 4;
    //   if (this.radius > 150) {
    //     this.radius = 0;
    //     this.status = "inactive";
    //   }
    //   this.draw(ctx, this.x, this.y);
    // }
  }

  draw(ctx, x, y) {
    //nothing to draw
  }

}

/* harmony default export */ __webpack_exports__["default"] = (TimeController);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map