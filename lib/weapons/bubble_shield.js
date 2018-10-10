// NOTE: weapons have 2 statuses: equipped, activated, inactive

class BubbleShield {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 45;
    this.status = "equipped";
    this.mass = 5;
    this.x_velocity = 0;
    this.y_velocity = 0;

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/bubble.png';
  }

  update(ctx, x, y, x_velocity, y_velocity) {

    if (this.status === "activated") {
      this.x = x + (52/2);
      this.y = y + (45/2);
      this.x_velocity = x_velocity;
      this.y_velocity = y_velocity;
      this.draw(ctx, this.x, this.y);
    }
  }

  draw(ctx, x, y) {
    // NOTE: Uncomment to see shield hit box
      // ctx.beginPath();
      // ctx.arc(x, y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = 'rgba(48, 47, 7, .9)';
      // ctx.fill();
      // ctx.closePath();
    //

    ctx.drawImage(this.weaponImage, 20, 10, 400, 400, x - 45, y - 46, 150, 150);
  }
}

export default BubbleShield;
