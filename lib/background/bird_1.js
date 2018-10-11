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

class Bird1 {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.width = 25;
    this.height = 25;

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
    this.x = this.x - .5;
  }

  getSprite() {
    if (this.spriteCycle < 3) {
      this.spriteCycle ++;
      return SPRITES.position1;
    } else if (this.spriteCycle < 6) {
      this.spriteCycle ++;
      return SPRITES.position2;
    } else if (this.spriteCycle < 9) {
      this.spriteCycle ++;
      return SPRITES.position3;
    } else if (this.spriteCycle < 12) {
      this.spriteCycle ++;
      return SPRITES.position4;
    } else if (this.spriteCycle < 15) {
      this.spriteCycle ++;
      return SPRITES.position5;
    } else if (this.spriteCycle < 18) {
      this.spriteCycle ++;
      return SPRITES.position6;
    } else if (this.spriteCycle < 21) {
      this.spriteCycle ++;
      return SPRITES.position7;
    } else if (this.spriteCycle < 24) {
      this.spriteCycle ++;
      return SPRITES.position8;
    } else if (this.spriteCycle < 27) {
      this.spriteCycle ++;
      return SPRITES.position9;
    } else if (this.spriteCycle < 30) {
      this.spriteCycle ++;
      return SPRITES.position10;
    }else if (this.spriteCycle < 33) {
      this.spriteCycle ++;
      return SPRITES.position11;
    }else if (this.spriteCycle < 36) {
      this.spriteCycle ++;
      return SPRITES.position12;
    }else if (this.spriteCycle < 39) {
      this.spriteCycle ++;
      return SPRITES.position13;
    }else if (this.spriteCycle < 42) {
      this.spriteCycle ++;
      return SPRITES.position14;
    }else if (this.spriteCycle < 45) {
      this.spriteCycle ++;
      return SPRITES.position15;
    }else if (this.spriteCycle < 48) {
      this.spriteCycle ++;
      return SPRITES.position16;
    }else if (this.spriteCycle < 51) {
      this.spriteCycle ++;
      return SPRITES.position17;
    }else if (this.spriteCycle < 54) {
      this.spriteCycle ++;
      return SPRITES.position18;
    }else if (this.spriteCycle < 57) {
      this.spriteCycle ++;
      return SPRITES.position19;
    }else if (this.spriteCycle < 60) {
      this.spriteCycle ++;
      return SPRITES.position20;
    }else if (this.spriteCycle < 63) {
      this.spriteCycle ++;
      return SPRITES.position21;
    }else if (this.spriteCycle < 66) {
      this.spriteCycle ++;
      return SPRITES.position22;
    } else {
      this.spriteCycle = 0;
      return SPRITES.position1;
    }

  }


}

export default Bird1;
