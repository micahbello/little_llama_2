import BubbleShield from '../weapons/bubble_shield.js';
import ForceField from '../weapons/forcefield.js';
import TimeController from '../weapons/time_controller.js';
import {WEAPON1COORD, WEAPON2COORD, WEAPON3COORD, CANVAS_FONT} from '../constants.js';


class WeaponsContainer {
  constructor(equippedLLamaWeapons, weaponTogglePosition,outlineColor) {
    this.equippedLLamaWeapons = equippedLLamaWeapons;
    this.outlineColor = outlineColor;
    this.weaponTogglePosition = weaponTogglePosition;
  }

  update(ctx) {
    this.draw(ctx);
  }

  draw(ctx) {
    //weapons container
    ctx.beginPath();
    ctx.rect(575, 5, 165, 40);
    ctx.lineWidth="1";
    ctx.strokeStyle= this.outlineColor;
    ctx.strokeStyle = "10px";
    ctx.stroke();
    ctx.closePath();

    // NOTE: Comment in to see where each collected weapon should go,
    //and the size of the icon
    // NOTE: weapons in conatiner are about 8px smaller than the floaing icons.
        // ctx.beginPath();
        // ctx.arc(WEAPON1COORD.x, WEAPON1COORD.y, 16, 0, Math.PI*2);
        // ctx.fillStyle = "black";
        // ctx.fill();
        // ctx.closePath();
        //
        // ctx.beginPath();
        // ctx.arc(WEAPON2COORD.x, WEAPON2COORD.y, 16, 0, Math.PI*2);
        // ctx.fillStyle = "black";
        // ctx.fill();
        // ctx.closePath();
        //
        // ctx.beginPath();
        // ctx.arc(WEAPON3COORD.x, WEAPON3COORD.y, 16, 0, Math.PI*2);
        // ctx.fillStyle = "black";
        // ctx.fill();
        // ctx.closePath();
    //

// (    export const COINDEPOSITCOORD = {x: 10, y: 5};
//     export const HEARTDEPOSITCOORD = {x: 95, y: 5};
//     export const BACONDEPOSITCOORD = {x: 190, y: 5};
//
//     export const WEAPON1COORD = {x: 602.5 , y: 26};
//     export const WEAPON2COORD = {x: 657.5, y: 26};
//     export const WEAPON3COORD = {x: 713.5, y: 26};

    // const WEAPON1COORD = {x: 575, y: 5}; each box is 55x5
    // const WEAPON2COORD = {x: 630, y: 5};
    // const WEAPON3COORD = {x: 685, y: 5};)




    if (this.equippedLLamaWeapons[0]) {

      let isIndexToggled = this.weaponTogglePosition === 0;
      let weapon = this.equippedLLamaWeapons[0];

      if (isIndexToggled) {
        ctx.fillStyle = 'rgba(0, 225, 0, .5)';
        ctx.fillRect(575, 5, 55, 40);
      }

      if (weapon instanceof ForceField) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON1COORD.x - 24, WEAPON1COORD.y - 22, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON1COORD.x - 24, WEAPON1COORD.y - 22, 50, 50);
        }
      } else if (weapon instanceof BubbleShield) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON1COORD.x - 24, WEAPON1COORD.y - 22, 58, 58);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON1COORD.x - 24, WEAPON1COORD.y - 22, 48, 48);
        }
      } else if (weapon instanceof TimeController) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON1COORD.x - 17, WEAPON1COORD.y - 24, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON1COORD.x - 17, WEAPON1COORD.y - 24, 50, 50);
        }
      }
    }

    if (this.equippedLLamaWeapons[1]) {

      let isIndexToggled = this.weaponTogglePosition === 1;
      let weapon = this.equippedLLamaWeapons[1];

      if (isIndexToggled) {
        ctx.fillStyle = 'rgba(0, 225, 0, .5)';
        ctx.fillRect(630, 5, 55, 40);
      }

      if (weapon instanceof ForceField) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON2COORD.x - 24, WEAPON2COORD.y - 22, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON2COORD.x - 24, WEAPON2COORD.y - 22, 50, 50);
        }
      } else if (weapon instanceof BubbleShield) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON2COORD.x - 24, WEAPON2COORD.y - 22, 58, 58);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON2COORD.x - 24, WEAPON2COORD.y - 22, 48, 48);
        }
      } else if (weapon instanceof TimeController) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON2COORD.x - 17, WEAPON2COORD.y - 24, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON2COORD.x - 17, WEAPON2COORD.y - 24, 50, 50);
        }
      }
    }

    if (this.equippedLLamaWeapons[2]) {

      let isIndexToggled = this.weaponTogglePosition === 2;
      let weapon = this.equippedLLamaWeapons[2];

      if (isIndexToggled) {
        ctx.fillStyle = 'rgba(0, 225, 0, .5)';
        ctx.fillRect(685, 5, 55, 40);
      }

      if (weapon instanceof ForceField) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON3COORD.x - 24, WEAPON3COORD.y - 22, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON3COORD.x - 24, WEAPON3COORD.y - 22, 50, 50);
        }
      } else if (weapon instanceof BubbleShield) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON3COORD.x - 24, WEAPON3COORD.y - 22, 58, 58);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 300, 300, WEAPON3COORD.x - 24, WEAPON3COORD.y - 22, 48, 48);
        }
      } else if (weapon instanceof TimeController) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON3COORD.x - 17, WEAPON3COORD.y - 24, 60, 60);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON3COORD.x - 17, WEAPON3COORD.y - 24, 50, 50);
        }
      }
    }
  }
}

export default WeaponsContainer;
