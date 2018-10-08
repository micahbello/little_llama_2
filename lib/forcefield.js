class ForceField {
  constructor() {
    this.x = 500;
    this.y = 250;
    this.radius = 35;

    this.forceFieldCycle = 0;
  }

  update(ctx) {
    // this.forceFieldCycle++;
    this.radius += 2;

    if (this.radius > 125) {
      this.radius = 0;
    }

    this.draw(ctx);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(240, 20, 60, .2)';
    ctx.fill();
    ctx.strokeStyle = "yellow";
    ctx.stroke();
    ctx.closePath();
  }
}

export default ForceField;
