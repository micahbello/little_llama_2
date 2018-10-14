import Luminary from './luminary.js';

class Moon extends Luminary {
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
    this.image.src = "./assets/sprites/background/moon.png";
  }

  draw(ctx) {
    // NOTE: Uncomment to see moon borders
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";     //comment in for tests
      // ctx.fill();                     //comment in for tests
      // ctx.closePath();
    //

    ctx.drawImage(this.image, this.x - 49, this.y - 49,);
  }
}

export default Moon;
