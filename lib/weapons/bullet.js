class Bullet {
  constructor(position, bulletsCircleRadius, bulletsCircleX, bulletsCircleY, x, y) {
    this.position = position; //uses clock number positions
    this.x = x;
    this.y = y;
    this.radius = 7;
    this.bulletsCircleRadius = bulletsCircleRadius;
    this.bulletsCircleCenterCoords = [bulletsCircleX, bulletsCircleY]
    // this.x_velocity = 0;
    // this.y_velocity = 0;

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/weapon_related/bullet.png';
  }

  update(ctx, x, y) {
    this.draw(ctx);

    this.bulletsCircleRadius += 7;

    if (this.position === 3) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(0, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(0, this.bulletsCircleRadius);
    } else if (this.position === 2) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(330, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(330, this.bulletsCircleRadius);
    } else if (this.position === 10) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(210, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(210, this.bulletsCircleRadius);
    } else if (this.position === 6) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(90, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(90, this.bulletsCircleRadius);
    } else if (this.position === 12) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(270, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(270, this.bulletsCircleRadius);
    } else if (this.position === 9) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(180, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(180, this.bulletsCircleRadius);
    } else if (this.position === 4) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(30, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(30, this.bulletsCircleRadius);
    } else if (this.position === 5) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(60, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(60, this.bulletsCircleRadius);
    } else if (this.position === 1) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(300, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(300, this.bulletsCircleRadius);
    } else if (this.position === 11) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(240, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(240, this.bulletsCircleRadius);
    } else if (this.position === 7) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(120, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(120, this.bulletsCircleRadius);
    } else if (this.position === 8) {
      this.x = this.bulletsCircleCenterCoords[0] + this.determineNewX(150, this.bulletsCircleRadius);
      this.y = this.bulletsCircleCenterCoords[1] + this.determineNewY(150, this.bulletsCircleRadius);
    }
  }

  draw(ctx, x, y) {
    // NOTE: Uncomment to see pig hit box
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();
    //
  }

  determineNewX(angle, radius) {
    return Math.cos(angle * (Math.PI/180)) * radius;
  }

  determineNewY(angle, radius) {
    return Math.sin(angle * (Math.PI/180)) * radius;
  }


}

export default Bullet;
