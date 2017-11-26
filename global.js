
var lastTime = 0;

var pMatrix = mat4.create();

var objectsLoaded = false;

var sceneObjects = {};

var currentlyPressedKeys = {};

var camera;

var gl;

var shaderProgram;