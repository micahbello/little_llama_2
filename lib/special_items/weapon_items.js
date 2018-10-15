// NOTE: two statuses = availabe and discarded. Available is when
//it is bouncing around. Discarded is when llama has decided to get rid of it
//after collecting it and it was never used.

import {slowModeSpeedReducer} from '../constants.js';

class WeaponItem {
  constructor(x, y, canvas_width, canvas_height, type, status) {
    this.x = x;
    this.y = y;
    this.radius = 24;
    this.x_velocity = 2.5;
    this.y_velocity = 2.5;
    this.mass = 5;
    this.type = type;
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;
    this.status = status || "available";
    this.assignedWeaponContainerCoord = {};

    this.slowMode = false;

    // NOTE: items are to stay in play while it has hit the border less
    //than 10 times
    this.borderHitCollisionCount = 0;

    this.weaponImage = new Image();
    this.weaponImage.src = "";
  }

  update(ctx) {

    if (this.status === "discarded") {
      this.x_velocity = 6;
      this.y_velocity = -2;
    }

    this.move();
    this.checkCanvasBorderCollision();
    this.draw(ctx);
  }

  draw(ctx) {
    // NOTE: uncomment this to show the hitcircle of the object
    if (this.type === "timeController") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
      ctx.fillStyle = "#BC8F8F";
      ctx.fill();
      ctx.closePath();
    }
    //

    this.getSprite();
    // let sprite = this.getSprite();
    if(this.type === "forceFieldBlast") {
      ctx.drawImage(this.weaponImage, 0, 0, 300, 300, this.x - 25, this.y - 24, 63, 63);
    } else if (this.type === "bubbleShield") {
      ctx.drawImage(this.weaponImage, 0, 0, 300, 300, this.x - 29, this.y - 27, 63, 63);
    } else if (this.type === "timeController") {
      ctx.drawImage(this.weaponImage, 0, 0, 800, 800, this.x - 20, this.y - 27, 62, 62);
    }
  }

  move() {
      if (this.slowMode) {
        this.x += this.x_velocity * slowModeSpeedReducer;
        this.y += this.y_velocity * slowModeSpeedReducer;
      } else {
        this.x += this.x_velocity;
        this.y += this.y_velocity;
      }
  }

  getSprite() {
    if (this.type === "forceFieldBlast") {
      this.weaponImage.src = './assets/sprites/weapon_related/forcefield_blast_icon.png';
    } else if (this.type === "bubbleShield") {
      this.weaponImage.src = './assets/sprites/weapon_related/bubble.png';
    } else if (this.type === "timeController") {
      this.weaponImage.src = './assets/sprites/weapon_related/hourglass.png';
    }
  }

  checkCanvasBorderCollision() {

    if (this.status != "available" || this.borderHitCollisionCount > 15) {
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
      //increment bordercollision count
      this.borderHitCollisionCount ++;

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
      //increment bordercollision count
      this.borderHitCollisionCount ++;
    }
  }
}

export default WeaponItem;
