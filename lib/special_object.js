const Sprites = {

}


class SpecialObject {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 31;
    this.type = type;
    this.spritecycle = 0;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/heart_sprite_sheet.png';
  }

  getSprite() {

  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, 8, 7, 40, 35, this.x, this.y, 40, 35);
  }

  update(ctx) {
    this.draw(ctx);
  }

}

export default SpecialObject;
