
// moves scene objects to their initial position on the scene
function moveObjectsToScene() {
	sceneObjects['island'].translationVector = [2, 0, 0];
    sceneObjects['island'].scalingVector = [3, 0.6, 2];

    sceneObjects['tree_1'].translationVector = [0, 0.3, 0];
    sceneObjects['tree_1'].scalingVector = [0.02, 0.02, 0.02];
    sceneObjects['tree_1'].rotationAngleX = -90;

    sceneObjects['tree_2'].translationVector = [2, 0.6, 0];
    sceneObjects['tree_2'].scalingVector = [0.01, 0.01, 0.01];
    sceneObjects['tree_2'].rotationAngleX = -90;
    sceneObjects['tree_2'].rotationAngleZ = 30;

    sceneObjects['pig'].translationVector = [3, 0.5, 0];
    sceneObjects['pig'].scalingVector = [0.45, 0.45, 0.45];

    sceneObjects['boat'].translationVector = [5, 0.5, 0];
    sceneObjects['boat'].scalingVector = [0.003, 0.003, 0.003];
}

function handleLoadedObjects(data) {
    for (mesh in data) {
    	OBJ.initMeshBuffers(gl, data[mesh]);
    }

    sceneObjects['tree_1'] = new SceneObject(data['tree'].vertexBuffer, data['tree'].indexBuffer, data['tree'].normalBuffer);
    sceneObjects['tree_2'] = new SceneObject(data['tree'].vertexBuffer, data['tree'].indexBuffer, data['tree'].normalBuffer);
    sceneObjects['pig'] = new SceneObject(data['pig'].vertexBuffer, data['pig'].indexBuffer, data['pig'].normalBuffer);
    sceneObjects['boat'] = new SceneObject(data['boat'].vertexBuffer, data['boat'].indexBuffer, data['boat'].normalBuffer);
 
    objectsLoaded = true;

    moveObjectsToScene();    
}

function loadObjects() {
    OBJ.downloadMeshes({
        'tree': 'models/Palm_Tree.obj',
        'pig': 'models/pig.obj',
        'boat': 'models/Cruiser 2012.obj'}, 
        handleLoadedObjects);
}