// NOTE: weapons have 2 statuses: equipped, activated, inactive

class BubbleShield {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 35;
    this.status = "equipped";

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/bubble.png';
  }

  update(ctx, x, y) {

    if (this.status === "activated") {
      this.x = x;
      this.y = y;
      this.draw(ctx, x, y);
    }
  }

  draw(ctx, x, y) {
    // NOTE: Uncomment to see shield hit box
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    //
  }
}

export default BubbleShield;
