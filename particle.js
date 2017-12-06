
function Particle() {
	this.startingLocation;
	this.currentLocation;
	this.speedVector;
	this.lifespan;
	this.timeToLive;
	this.billboard;

	this.moveBy = function(translationVector, elapsed) {
		this.timeToLive -= elapsed;

		if (this.timeToLive < 0) {
			this.timeToLive = this.lifespan;
			this.currentLocation = this.startingLocation;
		} 
		else {
			this.currentLocation = this.currentLocation.map((item, index) => item += this.speedVector[index]);
		}

		this.billboard.moveTo(this.currentLocation);
	}

	this.draw = function() {
		this.billboard.draw();
	}
}

function loadParticles() {
	for (let i = 0; i < numberOfParticles; ++i) {

		let particle = new Particle();
		particle.startingLocation = randomStartingLocation();
		particle.currentLocation = particle.startingLocation;
		particle.speedVector = randomSpeedVector();
		particle.lifespan = randomLifeSpan();
		particle.timeToLive = particle.lifespan;

		let {
        	vertexPositionBuffer,
        	vertexIndexBuffer,
        	vertexNormalBuffer,
        	vertexTextureCoordBuffer,
        	textureObjectSource,
        	materialShininess
    	} = new ParticleBillboard();

    	let billboard = createSceneObject(
        	vertexPositionBuffer, vertexIndexBuffer, vertexNormalBuffer, vertexTextureCoordBuffer, textureObjectSource, materialShininess);

    	billboard.translationVector = particle.startingLocation;
    	billboard.scalingVector = [0.01, 0.01, 0.01];
    	billboard.isBillboard = true;

    	particle.billboard = billboard;

    	particles.push(particle);
	}
}

function randomStartingLocation() {
	return [
	1.0 + (Math.random() - 0.5) * 0.1,
	0.3 + (Math.random() - 0.5) * 0.1,
	-1.0 + (Math.random() - 0.5) * 0.1];
}

function randomSpeedVector() {
	return [
	0.0 + (Math.random() - 0.5) * 0.005,
	0.005 + (Math.random() - 0.5) * 0.001,
	0.0 + (Math.random() - 0.5) * 0.005];
}

function randomLifeSpan() {
	return 3000 + (Math.random() - 0.5) * 3000;
}

function particleSort(particle1, particle2) {
	let mvMatrix1 = mat4.multiply(camera.wvMatrix, particle1.billboard.mwMatrix);
	let vectorFromOrigin1 = mat4.multiplyVec3(mvMatrix1, [0.0, 0.0, 0.0]);
	let distance1 = vec3.length(vectorFromOrigin1);

	let mvMatrix2 = mat4.multiply(camera.wvMatrix, particle2.billboard.mwMatrix);
	let vectorFromOrigin2 = mat4.multiplyVec3(mvMatrix2, [0.0, 0.0, 0.0]);
	let distance2 = vec3.length(vectorFromOrigin2);

	return distance2 - distance1;
}