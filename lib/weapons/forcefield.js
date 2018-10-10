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
      this.radius += 4;
      if (this.radius > 175) {
        this.radius = 0;
        this.status = "inactive";
      }
      this.draw(ctx, x, y);
    }
  }

  draw(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x + (52/2), y + (45/2), this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(48, 47, 7, .5)';
    ctx.fill();
    ctx.lineWidth =  3;
    ctx.strokeStyle = "#edf352";
    ctx.stroke();
    ctx.closePath();
  }

}

export default ForceField;
