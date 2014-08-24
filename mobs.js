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
			"type" : "asteroid"
		};
	} else if(rand < 0.14) {
		randX = randWeighted(posX / (colRad +  200));
		randY = randWeighted(posY / (colRad +  200));
		mobs[mobs.length] = {
			"x": randX, 
			"y": randY, 
			"z": posZ + 1000,
			"radius": 25,
			"dradius": 50,
			"damage" : 5,
			"type" : "plasma"
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
				if (mobs[i]["type"] == "asteroid") {
					ctx.fillStyle = "#22FFFF";
				} else {
					ctx.fillStyle = "#FF0000";
				}
				circle(mobX, mobY, mobR, "", 1, true);
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

function randWeighted(mean) {
	return mean + (Math.random() - 1) * 0.03;
}