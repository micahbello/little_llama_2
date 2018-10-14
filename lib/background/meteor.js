import {slowModeSpeedReducer} from '../constants.js';

class Meteor {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.height = 100;
    this.width = 100;

    this.slowMode = false;

    this.meteorImage = new Image();
    this.meteorImage.src = "./assets/sprites/background/meteor.png";
    }

  update(ctx) {

    this.move();
    this.draw(ctx);
  }

  draw(ctx) {
    // // NOTE: Uncomment below to see  meteor boundaries
    //   ctx.fillStyle = "blue";
    //   ctx.fillRect(this.x, this.y, this.width, this.height);
    // //

    ctx.drawImage(this.meteorImage, 10, 60, 350, 500, this.x, this.y - 95, 110, 110);
  }

  move() {
    if (this.slowMode) {
      this.y = this.y + 1 * slowModeSpeedReducer;
      this.x = this.x - 1 * slowModeSpeedReducer;
    } else {
      this.y = this.y + 1;
      this.x = this.x - 1;
    }
  }

}

export default Meteor;
