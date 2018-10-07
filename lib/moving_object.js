// TODO: DECIDE IF THIS WILL BE USED, THINK ABOUT WHICH CLASSES CAN INHERIT FROM OTHERS

class MovingObject {
  constructor(){
    // this.pos = options.pos;
    // this.vel = {'x':0, 'y':0}
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA,
      offsetX = this.x_velocity * velocityScale,
      offsetY = this.y_velocity * velocityScale;
    this.x = this.x + offsetX;
    this.y = this.y + offsetY;
  }

}

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;

export default MovingObject;
