const slowModeSpeedReducer = .2;

class Moon {
  constructor(canvas_width, canvas_height) {

    this.x = -55;
    this.y = -55;
    this.radius = 55;

    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.image = new Image();
    this.image.src = "./assets/sprites/background/moon.png";
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
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

export default Moon;
