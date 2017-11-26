
function setMatrixUniforms(mvMatrix) {
	let normalMatrix = mat3.create();

	mat4.toInverseMat3(mvMatrix, normalMatrix);
    mat3.transpose(normalMatrix);

    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);   
    gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);
}

function createLighting() {
	var ambientColor = [0.2, 0.2, 0.2];
    gl.uniform3fv(shaderProgram.ambientColorUniform, ambientColor);

    var pointLightPosition = [0, 1, 0];
    gl.uniform3fv(shaderProgram.pointLightingLocationUniform, pointLightPosition);

    var pointLightColor = [0.4, 0.7, 0.1];
    gl.uniform3fv(shaderProgram.pointLightingColorUniform, pointLightColor);

    var directionalLightDirection = [1, 0, 0];
    var adjustedLD = vec3.create();
    vec3.normalize(directionalLightDirection, adjustedLD);
    vec3.scale(adjustedLD, -1);
    gl.uniform3fv(shaderProgram.directionalLightDirectionUniform, adjustedLD);

    var directionalLightDiffuseColor = [0.3, 0.1, 0.1];
    gl.uniform3fv(shaderProgram.directionalLightDiffuseColorUniform, directionalLightDiffuseColor);
}

function drawScene() {
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    gl.useProgram(shaderProgram);

    createLighting();
    
	if (!objectsLoaded) {
	        return;
	}

	for (sceneObject in sceneObjects) {
		sceneObjects[sceneObject].draw();
	}
}