// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 512;
document.body.appendChild(canvas);

// BACKGROUND
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/background.png";

// PLAYER ICOM
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";

// DOGGY ICON
var dogReady = false;
var dogImage = new Image();
dogImage.onload = function () {
	dogReady = true;
};
dogImage.src = "images/dog.png";

// OBJECT VARIABLES
var hero = {
	speed: 256 // movement in pixels/second
};
var dog = {};
var dogsCaught = 0;

// PLAYER INPUT
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// NEXT LEVEL RESET
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// DOGGY REPOSITION WOOF
	dog.x = 32 + (Math.random() * (canvas.width - 64));
	dog.y = 32 + (Math.random() * (canvas.height - 64));
};

// GAME OBJECT UPDATE
var update = function (modifier) {
	if (38 in keysDown) { // Player holding UP
		hero.y -= hero.speed * modifier;
	}
	if (40 in keysDown) { // Player holding DOWN
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding lEFT
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding RIGHT
		hero.x += hero.speed * modifier;
	}

	// CATCHING THE DOGGY STATEMENT
	if (
		hero.x <= (dog.x + 32)
		&& dog.x <= (hero.x + 32)
		&& hero.y <= (dog.y + 32)
		&& dog.y <= (hero.y + 32)
	) {
		++dogsCaught;
		reset();
	}
};

// GRAPHICS RENDERING
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (dogReady) {
		ctx.drawImage(dogImage, dog.x, dog.y);
	}

	// Score
	ctx.fillStyle = "rgb(181, 230, 29)";
	ctx.font = "16px Indie Flower";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("PUPPY CATCH COUNT: " + dogsCaught, 32, 32);
};

// LOOP TO MAKE THE GAME RUN FOREVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER AND EVER
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Redo action ASAP
	requestAnimationFrame(main);
};

// Cross-browser support shit from w3schools.com I DONT EVEN KNOW WHAT IT MEANS it helped make it work on firefox tho sooooo :P
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// start the gameee
var then = Date.now();
reset();
main();
 // this project took alot of time from my spring break :(