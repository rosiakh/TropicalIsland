
function Billboard() {
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
        0.0, 1.0,
        1.0, 0.0,
        1.0, 1.0];

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

    return {
        vertexPositionBuffer: vertexPositionBuffer,
        vertexIndexBuffer: vertexIndexBuffer,
        vertexNormalBuffer: vertexNormalBuffer,
        vertexTextureCoordBuffer: vertexTextureCoordBuffer,
        textureObjectSource: "crate.gif",
        materialShininess: 5
    }
}

function loadBillboards() {
    let {
        vertexPositionBuffer,
        vertexIndexBuffer,
        vertexNormalBuffer,
        vertexTextureCoordBuffer,
        textureObjectSource,
        materialShininess
    } = new Billboard();

    billboard1 = createSceneObject(
        vertexPositionBuffer, vertexIndexBuffer, vertexNormalBuffer, vertexTextureCoordBuffer, textureObjectSource, materialShininess);

    billboard1.translationVector = [1.0, 0.3, -1.0];
    billboard1.scalingVector = [1.0, 1.0, 1.0];
}