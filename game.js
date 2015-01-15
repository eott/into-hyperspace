// Display and meta globals
var can = document.getElementById("screen");
var ctx = can.getContext("2d");
var keepPlaying = true;
var mainLoop = false;
var fc = 0;

// Player, enemies and environment
var mobs = [];
var hp = 100;
var highscore = 0;
var currentMission = false;
var availableMissions = [];

// Input and movement
var keyStatus = {};
var speed = 6;
var zspeed = 15;
var startX = 500;
var startY = 400;
var colRad = 420;
var posX = 0;
var posY = 100;
var posZ = 0;
var theta = 0;
var r = 0;

// Other
var PI = Math.PI
var PI2 = PI / 2;
var PI32 = 3 * PI / 2;

// Stuff that only needs to be done once
registerListeners();
loadSounds();
initMap();

function initGame(event) {
	var gameView = document.getElementById("gameView").style.display = "block";
	var mapView = document.getElementById("mapView").style.display = "none";
	
	keepPlaying = true;
	hp = 100;
	fc = 0;
	resetMobs();
	resetMovement();
	
	stopSound("menu");
	playSound("game");
	
	mainLoop = window.setInterval("upkeep()", 30);
}

function upkeep() {
	fc++;
	ctx.clearRect(0, 0, can.width, can.height);
	
	doMovement();
	drawTunnel();
	drawMobs();
	drawPlayerAt(posX + startX, posY + startY);
	drawGUI();
	
	if (hp <= 0) {
		keepPlaying = false;
		currentMission.completed = false;
	}
	if (fc > 1880) {
		ctx.fillStyle = "rgba(255,255,255," + ((fc % 1880) / 90) + ")";
		ctx.fillRect(0, 0, 1000, 800);
	}
	
	if (fc > 2000) {
		keepPlaying = false;
		currentMission.completed = true;
	}
	
	if (!keepPlaying) {
		window.clearInterval(mainLoop);
		initMap();
	}
}