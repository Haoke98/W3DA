function CreateGeometry(key) {
    let newMesh = geometryElements[key].createFunction();
    // if (INTERSECTED) {
    //     // distance = 1.25*(SELECTED.geometry.boundingSphere.radius + newMesh.geometry.boundingSphere.radius);
    //     distance = 2 * (INTERSECTED.geometry.boundingSphere.radius);
    //     if (objectCount % 2 === 0) {
    //         _position.x = distance - INTERSECTED._position.x;
    //         _position.z = distance + INTERSECTED._position.z;
    //     } else {
    //         _position.x = INTERSECTED._position.x + distance;
    //         _position.z = INTERSECTED._position.z - distance;
    //         // distanceX = 2*(SELECTED.geometry.boundingSphere.radius);
    //     }
    //     // _position.y = SELECTED._position.y+distance;
    // }
    var _position = getRandomPosition();
    newMesh.position.set(_position.x, _position.y, _position.z);
    console.log("this is a new mesh has been created just now.:", newMesh, _position);
    console.log("this is new mesh its _position has been initillized:", newMesh);
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
    if (INTERSECTED) {
        console.log(INTERSECTED.material, ":Selected.material", SELECTED_ORIGINAL_MATERIAL);
        if (INTERSECTED.material) INTERSECTED.material = SELECTED_ORIGINAL_MATERIAL;
        if (SELECTED_ORIGINAL_MATERIAL_URL) INTERSECTED.setMaterialMap_url(SELECTED_ORIGINAL_MATERIAL_URL);
        // if(SELECTED_ORIGINAL_MATERIAL_URL)ImageMapTextureLoader(SELECTED_ORIGINAL_MATERIAL_URL,SELECTED,null);
        let activeElement = document.getElementsByName(INTERSECTED.name)[0];
        if (activeElement !== undefined) {
            activeElement.setAttribute('class', 'unActiveObject');
        }
    }
    if (mesh) {
        let targetElement = document.getElementsByName(mesh.name)[0];
        targetElement.setAttribute('class', 'activeObject');
        console.log("this is selected:", mesh);
        if (mesh.material){
            SELECTED_ORIGINAL_MATERIAL = mesh.material.clone();//记录当前被选对象的Material原材质
        }

        SELECTED_ORIGINAL_MATERIAL_URL = mesh.MaterialMapURL;
        mesh.material = SELECTED_MATERIAL;
        INTERSECTED = mesh;
        groupGeometryObjects.add(INTERSECTED);
    }
    console.log("this is a new mesh has been added the group just now:", INTERSECTED);
    setCurrObject(INTERSECTED);
    activeRenderer();
}

function removeObject() {
    let currActiveElement = document.getElementsByName(INTERSECTED.name)[0];
    let objectContainer = document.getElementById('objectContainerView');
    objectContainer.removeChild(currActiveElement);
    groupGeometryObjects.remove(INTERSECTED);

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

var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
function onDocumentMouseDown(event) {
    // console.log("this is event on onDocumentMouseDown:",event);
    event.preventDefault();
    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    // document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    // document.addEventListener( 'mouseout', onDocumentMouseOut, false );

    //鼠标点的拾取-当鼠标点击效果时，放在这里
    mouse.x = (event.clientX / canvas_rect.width) * 2 - 1;//threejs坐标点的标准化
    mouse.y = -(event.clientY / canvas_rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(groupGeometryObjects.children);
    //拾取物体数大于0时

    // console.log("mouse has been down:", intersects, scene.children);
    if (intersects.length > 0) {
        if(INTERSECTED!==intersects[0].object){
            if(INTERSECTED){
                // INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);
                activateTargetMesh(intersects[0].object);

            }
            INTERSECTED = intersects[0].object;
            // INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            // INTERSECTED.material.emissive.setHex(0x00FF00)
            activateTargetMesh(intersects[0].object);
        }
        console.log("同一个 对象 又被点击了")
        //获取第一个物体
        // if (INTERSECTED != intersects[0].object) {
            //鼠标的变换
            // document.body.style.cursor = 'pointer';
            /*intersects[ 0 ].object.material.transparent=true;//透明度的变化
             intersects[ 0 ].object.material.opacity=0.5;*/
            // if (SELECTED) SELECTED.material.color.setHex(SELECTED.currentHex);
            // SELECTED = intersects[0].object;

        // }
    } else {
        // document.body.style.cursor = 'auto';
        // if (INTERSECTED) INTERSECTED.material.emissive.setHex(INTERSECTED.currentHex);//恢复选择前的默认颜色
        console.log("点击了 空白处")
        activateTargetMesh(null)
        // activateTargetMesh(null);
    }
}

const MAX_POSITION = 500;
function getRandomPosition() {
    var _x = mapping(Math.random(),0,1,-MAX_POSITION,MAX_POSITION);
    var _y = mapping(Math.random(),0,1,-MAX_POSITION,MAX_POSITION);
    var _z = mapping(Math.random(),0,1,-MAX_POSITION,MAX_POSITION);
    return {x:_x,y:_y,z:_z};
}


function mapping(value,min,max,targetMin,targetMax) {
    var percent = (value-min)/(max-min);
    return targetMin+percent*(targetMax-targetMin);
}