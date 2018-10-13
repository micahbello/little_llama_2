const SPRITES = {
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

const slowModeSpeedReducer = .2;

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
        return SPRITES.position1;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 2) {
        this.spriteCycle ++;
        return SPRITES.position2;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 3) {
        this.spriteCycle ++;
        return SPRITES.position3;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 4) {
        this.spriteCycle ++;
        return SPRITES.position4;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 5) {
        this.spriteCycle ++;
        return SPRITES.position5;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 6) {
        this.spriteCycle ++;
        return SPRITES.position6;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 7) {
        this.spriteCycle ++;
        return SPRITES.position7;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 8) {
        this.spriteCycle ++;
        return SPRITES.position8;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 9) {
        this.spriteCycle ++;
        return SPRITES.position9;
      } else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 10) {
        this.spriteCycle ++;
        return SPRITES.position10;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 11) {
        this.spriteCycle ++;
        return SPRITES.position11;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 12) {
        this.spriteCycle ++;
        return SPRITES.position12;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 13) {
        this.spriteCycle ++;
        return SPRITES.position13;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 14) {
        this.spriteCycle ++;
        return SPRITES.position14;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 15) {
        this.spriteCycle ++;
        return SPRITES.position15;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 16) {
        this.spriteCycle ++;
        return SPRITES.position16;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 17) {
        this.spriteCycle ++;
        return SPRITES.position17;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 18) {
        this.spriteCycle ++;
        return SPRITES.position18;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 29) {
        this.spriteCycle ++;
        return SPRITES.position19;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 20) {
        this.spriteCycle ++;
        return SPRITES.position20;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 21) {
        this.spriteCycle ++;
        return SPRITES.position21;
      }else if (this.spriteCycle < framesUntilNextSpriteSlowMode * 22) {
        this.spriteCycle ++;
        return SPRITES.position22;
      } else {
        this.spriteCycle = 0;
        return SPRITES.position1;
      }
    } else {
      if (this.spriteCycle < framesUntilNextSprite * 1) {
        this.spriteCycle ++;
        return SPRITES.position1;
      } else if (this.spriteCycle < framesUntilNextSprite * 2) {
        this.spriteCycle ++;
        return SPRITES.position2;
      } else if (this.spriteCycle < framesUntilNextSprite * 3) {
        this.spriteCycle ++;
        return SPRITES.position3;
      } else if (this.spriteCycle < framesUntilNextSprite * 4) {
        this.spriteCycle ++;
        return SPRITES.position4;
      } else if (this.spriteCycle < framesUntilNextSprite * 5) {
        this.spriteCycle ++;
        return SPRITES.position5;
      } else if (this.spriteCycle < framesUntilNextSprite * 6) {
        this.spriteCycle ++;
        return SPRITES.position6;
      } else if (this.spriteCycle < framesUntilNextSprite * 7) {
        this.spriteCycle ++;
        return SPRITES.position7;
      } else if (this.spriteCycle < framesUntilNextSprite * 8) {
        this.spriteCycle ++;
        return SPRITES.position8;
      } else if (this.spriteCycle < framesUntilNextSprite * 9) {
        this.spriteCycle ++;
        return SPRITES.position9;
      } else if (this.spriteCycle < framesUntilNextSprite * 10) {
        this.spriteCycle ++;
        return SPRITES.position10;
      }else if (this.spriteCycle < framesUntilNextSprite * 11) {
        this.spriteCycle ++;
        return SPRITES.position11;
      }else if (this.spriteCycle < framesUntilNextSprite * 12) {
        this.spriteCycle ++;
        return SPRITES.position12;
      }else if (this.spriteCycle < framesUntilNextSprite * 13) {
        this.spriteCycle ++;
        return SPRITES.position13;
      }else if (this.spriteCycle < framesUntilNextSprite * 14) {
        this.spriteCycle ++;
        return SPRITES.position14;
      }else if (this.spriteCycle < framesUntilNextSprite * 15) {
        this.spriteCycle ++;
        return SPRITES.position15;
      }else if (this.spriteCycle < framesUntilNextSprite * 16) {
        this.spriteCycle ++;
        return SPRITES.position16;
      }else if (this.spriteCycle < framesUntilNextSprite * 17) {
        this.spriteCycle ++;
        return SPRITES.position17;
      }else if (this.spriteCycle < framesUntilNextSprite * 18) {
        this.spriteCycle ++;
        return SPRITES.position18;
      }else if (this.spriteCycle < framesUntilNextSprite * 19) {
        this.spriteCycle ++;
        return SPRITES.position19;
      }else if (this.spriteCycle < framesUntilNextSprite * 20) {
        this.spriteCycle ++;
        return SPRITES.position20;
      }else if (this.spriteCycle < framesUntilNextSprite * 21) {
        this.spriteCycle ++;
        return SPRITES.position21;
      }else if (this.spriteCycle < framesUntilNextSprite * 22) {
        this.spriteCycle ++;
        return SPRITES.position22;
      } else {
        this.spriteCycle = 0;
        return SPRITES.position1;
      }
    }
  }
}

export default Bird1;
