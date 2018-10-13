// NOTE: weapons have 2 statuses: equipped, activated, inactive

class PigSpeedLimiter {
  constructor() {
    this.x = 500;
    this.y = 250;
    this.radius = 35;
    this.status = "equipped";

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/weapon_related/hourglass.png';
  }

  update(ctx, x, y) {

    // if (this.status === "activated") {
    //   this.x = x + (52/2);
    //   this.y = y + (45/2);
    //   this.radius += 4;
    //   if (this.radius > 150) {
    //     this.radius = 0;
    //     this.status = "inactive";
    //   }
    //   this.draw(ctx, this.x, this.y);
    // }
  }

  draw(ctx, x, y) {
    //nothing to draw
  }

}

export default PigSpeedLimiter;
