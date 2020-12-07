function CreateGeometry(key) {
    let position = {x: 0, y: 0, z: 0};
    let newMesh = geometryElements[key].createFunction();
    newMesh.position = position;
    if (SELECTED) {
        // distance = 1.25*(SELECTED.geometry.boundingSphere.radius + newMesh.geometry.boundingSphere.radius);
        distance = 2 * (SELECTED.geometry.boundingSphere.radius);
        if (objectCount % 2 === 0) {
            position.x = distance - SELECTED.position.x;
            position.z = distance + SELECTED.position.z;
        } else {
            position.x = SELECTED.position.x + distance;
            position.z = SELECTED.position.z - distance;
            // distanceX = 2*(SELECTED.geometry.boundingSphere.radius);
        }
        // position.y = SELECTED.position.y+distance;
        console.log("this is a new mesh has been created just now.:", newMesh, position);
    }
    newMesh.position.set(position.x, position.y, position.z);
    console.log("this is new mesh its position has been initillized:", newMesh);
    newMesh.name += objectCount++;
    let objectContainer = document.getElementById('objectContainerView');
    let newChildElement = document.createElement('view');
    newChildElement.setAttribute('name', newMesh.name);
    newChildElement.innerHTML = newMesh.name;
    newChildElement.setAttribute('onClick', 'activateTargetMesh1("' + newMesh.name + '")');
    objectContainer.insertAdjacentElement('beforeend', newChildElement);
    activateTargetMesh(newMesh);
    activeRenderer();
}

var SELECTED_ORIGINAL_MATERIAL;
var SELECTED_MATERIAL = new THREE.MeshBasicMaterial({color: 0x66ff00});

function activateTargetMesh1(name) {
    var mesh = scene.getObjectByName(name);
    console.log(name, mesh);
    console.log(name, mesh);
    activateTargetMesh(mesh);
}

function activateTargetMesh(mesh) {
    // $("#curr_object_panel").attr('object',mesh.uuid);
    // scene.getObjectForDistance()
    if (SELECTED) {
        console.log(SELECTED.material, ":Selected.material", SELECTED_ORIGINAL_MATERIAL);
        if (SELECTED.material) SELECTED.material = SELECTED_ORIGINAL_MATERIAL;
        if (SELECTED_ORIGINAL_MATERIAL_URL) SELECTED.setMaterialMap_url(SELECTED_ORIGINAL_MATERIAL_URL);
        // if(SELECTED_ORIGINAL_MATERIAL_URL)ImageMapTextureLoader(SELECTED_ORIGINAL_MATERIAL_URL,SELECTED,null);
        let activeElement = document.getElementsByName(SELECTED.name)[0];
        if (activeElement !== undefined) {
            activeElement.setAttribute('class', 'unActiveObject');
        }
    }
    if (mesh) {
        let targetElement = document.getElementsByName(mesh.name)[0];
        targetElement.setAttribute('class', 'activeObject');
        console.log("this is selected:", mesh);
        SELECTED_ORIGINAL_MATERIAL = mesh.material.clone();//记录当前被选对象的Material原材质
        SELECTED_ORIGINAL_MATERIAL_URL = mesh.MaterialMapURL;
        mesh.material = SELECTED_MATERIAL;
        SELECTED = mesh;
        group.add(SELECTED);
    }
    console.log("this is a new mesh has been added the group just now:", SELECTED);
    setCurrObject(SELECTED);
    activeRenderer();
}

function removeObject() {
    let currActiveElement = document.getElementsByName(SELECTED.name)[0];
    let objectContainer = document.getElementById('objectContainerView');
    objectContainer.removeChild(currActiveElement);
    group.remove(SELECTED);

    let newActiveElement = objectContainer.lastElementChild;
    if (newActiveElement) {
        let newCurrMesh = scene.getObjectByName(newActiveElement.getAttribute('name'));
        console.log("will activate object:", newCurrMesh, newActiveElement);
        activateTargetMesh(newCurrMesh);
    } else {
        activateTargetMesh(null);
    }
    activeRenderer();
}


var raycaster = new THREE.Raycaster();

function onDocumentMouseDown(event) {
    event.preventDefault();
    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    // document.addEventListener( 'mouseout', onDocumentMouseOut, false );

    //鼠标点的拾取-当鼠标点击效果时，放在这里
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;//threejs坐标点的标准化
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(group.children);
    //拾取物体数大于0时

    console.log("mouse has been down:", intersects, scene.children);
    if (intersects.length > 0) {

        //获取第一个物体
        if (SELECTED != intersects[0].object) {
            //鼠标的变换
            // document.body.style.cursor = 'pointer';
            /*intersects[ 0 ].object.material.transparent=true;//透明度的变化
             intersects[ 0 ].object.material.opacity=0.5;*/
            // if (SELECTED) SELECTED.material.color.setHex(SELECTED.currentHex);
            // SELECTED = intersects[0].object;
            activateTargetMesh(intersects[0].object);
        }
    } else {
        // document.body.style.cursor = 'auto';
        // if (SELECTED) SELECTED.material.color.setHex(SELECTED.currentHex);//恢复选择前的默认颜色
        // SELECTED = null;
        activateTargetMesh(null);
    }
}
