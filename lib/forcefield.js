class ForceField {
  constructor() {
    this.x = 500;
    this.y = 250;
    this.radius = 35;

    this.forceFieldCycle = 0;
  }

  update(ctx) {
    // this.forceFieldCycle++;
    this.radius += 3;

    if (this.radius > 150) {
      this.radius = 35;
    }

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(225, 225, 0, .2)';
    ctx.fill();
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.closePath();
  }
}

export default ForceField;
