function drawTunnel() {
	var rad = 840 + zspeed * (fc % 24);
	for (var i = 0; i < 30; i++) {
		circle(startX, startY, rad, '#000000', 1);
		rad *= 0.7;
	}
}

function circle(x, y, radius, color, width, fill = false) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	ctx.lineWidth = width;
	ctx.strokeStyle = color;
	if (fill) {
		ctx.fill();
	} else {
		ctx.stroke();
	}
}

function drawGUI() {
	// Debug gui
	document.getElementById("framecounter").innerHTML = fc;
	document.getElementById("posX").innerHTML = posX;
	document.getElementById("posY").innerHTML = posY;
	document.getElementById("theta").innerHTML = theta;
	document.getElementById("hp").innerHTML = hp;
	circle(startX, startY, colRad, '#FF0000', 1);
	
	// HP bar
	ctx.fillStyle = "#000000";
	ctx.fillRect(200, 750, 600, 25, "#000000");
	ctx.fillStyle = "#FFFF00";
	ctx.fillRect(202, 752, 6 * hp - 4, 21, "#FFFF00");
}

function drawPlayerAt(x, y) {
	var paraX = posX / colRad;
	var paraY = posY / colRad;
	ctx.fillStyle = "#222244";
	ctx.strokeStyle = "222244";
	// Left wing
	ctx.beginPath();
	ctx.moveTo(x - 50, y - 25);
	ctx.lineTo(x - 80 - (25 * paraX), y + 25);
	ctx.lineTo(x - 50, y + 25);
	ctx.closePath();
	ctx.fill();
	// Right wing
	ctx.beginPath();
	ctx.moveTo(x + 50, y - 25);
	ctx.lineTo(x + 80 - (25 * paraX), y + 25);
	ctx.lineTo(x + 50, y + 25);
	ctx.closePath();
	ctx.fill();
	// Head up
	ctx.beginPath();
	ctx.moveTo(x - 50, y - 25);
	ctx.lineTo(x - 40, y - 25 - (20 * paraY));
	ctx.lineTo(x + 40, y - 25 - (20 * paraY));
	ctx.lineTo(x + 50, y - 25);
	ctx.closePath();
	ctx.fill();
	// Head down
	ctx.beginPath();
	ctx.moveTo(x - 50, y + 25);
	ctx.lineTo(x - 40, y + 25 - (20 * paraY));
	ctx.lineTo(x + 40, y + 25 - (20 * paraY));
	ctx.lineTo(x + 50, y + 25);
	ctx.closePath();
	ctx.fill();
	// Main body
	ctx.fillStyle = "#444466";
	ctx.fillRect(x - 50, y - 25, 100, 50);
	// Thrusters
	var grad = ctx.createRadialGradient(x - 25, y, 5, x - 25, y, 12);
	grad.addColorStop(0, "#FFFFFF");
	grad.addColorStop(1, "#FFFF00");
	ctx.fillStyle = grad;
	circle(x - 25, y, 12, "#FFFFFF", 2, true);
	var grad = ctx.createRadialGradient(x + 25, y, 5, x + 25, y, 12);
	grad.addColorStop(0, "#FFFFFF");
	grad.addColorStop(1, "#FFFF00");
	ctx.fillStyle = grad;
	circle(x + 25, y, 12, "#FFFFFF", 2, true);
}