import {BIRD1_SPRITES, slowModeSpeedReducer} from '../constants.js';

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
      this.x = this.x - .5 * slowModeSpeedReducer;
    } else {
      this.x = this.x - .5;
    }
  }

  getSprite() {
    this.spriteCycle ++;

    let framesUntilNextSprite = 3;
    let framesUntilNextSpriteSlowMode = 3 / slowModeSpeedReducer;

    if (this.slowMode) {
      if (this.spriteCycle < framesUntilNextSpriteSlowMode * 1) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position1;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 2) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position2;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 3) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position3;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 4) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position4;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 5) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position5;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 6) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position6;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 7) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position7;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 8) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position8;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 9) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position9;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 10) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position10;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 11) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position11;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 12) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position12;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 13) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position13;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 14) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position14;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 15) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position15;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 16) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position16;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 17) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position17;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 18) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position18;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 29) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position19;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 20) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position20;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 21) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position21;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 22) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position22;
      } else {
        this.spriteCycle = 0;
        return BIRD1_SPRITES.position1;
      }
    } else {
      if (this.spriteCycle < framesUntilNextSprite * 1) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position1;
      } else if (this.spriteCycle < framesUntilNextSprite * 2) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position2;
      } else if (this.spriteCycle < framesUntilNextSprite * 3) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position3;
      } else if (this.spriteCycle < framesUntilNextSprite * 4) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position4;
      } else if (this.spriteCycle < framesUntilNextSprite * 5) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position5;
      } else if (this.spriteCycle < framesUntilNextSprite * 6) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position6;
      } else if (this.spriteCycle < framesUntilNextSprite * 7) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position7;
      } else if (this.spriteCycle < framesUntilNextSprite * 8) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position8;
      } else if (this.spriteCycle < framesUntilNextSprite * 9) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position9;
      } else if (this.spriteCycle < framesUntilNextSprite * 10) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position10;
      }else if (this.spriteCycle < framesUntilNextSprite * 11) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position11;
      }else if (this.spriteCycle < framesUntilNextSprite * 12) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position12;
      }else if (this.spriteCycle < framesUntilNextSprite * 13) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position13;
      }else if (this.spriteCycle < framesUntilNextSprite * 14) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position14;
      }else if (this.spriteCycle < framesUntilNextSprite * 15) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position15;
      }else if (this.spriteCycle < framesUntilNextSprite * 16) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position16;
      }else if (this.spriteCycle < framesUntilNextSprite * 17) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position17;
      }else if (this.spriteCycle < framesUntilNextSprite * 18) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position18;
      }else if (this.spriteCycle < framesUntilNextSprite * 19) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position19;
      }else if (this.spriteCycle < framesUntilNextSprite * 20) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position20;
      }else if (this.spriteCycle < framesUntilNextSprite * 21) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position21;
      }else if (this.spriteCycle < framesUntilNextSprite * 22) {
        this.spriteCycle ++;
        return BIRD1_SPRITES.position22;
      } else {
        this.spriteCycle = 0;
        return BIRD1_SPRITES.position1;
      }
    }
  }
}

export default Bird1;
