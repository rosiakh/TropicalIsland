
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

    let islandVertexNormalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, islandVertexNormalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
    islandVertexNormalBuffer.itemSize = 3;
    islandVertexNormalBuffer.numItems = normalData.length / 3;

    let islandVertexPositionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, islandVertexPositionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
    islandVertexPositionBuffer.itemSize = 3;
    islandVertexPositionBuffer.numItems = vertexPositionData.length / 3;

    let islandVertexIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, islandVertexIndexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
    islandVertexIndexBuffer.itemSize = 1;
    islandVertexIndexBuffer.numItems = indexData.length;

    let islandVertexTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, islandVertexTextureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
    islandVertexTextureCoordBuffer.itemSize = 2;
    islandVertexTextureCoordBuffer.numItems = textureCoords.length / 2;

    return {
        vertexPositionBuffer: islandVertexPositionBuffer,
        vertexIndexBuffer: islandVertexIndexBuffer,
        vertexNormalBuffer: islandVertexNormalBuffer,
        vertexTextureCoordBuffer: islandVertexTextureCoordBuffer,
        textureObjectSource: "sand.jpg",
        materialShininess: 0.5
    }
}