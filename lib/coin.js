const SPRITES = {
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

class Coin {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 39;
    this.x_velocity = 0;
    this.y_velocity = 0;

    this.status = "available";

    this.spritecycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/coin_sprite_sheet.png';
  }

  update(ctx) {
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
    this.x += this.x_velocity;
    this.y += this.y_velocity;
  }

  getSprite() {
    this.spritecycle ++;

    if (this.spritecycle < 8) {
      return SPRITES.position1;
    } else if (this.spritecycle < 16) {
      return SPRITES.position2;
    } else if (this.spritecycle < 24) {
      return SPRITES.position3;
    } else if (this.spritecycle < 32) {
      return SPRITES.position4;
    } else if (this.spritecycle < 40) {
      return SPRITES.position5;
    } else if (this.spritecycle < 48) {
      return SPRITES.position6;
    } else if (this.spritecycle < 56) {
      return SPRITES.position7;
    } else if (this.spritecycle < 64) {
      return SPRITES.position8;
    } else if (this.spritecycle < 72) {
      return SPRITES.position9;
    } else if (this.spritecycle < 80) {
      return SPRITES.position10;
    } else if (this.spritecycle < 88) {
      return SPRITES.position11;
    } else if (this.spritecycle < 96) {
      return SPRITES.position12;
    } else if (this.spritecycle < 104) {
      return SPRITES.position13;
    } else if (this.spritecycle < 112) {
      return SPRITES.position14;
    } else if (this.spritecycle < 120) {
      return SPRITES.position15;
    } else if (this.spritecycle < 128) {
      return SPRITES.position16;
    } else {
      this.spritecycle = 0;
      return SPRITES.position1;
    }
  }

}

export default Coin;
