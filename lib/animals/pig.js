import {PIG_SPRITES, slowModeSpeedReducer} from '../constants.js';

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
        this.x += this.x_velocity * slowModeSpeedReducer;
        this.y += this.y_velocity * slowModeSpeedReducer;
      } else {
        this.x += this.x_velocity;
        this.y += this.y_velocity;
      }
    } else if (this.status === "inactive") {
      this.y_velocity = -2;
      if (this.direction === "right") {
        this.x_velocity = 7;
        if (this.slowMode) {
          this.x += this.x_velocity * slowModeSpeedReducer;
          this.y += this.y_velocity * slowModeSpeedReducer;
        } else {
          this.x += this.x_velocity;
          this.y += this.y_velocity;
        }
      } else {
        this.x_velocity = -7;
        if (this.slowMode) {
          this.x += this.x_velocity * slowModeSpeedReducer;
          this.y += this.y_velocity * slowModeSpeedReducer;
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
    let framesUntilNextSpriteSlowMode = framesUntilNextSprite / slowModeSpeedReducer;

    if (this.slowMode) {
      if (this.spritecycle < framesUntilNextSpriteSlowMode) {
        return this.direction === "right" ? PIG_SPRITES.rightPosition1 : PIG_SPRITES.leftPosition1
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 2) {
        return this.direction === "right" ? PIG_SPRITES.rightPosition2 : PIG_SPRITES.leftPosition2
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 3) {
        return this.direction === "right" ? PIG_SPRITES.rightPosition3 : PIG_SPRITES.leftPosition3
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 4) {
        return this.direction === "right" ? PIG_SPRITES.rightPosition4 : PIG_SPRITES.leftPosition4
      } else {
        this.spritecycle = 0;
        return this.direction === "right" ? PIG_SPRITES.rightPosition1 : PIG_SPRITES.leftPosition1
      }
    } else {
      if (this.spritecycle < framesUntilNextSprite) {
        return this.direction === "right" ? PIG_SPRITES.rightPosition1 : PIG_SPRITES.leftPosition1
      } else if (this.spritecycle < framesUntilNextSprite * 2) {
        return this.direction === "right" ? PIG_SPRITES.rightPosition2 : PIG_SPRITES.leftPosition2
      } else if (this.spritecycle < framesUntilNextSprite * 3) {
        return this.direction === "right" ? PIG_SPRITES.rightPosition3 : PIG_SPRITES.leftPosition3
      } else if (this.spritecycle < framesUntilNextSprite * 4) {
        return this.direction === "right" ? PIG_SPRITES.rightPosition4 : PIG_SPRITES.leftPosition4
      } else {
        this.spritecycle = 0;
        return this.direction === "right" ? PIG_SPRITES.rightPosition1 : PIG_SPRITES.leftPosition1
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

export default Pig;
