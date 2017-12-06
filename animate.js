
function animateLight(timeNow) {
	//pointLight_Position = [0.0, 1.0, 10 * Math.cos(timeNow/1200)];
	directionalLight_Direction = [10 * Math.cos(timeNow/5000), 10 * Math.sin(timeNow/5000), -1.0];
}

function animateParticles(elapsed) {
    for (particle of particles) {
        particle.moveBy(particle.speedVector.map(x => x) * elapsed, elapsed);
        particle.animateTexture();
    }
}

function animateBottomTexture(elapsed) {
    let oldTextureCoords = sceneObjects['bottom'].textureCoords;
    let newTextureCoords = [
        oldTextureCoords[0] + textureXSpeed * elapsed, 0.0,
        oldTextureCoords[2] + textureXSpeed * elapsed, 1.0,
        oldTextureCoords[4] + textureXSpeed * elapsed, 0.0,
        oldTextureCoords[6] + textureXSpeed * elapsed, 1.0];

    let vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newTextureCoords), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    vertexTextureCoordBuffer.itemSize = 2;
    vertexTextureCoordBuffer.numItems = newTextureCoords.length / 2;

    sceneObjects['bottom'].textureBuffer = vertexTextureCoordBuffer;
    sceneObjects['bottom'].textureCoords = newTextureCoords;
}

function animate() {
    let timeNow = new Date().getTime();

    if (lastTime != 0) {
        let elapsed = timeNow - lastTime;

        if (camera.xSpeed != 0) {
            camera.xPos -= Math.cos(degToRad(camera.yaw)) * camera.xSpeed * elapsed;
            camera.zPos += Math.sin(degToRad(camera.yaw)) * camera.xSpeed * elapsed;
        }
        if (camera.ySpeed != 0) {
            camera.xPos -= Math.sin(degToRad(camera.yaw)) * Math.sin(degToRad(camera.pitch)) * camera.ySpeed * elapsed;
            camera.yPos -= Math.cos(degToRad(camera.pitch)) * camera.ySpeed * elapsed; 
            camera.zPos -= Math.sin(degToRad(camera.pitch)) * Math.cos(degToRad(camera.yaw)) * camera.ySpeed * elapsed;
        }
        if (camera.zSpeed != 0) {
            camera.xPos -= Math.sin(degToRad(camera.yaw)) * camera.zSpeed * elapsed;
            camera.yPos += Math.sin(degToRad(camera.pitch)) * camera.zSpeed * elapsed;
            camera.zPos -= Math.cos(degToRad(camera.yaw)) * Math.cos(degToRad(camera.pitch)) * camera.zSpeed * elapsed;      
        }

        camera.yaw += camera.yawRate * elapsed;
        camera.pitch += camera.pitchRate * elapsed;

        animateParticles(elapsed);
        animateBottomTexture(elapsed);
    }
    
    lastTime = timeNow;
    animateLight(timeNow);
}

function tick() {
    requestAnimFrame(tick);
    handleKeys();
    drawScene();
    animate();
}