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
    float surfaceSpecularIntensity = 0.6;
    float materialShininess = 32.0;

    vec3 normalizedTransformedNormal = normalize(vTransformedNormal);
    vec4 transformedDirectionalLight_Direction = normalize(uWVMatrix * vec4(uDirectionalLight_Direction, 0.0));
    vec4 transformedPointLight_Direction = normalize((uWVMatrix * vec4(uPointLight_Position, 1.0) - vPosition));

    float directionalLight_DiffuseFactor = max(dot(normalizedTransformedNormal, transformedDirectionalLight_Direction.xyz), 0.0);
    float pointLight_DiffuseFactor = max(dot(normalizedTransformedNormal, transformedPointLight_Direction.xyz), 0.0);

    vec3 fragmentToCamera = normalize(-vPosition.xyz);
    vec3 directionalLight_Reflect = reflect(-transformedDirectionalLight_Direction.xyz, normalizedTransformedNormal);
    vec3 pointLight_Reflect = reflect(-transformedPointLight_Direction.xyz, normalizedTransformedNormal);

    float directionalLight_SpecularFactor = pow(max(dot(fragmentToCamera, directionalLight_Reflect), 0.0), materialShininess);
    float pointLight_SpecularFactor = pow(max(dot(fragmentToCamera, pointLight_Reflect), 0.0), materialShininess);

    vec3 lightWeighting = 
    	uDirectionalLight_Color * uDirectionalLight_AmbientIntensity +
    	uDirectionalLight_Color * uDirectionalLight_DiffuseIntensity * directionalLight_DiffuseFactor + 
    	uDirectionalLight_Color * surfaceSpecularIntensity * directionalLight_SpecularFactor +
    	uPointLight_Color * pointLight_DiffuseFactor +
    	uPointLight_Color * surfaceSpecularIntensity * pointLight_SpecularFactor;

    gl_FragColor = vec4(surfaceColor.rgb * lightWeighting, surfaceColor.a);
}
`;