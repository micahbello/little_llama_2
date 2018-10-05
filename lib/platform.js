class Platform {
  constructor(direction, trackNumber, x, y, speed) {
    this.x = x;
    this.y = y;
    this.height = 22;
    this.width = 124;
    this.direction = direction;
    this.trackNumber = trackNumber;
    this.speed = speed;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/platform.png';
  }

  draw(ctx) {

    // let sprite = this.getSprite();
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    // ctx.drawImage(this.spritesheet, 233, 227, 300, 50, this.x, this.y - 12, 300, 50);
    ctx.drawImage(this.spritesheet, 0, 0, 150, 150, this.x, this.y, 150, 150);


    // if (this.x > 300) {
    //   this.speed = 0;
    // }
  }

  update(ctx) {

    if (this.direction === "right") {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }

    this.draw(ctx);
  }

}

export default Platform;
