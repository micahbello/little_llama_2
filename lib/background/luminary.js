import {slowModeSpeedReducer} from '../constants.js';

class Luminary {
  constructor(canvas_width, canvas_height) {
    this.x = -55;
    this.y = -55;
    this.radius = 55;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.slowMode = false;

    this.image = new Image();
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
  }

  move() {
    if (this.slowMode) {
      this.x = this.x + (.09 * 2) * slowModeSpeedReducer;
      this.y = this.y + (.05 * 2) * slowModeSpeedReducer;
    } else {
      this.x = this.x + (.09 * 2);
      this.y = this.y + (.05 * 2);
    }
  }

}

export default Luminary;
