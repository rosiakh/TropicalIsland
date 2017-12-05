var vertexShaderString = `

precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
uniform mat4 uWVMatrix;

//uniform bool isBillboard;

varying vec3 vTransformedNormal;
varying vec4 vPosition;
varying mat4 vMVMatrix;
varying vec2 vTextureCoord;

void main(void) {
    vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * vPosition;
    vTransformedNormal = uNMatrix * aVertexNormal;
    vMVMatrix = uMVMatrix;
    vTextureCoord = aTextureCoord;

    //vec4 toOriginVector
}
`;