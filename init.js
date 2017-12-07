
function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl", {antialias: antialiasing});
        //gl = canvas.getContext("webgl2", {antialias: antialiasing});
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    }
    
    if (!gl) {
        alert("Could not initialise WebGL.");
    }
}

function webGLStart() {
    start();
}

function start() {
    canvas = document.getElementById("canvas_1");

    initGL(canvas);
    initShaders();
    initCamera();
    initLights();
    initRenderTexture();
    loadObjects(); 

    gl.clearColor(0.0, 0.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    tick();
}