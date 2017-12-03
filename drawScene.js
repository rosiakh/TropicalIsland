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
}

function drawScene() {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    gl.useProgram(shaderProgram);

    setLightUniforms();
    
	if (!objectsLoaded) {
	        return;
	}

	for (sceneObject in sceneObjects) {
		sceneObjects[sceneObject].draw();
	}
}