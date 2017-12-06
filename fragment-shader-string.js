var fragmentShaderString = `

precision mediump float;

uniform mat4 uWVMatrix;

uniform vec3 uDirectionalLight_Color;
uniform vec3 uDirectionalLight_AmbientIntensity;
uniform vec3 uDirectionalLight_DiffuseIntensity;
uniform vec3 uDirectionalLight_Direction;

uniform vec3 uPointLight_Color;
uniform vec3 uPointLight_Position;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform bool uHasTexture;
uniform bool uHasTexture2;

uniform vec3 uFogColor;
uniform vec2 uFogDistance;

uniform float uMaterialShininess;

varying vec3 vTransformedNormal;
varying vec4 vPosition;
varying mat4 vMVMatrix;
varying vec2 vTextureCoord;

void main(void) {
	vec4 defaultSurfaceColor = vec4(1.0, 0.8, 0.3, 1.0);
    vec4 fragmentColor;
    float surfaceSpecularIntensity = 0.6;

    vec3 normalizedTransformedNormal = normalize(vTransformedNormal);
    vec4 transformedDirectionalLight_Direction = normalize(uWVMatrix * vec4(uDirectionalLight_Direction, 0.0));
    vec4 transformedPointLight_Direction = normalize((uWVMatrix * vec4(uPointLight_Position, 1.0) - vPosition));

    float directionalLight_DiffuseFactor = max(dot(normalizedTransformedNormal, transformedDirectionalLight_Direction.xyz), 0.0);
    float pointLight_DiffuseFactor = max(dot(normalizedTransformedNormal, transformedPointLight_Direction.xyz), 0.0);

    vec3 fragmentToCamera = normalize(-vPosition.xyz);
    vec3 directionalLight_Reflect = reflect(-transformedDirectionalLight_Direction.xyz, normalizedTransformedNormal);
    vec3 pointLight_Reflect = reflect(-transformedPointLight_Direction.xyz, normalizedTransformedNormal);

    float directionalLight_SpecularFactor = pow(max(dot(fragmentToCamera, directionalLight_Reflect), 0.0), uMaterialShininess);
    float pointLight_SpecularFactor = pow(max(dot(fragmentToCamera, pointLight_Reflect), 0.0), uMaterialShininess);

    vec3 lightWeighting = 
    	uDirectionalLight_Color * uDirectionalLight_AmbientIntensity +
    	uDirectionalLight_Color * uDirectionalLight_DiffuseIntensity * directionalLight_DiffuseFactor + 
    	uDirectionalLight_Color * surfaceSpecularIntensity * directionalLight_SpecularFactor +
    	uPointLight_Color * pointLight_DiffuseFactor +
    	uPointLight_Color * surfaceSpecularIntensity * pointLight_SpecularFactor;

    if (uHasTexture) {
        if (uHasTexture2) {
            vec4 color1 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
            vec4 color2 = texture2D(uSampler2, vec2(vTextureCoord.s, vTextureCoord.t));
            fragmentColor = mix(color1, color2, 0.2);
        } else {
            vec4 color1 = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
            fragmentColor = color1;  
        }	
    }
    else {
        fragmentColor = defaultSurfaceColor;
    }

    vec3 colorWithLight = fragmentColor.rgb * lightWeighting;

    // fog
    float distanceToFragment = sqrt(vPosition.x * vPosition.x + vPosition.y * vPosition.y + vPosition.z * vPosition.z);
    float fogFactor = clamp((uFogDistance.y - distanceToFragment) / (uFogDistance.y - uFogDistance.x), 0.0, 1.0);
    vec3 colorWithFog = mix(uFogColor, colorWithLight, fogFactor);

    gl_FragColor = vec4(colorWithFog, fragmentColor.a);
}
`;