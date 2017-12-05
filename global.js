
var lastTime = 0;

var pMatrix = mat4.create();

var objectsLoaded = false;

var sceneObjects = {};

var currentlyPressedKeys = {};

var camera;

var gl;

var shaderProgram;

var directionalLightColor;

var directionalLightAmbientIntensity;

var directionalLightDiffuseIntensity;

var directionalLightDirection;

var pointLight_Color;

var pointLight_Position;

var fog = {
	color: new Float32Array([0.0, 0.0, 1.0]),
	distance: new Float32Array([5, 40])
};

// billboards

var billboard1;