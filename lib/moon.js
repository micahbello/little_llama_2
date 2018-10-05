class Moon {
  constructor(canvas_width, canvas_height) {

    this.x = -55;
    this.y = -55;
    this.radius = 55;
    this.image = new Image();
    this.image.src = "./assets/sprites/moon.png";


    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
  }


  draw(ctx) {
    // ctx.beginPath();
    // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    // ctx.fillStyle = "black";     //comment in for tests
    // ctx.fill();                     //comment in for tests
    // ctx.closePath();

    ctx.drawImage(this.image, this.x - 49, this.y - 49,);

    this.move();
  }

  move() {
    this.x = this.x + .09;
    this.y = this.y + .05;
  }

}

export default Moon;
