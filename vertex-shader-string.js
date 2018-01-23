var vertexShaderString = `

precision mediump float;

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat3 uNMatrix;
uniform mat4 uWVMatrix;

uniform bool uUseFisheye;

varying vec3 vTransformedNormal;
varying vec4 vPosition;
varying mat4 vMVMatrix;
varying vec2 vTextureCoord;

void main(void) {
    vPosition = uMVMatrix * vec4(aVertexPosition, 1.0);

    if(uUseFisheye){	
    	vec3 viewDirection = vec3(0.0, 0.0, -1.0);
		float farZ = 100.0;
    	float vLen = length(vPosition.xyz);
    	float a = 1.0;
    	float r = length(cross(vPosition.xyz, viewDirection));
    	float angle = acos(dot(vPosition.xyz, viewDirection)/(length(vPosition.xyz) * length(viewDirection)));

    	gl_Position.x = (vPosition.x * a * sin(angle/2.0))/r;
    	gl_Position.y = (vPosition.y * a * sin(angle/2.0))/r;
    	gl_Position.z = abs(vLen/farZ);
    	gl_Position.w = 1.0;
    } else{
    	gl_Position = uPMatrix * vPosition;
    }

    vTransformedNormal = uNMatrix * aVertexNormal;
    vMVMatrix = uMVMatrix;
    vTextureCoord = aTextureCoord;
}
`;