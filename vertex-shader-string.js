var vertexShaderString = `

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;

varying vec3 vTransformedNormal;
varying vec4 vPosition;
varying mat4 vMVMatrix;


void main(void) {
    vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);
    gl_Position = uPMatrix * vPosition;
    vTransformedNormal = uNMatrix * aVertexNormal;
    vMVMatrix = uMVMatrix;
}
`;