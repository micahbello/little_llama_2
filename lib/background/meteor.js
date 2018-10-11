class Meteor {
  constructor() {
    this.x = undefined;
    this.y = undefined;
    this.height = 100;
    this.width = 100;
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
    this.y ++;
    this.x --;
  }

}

export default Meteor;
