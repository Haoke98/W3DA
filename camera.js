function initCamera(canvas_rect) {
    camera = new THREE.PerspectiveCamera(CAMERA_FOV, canvas_rect.width / canvas_rect.height, CAMERA_NEAR, CAMERA_FAR);
    let x = 30;
    camera.position.set(CAMERA_FAR / x, CAMERA_FAR / x, CAMERA_FAR / x);
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement);

    // orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点
    // 如果使用animate方法时，将此函数删除
    //orbitControls.addEventListener( 'change', render );
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    orbitControls.enableDamping = true;
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
    orbitControls.enablePan = true;

    orbitControls.enableKeys = false;

    orbitControls.addEventListener('change', function () {
        // console.log("orbit controler has changed.")
        activeRenderer()
    });
}
