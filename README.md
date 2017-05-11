# bouncing-balls

## See live here:
https://goformarty.github.io/bouncing-balls/

## Project brief:
Interactive single player game. Eat all the balls!

- Let the game take the whole browser viewport.
- Create 25 animated balls in random colours moving around with different velocity. Make them change colours each time they collide. 
- Create user-controled "evil-circle" that eats animated balls.
- Add user instructions and counter that shows the player how many balls are left to "eat".

## Approach:
1. Create canvas element to draw animated balls on:
- get rid of scrollbars and margins round the edge of the page;
- set drawing area of the canvas to equal the width and height of the browser viewport;

2. Create a generic Shape() object contructor that animated balls and user-controlled evil circle will inherit from. Include following parameters:
- x and y coordinates — the horizontal and vertical coordinates where balls will start on the screen. This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right hand corner).
- velX and velY - the horizontal and vertical velocity. These values will be regularly added to the x/y coordinate values when we start to animate the balls, to move them by this much on each frame.

3. Create animated balls to catch:
  - create Ball() constructor that inherits x, y, velX, velY, and exists from the Shape() constructor;
  - add color and a size property to Ball(). Both initalised with random values;
  - add draw(), update(), and collisionDetect() methods to Ball();

4. Create user-controled evil circle that eats balls:
  - define EvilCircle() constructor should inherit x, y, and exists from Shape();
  - define its own color, size, velX and velY;
  - define EvilCircle() methods:
    - draw();
    - checkBounds() to prevent circle from going off scren;
    - setControls() with onkeydown event listener to the window object so user can move the evil circle around;
    - collisionDetect() to eat the balls;
    
5. Implement the score counter:
  - create a variable that stores a reference to the paragraph;
  - increment the count and display the updated number of balls each time a ball is added to the scene;
  - decrement the count and display the updated number of balls each time the evil circle eats a ball (causes it not to exist);
  
## Technology:
- vanilla JavaScript;
- canvas API;
- requestAnimationFrame API;
- HTML & CSS;

## What I've learned and practised: 
- creating objects and inheriting with prototype chain;
- DOM manipulation;
- basic mathods for canvas API;
- animating with requestAnimationFrame API;


## What can be added:
- timer;
- second user;
- count for second user to compare scores;

