
function handleKeyDown(event) {
    currentlyPressedKeys[event.keyCode] = true;
}

function handleKeyUp(event) {
    currentlyPressedKeys[event.keyCode] = false;
}

function handleKeys() {
    if (currentlyPressedKeys[38]) {
        // Up cursor key
        camera.pitchRate = 0.1;
    } else if (currentlyPressedKeys[40]) {
        // Down cursor key
        camera.pitchRate = -0.1;
    } else {
        camera.pitchRate = 0;
    }

    if (currentlyPressedKeys[37]) {
        // Left cursor key
        camera.yawRate = 0.1;
    } else if (currentlyPressedKeys[39]) {
        // Right cursor key 
        camera.yawRate = -0.1;
    } else {
        camera.yawRate = 0;
    }

    // moving ahead & back
    if (currentlyPressedKeys[87]) {
        // W
        camera.zSpeed = 0.003;
    } else if (currentlyPressedKeys[83]) {
        // S
        camera.zSpeed = -0.003;
    } else {
        camera.zSpeed = 0;
    }

    // moving left & right
    if (currentlyPressedKeys[65]) {
        // A
        camera.xSpeed = 0.003;
    } else if (currentlyPressedKeys[68]) {
        // D
        camera.xSpeed = -0.003;
    } else {
        camera.xSpeed = 0;
    }

    // moving up & down
    if (currentlyPressedKeys[90]) {
        // Q
        camera.ySpeed = 0.003;
    } else if (currentlyPressedKeys[81]) {
        // Z
        camera.ySpeed = -0.003;
    } else {
        camera.ySpeed = 0;
    }
}

function fogBoxClicked() {
    useFog = document.getElementById("fogBox").checked;      
}

function fogDistanceButtonClicked() {
    if (fog.distance[0] < 10) {
        fog.distance = [20, 60];
    } 
    else {
        fog.distance = [5, 15];
    }
}

function fogDensityButtonClicked() {
    if (fog.density < 0.2) {
        fog.density = 0.3;
    }
    else {
        fog.density = 0.1;
    }
}

function changeAntialiasing() {
    antialiasing = document.getElementById("antialiasingBox").checked; 
    webGLStart();
}