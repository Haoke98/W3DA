KEYS = {};
let timeTrack = [5];
let objectTrack = {
    5: []
};

/*用来显示*/
function showValue(value) {
    document.getElementById('curr_key').setAttribute('value', value);
    curr_key = parseInt(value);
    showCurrentKey(curr_key);
}

function setKey() {
    setKeyForCurrObjects(curr_key);
}

function setKeyForCurrObjects(key) {
    if (KEYS[key] === undefined) {
        KEYS[key] = []
    }
    let p = INTERSECTED.position;
    let pV = THREE.Vector3(p.x, p.y, p.z);
    console.log(p, pV);
    KEYS[key].push({
        name: INTERSECTED.name,
        x: p.x,
        y: p.y,
        z: p.z,
        material: INTERSECTED.material,
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
let curr_key = 1;
const key_max = 30;
var clip;
function KeyFrameTrack() {
    var times = [0, 5, 10, 15, 20];
    var values = [0, 0, -200, 0, 0,-100, 0, 0, 0, 0, 0, 100, 0, 0, 200];
    var posTrack = new THREE.KeyframeTrack(INTERSECTED.name + '.position', times, values);
    var colorTrack = new THREE.KeyframeTrack(INTERSECTED.name + '.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
    var scaleTrack = new THREE.KeyframeTrack(INTERSECTED.name + '.scale', [0, 20], [1, 1, 1, 1, 1, 1]);
    clip = new THREE.AnimationClip("default剪辑clip对象", key_max, [posTrack, colorTrack, scaleTrack]);
    mixer = new THREE.AnimationMixer(groupGeometryObjects);
    AnimationAction = mixer.clipAction(clip);
    // AnimationAction.timeScale = 3;
}
