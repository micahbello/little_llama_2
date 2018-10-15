// NOTE: weapons have 2 statuses: equipped, activated

class ForceField {
  constructor() {
    this.x = 500;
    this.y = 250;
    this.radius = 35;
    this.status = "equipped";

    this.weaponImage = new Image();
    this.weaponImage.src = './assets/sprites/weapon_related/forcefield_blast_icon.png';
  }

  update(ctx, x, y) {

    if (this.status === "activated") {
      this.x = x + (52/2);
      this.y = y + (45/2);
      this.radius += 4;
      if (this.radius > 150) {
        this.radius = 0;
        this.status = "inactive";
      }
      this.draw(ctx, this.x, this.y);
    }
  }

  draw(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(48, 47, 7, .5)';
    ctx.fill();
    ctx.lineWidth =  3;
    ctx.strokeStyle = "#edf352";
    ctx.stroke();
    ctx.closePath();
  }

}

export default ForceField;
