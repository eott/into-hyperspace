function initMap(event) {
	var gameView = document.getElementById("gameView").style.display = "none";
	var mapView = document.getElementById("mapView").style.display = "block";
	document.getElementById("status").innerHTML = "You have " + (completed ? "won" : "lost") + " the last round.";
}