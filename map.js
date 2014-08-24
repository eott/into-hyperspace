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

var hlPositions = { // This is really f***ing stupid and should be better done with css, but as all webware, css is a piece of... 
	1: ["130", "73"],
	2: ["69", "306"],
	3: ["123", "470"],
	4: ["205", "257"],
	5: ["326", "55"],
	6: ["337", "399"],
	7: ["305", "605"],
	8: ["565", "55"],
	9: ["516", "434"],
	10: ["441", "308"],
	11: ["670", "211"],
	12: ["686", "595"]
};

var selectedWorld = 9;
var currentWorld = 10;

function initMap(event) {
	var gameView = document.getElementById("gameView").style.display = "none";
	var mapView = document.getElementById("mapView").style.display = "block";
	
	if (currentMission) {
		if (currentMission.completed) {
			highscore += currentMission.reward;
			document.getElementById("highscore").innerHTML = highscore;
			currentWorld = currentMission.toWorld;
		}
	}
	
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
	
	createMissions();
	
	// Preselect first world of connections, because we're lazy
	selectWorld(false, connections[nr][0]);
	
	// Put red highlight on current world	
	var elementHl = document.getElementById("hlred");
	elementHl.style.top = hlPositions[nr][0];
	elementHl.style.left = hlPositions[nr][1];
	elementHl.style.display = "block";

	stopSound("game");
	playSound("menu");
}

function selectWorld(event, nr) {
	if (contains(connections[currentWorld], nr) && nr != currentWorld) {
		selectedWorld = nr;
	
		// Set classes for highlighting
		document.getElementById("toWorld").innerHTML = nameNumberMap[nr];
		for (var i = 0; i < connections[currentWorld].length; i++) {
			var element = document.getElementById("s" + connections[currentWorld][i]).className = "active";
		}
		var elementSelect = document.getElementById("s" + nr)
		elementSelect.className = "active selected";
		var elementHl = document.getElementById("hlblue");
		elementHl.style.top = hlPositions[nr][0];
		elementHl.style.left = hlPositions[nr][1];
		elementHl.style.display = "block";
		
		// Select mission
		currentMission = availableMissions[nr];
		document.getElementById("briefing").innerHTML = currentMission.briefing;
		document.getElementById("reward").innerHTML = currentMission.reward;
		document.getElementById("difficulty").innerHTML = currentMission.difficulty;
	}
}

function createMissions() {
	availableMissions = [];
	for (var i = 0; i < connections[currentWorld].length; i++) {
		var toWorld = connections[currentWorld][i];
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
	switch (Math.floor(Math.random() * 6)) {
		case 0:
			return "Please, brave freigther pilot, someone must save the people of " + worldName + "! They do not know of the words of our Prophet Yog-Sothoth and someone must deliver these books of holy text so their souls can be saved. Can you do this task?";
		case 1:
			return "Attention, maggot! Someone deemed you important enough to give you a mission and I'll be damned if you screw this up! So go out there and give me 100. 100%, that is!";
		case 2:
			return "Welcome dear Customer #3984482342. You have been randomly selected to improve our customer experience. We are experimenting with an exciting new mechanism of content delivery. If you want to participate in this experiment, just say nothing. If you don't want to, just press the ignore button. What's that, there's no such button? Haha, you fool fell for it!";
		case 3:
			return "This is an automated job posting. User 'sillykitten2103' is looking for a pilot with the following skills: Small Freight Transporter, Capital Freight Transporter, Discrete Taxi Vehicle and Advanced Lovemaking. Users interested in this job may contact the poster under the given address: sillykitten2103@trash-mail.com";
		case 4:
			return "This is an automated job posting. User 'leanandmean' is looking for a pilot to bring the cargo of 'Big American Challenge' to the world " + worldName + ". User interested in this job are not required to meet the poster.";
		case 5:
			return "This is an automated job posting. User 'skynet0xF2FFBA4' is looking for a pilot to bring the cargo of '10000 CPUs, 50000 RAM-Boards, 1000 Steel-Casing, 1 Chainsaw' to the world " + worldName + ". Users interested in this job are illadvised to contact the poster.";
		default:
			return "Uh, what? Oh, the mission? Sorry I can't be bothered right now. Just fly somewhere, I guess.";
	}
	return "This is a brief test, tehe";
}

function getReward(difficulty) {
	return Math.round(difficulty * 100 + ((Math.random() - 1) * 100));
}

function getDifficulty() {
	if (Math.random() < 0.01) {
		return 15; // This is totally not an easter egg, stop looking through the source!
	}
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