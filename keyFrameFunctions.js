KEYS = {};

function setKeyForCurrObjects(key) {
    if (KEYS[key] === undefined) {
        KEYS[key] = []
    }
    let p = SELECTED.position;
    let pV = THREE.Vector3(p.x, p.y, p.z);
    console.log(p, pV);
    KEYS[key].push({
        name: SELECTED.name,
        x: p.x,
        y: p.y,
        z: p.z,
        material: SELECTED.material,
    });
}

function showCurrentKey(key) {
    let currKeyItemsList = KEYS[key] === undefined ? [] : KEYS[key];
    console.log("this is currKeyItemList:", currKeyItemsList);
    for (let i = 0; i < currKeyItemsList.length; i++) {
        tempItem = currKeyItemsList[i];
        console.log("this is tempItem:", tempItem);
        if (tempItem === undefined) {

        } else {
            tempMesh = scene.getObjectByName(tempItem.name);
            tempMesh.position.set(tempItem.x, tempItem.y, tempItem.z);
            tempMesh.material = tempItem.material;
        }
    }
    activeRenderer();
}