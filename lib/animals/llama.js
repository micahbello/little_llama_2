// import MovingObject from './moving_object.js';
import ForceField from '../weapons/forcefield.js';
import BubbleShield from '../weapons/bubble_shield.js';
import TimeController from '../weapons/time_controller.js';
import WeaponItem from '../special_items/weapon_items.js';
import {LLAMA_SPRITES, CANVAS_FONT} from '../constants.js'

class Llama {
  constructor(canvas_width, canvas_height) {

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

    this.status = "normal";

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

    // NOTE: discarded weapon will have weapons that
    //llama chooses to get rid of. They will appear on canvas
    //flying out of the borders. Game.js will delete the from
    //this array once they are out of the bounds of the canvas
    this.weaponsDiscarded = [];

    this.activatedWeaponCountDown = 16 * 60; //15 seconds * 60fps

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
      return LLAMA_SPRITES.dead;
    }

    if (!this.keysPressed[37] && !this.keysPressed[39] && this.jumping === false) {
      this.walkcycle = 0;

      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama/llama_stand_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama/llama_stand_dressed_sprite_sheet.png';
      }

      if (this.lastDirectionFaced === "right") {
        return LLAMA_SPRITES.rightPosition1
      } else if (this.lastDirectionFaced === "left") {
        return LLAMA_SPRITES.leftPosition1
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
        return LLAMA_SPRITES.leftPosition1
      } else if (this.walkcycle < 12) {
        return LLAMA_SPRITES.leftPosition2
      } else if (this.walkcycle < 18) {
        return LLAMA_SPRITES.leftPosition3
      } else if (this.walkcycle < 24) {
        return LLAMA_SPRITES.leftPosition4
      } else {
        this.walkcycle = 0;
        return LLAMA_SPRITES.leftPosition1
      }

    } else if (this.keysPressed[39]){
      this.walkcycle ++;

      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_dressed_sprite_sheet.png';
      }

      if (this.walkcycle < 6) {
        return LLAMA_SPRITES.rightPosition1
      } else if (this.walkcycle < 12) {
        return LLAMA_SPRITES.rightPosition2
      } else if (this.walkcycle < 18) {
        return LLAMA_SPRITES.rightPosition3
      } else if (this.walkcycle < 24) {
        return LLAMA_SPRITES.rightPosition4
      } else {
        this.walkcycle = 0;
        return LLAMA_SPRITES.rightPosition1
      }
    } else {
      if (this.status === "normal") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_sprite_sheet.png';
      } else if (this.status === "flightMode") {
        this.spritesheet.src = './assets/sprites/llama/llama_run_dressed_sprite_sheet.png';
      }

      if (this.lastDirectionFaced === "right") {
        return LLAMA_SPRITES.rightPosition1;
      } else if (this.lastDirectionFaced === "left") {
        return LLAMA_SPRITES.leftPosition1;
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
    } else if (e.keyCode === 18 ) { //option button - get rid of weapon
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
  }

  getRidOfWeapon(weaponIndex) {
    if (this.status === "dead") {
      return;
    }

    // NOTE: First check that the weapon at that index is not currently active

    let weapon = this.weaponsInPossession[weaponIndex];
    let weaponItemType = "";

    if (weapon instanceof ForceField) {
      weaponItemType = "forceFieldBlast";
    } else if (weapon instanceof BubbleShield) {
      weaponItemType = "bubbleShield";
    } else if (weapon instanceof TimeController) {
      weaponItemType = "timeController";
    }

    if (this.weaponsInPossession[weaponIndex].status === "activated") {
      return;
    } else {


      this.weaponsDiscarded.push(new WeaponItem(this.x + (this.width/2), this.y + (this.height/2), this.canvas_width,
                                  this.canvas_height, weaponItemType, "discarded"));
      this.weaponsInPossession.splice(weaponIndex, 1);

    }
  }

  updateWeapons(ctx) {

    if (this.returnCurrentActivatedWeapon() instanceof BubbleShield) {
      if (this.activatedWeaponCountDown < 0) {
        this.returnCurrentActivatedWeapon().status = "inactive";
        this.activatedWeaponCountDown = 16 * 60;
      } else {
        //countdown display
        ctx.font = `20px ${CANVAS_FONT}`;
        let countDownColor = "";
        if (this.activatedWeaponCountDown / 60 < 6) {
          countDownColor = "red";
        } else {
          countDownColor = this.weaponTextDisplayColor;
        }
        ctx.fillStyle = countDownColor;
        ctx.textAlign="right";
        ctx.fillText(`Bubble Shield: ${Math.trunc(this.activatedWeaponCountDown / 60)}`, 570, 45);
        this.activatedWeaponCountDown --;
      }
    } else if (this.returnCurrentActivatedWeapon() instanceof TimeController) {
      if (this.activatedWeaponCountDown < 0) {
        this.returnCurrentActivatedWeapon().status = "inactive";
        this.activatedWeaponCountDown = 16 * 60;
      } else {
        //countdown display
        ctx.font = `20px ${CANVAS_FONT}`;
        let countDownColor = "";
        if (this.activatedWeaponCountDown / 60 < 6) {
          countDownColor = "red";
        } else {
          countDownColor = this.weaponTextDisplayColor;
        }
        ctx.fillStyle = countDownColor;
        ctx.textAlign="right";
        ctx.fillText(`Super Speed: ${Math.trunc(this.activatedWeaponCountDown / 60)}`, 570, 45);
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
        ctx.font = `20px ${CANVAS_FONT}`;
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
        ctx.font = `20px ${CANVAS_FONT}`;
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
        ctx.font = `20px ${CANVAS_FONT}`;
        ctx.textAlign="right";
        ctx.fillStyle = "red";
        ctx.fillText(`Flipped Screen: ${Math.trunc(this.flippedCanvasCountdown / 60)}`, 447, 225);
        this.flippedCanvasCountdown--;
      }
    }
  }

}

export default Llama;
