const SPRITES = {
  number1: [58, 7, 40, 35],
  number2: [58, 45, 40, 35]
}


class Heart {
  constructor(x, y, canvas_width, canvas_height) {
    this.x = x;
    this.y = y;
    this.width = 38;
    this.height = 31;

    this.radius = 19
    this.x_velocity = 3;
    this.y_velocity = 3;

    this.spritecycle = 0;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

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
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    // ctx.fillStyle = "black";     //comment in for tests
    // ctx.fill();                     //comment in for tests
    // ctx.closePath();
    this.x += this.x_velocity;
    this.y += this.y_velocity;

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x - 18, this.y - 13, sprite[2], sprite[3]);
  }

  update(ctx) {
    this.canvasBorderCollision();
    this.draw(ctx);
  }

  canvasBorderCollision() {

    if (this.x + this.radius > this.canvas_width || this.x - this.radius < 0 ){
      if (this.x + this.radius > this.canvas_width) {
        this.x = this.canvas_width - this.radius;
      } else {
        this.x = 0 + this.radius;
      }

      this.x_velocity = -this.x_velocity;

      } else if (this.y - this.radius < 0 || this.y + this.radius > this.canvas_height) {

      if (Math.abs(this.y_velocity) != this.y_velocity) {
        //means it was traveling up
        this.y = 0 + this.radius;
      } else {
        this.y = this.canvas_height - this.radius
      }

      this.y_velocity = -this.y_velocity;
    }
  }

}

export default Heart;
