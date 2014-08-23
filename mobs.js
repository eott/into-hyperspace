function drawMobs() {
	if (Math.random() < 0.05) {
		mobs[mobs.length] = [Math.random() * 2 - 1, Math.random() * 2 - 1, posZ + 1000];
	}
	
	ctx.fillStyle = "#22FFFF";
	for (var i = 0; i < mobs.length; i++) {
		if (mobs[i]) {
			var factor = (1 - (mobs[i][2] - posZ) / 1000);
			var mobX = startX + mobs[i][0] * 840 * factor;
			var mobY = startY + mobs[i][1] * 840 * factor;
			var mobR = 100 * factor;
			if (factor > 0.98) {
				if (Math.sqrt((mobX - posX - startX) * (mobX - posX - startX) + (mobY - posY - startY) * (mobY - posY - startY)) <= mobR) {
					hp -= 5;
				}
				mobs[i] = false;
			} else {
				circle(mobX, mobY, mobR, "", 1, true);
			}
		}
	}
}