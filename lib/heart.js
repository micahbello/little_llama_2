const SPRITES = {
  number1: [58, 7, 40, 35],
  number2: [58, 45, 40, 35]
}

class Heart {
  constructor(x, y, canvas_width, canvas_height) {
    this.x = x;
    this.y = y;
    this.radius = 19;
    this.x_velocity = 3;
    this.y_velocity = 3;
    this.mass = 5;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.status = "active";

    this.spritecycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/heart_sprite_sheet.png';
  }

  update(ctx) {
    this.move()
    this.checkCanvasBorderCollision();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: uncomment this to show the hitcircle of the object
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";
      // ctx.fill();
      // ctx.closePath();
    //

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x - 18, this.y - 13, sprite[2], sprite[3]);
  }

  move() {
    this.x += this.x_velocity;
    this.y += this.y_velocity;
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

  checkCanvasBorderCollision() {

    if (this.status != "active") {
      return;
    }

    //check left and right sides collision
    if (this.x + this.radius > this.canvas_width || this.x - this.radius < 0 ){

      //if collision detected, move object back
      if (this.x + this.radius > this.canvas_width) { //means it was traveling right
        this.x = this.canvas_width - this.radius;
      } else {
        this.x = 0 + this.radius;
      }
      //and change its x_velocity (direction)
      this.x_velocity = -this.x_velocity;

      //check up and bottom collision
      } else if (this.y - this.radius < 0 || this.y + this.radius > this.canvas_height) {

        //if collision detected, move object back
        if (Math.abs(this.y_velocity) != this.y_velocity) { //means it was traveling up
          this.y = 0 + this.radius;
        } else {
          this.y = this.canvas_height - this.radius
        }
      //and change its y_velocity (direction)
      this.y_velocity = -this.y_velocity;
    }
  }

}

export default Heart;
