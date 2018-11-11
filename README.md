# Little Llama 2
[play here](http://www.micahbello.com/little_llama_2/)


### Background

 The sequel to an earlier project called Little Llama. It is a fun platform game
 built with JavaScript and HTML5 Canvas. The concept is the same as the original:
 jump on moving platforms and collect coins while avoiding bouncing pigs. Unlike
 the original, Little Llama 2 allows for weapon collection and use, more interaction
 between objects, a day and night background cycle, collisions that affect the
 display of the game screen, the option of two modes of play ("Classic/Normal"
 or "Flight"), the ability to pause and/or restart during gameplay, and the ability
 to save and display players' high scores.

### How To Play

The goal of the game is to collect as many coins as possible before running out of
hearts. Colliding with a pig results in the loss of a heart. A new coin is
spawned at random coordinates on the game screen once a coin is collected.

#### -Normal/Classic Mode
Use the left and right keys to move and the up key to jump. Jump from platform to
platform to reach each coin. Platforms also offer cover from pigs. Pigs bounce off
the sides of the game screen as well as the platforms. The overall speed of the pigs
will be constant throughout game play.

#### -Flight Mode
There are no platforms. The llama character glides up and down to collect the coins.
Use the up, down, left, and right keys to glide in the respective directions. Pigs
bounce off the sides of the game screen, off each other, and off any other object
that collides with them (besides the llama character). The physics of the collisions
between bouncing objects is elastic, therefore objects are not always moving at the
same speed.

### Technologies
* `JavaScript` for game logic
* `HTML5 Canvas` for animation rendering
* `CSS` for styling

### Features

#### Item Spawning
A problem experienced by the previous version of this game was the fact that items
would always spawn at the same coordinates on the game canvas. Since these objects
had collision detectors between each other for the purpose of bouncing after collisions,
occasionally two objects would spawn simultaneously at the same time and due to the
collision resolve logic, would remain "stuck" to each other.

In order to prevent this, this implementation has 11 possible "spawn circles."
The spawn circles are circles located along the top of the canvas, the bottom
right corner of the canvas, and the bottom left corner of the canvas. The center
coordinates of each circle are used as the potential spawning coordinates for new
object.

Before any item is set to spawn, the game will iterate through each spawn circle
and check if any current object is touching or found within the circle. Each
circle has a radius of 40 pixels. The first circle to return empty will have its
center coordinates used as the spawning coordinates for the object. This ensures
that objects never spawn on top of each other. If by any chance none of the 11
circles are empty, the object will simply spawn in the first circle. The chances
of no spawn circle being empty is infinitely small though.

Example code:

```Javascript
//Array containing each "spawn circle" array. Each array contains
//the x coordinate, the y coordinate, and the radius
const SPAWNCIRCLES = [
  [40, 40, 40],
  [710, 40, 40],
  [40, 380, 40],
  [710, 380, 40],
  [120, 40, 40],
  [200, 40, 40],
  [280, 40, 40],
  [360, 40, 40],
  [440, 40, 40],
  [520, 40, 40],
  [600, 40, 40]
];

```
The above shows each "spawn code." Below is displayed the function that returns
an empty spawn circle. This function is found within the game.js file.  

```JavaScript

returnEmptySpawnCircle() {

  let objects = [].concat(this.llama).concat(this.itemsInPlay);

  let circles = [true,true,true,true,true,true,true,true,true,true,true];

  for (let i = 0; i < SPAWNCIRCLES.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (objects[j] instanceof Pig){

        if (this.areSpheresColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1],
            radius: SPAWNCIRCLES[i][2]}, objects[j]) &&
            (objects[j].status === "available" || objects[j].status === "testing")) {
          circles[i] = false;
        }
      } else if (objects[j] instanceof Llama) {
        if (this.areSphereNonSphereColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1],
          radius: SPAWNCIRCLES[i][2]}, objects[j])) {
          circles[i] = false;
        }
      } else if (objects[j] instanceof Heart) {
        if (this.areSpheresColliding({x: SPAWNCIRCLES[i][0], y: SPAWNCIRCLES[i][1],
          radius: SPAWNCIRCLES[i][2]}, objects[j])) {
          circles[i] = false;
        }
      }
    }
  }

  for (let i = 0; i < circles.length; i++) {
    if (circles[i] === true) {
      return SPAWNCIRCLES[i];
    }
  }

  return SPAWNCIRCLES[0];
}

```

#### Coins, Hearts, and Bacons "Deposit" Coordinates

In the previous game, coins and hearts would disappear as soon as a player
collided with them. Bacons were not a feature in the last game. In this implementation
it was decided that upon colliding with and collecting each of these items, the
collected item would "fly" to the top left corner of the canvas where a count of each
of these items collected is kept. The count would update only after the collected item
reached the respective icon that represented the count of that item.

To accomplish this, the overall velocity (x_velocity and y_velocity) of the collected
needed to be reset so as to ensure that the item would reach the correct icon on the left
corner. This was done by taking into account the coordinates of the icons.


```JavaScript

export const COINDEPOSITCOORD = {x: 10, y: 5};
export const HEARTDEPOSITCOORD = {x: 95, y: 5};
export const BACONDEPOSITCOORD = {x: 190, y: 5};

```

Upon collision with the player, the following function is run with the collided
object (Coin, Heart, or Bacon) as the argument.

```JavaScript

resolveLlamaItemsWithDepositSpacesCollision(object) {

  //Create a variable called destination that will contain the coordinates of
  //where the collided object is to fly to .
  let destination = {};

  //Set the x and y coordinates of the destination object.
  if (object instanceof Coin) {
    destination.x = COINDEPOSITCOORD.x;
    destination.y = COINDEPOSITCOORD.y;
  } else if (object instanceof Heart) {
    destination.x = HEARTDEPOSITCOORD.x;
    destination.y = HEARTDEPOSITCOORD.y;
  } else if (object instanceof Bacon) {
    destination.x = BACONDEPOSITCOORD.x;
    destination.y = BACONDEPOSITCOORD.y;
  }

  //Set a variable that contains the coordinates of the collision.
  let collisionCoord = {x: object.x, y: object.y};

  //Calculate the distance between destination coordinates and collision coordinates.
  let xDistance = destination.x - collisionCoord.x;
  let yDistance = destination.y - collisionCoord.y;

  //The following math related code calculates the new velocity of the object
  let distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);
  let desiredVelocity = 7; //4 px per frame = 180px per second (4x60)
  let offset = desiredVelocity/distance;
  let newXVelocity = xDistance * offset;
  let newYVelocity = yDistance * offset;

  //set the object's velocity to these new velocities.
  object.x_velocity = newXVelocity;
  object.y_velocity = newYVelocity;
}

```  

The game will then check the coordinates of each collected object on its way to its
respective icon/counter. The game will then eliminate the object once it reaches its
"destination" coordinates, or the coordinates of the icon/counter.


### Future Features
* Add more weapons
