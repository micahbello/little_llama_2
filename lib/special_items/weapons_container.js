import BubbleShield from '../weapons/bubble_shield.js';
import ForceField from '../weapons/forcefield.js';
import TimeController from '../weapons/time_controller.js';
import BulletsSpray from '../weapons/bullets_spray.js';
import {WEAPON1COORD, WEAPON2COORD, WEAPON3COORD, CANVAS_FONT} from '../constants.js';


class WeaponsContainer {
  constructor(equippedLLamaWeapons, weaponTogglePosition, outlineColor, activeWeaponIndex) {
    this.equippedLLamaWeapons = equippedLLamaWeapons;
    this.outlineColor = outlineColor;
    this.weaponTogglePosition = weaponTogglePosition;
    this.activeWeaponIndex = activeWeaponIndex;
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


    if (this.activeWeaponIndex[0] === -1) {
      ctx.beginPath();
      ctx.font = `18px ${CANVAS_FONT}`;
      ctx.fillStyle = this.outlineColor;
      ctx.textAlign="right";
      if (this.equippedLLamaWeapons[this.weaponTogglePosition] instanceof BubbleShield) {
        ctx.fillText("SPACEBAR for Bubble Shield", 570, 45);
      } else if (this.equippedLLamaWeapons[this.weaponTogglePosition] instanceof TimeController) {
        ctx.fillText("SPACEBAR for Super Speed", 570, 45);
      } else if (this.equippedLLamaWeapons[this.weaponTogglePosition] instanceof ForceField) {
        ctx.fillText("SPACEBAR for Force Field Blast", 570, 45);
      } else if (this.equippedLLamaWeapons[this.weaponTogglePosition] instanceof BulletsSpray) {
        ctx.fillText("SPACEBAR for Bullet Spray", 570, 45);
      }
      ctx.closePath();
    }



    if (this.equippedLLamaWeapons[0]) {

      let isIndexToggled = this.weaponTogglePosition === 0;
      let weapon = this.equippedLLamaWeapons[0];

      if (isIndexToggled) {
        if (this.activeWeaponIndex[0] === 0) { //this one is active
          ctx.fillStyle = 'rgba(225, 0, 0, .8)'; //red
          ctx.fillRect(575, 5, 55, 40);
        } else if (this.activeWeaponIndex[0] != -1) { //one is active but not this one
          ctx.fillStyle = 'rgba(255, 69, 0, .8)'; //orange
          ctx.fillRect(575, 5, 55, 40);
        } else { //none is active
          ctx.fillStyle = 'rgba(0, 225, 0, .8)'; //green
          ctx.fillRect(575, 5, 55, 40);
        }

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
      } else if (weapon instanceof BulletsSpray) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON1COORD.x - 17, WEAPON1COORD.y - 20, 170, 170);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON1COORD.x - 17, WEAPON1COORD.y - 20, 150, 150);
        }
      }
    }

    if (this.equippedLLamaWeapons[1]) {

      let isIndexToggled = this.weaponTogglePosition === 1;
      let weapon = this.equippedLLamaWeapons[1];

      if (isIndexToggled) {
        if (this.activeWeaponIndex[0] === 1) { //this one is active
          ctx.fillStyle = 'rgba(225, 0, 0, .8)'; //red
          ctx.fillRect(630, 5, 55, 40);
        } else if (this.activeWeaponIndex[0] != -1) { //one is active but not this one
          ctx.fillStyle = 'rgba(255, 69, 0, .8)'; //orange
          ctx.fillRect(630, 5, 55, 40);
        } else { //none is active
          ctx.fillStyle = 'rgba(0, 225, 0, .8)'; //green
          ctx.fillRect(630, 5, 55, 40);
        }
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
      } else if (weapon instanceof BulletsSpray) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON2COORD.x - 17, WEAPON2COORD.y - 20, 170, 170);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON2COORD.x - 17, WEAPON2COORD.y - 20, 150, 150);
        }
      }
    }

    if (this.equippedLLamaWeapons[2]) {

      let isIndexToggled = this.weaponTogglePosition === 2;
      let weapon = this.equippedLLamaWeapons[2];

      if (isIndexToggled) {
        if (this.activeWeaponIndex[0] === 2) { //this one is active
          ctx.fillStyle = 'rgba(225, 0, 0, .8)'; //red
          ctx.fillRect(685, 5, 55, 40);
        } else if (this.activeWeaponIndex[0] != -1) { //one is active but not this one
          ctx.fillStyle = 'rgba(255, 69, 0, .8)'; //orange
          ctx.fillRect(685, 5, 55, 40);
        } else { //none is active
          ctx.fillStyle = 'rgba(0, 225, 0, .8)'; //green
          ctx.fillRect(685, 5, 55, 40);
        }
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
      } else if (weapon instanceof BulletsSpray) {
        if (isIndexToggled) {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON3COORD.x - 17, WEAPON3COORD.y - 20, 170, 170);
        } else {
          ctx.drawImage(weapon.weaponImage, 0, 0, 800, 800, WEAPON3COORD.x - 17, WEAPON3COORD.y - 20, 150, 150);
        }
      }
    }
  }
}

export default WeaponsContainer;
