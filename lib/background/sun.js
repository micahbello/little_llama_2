import Luminary from './luminary.js';

class Sun extends Luminary {
  constructor(canvas_width, canvas_height) {
    super(canvas_width, canvas_height);

    // this.x = -55;
    // this.y = -55;
    // this.radius = 55;
    //
    // this.canvas_width = canvas_width;
    // this.canvas_height = canvas_height;
    //
    // this.slowMode = false;
    //
    // this.image = new Image();
    this.image.src = "./assets/sprites/background/sun.png";
  }

  draw(ctx) {
    // NOTE: Uncomment to see sun borders
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";
      // ctx.fill();
      // ctx.closePath();
    //
    ctx.drawImage(this.image, this.x - 97, this.y - 100);
  }
}

export default Sun;
