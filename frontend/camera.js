let camera, //相机
    CAMERA_NEAR = 20,
    CAMERA_FAR = 10000,
    CAMERA_FOV = 60,//人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度
    orbitControls;



function perspectiveView(x){
    camera = new THREE.PerspectiveCamera(CAMERA_FOV, canvas_rect.width / canvas_rect.height, CAMERA_NEAR, CAMERA_FAR);
    initOrbitControl(-360,360,-360,360);
    camera.position.set(CAMERA_FAR / x, CAMERA_FAR / x, CAMERA_FAR / x);
    canvas.addEventListener('mousedown', onDocumentMouseDown, false);
    // canvas.addEventListener('mousemove', onDocumentMouseDown, false);
    activeRenderer();
}
function initOrthographicCamera(){
    var k = canvas_rect.width / canvas_rect.height; //窗口宽高比
    var s = 1500; //三维场景显示范围控制系数，系数越大，显示的范围越大
    var left = - s*k;
    var right = s*k;
    var top = s;
    var bottom = - s;
    // OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
    camera = new THREE.OrthographicCamera(left, right, top, bottom, 1, CAMERA_FAR);
}
function topView(x){
    initOrthographicCamera();
    initOrbitControl(0,0,0,0);
    camera.position.set(0, CAMERA_FAR / x, 0);
    canvas.addEventListener('mousedown', onDocumentMouseDown, false);
    // canvas.addEventListener('mousemove', onDocumentMouseDown, false);
    activeRenderer();
}
function upRightView(x){
    initOrthographicCamera();
    initOrbitControl(0,0,Math.PI/2,Math.PI/2);
    camera.position.set( CAMERA_FAR / x, 0,0);
    canvas.addEventListener('mousedown', onDocumentMouseDown, false);
    // canvas.addEventListener('mousemove', onDocumentMouseDown, false);
    activeRenderer();
}
function sideView(x){
    initOrthographicCamera();
    initOrbitControl(-Math.PI/2,-Math.PI/2,Math.PI/2,Math.PI/2);
    camera.position.set(0, 0,CAMERA_FAR / x);
    canvas.addEventListener('mousedown', onDocumentMouseDown, false);
    // canvas.addEventListener('mousemove', onDocumentMouseDown, false);
    activeRenderer();
}


function initOrbitControl(_minAzimuthAngle,_maxAzimuthAngle,_minPolarAngle,_maxAzimuthAngle){
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    // orbitControls.target = new THREE.Vector3(500, 0, 0);//控制焦点
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    orbitControls.enableDamping = false;
    //动态阻尼系数 就是鼠标拖拽旋转灵敏度
    //orbitControls.dampingFactor = 0.25;
    //是否可以缩放
    orbitControls.enableZoom = true;
    //是否自动旋转
    orbitControls.autoRotate = false;
    //设置相机距离原点的最远距离
    orbitControls.minDistance = 20;
    //设置相机距离原点的最远距离
    orbitControls.maxDistance = 10000;
    //是否开启右键拖拽
    orbitControls.enablePan = false;

    orbitControls.enableKeys = false;
    orbitControls.minAzimuthAngle = _minAzimuthAngle;
    orbitControls.maxAzimuthAngle = _maxAzimuthAngle;
    orbitControls.minPolarAngle = _minPolarAngle;
    orbitControls.maxPolarAngle = _maxAzimuthAngle;
    orbitControls.addEventListener('change', function () {
        // console.log("orbit controler has changed.")
        activeRenderer()
    });
    activeRenderer();
}

