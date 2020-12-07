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
