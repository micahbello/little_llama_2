import MovingObject from './moving_object.js';

// NOTE: uncomment to test making forcefield
  import ForceField from './weapons/forcefield.js';

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

    this.status = "normal";
    this.jumping = true;
    this.deadJumping = false;

    this.weaponsInPossesion = [];

    this.forceFieldOn = false;
    this.weaponTogglePosition = -1;
    // this.forceField = new ForceField();

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
        if (this.status === "normal") {
          this.x_velocity -= 1;
        } else if (this.status === "flightMode") {
          this.x_velocity -= .8;
        }

      } else if (this.keysPressed[39]) {
        if(this.status === "normal") {
          this.x_velocity += 1;
        } else if (this.status === "flightMode") {
          this.x_velocity += .8;
        }
      }

      if (this.keysPressed[38] && this.jumping === false) {
        if (this.status === "normal") {
          this.y_velocity = this.jumpPower;
          this.jumping = true;
        } else if (this.status === "flightMode") {
          this.y_velocity = this.jumpPower / 2.5;
        }
      } else if (this.keysPressed[40] && this.status === "flightMode") {
        this.y_velocity = Math.abs(this.jumpPower / 3);
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

    this.updateWeapons(ctx);
    // this.updateForceFieldCoordRadius();
    // this.forceField.update(ctx);
  }

  move() {
    console.log(this.weaponTogglePosition)
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
      this.y_velocity *= 0.5;
      this.y += this.y_velocity;
    }
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
    } else if (e.keyCode === 16) {
      if (this.weaponsInPossesion.length === 1) {
        if (this.weaponTogglePosition === -1) {
          this.weaponTogglePosition = 0;
        }
      } else if (this.weaponsInPossesion.length === 2) {
        if (this.weaponTogglePosition < 1) {
          this.weaponTogglePosition ++;
        } else {
          this.weaponTogglePosition = 0;
        }
      } else if (this.weaponsInPossesion.length === 3) {
        if (this.weaponTogglePosition < 2) {
          this.weaponTogglePosition ++;
        } else {
          this.weaponTogglePosition = 0;
        }
      }
    } else if (e.keyCode === 90) {
      if(this.weaponsInPossesion != -1) {
        this.activateWeapon(this.weaponTogglePosition);
      }
    }
  }

  activateWeapon(weaponIndex) {
    if (this.weaponsInPossesion[weaponIndex] instanceof ForceField) {
      this.forceFieldOn = true;
      this.weaponsInPossesion[weaponIndex].status = "activated";
    }
  }

  updateWeapons(ctx) {
    this.weaponsInPossesion.forEach(weapon => {
      weapon.update(ctx, this.x, this.y);
    });
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

  updateForceFieldCoordRadius() {
    // NOTE: adding and dividing by two assures that the llama is in the
    //middle of the forcefield
    this.forceField.x = this.x + (this.width/2);
    this.forceField.y = this.y + (this.height/2);
  }

}

export default Llama;
