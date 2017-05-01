# bouncing-balls

## See live here:
https://goformarty.github.io/bouncing-balls/

## Project brief:
Interactive single player game. Eat all the balls!

## Approach:
1. Create canvas element to draw our animated balls on.

3. Create balls:
  - create Shape() constructor that defines the x, y, velX, and velY and exist properties;
  - create Ball() constructor that inherits x, y, velX, velY, and exists from the Shape() constructor;
  - add color and a size property to Ball(). Both initalised with random values;
  - add draw(), update(), and collisionDetect() methods to Ball();

4. Create evil circle that eats balls:
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
- DOM manipulation;
- basic mathods for canvas API;
- animating with requestAnimationFrame API;
- creating objects and inheriting with prototype chain;

## What can be added:
- second user;
- count for second user to compare scores;

