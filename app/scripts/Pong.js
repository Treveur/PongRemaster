var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');
var scorePlayer = 0;
var scorePlayer2 = 0;

function Pong(colorBall, radius, xBall, yBall, xVelocity, yVelocity, VelocitySpeedUp, colorPlayer, xPlayer, yPlayer, pHeight, pWidth, colorPlayerTwo, xPlayerTwo, yPlayerTwo, pTwoHeight, pTwoWidth, colorField, padding){
	//Ball
	this.cBall = colorBall;
	this.radius = radius;
	this.xBall = xBall;
	this.yBall = yBall;
	this.xVelocity = xVelocity;
	this.yVelocity = yVelocity;
	this.VelocitySpeedUp = VelocitySpeedUp;
	//Player one
	this.cPlayer = colorPlayer;
	this.xPlayer = xPlayer + padding;
	this.yPlayer = yPlayer;
	this.pHeight = pHeight;
	this.pWidth = pWidth;
	//Player Two
	this.CTPlayer = colorPlayerTwo;
	this.xTPlayer = xPlayerTwo - padding * 2;
	this.yTPlayer = yPlayerTwo;
	this.pTHeight = pTwoHeight;
	this.pTWidth = pTwoWidth;
	//Field
	this.cField = colorField;

	//Padding
	this.padding = padding;
}

//Function witch draw ball
Pong.prototype.drawBall = function() {

	context.beginPath();
		context.fillStyle = this.cBall;
		context.arc(this.xBall, this.yBall, this.radius, 0, 2 * Math.PI);
	context.fill();
};

//Function witch draw a little line
Pong.prototype.drawPlayer = function() {
	context.beginPath();
		context.fillStyle = this.cPlayer;
		context.rect(this.xPlayer, this.yPlayer, this.pWidth, this.pHeight);
	context.fill();
};

Pong.prototype.drawPlayerTwo = function(){
	context.beginPath();
		context.fillStyle = this.cTPlayer;
		context.rect(this.xTPlayer, this.yTPlayer, this.pTWidth, this.pTHeight);
	context.fill();
}

Pong.prototype.drawScore = function(){
	//Calculate the measurement of the text score player
	var metric = context.measureText(scorePlayer);

	context.beginPath();
		context.font = 'bold 40pt Open sans';
		context.fillText(scorePlayer, canvas.width/2 - this.padding - metric.width, 40 + this.padding*2);
		context.fillText(scorePlayer2, canvas.width/2 + this.padding, 40 + this.padding*2);		
	context.stroke();
}

//Draw field
Pong.prototype.drawField = function() {

	context.beginPath();
		context.lineWidth = 5;
		context.strokeStyle = this.cField;
		//(x, y , width, height)
		context.rect(this.padding, this.padding, canvas.width - this.padding*2, canvas.height - this.padding*2);
		context.moveTo(canvas.width/2, this.padding);
		context.lineTo(canvas.width/2, canvas.height - this.padding);
		
	context.stroke();

}

//Update the position of the ball
Pong.prototype.uptadePositionBall = function() {
	this.CheckPosition(this.xBall, this.yBall);

	this.xBall += this.xVelocity;
	this.yBall += this.yVelocity;

}

//Update player postion when a key is pressed
Pong.prototype.uptadePositionPlayer = function(keyCode) {

	//console.log(keyCode);

	//Up Arrow
	if(keyCode === 38){
		this.yPlayer -= 10;
	}

	//Down Arrow
	if(keyCode === 40){
		this.yPlayer += 10;
	}

	//z
	if(keyCode === 90){
		this.yTPlayer -= 10;
	}

	//s
	if(keyCode === 83){
		this.yTPlayer += 10;
	}

	this.CheckPositionPlayer();
}

Pong.prototype.updateVelocity = function(){
	this.xVelocity += this.VelocitySpeedUp;
	this.yVelocity += this.VelocitySpeedUp;
}

Pong.prototype.updateScorce = function (player) {
	if(player === 1){
		scorePlayer += 1;
	}else if(player === 2){
		scorePlayer2 += 1;
	}
}

Pong.prototype.CheckPosition = function(xBAll, yBall) {

	//Rebound on limitation field
	if(this.yBall + this.radius > canvas.height  - this.padding) {
		this.yVelocity *= -1;
	}

	if (this.yBall - this.radius < this.padding) {
		this.yVelocity *= -1;
	}

	if (this.xBall + this.radius > canvas.width - this.padding) {
		this.xVelocity *= -1;
		this.updateScorce(1);
	}

	if (this.xBall - this.radius < this.padding) {
		this.xVelocity *= -1;
		this.updateScorce(2);
	}

	//Rebound on player one
	if ((this.yBall > this.yPlayer && this.yBall < this.yPlayer + this.pHeight) && (this.xBall) - this.radius === this.xPlayer + this.pWidth) {
		this.yVelocity *= -1;
		this.xVelocity *= -1;
	}

	//Rebound on player two
	if ((this.yBall > this.yTPlayer && this.yBall < this.yTPlayer + this.pTHeight) && (this.xBall) - this.radius === this.xTPlayer) {
		this.yVelocity *= -1;
		this.xVelocity *= -1;
	}
}

Pong.prototype.CheckPositionPlayer = function(){
	if(this.yPlayer < this.padding){
		this.yPlayer = this.padding;
	}

	if(this.yPlayer + this.pHeight > canvas.height - this.padding){
		this.yPlayer = (canvas.height - this.padding) - this.pHeight;
	}

}

Pong.prototype.clearCanvas = function() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

Pong.prototype.debug = function(){
	context.beginPath();
	context.strokeStyle = "#FF0000";
	context.lineWidth = 1;
		//Player
		context.moveTo(this.xPlayer + this.pWidth, 0);
		context.lineTo(this.xPlayer + this.pWidth, canvas.height);
		
		context.moveTo(0, this.yPlayer);
		context.lineTo(canvas.width, this.yPlayer);
		
		context.moveTo(0, this.yPlayer + this.pHeight);
		context.lineTo(canvas.width, this.yPlayer + this.pHeight);
	
		//Ball
		context.moveTo(this.xBall, 0);
		context.lineTo(this.xBall, canvas.height);
		
		context.moveTo(0, this.yBall);
		context.lineTo(canvas.width, this.yBall);

	context.stroke();

	//Player Two
	context.beginPath();
		context.strokeStyle = "#00FF00";
		context.moveTo(this.xTPlayer, 0);
		context.lineTo(this.xTPlayer, canvas.height);
		
		context.moveTo(0, this.yTPlayer);
		context.lineTo(canvas.width, this.yTPlayer);
		
		context.moveTo(0, this.yTPlayer + this.pTHeight);
		context.lineTo(canvas.width, this.yTPlayer + this.pTHeight);
	context.stroke();
}
