var nameNumberMap = {
	1: "Nebuso",
	2: "Kolomares",
	3: "Wesz",
	4: "Chu",
	5: "Dimeterus",
	6: "New Beijing",
	7: "Xu'la'ra mu",
	8: "Vizco",
	9: "Ortageaux",
	10: "Faligray",
	11: "#0x34AFF01D2",
	12: "Gramathea"
}

var selectedWorld = 9;
var currentWorld = 10;

function initMap(event) {
	var gameView = document.getElementById("gameView").style.display = "none";
	var mapView = document.getElementById("mapView").style.display = "block";
	document.getElementById("status").innerHTML = "You have " + (completed ? "won" : "lost") + " the last round.";
}

function selectWorld(event, nr) {
	document.getElementById("toWorld").innerHTML = nameNumberMap[nr];
}