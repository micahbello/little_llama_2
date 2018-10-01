class Cloud {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.height = 20;
    this.width = 100;
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);

  }

  update(ctx) {

    this.x += 2;

    this.draw(ctx);
  }

}

export default Cloud;
