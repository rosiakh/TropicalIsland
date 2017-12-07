
// moves scene objects to their initial position on the scene
function moveObjectsToScene() {
	sceneObjects['island'].translationVector = [2, 0, 0];
    sceneObjects['island'].scalingVector = [3, 0.6, 2];

    sceneObjects['fireplace'].translationVector = [1.5, 0.5, 0];
    sceneObjects['fireplace'].scalingVector = [0.1, 0.1, 0.1];

    sceneObjects['pig_1'].translationVector = [3, 0.5, 0];
    sceneObjects['pig_1'].scalingVector = [0.35, 0.35, 0.35];

    sceneObjects['pig_2'].translationVector = [0, 0.4, 0];
    sceneObjects['pig_2'].scalingVector = [0.45, 0.45, 0.45];

    sceneObjects['boat'].translationVector = [5, 0.5, 0];
    sceneObjects['boat'].scalingVector = [0.003, 0.003, 0.003];

    sceneObjects['bottom'].translationVector = [0, -10, 20];
    sceneObjects['bottom'].scalingVector = [20, 20, 20];
    sceneObjects['bottom'].rotationAngleX = -90;

    oceanSceneObject.translationVector = [0, 0, 20];
    oceanSceneObject.scalingVector = [20, 20, 20];
    oceanSceneObject.rotationAngleX = -90;
}

function handleLoadedObjects(data) {
    for (mesh in data) {
    	OBJ.initMeshBuffers(gl, data[mesh]);
    }

    sceneObjects['fireplace'] = 
        createSceneObject(data['fireplace'].vertexBuffer, data['fireplace'].indexBuffer, data['fireplace'].normalBuffer, data['fireplace'].textureBuffer, "fireplace.png");
    sceneObjects['pig_1'] = 
    	createSceneObject(data['pig'].vertexBuffer, data['pig'].indexBuffer, data['pig'].normalBuffer, data['pig'].textureBuffer, "horse.jpg");
    sceneObjects['pig_2'] = 
        createSceneObject(data['pig'].vertexBuffer, data['pig'].indexBuffer, data['pig'].normalBuffer, data['pig'].textureBuffer, "horse.jpg");
    sceneObjects['boat'] = 
    	createSceneObject(data['boat'].vertexBuffer, data['boat'].indexBuffer, data['boat'].normalBuffer, data['boat'].textureBuffer, "dark.jpg");
 
    objectsLoaded = true;

    moveObjectsToScene();    
}

function loadObjects() {
    loadBillboards();
    loadParticles();
    createIsland();
    createBottom();
    createOcean();

    OBJ.downloadMeshes({
        'fireplace': 'models/fireplace.obj',
        'pig': 'models/pig.obj',
        'boat': 'models/Cruiser 2012.obj'}, 
        handleLoadedObjects);   
}