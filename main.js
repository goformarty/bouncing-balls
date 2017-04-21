// define variable for ball count paragraph

var para = document.querySelector('p');
var count = 0;

// user instructions
var instructions = document.querySelector('h5');
instructions.textContent = 'Use arrow keys to catch all the balls!';

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

// define Shape() constructor to generate balls

function Shape() {
	// x and y coordinates for initial ball position
	this.x = random(0, width);
	this.y = random(0, height);
	// horizontal and vertical velocity 
	// move them by this much on each frame
	this.velX = random(-7, 7);
	this.velY = random(-7, 7);
	
	// check whether the balls exist in the programme
	// have not been eaten by the evil circle
	this.exist = true;
}

// define Ball() contructor inheriting from Shape() constructor

function Ball(x, y, velX, velY, exist) {
	Shape.call(this, x, y, velX, velY, exist);
	// random color to start with
	this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
	// random size, a radius between 10 and 20px
	this.size = random(10, 20);
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// define Ball() methods:

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


// define EvilCircle() contructor inheriting from Shape() constructor
function EvilCircle(x, y, exist) {
	Shape.call(this, x, y, exist);
	this.color = 'white';
	this.size = 10;
	this.velX = 20;
	this.velY = 20;
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

// define EvilCircle() methods:

// EvilCircle() method to draw instance on canvas
EvilCircle.prototype.draw = function() {
	ctx.beginPath();
	ctx.strokeStyle = this.color;
	// arc() method to trace an arc shape on the paper
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.lineWidth = 3;
};

// EvilCircle() method to prevent circle from going off the screen
EvilCircle.prototype.checkBounds = function() {
	if ((this.x + this.size) >= width) {
		this.x -= this.size ;
	}

	if ((this.x - this.size) <= 0) {
		this.x += this.size;
	}

	if ((this.y + this.size) >= height) {
		this.y -= this.size;
	}

	if ((this.y - this.size) <= 0) {
		this.y += this.size;
	}
};

// EvilCircle() method to add an( onkeydown event listener to move circle around
EvilCircle.prototype.setControls = function() {
	var _this = this;
	window.onkeydown = function(e) {
		if (e.keyCode === 37) {
			_this.x -= _this.velX;
		} else if (e.keyCode === 39) {
			_this.x += _this.velX;
		} else if (e.keyCode === 38) {
			_this.y -= _this.velY;
		} else if (e.keyCode === 40) {
			_this.y += _this.velY;
		}
	};
};

// EvilCircle() method to
EvilCircle.prototype.collisionDetect = function() {
	for(var j=0; j< balls.length; j++) {
		// check if the being checked ball has not been eaten already by the evil circle
		if(balls[j].exist) {
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y;
			var distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < this.size + balls[j].size) {
				// set any balls that collide with the evil circle to not exist anymore
				balls[j].exist = false;
				count--;
        		para.textContent = 'Balls left: ' + count;
			}
		}
	}
};

// define an empty array to store all 25 ball instances
var balls = [];

// define loop that keeps drawing the scene constantly:

// define EvilCircle object instance and allow user to move it
var evilCircle = new EvilCircle();
evilCircle.setControls();


// define loop function to animate the ball

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
		count++;
		para.textContent = 'Balls left: ' + count;
	}
	// loop through all the balls in the array and run each ball's
	// draw(), update() and collisionDetect() methids
	for(var i=0;i<balls.length;i++) {
		if (balls[i].exist) {
			balls[i].draw();
			balls[i].update();
			// in each frame call method to change color when balls collide
			balls[i].collisionDetect();
		}
		evilCircle.draw();
		evilCircle.checkBounds();
		evilCircle.collisionDetect();
	}
	requestAnimationFrame(loop);
}

loop();


