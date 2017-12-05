
function Camera() {
	Object.defineProperty(this, 'wvMatrix', {
		get: function() {
			let wvMatrix = mat4.create();

			mat4.identity(wvMatrix);
			mat4.rotate(wvMatrix, degToRad(-this.pitch), [1, 0, 0]);
		    mat4.rotate(wvMatrix, degToRad(-this.yaw), [0, 1, 0]);	    
		    mat4.translate(wvMatrix, [-this.xPos, -this.yPos, -this.zPos]);

		    return wvMatrix;
		}
	});

	Object.defineProperty(this, 'wvMatrix_billboard', {
		get: function() {
			let wvMatrix = mat4.create();

			mat4.identity(wvMatrix);
			mat4.rotate(wvMatrix, degToRad(-this.pitch), [1, 0, 0]);
		    mat4.rotate(wvMatrix, degToRad(-this.yaw), [0, 1, 0]);	    
		    mat4.translate(wvMatrix, [-this.xPos, -this.yPos, -this.zPos]);

		    return wvMatrix;
		}
	});

	this.xPos = 0;
	this.yPos = 0;
	this.zPos = 0;

	this.pitch = 0;
	this.yaw = 0;

	this.xSpeed = 0;
	this.ySpeed = 0;
	this.zSpeed = 0;

	this.pitchRate = 0;
	this.yawRate = 0;
}

function initCamera() {
	camera = new Camera();
	camera.yPos = 5;
	camera.zPos = 8;
	camera['pitch'] = -30;
	camera['yaw'] = -5;
}