// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
	var num = Math.floor(Math.random()*(max-min)) + min;
	return num;
}

// Ball() constructor function to generate ball objects
// with all properties

function Ball() {
	// x and y coordinates for initial ball position
	this.x = random(0, width);
	this.y = random(0, height);
	// horizontal and vertical velocity 
	// move them by this much on each frame
	this.velX = random(-7, 7);
	this.velY = random(-7, 7);
	// random color to start with
	this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
	// random size, a radius between 10 and 20px
	this.size = random(10, 20);
}

// all Ball() methods:

// method to draw the ball

Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	// arc() method to trace an arc shape on the paper
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.fill();
};

//  method to upade ball's position - to start moving the ball

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// method to add collision detection 
Ball.prototype.collisionDetect = function() {
	for(var j=0; j< balls.length; j++) {
		if(!(this === balls[j])) {
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size + balls[j].size) {
				balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
			}
		}
	}
};

var balls = [];

// function to animate the ball

function loop()	{
	// set the canvas fill color to sem-transparent black
	// this covers up the previous frame's drawing before the next one is drawn
	// without this, there will be long snakes instead of moving balls
	// semi-transparent fill will allow a few previous frames to shine through,
	// producing the little trails behind the balls as they move
	ctx.fillStyle = 'rgba(0,0,0,0.3)';
	// parameters for drawing a rectangle 
	ctx.fillRect(0,0,width,height);

	// to create 25 object instances of Ball() 
	while (balls.length<25) {
		// create new instance
		var ball = new Ball();
		// and push it onto the end of balls array until 25 balls
		balls.push(ball);
	}
	// loop through all the balls in the array and run each ball's
	// draw(), update() and collisionDetect() methids
	for(var i=0;i<balls.length;i++) {
		balls[i].draw();
		balls[i].update();
		// in each frame call method to change color when balls collide
		balls[i].collisionDetect();
	}

	requestAnimationFrame(loop);
}

loop();


