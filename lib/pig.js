
const SPRITES = {
  leftPosition1: [30, 160, 100, 100],
  leftPosition2: [142, 160, 100, 100],
  leftPosition3: [253, 160, 100, 100],
  leftPosition4: [366, 160, 100, 100],

  rightPosition1: [33, 385, 100, 100],
  rightPosition2: [146, 385, 100, 100],
  rightPosition3: [257, 385, 100, 100],
  rightPosition4: [370, 385, 100, 100],
};

class Pig {
  constructor(x, y, canvas_width, canvas_height, status) {
    this.x = x;
    this.y = y;
    this.radius = 15;
    this.mass = 5;
    this.x_velocity = 3;
    this.y_velocity = 3;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    // NOTE: Commented code was used for older collision mechanics
      // this.angle = 45;
      // this.radians = this.angle * Math.PI/180;
      // this.speed = 4;
      // this.x_velocity = Math.cos(this.radians) * this.speed;
      // this.y_velocity = Math.sin(this.radians) * this.speed;
    //

    this.direction = "right";
    this.status = status || "normal"

    this.spritecycle = 0;
    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/pig_sprite_sheet.png';
  }

  update(ctx) {

    if (Math.abs(this.x_velocity) === this.x_velocity) {
      //pig is moving to the right
      this.direction = "right";
    } else {
      this.direction = "left";
    }

    this.move();
    this.canvasBorderCollision();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: Uncomment to see pig hit box
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";
      // ctx.fill();
      // ctx.closePath();
    //

    let sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x - 24, this.y - 11, sprite[2], sprite[3]);
  }

  move() {
    if (this.status === "normal") {
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    } else if (this.status === "llamaCollided") {
      this.y_velocity = -2;
      if (this.direction === "right") {
        this.x_velocity = 7;
        this.x += this.x_velocity;
        this.y += this.y_velocity;
      } else {
        this.x_velocity = -7;
        this.x += this.x_velocity;
        this.y += this.y_velocity;
      }
    } else if (this.status === "testing") {
      null
    }
  }

  getSprite() {
    this.spritecycle ++;

    if (this.spritecycle < 10) {
      return this.direction === "right" ? SPRITES.rightPosition1 : SPRITES.leftPosition1
    } else if (this.spritecycle < 20) {
      return this.direction === "right" ? SPRITES.rightPosition2 : SPRITES.leftPosition2
    } else if (this.spritecycle < 30) {
      return this.direction === "right" ? SPRITES.rightPosition3 : SPRITES.leftPosition3
    } else if (this.spritecycle < 40) {
      return this.direction === "right" ? SPRITES.rightPosition4 : SPRITES.leftPosition4
    } else {
      this.spritecycle = 0;
      return this.direction === "right" ? SPRITES.rightPosition1 : SPRITES.leftPosition1
    }
  }

  canvasBorderCollision() {

    if (this.status != "normal") {
      return
    }

    if (this.x + this.radius > this.canvas_width || this.x - this.radius < 0 ){
      if (this.x + this.radius > this.canvas_width) {
        this.direction = "left";
        this.x = this.canvas_width - this.radius;
      } else {
        this.direction = "right";
        this.x = 0 + this.radius;
      }

      // NOTE: Commented code was used for older collision mechanics
        // this.angle = 180 - this.angle;
        // this.radians = this.angle * Math.PI/ 180;
        // this.x_velocity = Math.cos(this.radians) * this.speed;
        // this.y_velocity = Math.sin(this.radians) * this.speed;
      //

      this.x_velocity = -this.x_velocity;

      } else if (this.y - this.radius < 0 || this.y + this.radius > this.canvas_height) {

      if (Math.abs(this.y_velocity) != this.y_velocity) {
        //means it was traveling up
        this.y = 0 + this.radius;
      } else {
        this.y = this.canvas_height - this.radius;
      }

      // NOTE: Commented code was used for older collision mechanics
        // this.angle = 360 - this.angle;
        // this.radians = this.angle * Math.PI/ 180;
        // this.x_velocity = Math.cos(this.radians) * this.speed;
        // this.y_velocity = Math.sin(this.radians) * this.speed;
      //

      this.y_velocity = -this.y_velocity;

    }
  }
}

export default Pig;
