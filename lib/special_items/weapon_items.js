const SPRITES = {
  forceFieldBlast: []
};

class WeaponItem {
  constructor(x, y, canvas_width, canvas_height, type) {
    this.x = x;
    this.y = y;
    this.radius = 24;
    this.x_velocity = 3;
    this.y_velocity = 3;
    this.mass = 5;
    this.type = type;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.status = "available";
    this.assignedWeaponContainerCoord = {};

    this.weaponImage = new Image();
    this.weaponImage.src = "";
  }

  update(ctx) {
    this.move();
    this.checkCanvasBorderCollision();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: uncomment this to show the hitcircle of the object
      // ctx.beginPath();
      // ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      // ctx.fillStyle = "black";
      // ctx.fill();
      // ctx.closePath();
    //

    this.getSprite();
    // let sprite = this.getSprite();
    if(this.type === "forceFieldBlast") {
      ctx.drawImage(this.weaponImage, 0, 0, 300, 300, this.x - 25, this.y - 24, 63, 63);
    } else if (this.type === "bubbleShield") {
      ctx.drawImage(this.weaponImage, 0, 0, 300, 300, this.x - 29, this.y - 27, 63, 63);
    }
  }

  move() {
    if (this.status === "available") {
      this.x += this.x_velocity;
      this.y += this.y_velocity;
    }
  }

  getSprite() {
    if (this.type === "forceFieldBlast") {
      this.weaponImage.src = './assets/sprites/forcefield_blast_icon.png';
    } else if (this.type === "bubbleShield") {
      this.weaponImage.src = './assets/sprites/bubble.png';
    }
  }

  checkCanvasBorderCollision() {

    if (this.status != "available") {
      return;
    }

    //check left and right sides collision
    if (this.x + this.radius > this.canvas_width || this.x - this.radius < 0 ){

      //if collision detected, move object back
      if (this.x + this.radius > this.canvas_width) { //means it was traveling right
        this.x = this.canvas_width - this.radius;
      } else {
        this.x = 0 + this.radius;
      }
      //and change its x_velocity (direction)
      this.x_velocity = -this.x_velocity;

      //check up and bottom collision
      } else if (this.y - this.radius < 0 || this.y + this.radius > this.canvas_height) {

        //if collision detected, move object back
        if (Math.abs(this.y_velocity) != this.y_velocity) { //means it was traveling up
          this.y = 0 + this.radius;
        } else {
          this.y = this.canvas_height - this.radius
        }
      //and change its y_velocity (direction)
      this.y_velocity = -this.y_velocity;
    }
  }
}

export default WeaponItem;
