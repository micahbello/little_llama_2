//code borrowed from https://github.com/misun/bakku-runner/blob/master/lib/background.js
//background borrowed from https://whitlanier.artstation.com/projects/DdDL9

class Background {
  constructor() {
    this.image = new Image();
    this.image.src = "./assets/sprites/background3.jpg";
    this.x = 0;
    this.y = -50;
    this.height = 486;
    this.width = 800;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y);

    ctx.drawImage(this.image, this.x + this.width, this.y);

    //ensures constant redrawing of the background
    if (this.x < this.width * -1){
      this.x = 0;
    }

    this.scrollImage();
  }

  scrollImage() {
    this.x = this.x - .08;
  }

}

export default Background;
