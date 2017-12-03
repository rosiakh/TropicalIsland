var fragmentShaderString = `

precision mediump float;

uniform mat4 uWVMatrix;

uniform vec3 uDirectionalLight_Color;
uniform vec3 uDirectionalLight_AmbientIntensity;
uniform vec3 uDirectionalLight_DiffuseIntensity;
uniform vec3 uDirectionalLight_Direction;

uniform vec3 uPointLight_Color;
uniform vec3 uPointLight_Position;

varying vec3 vTransformedNormal;
varying vec4 vPosition;
varying mat4 vMVMatrix;

void main(void) {
    vec4 surfaceColor = vec4(1.0, 0.8, 0.3, 1.0);

    vec4 transformedDirectionalLight_Direction = uWVMatrix * vec4(uDirectionalLight_Direction, 0.0);
    vec4 transformedPointLight_Direction = (uWVMatrix * vec4(uPointLight_Position, 1.0) - vPosition);

    float directionalLight_DiffuseFactor = max(dot(normalize(vTransformedNormal), normalize(transformedDirectionalLight_Direction.xyz)), 0.0);
    float pointLight_DiffuseFactor = max(dot(normalize(vTransformedNormal), normalize(transformedPointLight_Direction.xyz)), 0.0);

    vec3 lightWeighting = 
    	uDirectionalLight_Color * uDirectionalLight_AmbientIntensity +
    	uDirectionalLight_Color * uDirectionalLight_DiffuseIntensity * directionalLight_DiffuseFactor + 
    	uPointLight_Color * pointLight_DiffuseFactor;

    gl_FragColor = vec4(surfaceColor.rgb * lightWeighting, surfaceColor.a);
}
`;