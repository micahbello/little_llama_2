class Util {
  constructor() {

  }

  areSphereNonSphereColliding(sphere, fourSidedObj) {
    //NOTE: Code borrowed from http://jsfiddle.net/m1erickson/n6U8D/
      let distX = Math.abs(sphere.x - fourSidedObj.x - fourSidedObj.width / 2);
      let distY = Math.abs(sphere.y - fourSidedObj.y - fourSidedObj.height / 2);

      if (distX > (fourSidedObj.width / 2 + sphere.radius)) {
          return false;
      }
      if (distY > (fourSidedObj.height / 2 + sphere.radius)) {
          return false;
      }

      if (distX <= (fourSidedObj.width / 2)) {
          return true;
      }
      if (distY <= (fourSidedObj.height / 2)) {
          return true;
      }

      let dx = distX - fourSidedObj.width / 2;
      let dy = distY - fourSidedObj.height / 2;
      if (dx * dx + dy * dy <= (sphere.radius * sphere.radius)) {
        return true;
      }
    return false;
  }

  areSpheresColliding(sphere1, sphere2) {

    let xDistance = sphere1.x - sphere2.x;
    let yDistance = sphere1.y - sphere2.y;

    let distance = Math.sqrt(Math.pow(xDistance, 2) +
    Math.pow(yDistance, 2));

    let minDistance = (sphere1.radius + sphere2.radius);

    if (distance <= minDistance) {
      return true;
    }

    return false;
  }

  resolveSphereSphereCollision(sphere1, sphere2) {
    // NOTE: Elastic collsision
    //code borrowed from https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
    let xVelocityDiff = sphere1.x_velocity - sphere2.x_velocity;
    let yVelocityDiff = sphere1.y_velocity - sphere2.y_velocity;

    let xDist = sphere2.x - sphere1.x;
    let yDist = sphere2.y - sphere1.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
      let angle = -Math.atan2(sphere2.y - sphere1.y, sphere2.x - sphere1.x);

      let m1 = sphere1.mass;
      let m2 = sphere2.mass;

      let u1 = this.rotate({x: sphere1.x_velocity, y: sphere1.y_velocity}, angle);
      let u2 = this.rotate({x: sphere2.x_velocity, y: sphere2.y_velocity}, angle);

      let v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
      let v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

      let vFinal1 = this.rotate(v1, -angle);
      let vFinal2 = this.rotate(v2, -angle);

      // NOTE: next few lines if commented in will offset the new velocities
      //so that pigs will maintain same overall velocity throughout
      //this portion was all my logic
        // let startingPigVelocity = Math.sqrt(18); //x_velocity = 3, y_velocity = 3
        // let newVelocity1 = Math.sqrt(vFinal1.x * vFinal1.x + vFinal1.y * vFinal1.y);
        // let newVelocity2 = Math.sqrt(vFinal2.x * vFinal2.x + vFinal2.y * vFinal2.y);
        // let offset1 = startingPigVelocity/newVelocity1;
        // let offset2 = startingPigVelocity/newVelocity2;
        //
        // vFinal1.x *= offset1;
        // vFinal1.y *= offset1;
        // vFinal2.x *= offset2;
        // vFinal2.y *= offset2;
      //

      sphere1.x_velocity = vFinal1.x;
      sphere1.y_velocity = vFinal1.y;

      sphere2.x_velocity = vFinal2.x;
      sphere2.y_velocity = vFinal2.y;
    }
  }

//taken from http://2000clicks.com/MathHelp/GeometryPointAndTriangle3.aspx
// NOTE: Currently not being used
  areCoordsWithinTriangle(coord, pointA, pointB, pointC) {
    let calcPointAB = ((coord.y - pointA.y) * (pointB.x - pointA.x) - (coord.x - pointA.x) * (pointB.y - pointA.y));
    let calcPointBC = ((coord.y - pointB.y) * (pointC.x - pointB.x) - (coord.x - pointB.x) * (pointC.y - pointB.y));
    let calcPointCA = ((coord.y - pointC.y) * (pointA.x - pointC.x) - (coord.x - pointC.x) * (pointA.y - pointC.y));

    if (calcPointAB * calcPointBC > 0 && calcPointBC * calcPointCA > 0) {
      return true;
    } else {
      return false;
    }
  }
}

export default Util;
