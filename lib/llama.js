import MovingObject from './moving_object.js'

//
const SPRITES = {
  leftPosition1: [33, 136, 55, 55],
  leftPosition2: [146, 136, 55, 55]

}

class Llama extends MovingObject {
  constructor(canvas_width, canvas_height) {
    super();

    this.x = 30;
    this.y = 0;
    this.x_velocity = 0;
    this.y_velocity = 0;
    this.height = 52;
    this.width = 45;
    this.jumping = true;

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/llamasprites450x450.png';
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.keysPressed = [];
  }

  // getSprite() {
  //   return ;
  // }

  keyDownHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown");
  }

  keyUpHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown"); //will return false
  }

  draw(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // const sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, 146, 136, 200, 200,this.x, this.y, 200, 200);

// ctx.drawImage(this.spritesheet, 10, sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3])

    this.update();
  }


  update() {
    if (this.keysPressed[37]) {
      this.x_velocity --;
    } else if (this.keysPressed[39]) {
      this.x_velocity ++;
    }

    if (this.keysPressed[38] && this.jumping === false) {
      // console.log(this.y_velocity)
      this.y_velocity -= 20;
      this.jumping = true;
    }

    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.y_velocity += 1.5;
    this.x_velocity *= 0.9;
    this.y_velocity *= 0.9;
    //
    if (this.y > this.canvas_height - this.height) {

      this.jumping = false;
      this.y = this.canvas_height - this.height;
      this.y_velocity = 0;
    }
  }

}

export default Llama;
