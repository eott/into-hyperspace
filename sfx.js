var nameAudioMap = {};
initState = true; // Stupid, but fixes a bug where you cannot call functions on an Audio object that has not been played yet

function loadSounds() {
	nameAudioMap["menu"] = new Audio("menu.mp3");
	nameAudioMap["game"] = new Audio("game.mp3");
	nameAudioMap["hit"] = new Audio("hit.mp3");
}

function playSound(name) {
	if (nameAudioMap[name]) {
		nameAudioMap[name].play();
		initState = false;
	}
}

function stopSound(name) {
	if (nameAudioMap[name] && !initState) {
		nameAudioMap[name].pause();
		nameAudioMap[name].currentTime = 0;
	}
}