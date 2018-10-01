import MovingObject from './moving_object.js'

//
const SPRITES = {
  leftPosition1: [33, 137, 55, 55],
  leftPosition2: [146, 137, 55, 55],
  leftPosition3: [258, 137, 55, 55],
  leftPosition4: [371, 137, 55, 55],

  rightPosition1: [34, 362, 55, 55],
  rightPosition2: [147, 362, 55, 55],
  rightPosition3: [259, 362, 55, 55],
  rightPosition4: [372, 362, 55, 55]
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
    this.walkcycle = 0;
    this.hearts = 4;
    this.lastDirectionFaced = "right";

    this.spritesheet = new Image();
    this.spritesheet.src = './assets/sprites/llamasprites450x450.png';
    this.canvas_width = canvas_width;
    this.canvas_height = canvas_height;

    this.keysPressed = [];
  }

  getSprite() {

    if (!this.keysPressed[37] && !this.keysPressed[39] && this.jumping === false) {
      this.walkcycle = 0;
      this.spritesheet.src = './assets/sprites/llama_stand_sprites.png';

      if (this.lastDirectionFaced === "right") {
        return SPRITES.rightPosition1
      } else if (this.lastDirectionFaced === "left") {
        return SPRITES.leftPosition1
      }
    }


    if (this.keysPressed[37]) {
      this.walkcycle ++;
      this.spritesheet.src = './assets/sprites/llamasprites450x450.png';

      if (this.walkcycle < 6) {
        return SPRITES.leftPosition1
      } else if (this.walkcycle < 12) {
        return SPRITES.leftPosition2
      } else if (this.walkcycle < 18) {
        return SPRITES.leftPosition3
      } else if (this.walkcycle < 24) {
        return SPRITES.leftPosition4
      } else {
        this.walkcycle = 0;
        return SPRITES.leftPosition1
      }

    } else if (this.keysPressed[39]){
      this.walkcycle ++;
      this.spritesheet.src = './assets/sprites/llamasprites450x450.png';

      if (this.walkcycle < 6) {
        return SPRITES.rightPosition1
      } else if (this.walkcycle < 12) {
        return SPRITES.rightPosition2
      } else if (this.walkcycle < 18) {
        return SPRITES.rightPosition3
      } else if (this.walkcycle < 24) {
        return SPRITES.rightPosition4
      } else {
        this.walkcycle = 0;
        return SPRITES.rightPosition1
      }
    } else {
      this.spritesheet.src = './assets/sprites/llamasprites450x450.png';

      if (this.lastDirectionFaced === "right") {
        return SPRITES.rightPosition1;
      } else if (this.lastDirectionFaced === "left") {
        return SPRITES.leftPosition1;
      }

    }

  }

  keyDownHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown");
  }

  keyUpHandler(e) {
    this.keysPressed[e.keyCode] = (e.type === "keydown"); //will return false

    if (e.keyCode === 37) {
      this.lastDirectionFaced = "left";
    } else if (e.keyCode === 39) {
      this.lastDirectionFaced = "right";
    }
  }

  draw(ctx) {
    // ctx.fillStyle = "yellow";
    // ctx.fillRect(this.x, this.y, this.width, this.height);

    const sprite = this.getSprite();
    ctx.drawImage(this.spritesheet, sprite[0], sprite[1], sprite[2], sprite[3], this.x, this.y, sprite[2], sprite[3]);
  }


  update(ctx) {
    if (this.keysPressed[37]) {
      this.x_velocity -= 1;
    } else if (this.keysPressed[39]) {
      this.x_velocity += 1;
    }

    if (this.keysPressed[38] && this.jumping === false) {
      this.y_velocity -= 20;
      this.jumping = true;
    }

    this.x += this.x_velocity;
    this.y += this.y_velocity;
    this.y_velocity += 1.5;
    this.x_velocity *= 0.8;
    this.y_velocity *= 0.9;

    //floor collisions
    if (this.y > this.canvas_height - this.height) {

      this.jumping = false;
      this.y = this.canvas_height - this.height;
      this.y_velocity = 0;
    }


    //sides collisions
    if (this.x > this.canvas_width - this.width) {
      this.x = this.canvas_width - this.width;
    } else if (this.x < 0) {
      this.x = 0;
    }


    this.draw(ctx)
  }

}

export default Llama;
