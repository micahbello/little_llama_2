// NOTE: weapons have four statuses: equipped, unequipped, active, inactive

class ForceField {
  constructor() {
    this.x = 500;
    this.y = 250;
    this.radius = 35;
    this.status = "equipped";
  }

  update(ctx) {
    if (this.status === "equipped") {
      this.radius ++
      if (this.radius > 175) {
        this.radius = 35;
      }
      this.draw(ctx);
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255, 244, 94, .1)';
    ctx.fill();
    ctx.lineWidth =  1;
    ctx.strokeStyle = "#fff45e";
    ctx.stroke();
    ctx.closePath();
  }

}

export default ForceField;
