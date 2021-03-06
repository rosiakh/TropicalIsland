
function getShaderFromString(gl, shaderString, type) {
    let shader;
    
    if (type == "fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (type == "vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, shaderString);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    
    return shader;
}    

function createProgram() {
    let vertexShader = getShaderFromString(gl, vertexShaderString, "vertex");
    let fragmentShader = getShaderFromString(gl, fragmentShaderString, "fragment");
    let program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    // enable vertex attributes
    program.vertexPositionAttribute = gl.getAttribLocation(program, "aVertexPosition");
    gl.enableVertexAttribArray(program.vertexPositionAttribute);

    program.vertexNormalAttribute = gl.getAttribLocation(program, "aVertexNormal");
    gl.enableVertexAttribArray(program.vertexNormalAttribute);

    program.textureCoordAttribute = gl.getAttribLocation(program, "aTextureCoord");
    //aTextureCoord enabled and disabled in sceneObject.draw()
    
    program.pMatrixUniform = gl.getUniformLocation(program, "uPMatrix");
    program.mvMatrixUniform = gl.getUniformLocation(program, "uMVMatrix");
    program.nMatrixUniform = gl.getUniformLocation(program, "uNMatrix");
    program.wvMatrixUniform = gl.getUniformLocation(program, "uWVMatrix");

    program.directionalLight_Color = gl.getUniformLocation(program, "uDirectionalLight_Color");
    program.directionalLight_AmbientIntensity = gl.getUniformLocation(program, "uDirectionalLight_AmbientIntensity");
    program.directionalLight_DiffuseIntensity = gl.getUniformLocation(program, "uDirectionalLight_DiffuseIntensity");
    program.directionalLight_Direction = gl.getUniformLocation(program, "uDirectionalLight_Direction");

    program.pointLight_Color = gl.getUniformLocation(program, "uPointLight_Color");
    program.pointLight_Position = gl.getUniformLocation(program, "uPointLight_Position");

    program.samplerUniform = gl.getUniformLocation(program, "uSampler");
    program.samplerUniform2 = gl.getUniformLocation(program, "uSampler2");
    program.hasTexture = gl.getUniformLocation(program, "uHasTexture");
    program.hasTexture2 = gl.getUniformLocation(program, "uHasTexture2");

    program.materialShininess = gl.getUniformLocation(program, "uMaterialShininess");

    program.useFog = gl.getUniformLocation(program, "uUseFog");
    program.fogColor = gl.getUniformLocation(program, "uFogColor");
    program.fogDistance = gl.getUniformLocation(program, "uFogDistance");
    program.fogDensity = gl.getUniformLocation(program, "uFogDensity");

    program.useFisheye = gl.getUniformLocation(program, "uUseFisheye");

    return program;
}

function initShaders() {
    shaderProgram = createProgram();
}