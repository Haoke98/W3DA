let ZERO_POINT = {x: 0, y: 0, z: 0};
let cameraZoomInOutFactor = 10;

function cameraZoomIn(delta) {
    var point1 = camera.position;
    // console.log(point1);
    var point2 = ZERO_POINT;
    // var delta = 50;
    var newX = point1.x + delta;
    if (newX < 10) {
        newX = 10;
    }
    // (x-x1)/(x1-x2)=(y-y1)/(y1-y2)=(z-z1)/(z1-z2);
    // (x1,y1,z1) = (0,0,0),(x2,y2,z2) = originPosition
    var newY = (newX - point1.x) * (point1.y - point2.y) / (point1.x - point2.x) + point1.y;
    var newZ = (newX - point1.x) * (point1.z - point2.z) / (point1.x - point2.x) + point1.z;
    camera.position.set(newX, newY, newZ);
    cameraInfoPanelElement.innerText = camera.toString();
}


function getCurrentElement() {
    return document.getElementById(event.currentTarget.getAttribute('id'));
}


//第一种，使用while循环
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {

    }
}



function initStats() {
    stats = new Stats();
    //设置统计模式
    stats.setMode(0); // 0: fps, 1: ms
    //统计信息显示在左上角
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '10px';
    stats.domElement.style.top = '10px';
    //将统计对象添加到对应的<div>元素中
    // document.getElementById("stats-output").appendChild(stats.domElement);
    return stats;
}


function onDocumentMouseMove(event) {

    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

}

// // 监听鼠标移动方向， 从而确定地球南北半球
// function onDocumentMouseMove(ev) {
//     ev = ev || event;
//     mouseX = ev.clientX - windowHalfX;
//     mouseY = ev.clientY - windowHalfY
// }

// 监听窗口大小， 从而根据窗口大小改变地球大小， 类似响应式
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
}

let cameraInfoPanelElement = document.getElementById('cameraInfoPanel');

window.onresize = function () {
    var canvas_rect = getElementRectById('webglcanvas');
    renderer.setSize(canvas_rect.width, canvas_rect.height);
    camera.aspect = canvas_rect.width / canvas_rect.height;
    camera.updateProjectionMatrix();
};



function ImageMapTextureLoader(url, obj, loader) {
    THREE.ImageUtils.crossOrigin = '';
    var mapOverlay = THREE.ImageUtils.loadTexture(url);
    obj.setMaterial(new THREE.MeshBasicMaterial({map: mapOverlay, needsUpdate: true}))
}
