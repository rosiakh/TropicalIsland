
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
    }
    
    lastTime = timeNow;
}

function tick() {
    requestAnimFrame(tick);
    handleKeys();
    drawScene();
    animate();
}