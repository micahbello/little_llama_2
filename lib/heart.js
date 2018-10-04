const SPRITES = {
  number1: [57, 7, 40, 35],
  number2: [57, 45, 40, 35]
}


class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 31;
    this.spritecycle = 0;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/heart_sprite_sheet.png';
  }

  getSprite() {
    this.spritecycle ++;

    if (this.spritecycle < 20) {
      return SPRITES.number1;
    } else if (this.spritecycle < 40) {
      return SPRITES.number2;
    } else {
      this.spritecycle = 0;
      return SPRITES.number1;
    }

  }

  draw(ctx) {
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3]);
  }

  update(ctx) {
    this.draw(ctx);
  }

}

export default Heart;
