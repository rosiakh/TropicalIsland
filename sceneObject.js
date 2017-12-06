
function SceneObject(positionBuffer, indexBuffer, normalBuffer, textureBuffer, textureObjectSource, materialShininess = 100) {	
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
	this.textureBuffer = textureBuffer;

	this.textureObjectSource = textureObjectSource;
	this.textureObject;

	this.materialShininess = materialShininess;

	this.translationVector = [0, 0, 0];
	this.scalingVector = [1, 1, 1];
	this.rotationAngleX = 0; // in degrees
	this.rotationAngleY = 0; // in degrees
	this.rotationAngleZ = 0; // in degrees

	this.isBillboard = false;

	this.moveBy = function(transVector) {
		this.translationVector = this.translationVector.map((item, index) => item += this.transVector[index]);
	}

	this.moveTo = function(posVector) {
		this.translationVector = posVector;
	}

	this.draw = function() {
		let mvMatrix = mat4.multiply(camera.wvMatrix, this.mwMatrix);
		if(this.isBillboard) {
			// find vector to origin
			//let vectorFromOrigin = mat4.multiplyVec3(mvMatrix, [0.0, 0.0, 0.0]);
			//let vectorToOrigin = vectorFromOrigin.map(x => -x);

			let rotBillboardMatrix = mat4.create();
			mat4.identity(rotBillboardMatrix);	
			
			// initial rotation angle for billboard is implicitly 0
			mat4.rotate(rotBillboardMatrix, degToRad(camera.yaw), [0, 1, 0]);
			//mat4.translate(rotBillboardMatrix, vectorToOrigin);
			//mat4.translate(rotBillboardMatrix, vectorFromOrigin);
			mvMatrix = mat4.multiply(mvMatrix, rotBillboardMatrix);
		}

		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    	gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	gl.uniform1i(shaderProgram.hasTexture2, false);
    	if (this.textureObject !== undefined) {
    		gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    		gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
    		gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	    	gl.activeTexture(gl.TEXTURE0);
	    	gl.bindTexture(gl.TEXTURE_2D, this.textureObject);
    		gl.uniform1i(shaderProgram.samplerUniform, 0);
    		gl.uniform1i(shaderProgram.hasTexture, true);
    	}
    	else {
    		gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
    		gl.uniform1i(shaderProgram.hasTexture, false);
    	}

    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    	setMatrixUniforms(mvMatrix);
    	gl.uniform1f(shaderProgram.materialShininess, this.materialShininess);

    	gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
	}

	this.initTexture = function() {
		let textureObject = gl.createTexture();
		textureObject.image = new Image();
		textureObject.image.src = "images/" + textureObjectSource;
		textureObject.image.onload = function() {
			handleLoadedTexture(textureObject)
		}
	
		this.textureObject = textureObject;
	}
}

function createSceneObject(positionBuffer, indexBuffer, normalBuffer, textureBuffer, textureObjectSource, materialShininess = 100) {
	let sceneObject = new SceneObject(positionBuffer, indexBuffer, normalBuffer, textureBuffer, textureObjectSource, materialShininess);
	if (textureObjectSource !== undefined) {
		sceneObject.initTexture();
	}

	return sceneObject;
}