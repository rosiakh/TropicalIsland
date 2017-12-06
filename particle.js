
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
    	} = new Billboard();

    	let billboard = createSceneObject(
        	vertexPositionBuffer, vertexIndexBuffer, vertexNormalBuffer, vertexTextureCoordBuffer, "fire.jpg", materialShininess);

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
	0.01 + (Math.random() - 0.5) * 0.01,
	0.0 + (Math.random() - 0.5) * 0.005];
}

function randomLifeSpan() {
	return 3000 + (Math.random() - 0.5) * 3000;
}