
function createIsland() {
    let latitudeBands = 100;
    let longitudeBands = 100;
    let radius = 1;

    let vertexPositionData = [];
    let normalData = [];
    let indexData = [];
    let textureCoords = [];

    for (let latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        let theta = latNumber * Math.PI / latitudeBands;
        let sinTheta = Math.sin(theta);
        let cosTheta = Math.cos(theta);

        for (let longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            let phi = longNumber * 2 * Math.PI / longitudeBands;
            let sinPhi = Math.sin(phi);
            let cosPhi = Math.cos(phi);
            let x = cosPhi * sinTheta;
            let y = cosTheta;
            let z = sinPhi * sinTheta;
            
            normalData.push(x);
            normalData.push(y);
            normalData.push(z);

            vertexPositionData.push(radius * x);
            vertexPositionData.push(radius * y);
            vertexPositionData.push(radius * z);

            textureCoords.push(1 - (longNumber / longitudeBands));
            textureCoords.push(1 - (latNumber / longitudeBands));
        }
    }

    for (let latNumber = 0; latNumber < latitudeBands/2; latNumber++) {
        for (let longNumber = 0; longNumber < longitudeBands; longNumber++) {
            let first = (latNumber * (longitudeBands + 1)) + longNumber;
            let second = first + longitudeBands + 1;

            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);
            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
        }
    }

    let vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    vertexNormalBuffer.itemSize = 3;
    vertexNormalBuffer.numItems = normalData.length / 3;

    let vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = vertexPositionData.length / 3;

    let vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
    vertexIndexBuffer.itemSize = 1;
    vertexIndexBuffer.numItems = indexData.length;

    let vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    vertexTextureCoordBuffer.itemSize = 2;
    vertexTextureCoordBuffer.numItems = textureCoords.length / 2;

    sceneObjects['island'] = createSceneObject(
        vertexPositionBuffer, vertexIndexBuffer, vertexNormalBuffer, vertexTextureCoordBuffer, "sand.jpg", 5);
}

function createBottom() {
    vertexPositionData = [
        -1.0, 0.0, 0.0,
        -1.0, 2.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 2.0, 0.0];

    indexData = [0, 1, 2, 2, 1, 3];

    normalData = [
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0];

    textureCoords = [
        0.0, 0.0,
        0.0, 10.0,
        10.0, 0.0,
        10.0, 10.0];

    let vertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    vertexNormalBuffer.itemSize = 3;
    vertexNormalBuffer.numItems = normalData.length / 3;

    let vertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    vertexPositionBuffer.itemSize = 3;
    vertexPositionBuffer.numItems = vertexPositionData.length / 3;

    let vertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
    vertexIndexBuffer.itemSize = 1;
    vertexIndexBuffer.numItems = indexData.length;

    let vertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    vertexTextureCoordBuffer.itemSize = 2;
    vertexTextureCoordBuffer.numItems = textureCoords.length / 2;

    sceneObjects['bottom'] = createSceneObject(
        vertexPositionBuffer, vertexIndexBuffer, vertexNormalBuffer, vertexTextureCoordBuffer, "sand.jpg", 5);
    sceneObjects['bottom'].textureCoords = textureCoords;
}