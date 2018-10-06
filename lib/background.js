//code borrowed from https://github.com/misun/bakku-runner/blob/master/lib/background.js
//background borrowed from https://whitlanier.artstation.com/projects/DdDL9

import Sun from './sun.js';
import Moon from './moon.js'

class Background {
  constructor(canvas_width, canvas_height) {
    this.x = 0
    this.y = -50;
    this.height = 486;
    this.width = 800;
    this.canvas_height = canvas_height;
    this.canvas_width = canvas_width;
    this.luminary = new Sun(canvas_width, canvas_height);

    this.cloudsImage = new Image();
    this.cloudsImage.src = "./assets/sprites/clouds_day.png";

    this.mountainImage = new Image();
    this.mountainImage.src =  './assets/sprites/mountain_day.png';
    this.mountainX = 0;
    this.mountainY = 50;

    this.starrySky = new Image();
    this.starrySky.src = "./assets/sprites/starry_sky.png";
    this.starrySkyX = 0;
    this.starrySkyWidth = 800;
  }

  draw(ctx) {

    if (this.luminary instanceof Sun) {
      let myGradient = ctx.createLinearGradient(0,0,0, this.canvas_height);
      myGradient.addColorStop(0, "#0158a8");
      myGradient.addColorStop(1, "#65c7ee");

      ctx.fillStyle = myGradient;
      ctx.fillRect(0, 0, this.canvas_width, this.canvas_height);
    } else {
      ctx.drawImage(this.starrySky, this.starrySkyX, 0);
      ctx.drawImage(this.starrySky, this.starrySkyX + this.starrySkyWidth, 0);
    }

    this.luminary.draw(ctx);
    ctx.drawImage(this.cloudsImage, this.x, this.y);
    ctx.drawImage(this.cloudsImage, this.x + this.width, this.y);

    ctx.drawImage(this.mountainImage, this.mountainX, this.mountainY);


    //ensures constant redrawing of the clouds
    if (this.x < this.width * -1){
      this.x = 0;
    }

    if (this.starrySkyX < this.starrySkyWidth * -1) {
      this.starrySkyX = 0;
    }

    this.scrollImage();

    if (this.luminary.y - this.luminary.radius > 340) {
      if (this.luminary instanceof Sun) {
        this.luminary = new Moon(this.canvas_width, this.canvas_height);
        this.cloudsImage.src = "./assets/sprites/clouds_night.png";
        this.mountainImage.src =  './assets/sprites/mountain_night.png';
      } else {
        this.luminary = new Sun(this.canvas_width, this.canvas_height);
        this.cloudsImage.src = "./assets/sprites/clouds_day.png";
        this.mountainImage.src =  './assets/sprites/mountain_day.png';

      }

      this.luminary.x = -55;
      this.luminary.y = -55;
    }

  }

  scrollImage() {
    this.x = this.x - .2;
    this.starrySkyX = this.starrySkyX - .04;
  }
}

export default Background;
