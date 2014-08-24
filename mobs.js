imagesByName = {
	"asteroid1" : loadImage("asteroid1"),
	"asteroid2" : loadImage("asteroid2"),
	"asteroid3" : loadImage("asteroid3"),
	"asteroid4" : loadImage("asteroid4"),
	"asteroid5" : loadImage("asteroid5"),
	"plasma" : loadImage("plasma")
};

function drawMobs() {
	var rand = Math.random()
	if (rand < 0.04) {
		mobs[mobs.length] = {
			"x": Math.random() * 2 - 1, 
			"y": Math.random() * 2 - 1,
			"z": posZ + 1000,
			"radius": 100,
			"dradius" : 100,
			"damage" : 10,
			"type" : "asteroid",
			"image" : getRandomImage("asteroid")
		};
	} else if(rand < 0.26) {
		randX = randWeighted(posX / (colRad +  200));
		randY = randWeighted(posY / (colRad +  200));
		mobs[mobs.length] = {
			"x": randX, 
			"y": randY, 
			"z": posZ + 1000,
			"radius": 25,
			"dradius": 50,
			"damage" : 5,
			"type" : "plasma",
			"image" : "plasma"
		};
	}
	
	for (var i = 0; i < mobs.length; i++) {
		if (mobs[i]) {
			var factor = (1 - (mobs[i]["z"] - posZ) / 1000);
			var mobX = startX + mobs[i]["x"] * (colRad + 200) * factor;
			var mobY = startY + mobs[i]["y"] * (colRad + 200) * factor;
			var mobR = mobs[i]["radius"] * factor;
			if (factor > 0.98) {
				if (Math.sqrt((mobX - posX - startX) * (mobX - posX - startX) + (mobY - posY - startY) * (mobY - posY - startY)) <= mobs[i]["dradius"]) {
					hp -= mobs[i]["damage"];
				}
				mobs[i] = false;
			} else {
				var img = imagesByName[mobs[i]["image"]];
				ctx.drawImage(img, mobX, mobY, img.width * factor, img.height * factor);
			}
		}
	}
	
	if (fc % 200) { // Every 200 frames, clean up the enemy list for faster iteration
		newList = [];
		for (var i = 0; i < mobs.length; i++) {
			if (mobs[i]) {
				newList[newList.length] = mobs[i];
			}
		}
		mobs = newList;
	}
}

function resetMobs() {
	mobs = [];
}

function getRandomImage(type) {
	return "asteroid" + (Math.round(Math.random() * 4) + 1);
}

function randWeighted(mean) {
	return mean + (Math.random() - 1) * 0.03;
}