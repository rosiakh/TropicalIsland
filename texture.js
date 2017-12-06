
function handleLoadedTexture(textureObject) {
	gl.bindTexture(gl.TEXTURE_2D, textureObject);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureObject.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

function updateTextures() {
	let texBox1 = document.getElementById("texBox1").checked;
	let texBox2 = document.getElementById("texBox2").checked;
	let texBox3 = document.getElementById("texBox3").checked;

	for (sceneObject in sceneObjects) {
		let textureObject = sceneObjects[sceneObject].textureObject;

		if (texBox1) {
			gl.bindTexture(gl.TEXTURE_2D, textureObject);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
		else {
			gl.bindTexture(gl.TEXTURE_2D, textureObject);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		if (texBox2) {
			gl.bindTexture(gl.TEXTURE_2D, textureObject);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
		else {
			gl.bindTexture(gl.TEXTURE_2D, textureObject);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}

		if (texBox3) {
			gl.bindTexture(gl.TEXTURE_2D, textureObject);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_LOD, 1000);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_LOD, -1000);
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
		else {
			gl.bindTexture(gl.TEXTURE_2D, textureObject);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAX_LOD, 2);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_LOD, -2);
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}

	// don't change particles' textures
}

function changeTextureSpeed() {
	let speed = document.getElementById("textureSpeedRange").value;
	textureXSpeed = speed * 0.001;
}