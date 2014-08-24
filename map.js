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
};

var connections = {
	1: [5, 4, 2],
	2: [1, 3],
	3: [2, 6],
	4: [1, 5, 6],
	5: [1, 4, 10],
	6: [10, 4, 3, 7],
	7: [6, 9, 12],
	8: [10, 11],
	9: [10, 7, 12],
	10: [6, 9, 11, 8, 5],
	11: [8, 10, 12],
	12: [11, 9, 7]
};

var selectedWorld = 9;
var currentWorld = 10;

function initMap(event) {
	var gameView = document.getElementById("gameView").style.display = "none";
	var mapView = document.getElementById("mapView").style.display = "block";
	document.getElementById("status").innerHTML = "You have " + (completed ? "won" : "lost") + " the last round.";
	
	var nr = currentWorld;
	// Set all inactive
	for (var i = 1; i < 13; i++) {
		document.getElementById("s" + i).className = "inactive";
	}
	// Set connections active
	for (var i = 0; i < connections[nr].length; i++) {
		document.getElementById("s" + connections[nr][i]).className = "active";
	}
	// Set current
	document.getElementById("s" + nr).className = "active current";
	document.getElementById("current").innerHTML = nameNumberMap[nr];
	
	// Create missions
	createMissions();
	document.getElementById("briefing").innerHTML = availableMissions[selectedWorld].briefing;
	document.getElementById("reward").innerHTML = availableMissions[selectedWorld].reward;
	document.getElementById("difficulty").innerHTML = availableMissions[selectedWorld].difficulty;
	
	// Preselect first world of connections, because we're lazy
	selectWorld(false, connections[nr][0]);
	
	stopSound("game");
	playSound("menu");
}

function selectWorld(event, nr) {
	if (contains(connections[currentWorld], nr) && nr != currentWorld) {
		document.getElementById("toWorld").innerHTML = nameNumberMap[nr];
		for (var i = 0; i < connections[currentWorld].length; i++) {
			var element = document.getElementById("s" + connections[currentWorld][i]).className = "active";
		}
		document.getElementById("s" + nr).className = "active selected";
	}
}

function createMissions() {
	availableMissions = [];
	for (var i = 0; i < connections[currentWorld].length; i++) {
		var toWorld = nameNumberMap[connections[currentWorld][i]];
		var diff = getDifficulty();
		var newMission = {
			"completed" : false,
			"toWorld" : toWorld,
			"briefing" : getBriefing(toWorld),
			"reward" : getReward(diff),
			"difficulty" : diff
		}
		availableMissions[connections[currentWorld][i]] = newMission;
	}
}

function getBriefing(worldName) {
	return "This is a brief test, tehe";
}

function getReward(difficulty) {
	return difficulty * 100 + ((Math.random() - 1) * 100);
}

function getDifficulty() {
	return Math.round((5 * Math.random() + 1));
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}