// NOTE: weapons have 2 statuses: equipped, activated, inactive

class ForceField {
  constructor() {
    this.x = 500;
    this.y = 250;
    this.radius = 35;
    this.status = "equipped";

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/forcefield_blast_icon.png';
  }

  update(ctx, x, y) {

    if (this.status === "activated") {
      this.x = x;
      this.y = y;
      this.radius ++
      if (this.radius > 175) {
        this.radius = 35;
        this.status = "inactive";
      }
      this.draw(ctx, x, y);
    }
  }

  draw(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x + (52/2), y + (45/2), this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255, 244, 94, .1)';
    ctx.fill();
    ctx.lineWidth =  1;
    ctx.strokeStyle = "#fff45e";
    ctx.stroke();
    ctx.closePath();
  }

}

export default ForceField;
