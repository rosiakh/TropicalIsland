
function setMatrixUniforms(mvMatrix) {
	let normalMatrix = mat3.create();

	mat4.toInverseMat3(mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);

    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);   
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
    gl.uniformMatrix4fv(shaderProgram.wvMatrixUniform, false, camera.wvMatrix);
}

function setLightUniforms() {	
	gl.uniform3fv(shaderProgram.directionalLight_Color, directionalLight_Color);
	gl.uniform3fv(shaderProgram.directionalLight_AmbientIntensity, directionalLight_AmbientIntensity);
	gl.uniform3fv(shaderProgram.directionalLight_DiffuseIntensity, directionalLight_DiffuseIntensity);
	gl.uniform3fv(shaderProgram.directionalLight_Direction, directionalLight_Direction);

	gl.uniform3fv(shaderProgram.pointLight_Color, pointLight_Color);
	gl.uniform3fv(shaderProgram.pointLight_Position, pointLight_Position);

	gl.uniform1i(shaderProgram.useFog, useFog);
	gl.uniform3fv(shaderProgram.fogColor, fog.color);
	gl.uniform2fv(shaderProgram.fogDistance, fog.distance);
	gl.uniform1f(shaderProgram.fogDensity, fog.density);
}

function drawScene() {
	gl.useProgram(shaderProgram);

    setLightUniforms();

	if (!objectsLoaded) {
	        return;
	}

	// draw to texture

	let x = camera.xPos;
	let y = camera.yPos;
	let z = camera.zPos;
	let pitch = camera.pitch;
	let yaw = camera.yaw;

	camera.xPos = -3;
	camera.yPos = 1.5;
	camera.zPos = -1;
	camera.pitch = 0;
	camera.yaw = -110;

	mat4.perspective(45, targetTextureWidth / targetTextureHeight, 0.1, 100.0, pMatrix);

	gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
	gl.bindTexture(gl.TEXTURE_2D, targetTexture);
	gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);
	gl.clearColor(0, 0, 1, 1);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	drawSceneObjectsToTexture();

	camera.xPos = x;
	camera.yPos = y;
	camera.zPos = z;
	camera.pitch = pitch;
	camera.yaw = yaw;

	// draw to canvas

	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clearColor(0, 0, 1, 1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    drawSceneObjects();
}

function drawSceneObjects() {
	sceneObjects["bottom"].draw();

	for (sceneObject in sceneObjects) {
		if (sceneObject !== "bottom") {
			sceneObjects[sceneObject].draw();
		}	
	}

	gl.enable(gl.BLEND);
 	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

 	oceanSceneObject.draw();

 	particles.sort(particleSort);
 	for (particle of particles) {
 		particle.draw();
 	}

	gl.disable(gl.BLEND);
}

function drawSceneObjectsToTexture() {
	sceneObjects["bottom"].draw();

	gl.enable(gl.BLEND);
 	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

 	oceanSceneObject.draw();

 	gl.disable(gl.BLEND);

	for (sceneObject in sceneObjects) {
		if (sceneObject !== "bottom") {
			sceneObjects[sceneObject].draw();
		}	
	}

 	gl.enable(gl.BLEND);
 	gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

 	particles.sort(particleSort);
 	for (particle of particles) {
 		particle.draw();
 	}

	gl.disable(gl.BLEND);
}