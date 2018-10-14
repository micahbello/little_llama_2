//image source: http://herebemonsters.wikia.com/wiki/File:Bacon-Sprite.png
import {slowModeSpeedReducer} from '../constants.js';

class Bacon {
  constructor(x, y, canvas_height) {
    this.x = x;
    this.y = y;
    this.y_velocity = 6;
    this.x_velocity = 0;
    this.height = 40;
    this.width = 50;
    this.status = "available"

    this.canvas_height = canvas_height

    this.slowMode = false;

    this.baconImage = new Image();
    this.baconImage.src = "./assets/sprites/other_objects/bacon.png";
  }

  update(ctx) {
    this.checkCanvasBorderCollision();
    this.move();
    this.draw(ctx);
  }

  draw(ctx){
    // NOTE: Uncomment below to see bacon hitbox
      // ctx.fillStyle = "blue";
      // ctx.fillRect(this.x, this.y, this.width, this.height);
    //

    ctx.drawImage(this.baconImage, 0, 0, 300, 300, this.x, this.y, 60, 60);
  }

  move() {
    if (this.slowMode) {
      this.x += this.x_velocity * slowModeSpeedReducer;
      this.y += this.y_velocity * slowModeSpeedReducer;
    } else {
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    }
  }

  checkCanvasBorderCollision() {
    // NOTE: add a few fixels for better visual resting on floor
    if (this.y > this.canvas_height - this.height + 15) {
      this.y = this.canvas_height - this.height + 15;
      this.y_velocity = 0;
    }
  }
}

export default Bacon;
