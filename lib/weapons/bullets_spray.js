// NOTE: weapons have 2 statuses: equipped, activated

class BulletsSpray {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 45;
    this.status = "equipped";
    this.x_velocity = 0;
    this.y_velocity = 0;

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/weapon_related/bullet.png';
  }

  update(ctx, x, y, x_velocity, y_velocity) {

  }

  draw(ctx, x, y) {
    //nothing to draw
  }


}

export default BulletsSpray;
