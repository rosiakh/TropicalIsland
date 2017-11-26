var fragmentShaderString = `

precision mediump float;

varying vec3 vTransformedNormal;
varying vec4 vPosition;

uniform vec3 uAmbientColor;

uniform vec3 uDirectionalLightDirection;
uniform vec3 uDirectionalLightDiffuseColor;

uniform vec3 uPointLightingLocation;
uniform vec3 uPointLightingColor;

varying mat4 vMVMatrix;


void main(void) {
    precision mediump float;
    vec3 lightWeighting;

    vec3 normal = normalize(vTransformedNormal);
    vec4 transformedLightDirection = vMVMatrix * vec4(uDirectionalLightDirection, 0.0);
    float directionalLightWeighting = max(dot(vTransformedNormal.xyz, normalize(transformedLightDirection.xyz)), 0.0);

    float diffuseLightWeighting = max(dot(normal, normalize(uDirectionalLightDirection)), 0.0);
        
    vec3 pointLightDirection = normalize(uPointLightingLocation - vPosition.xyz);
    float pointLightWeighting = max(dot(normalize(vTransformedNormal), pointLightDirection), 0.0);

    lightWeighting = uAmbientColor + 
    uDirectionalLightDiffuseColor * diffuseLightWeighting * directionalLightWeighting +
    uPointLightingColor * pointLightWeighting;

    vec4 fragmentColor;
    fragmentColor = vec4(1.0, 1.0, 1.0, 1.0);

    gl_FragColor = vec4(fragmentColor.rgb * lightWeighting, fragmentColor.a);
}
`;