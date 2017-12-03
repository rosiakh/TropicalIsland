
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

var pointLightColor;

var pointLightPosition;