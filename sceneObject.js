
function SceneObject(positionBuffer, indexBuffer, normalBuffer) {	
	Object.defineProperty(this, 'mwMatrix', {
		get: function() {
			let mwMatrix = mat4.create();

			mat4.identity(mwMatrix);
			mat4.translate(mwMatrix, this.translationVector);
	    	mat4.scale(mwMatrix, this.scalingVector);
	    	mat4.rotate(mwMatrix, degToRad(this.rotationAngleX), [1, 0, 0]);
	    	mat4.rotate(mwMatrix, degToRad(this.rotationAngleY), [0, 1, 0]);
	    	mat4.rotate(mwMatrix, degToRad(this.rotationAngleZ), [0, 0, 1]);

		    return mwMatrix;
		}
	});

	this.positionBuffer = positionBuffer;
	this.indexBuffer = indexBuffer;
	this.normalBuffer = normalBuffer;

	this.translationVector = [0, 0, 0];
	this.scalingVector = [1, 1, 1];
	this.rotationAngleX = 0; // in degrees
	this.rotationAngleY = 0; // in degrees
	this.rotationAngleZ = 0; // in degrees

	this.draw = function() {
		// compute mvMatrix
		mvMatrix = mat4.multiply(camera.wvMatrix, this.mwMatrix);

		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    	setMatrixUniforms(mvMatrix);

    	gl.drawElements(gl.TRIANGLES, indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}
}