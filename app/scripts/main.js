/* jshint devel:true */

//Variables globales
var pong;
var key = 0;

window.addEventListener('load', initialiser, false);

function initialiser () {
	// body...
	console.log('Plop');
	console.log(window.height+" "+window.width);

	var conteneur = $('#conteneur');
	var canvas = $('canvas');

	canvas.attr({
		width: window.innerWidth,
		height: window.innerHeight
	});

	//Creation pong (colorBall, radius, xBall, yBall, xVelocity, yVelocity, VelocitySpeedUp colorPlayer, xPlayer, yPlayer, playerHeight, playerWidth, colorField, padding)
	pong = new Pong(
		"#FFFFFF", //colorBall
		10, //radius
		canvas.width()/2, //position x Ball
		canvas.height()/2, //position y Ball
		10, //Velocity X
		10, //Velocity Y
		10, //Velocity
		"#FFFFFF", //Color player
		25, //Position X player One
		(canvas.height()/2) - 25, //Position Y player One
		100, //Player One height
		20, //Player One Widht
		"#FFFFFF", //Color player two
		canvas.width()-20, //Position X player two
		(canvas.height()/2) - 25, //Position Y player two
		100, //Player two height
		20, //Player two Widht
		"#FFFFFF", //Field color
		25); //Padding

	document.body.addEventListener('keydown', getKeyCode, false);

	//Refresh cavans
	window.requestAnimationFrame(afficher);

	console.log(conteneur.width()+" "+conteneur.height());
	
}

function afficher() {
	pong.clearCanvas();

	//debug
	pong.debug();

	//Draw
	pong.drawField();
	pong.drawBall();
	pong.drawPlayer();
	pong.drawPlayerTwo();
	pong.drawScore();

	//Update
	pong.uptadePositionBall();
	pong.uptadePositionPlayer(key);

	window.requestAnimationFrame(afficher);
}

function getKeyCode(e){
	
	//Arrow Up
	if (e.keyCode == 38) {
		//event.preventDefault();
		key = 38;
	}

	//Arrow Down
	if (e.keyCode == 40) {
		//event.preventDefault();
		key = 40;
	}

	//z
	if(e.keyCode == 90){
		key = 90;
	}

	//s
	if(e.keyCode == 83){
		key = 83;
	}

	//console.log(key);
	document.body.addEventListener('keyup', resetKey, false);
	
	//return key;
}

function resetKey(e){
	document.body.removeEventListener('keyup', resetKey, false);
	key = 0;
}