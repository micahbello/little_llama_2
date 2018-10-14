import {slowModeSpeedReducer} from '../constants.js';

class Platform {
  constructor(direction, trackNumber, x, y, speed) {
    this.direction = direction;
    this.trackNumber = trackNumber;
    this.speed = speed;
    this.originalSpeed = speed;
    this.x = x;
    this.y = y;
    this.height = 22;
    this.width = 124;
    this.reducedSpeed = this.speed * slowModeSpeedReducer;
    this.slowMode = false;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/other_objects/platform.png';
  }

  update(ctx) {
    this.move();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: Uncomment to see platform hitbox
      // let sprite = this.getSprite();
      // ctx.fillStyle = "black";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
      // ctx.drawImage(this.spritesheet, 233, 227, 300, 50, this.x, this.y - 12, 300, 50);
    //

    ctx.drawImage(this.spritesheet, 0, 0, 150, 150, this.x, this.y, 150, 150);
  }

  move() {

    if (this.direction === "right") {
      if (this.slowMode) {
        this.x += this.speed * slowModeSpeedReducer;
      } else {
        this.x += this.speed;
      }
    } else {
      if (this.slowMode) {
        this.x -= this.speed * slowModeSpeedReducer;
      } else {
        this.x -= this.speed;
      }
    }
  }

}

export default Platform;
