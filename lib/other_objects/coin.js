import {COIN_SPRITES, slowModeSpeedReducer} from '../constants.js';

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
      this.x += this.x_velocity * slowModeSpeedReducer;
      this.y += this.y_velocity * slowModeSpeedReducer;
    } else {
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    }
  }

  getSprite() {
    this.spritecycle ++;

    let framesUntilNextSprite = 8;
    let framesUntilNextSpriteSlowMode = 8 / slowModeSpeedReducer;

    if (this.slowMode) {
      if (this.spritecycle < framesUntilNextSpriteSlowMode * 1) {
        return COIN_SPRITES.position1;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 2) {
        return COIN_SPRITES.position2;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 3) {
        return COIN_SPRITES.position3;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 4) {
        return COIN_SPRITES.position4;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 5) {
        return COIN_SPRITES.position5;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 6) {
        return COIN_SPRITES.position6;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 7) {
        return COIN_SPRITES.position7;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 8) {
        return COIN_SPRITES.position8;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 9) {
        return COIN_SPRITES.position9;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 10) {
        return COIN_SPRITES.position10;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 11) {
        return COIN_SPRITES.position11;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 12) {
        return COIN_SPRITES.position12;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 13) {
        return COIN_SPRITES.position13;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 14) {
        return COIN_SPRITES.position14;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 15) {
        return COIN_SPRITES.position15;
      } else if (this.spritecycle < framesUntilNextSpriteSlowMode * 16) {
        return COIN_SPRITES.position16;
      } else {
        this.spritecycle = 0;
        return COIN_SPRITES.position1;
      }
    } else {
      if (this.spritecycle < framesUntilNextSprite * 1) {
        return COIN_SPRITES.position1;
      } else if (this.spritecycle < framesUntilNextSprite * 2) {
        return COIN_SPRITES.position2;
      } else if (this.spritecycle < framesUntilNextSprite * 3) {
        return COIN_SPRITES.position3;
      } else if (this.spritecycle < framesUntilNextSprite * 4) {
        return COIN_SPRITES.position4;
      } else if (this.spritecycle < framesUntilNextSprite * 5) {
        return COIN_SPRITES.position5;
      } else if (this.spritecycle < framesUntilNextSprite * 6) {
        return COIN_SPRITES.position6;
      } else if (this.spritecycle < framesUntilNextSprite * 7) {
        return COIN_SPRITES.position7;
      } else if (this.spritecycle < framesUntilNextSprite * 8) {
        return COIN_SPRITES.position8;
      } else if (this.spritecycle < framesUntilNextSprite * 9) {
        return COIN_SPRITES.position9;
      } else if (this.spritecycle < framesUntilNextSprite * 10) {
        return COIN_SPRITES.position10;
      } else if (this.spritecycle < framesUntilNextSprite * 11) {
        return COIN_SPRITES.position11;
      } else if (this.spritecycle < framesUntilNextSprite * 12) {
        return COIN_SPRITES.position12;
      } else if (this.spritecycle < framesUntilNextSprite * 13) {
        return COIN_SPRITES.position13;
      } else if (this.spritecycle < framesUntilNextSprite * 14) {
        return COIN_SPRITES.position14;
      } else if (this.spritecycle < framesUntilNextSprite * 15) {
        return COIN_SPRITES.position15;
      } else if (this.spritecycle < framesUntilNextSprite * 16) {
        return COIN_SPRITES.position16;
      } else {
        this.spritecycle = 0;
        return COIN_SPRITES.position1;
      }
    }

  }

}

export default Coin;
