
function createOcean() {
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

    oceanSceneObject = createSceneObject(
        vertexPositionBuffer, vertexIndexBuffer, vertexNormalBuffer, vertexTextureCoordBuffer, "ocean.jpg", 5);

    oceanSceneObject["initSecondTexture"] = initSecondTexture;
    oceanSceneObject["draw"] = drawOcean;
    oceanSceneObject.initSecondTexture("ocean2.jpg");
}

function initSecondTexture(textureObjectSource2) {
    let textureObject2 = gl.createTexture();
    textureObject2.image = new Image();
    textureObject2.image.src = "images/" + textureObjectSource2;
    textureObject2.image.onload = function() {
        handleLoadedTexture(textureObject2)
    }
    
    this.textureObject2 = textureObject2;
}

function drawOcean() {
    let mvMatrix = mat4.multiply(camera.wvMatrix, this.mwMatrix);   
        
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, this.positionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, this.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);

    if (this.textureObject !== undefined) {
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, this.textureBuffer.itemSize, gl.FLOAT, false, 0, 0);
    
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.textureObject);
        gl.uniform1i(shaderProgram.samplerUniform, 0);
        gl.uniform1i(shaderProgram.hasTexture, true);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.textureObject2);
        gl.uniform1i(shaderProgram.samplerUniform2, 1);
        gl.uniform1i(shaderProgram.hasTexture2, true);
    }
    else {
        gl.disableVertexAttribArray(shaderProgram.textureCoordAttribute);
        gl.uniform1i(shaderProgram.hasTexture, false);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    setMatrixUniforms(mvMatrix);
    gl.uniform1f(shaderProgram.materialShininess, this.materialShininess);

    gl.drawElements(gl.TRIANGLES, this.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

function changeOceanTextures() {
    let oceanTexBox = document.getElementById("oceanTexBox").checked;

    if (oceanTexBox) {
        oceanSceneObject.initSecondTexture("ocean2.jpg");
    }
    else {
        oceanSceneObject.initSecondTexture("ocean4.jpg");
    }
}