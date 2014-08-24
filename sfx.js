var nameAudioMap = {};

function loadSounds() {
	nameAudioMap["menu"] = new Audio("menu.mp3");
}

function playSound(name) {
	if (nameAudioMap[name]) {
		nameAudioMap[name].play();
	}
}