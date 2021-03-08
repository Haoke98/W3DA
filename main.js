let canvas,  //画布标签  绘图API
    stats;     //性能检测器



let scene,     //场景
    renderer,  //渲染器
    groupGeometryObjects,     //物体组
    mouseX = 0,  //鼠标横向位置
    mouseY = 0,  //鼠标纵向位置
    windowHalfX = window.innerWidth / 2,  //视口大小的一般
    windowHalfY = window.innerHeight / 2; //视口大小的一半

let WIDTH_SEGMENTS = 30, HEIGHT_SEGMENTS = 30;
// let SELECTED = new THREE.Mesh(new THREE.CubeGeometry(50, 100, 150));
let INTERSECTED = null;
var objectCount = 0;
let play = false;
let clock = new THREE.Clock();
let mixer;
let AnimationAction;

let activeRender = false;



// var curve = new THREE.CatmullRomCurve3([
//     new THREE.Vector3(-60, 0, 80),
//     new THREE.Vector3(-6, 0, -10),
//     new THREE.Vector3(10, 0, -5),
//     new THREE.Vector3(0, 0, 0),
//     new THREE.Vector3(-6, 0, -3),
//     new THREE.Vector3(-3, 0, -7),
//     new THREE.Vector3(10, 0, -5)
// ], true/*是否闭合*/);
// let points = curve.getPoints(100);
// console.log(points);


canvas = document.getElementById('webglcanvas');
let canvas_rect = canvas.getBoundingClientRect();
initRenderer(canvas_rect);
// initCamera(canvas_rect);
perspectiveView(30);
scene = new THREE.Scene();
// 创建一个组合
groupGeometryObjects = new THREE.Group();
scene.add(groupGeometryObjects);  //将组合添加进场景中渲染
initXYZ();
mainPageReady();
animate();  //渲染动画应该放在最后
activeRenderer();
// canvas.addEventListener('mousedown', onDocumentMouseDown, false);
// canvas.addEventListener('mousemove', onDocumentMouseDown, false);







function initRenderer(canvas_rect) {
    // 渲染器
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true, // true/false表示是否开启反锯齿,
        // /*
        alpha: false,              // true/false 表示是否可以设置背景色透明,
        precision: 'highp',        // highp/mediump/lowp 表示着色精度选择,
        premultipliedAlpha: false, // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）,
        maxLights: 3,              // 最大灯光数,
        stencil: false             // false/true 表示是否使用模板字体或图案
        //
    });
    // 指定渲染器宽高
    renderer.setSize(canvas_rect.width, canvas_rect.height);
}

function playOrStop() {
    let btnPlay = document.getElementById('btnPlay');
    // if (play) {
    //     //正处于运动状态(stop.png)，需要变成不运动状态（play.png)
    //     btnPlay.setAttribute('class', 'stop');
    // } else {
    //     btnPlay.setAttribute('class', 'play');
    // }
    play = !play;
    KeyFrameTrack();
    // activeRenderer();
    activeRender = !activeRender;
    AnimationAction.play();
}


// geometryPanel.data.x = 0;
function mainPageReady() {

    // initPanel("geometryContainerView", geometryElements, function (panelElement) {
    //     return '<view onclick="CreateGeometry()" data-type="' + panelElement.data_type + '"><img src="' + panelElement.src + '">' + panelElement.name + '</view>';
    // });
    // initGeometryElements('geometryContainerView2', geometryElements);
    initGeometryElements2('tool_bar', geometryElements);
    initMap();
    removeMask();
}






function initPanel(panel_id, panel_elements, callback) {
    let panel = document.getElementById(panel_id);
    let htmlContext = "";
    let panelElement = null;
    for (let j = 0; j < panel_elements.length; j++) {
        panelElement = panel_elements[j];
        htmlContext += callback(panelElement);
    }
    panel.innerHTML += htmlContext;
}

function getRendomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

function initXYZ() {
    var geometry = new THREE.Geometry();  // geometry为三维空间中的点集同点集闭合后的各个面的集合
    // 在x轴上定义两个点p1(-500,0,0)，p2(500,0,0)。
    geometry.vertices.push(new THREE.Vector3(-200, 0, 0));
    geometry.vertices.push(new THREE.Vector3(200, 0, 0));
    // 思路：我们要画一个网格的坐标，那么我们就应该找到线的点。把网格虚拟成正方形，在正方形边界上找到几个等分点，用这些点两两连接，就能够画出整个网格来。
    for (var i = 0; i <= 8; i++) {
        // 这两个点决定了x轴上的一条线段，将这条线段复制20次，分别平行移动到z轴的不同位置，就能够形成一组平行的线段。
        // 同理，将p1p2这条线先围绕y轴旋转90度，然后再复制20份，平行于z轴移动到不同的位置，也能形成一组平行线。
        // 经过上面的步骤，就能够得到坐标网格了。
        var linex = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xffffff, opacity: 0.2}));
        linex.position.z = (i * 50) - 200;
        scene.add(linex);
        var liney = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xBBBBBB, opacity: 0.2}));
        liney.position.x = (i * 50) - 200;
        liney.rotation.y = 90 * Math.PI / 180;  // 将线旋转90度
        scene.add(liney);
    }
    let AxisLength = 500;
    var axes = new THREE.AxisHelper(AxisLength);
    // axes.position.set(500,500,500);
    scene.add(axes);

    let spriteX = createSpriteText("X", "#ffa905", "60px");
    scene.add(spriteX);
// 控制精灵大小，比如可视化中精灵大小表征数据大小
    spriteX.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以
    spriteX.position.set(AxisLength, 0, 0);

    let spriteY = createSpriteText("Y", "#ffa905", "60px");
    scene.add(spriteY);
// 控制精灵大小，比如可视化中精灵大小表征数据大小
    spriteY.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以
    spriteY.position.set(0, AxisLength, 0);

    let spriteZ = createSpriteText("Z", "#ffa905", "60px");
    scene.add(spriteZ);
// 控制精灵大小，比如可视化中精灵大小表征数据大小
    spriteZ.scale.set(100, 100, 1); //// 只需要设置x、y两个分量就可以
    spriteZ.position.set(0, 0, AxisLength);

}

//
// $(canvas).onkeydown(canvas_rect(event))
// var canvas_onkeydown = function (event) {
//     let object = camera;
//     let delta = 10;
//     console.log('keyCode', event.keyCode);
//     switch (event.keyCode) {
//         case 37:
//             console.log('turnLeft');
//             // object.rotateX(Math.PI/4);
//             // cameraZoomIn(cameraZoomInOutFactor);
//             cameraRotate(camera, 0 - delta);
//             break;
//         case 38:
//             console.log('turnUP');
//             object.position.y += delta;
//             cameraInfoPanelElement.innerText = camera.toString();
//             break;
//         case 39:
//             console.log('turnRight');
//             // object.rotateX(0-Math.PI/4);
//             // cameraZoomIn(0-cameraZoomInOutFactor);
//             // camera 顺时针旋转 相当于 物体和场景逆时针渲染
//             cameraRotate(camera, delta);
//             break;
//         case 40:
//             console.log('turnDown');
//             object.position.y -= delta;
//             cameraInfoPanelElement.innerText = camera.toString();
//             break;
//     }
// };
// canvas.addEventListener("keydown",canvas_onkeydown,true)















function getElementRectById(view_id_str) {
    var element = document.getElementById(view_id_str);
    var element_rect = element.getBoundingClientRect();
    return element_rect;
}

function init() {
    // stats性能检测器初始化
    // stats = initStats();

    // 3D绘制
    // 相机

    // 场景

    // sceneInnerMap = new THREE.ImageUtils.loadTextureCube([
    //     // 'px.png',
    //     "https://mmbiz.qpic.cn/mmbiz_jpg/lBSHibv6GicCZ6Qy6pPpoJOoVbzP7o4uUp1Aj6kibKthw7YiaaMRFLm7DxgdUvBDZtH3QqXjsibFqIlgUUuAMia5GiaTQ/0?wx_fmt=jpeg",
    //     // 'nx.jpg',
    //     "https://mmbiz.qpic.cn/mmbiz_jpg/lBSHibv6GicCZ6Qy6pPpoJOoVbzP7o4uUp1Aj6kibKthw7YiaaMRFLm7DxgdUvBDZtH3QqXjsibFqIlgUUuAMia5GiaTQ/0?wx_fmt=jpeg",
    //     'py.png',
    //
    //     'ny.png',
    //     'pz.png',
    //     'nz.png'
    // ]);
    // var shader = THREE.ShaderLib["cube"];
    // shader.unifroms["tCube"].value = sceneInnerMap;
    // var material = new THREE.ShaderMaterial({
    //    fragmentShader:shader.fragmentShader,
    //    vertexShader:shader.vertexShader,
    //    uniforms:shader.uniforms,
    //    side: THREE.BackSide
    // });
    // var skyBox = new THREE.Mesh(new THREE.CubeGeometry(5000,5000,5000));
    // scene.add(skyBox);


    // 贴图加载器
    // loader = new THREE.TextureLoader();

//     var point = new THREE.PointLight(0xffffff);
//     point.position.set(40, 20, 30); //点光源位置
// // 通过add方法插入场景中，不插入的话，渲染的时候不会获取光源的信息进行光照计算
//     scene.add(point); //点光源添加到场景中


    // var geometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
    // // 线条渲染模式
    // var material = new THREE.LineBasicMaterial({
    //     color: 0xff0000 //线条颜色
    // });//材质对象
    // // 创建线模型对象   构造函数：Line、LineLoop、LineSegments
    // var line = new THREE.LineLoop(geometry, material);//线条模型对象
    //
    // group.add(line);

//     var geometry = new THREE.BoxGeometry(500, 500, 500); //立方体
//
// var geometry = new THREE.BoxGeometry(100, 100, 100); //立方体
//
// var loader = new THREE.CubeTextureLoader();
// // 所有贴图在同一目录下，可以使用该方法设置共用路径
// loader.setPath('file:///F:/GLproject/codingDream-master/day09/canvas/earth/img/');
// // 立方体纹理加载器返回立方体纹理对象CubeTexture
// var CubeTexture = loader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'cloudEarthMap.jpg']);
// //材质对象Material
// var material = new THREE.MeshPhongMaterial({
//   //网格模型设置颜色，网格模型颜色和环境贴图会进行融合计算
//   // color:0xff0000,
//   envMap: CubeTexture, //设置环境贴图
//   // 环境贴图反射率   控制环境贴图对被渲染三维模型影响程度
//   // reflectivity: 0.1,
// });
// console.log(CubeTexture.image);
// var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
// scene.add(mesh); //网格模型添加到场景中


    // var skyBoxGeometry = new THREE.BoxGeometry(5000, 5000, 5000);
    //
    // var texture = new THREE.TextureLoader().load("https://mmbiz.qpic.cn/mmbiz_jpg/lBSHibv6GicCZ6Qy6pPpoJOoVbzP7o4uUp1Aj6kibKthw7YiaaMRFLm7DxgdUvBDZtH3QqXjsibFqIlgUUuAMia5GiaTQ/0?wx_fmt=jpeg");
    //
    // var skyBoxMaterial = new THREE.MeshBasicMaterial({map: texture, side: THREE.DoubleSide});
    //
    // var skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
    //
    // scene.add(skyBox);


    // 绑定鼠标移动事件
    // document.addEventListener('mousemove', onDocumentMouseMove, false)

    // 窗口大小改变监听
    // window.addEventListener('resize', onWindowResize, false);


}




function animate() {
    // 请求运动帧
    requestAnimationFrame(animate);
    if (activeRender) {
        render()
    }
}







// 地球旋转逻辑函数
function render() {
    // 更新性能监视器
    // stats.update();
    // camera.position.x += (mouseX - camera.position.x) * 0.10;
    // camera.position.y += (mouseX - camera.position.y) * 0.05;
    // 拍摄角度， 可改变地球视角
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
    if (play) {

        // 地球自转速度
        // group.rotateY(0.01);
        // group.rotation.y -= 0.030;
        // group.rotation.x +=0.010;
        // group.rotation.z = 200;
        // if(objectCount>=points.length){
        //   objectCount=0;
        // }
        // let point = points[objectCount++];
        // console.log(point);
        // curr_mesh.position.set(point.x,point.y,point.z);
        // curr_mesh.position.x = point.x;
        // curr_mesh.position.y = point.y;
        // curr_mesh.position.z = point.z;
        // curr_mesh.position.y += 1;
        // curr_mesh.position.x +=1;
        mixer.update(clock.getDelta());
    }
    if (INTERSECTED) setCurrObject(INTERSECTED);
    orbitControls.update();
    // 核心 递归调用
}


function cameraRotate(rotatedObject, delta) {
    // 同一个x&z平面上的圆圈 即 y轴坐标都一样
    var point1 = rotatedObject.position;
    var y = point1.y;
    var point2 = {x: 0, y: y, z: 0};
    //因为 y 轴的坐标都一样 所以可以忽略
    var radius = Math.sqrt(Math.pow(point1.x, 2) + Math.pow(point1.z, 2));
    // x^2 + z^2 = radius^2;是一个圆
    var newZ = point1.z;
    var newX = point1.x;
    var newY = y;
    if (delta > 0) {
        // delta为正 , 顺时针旋转
        if (point1.x == 0) {
            console.log("camera在Z轴");
            if (point1.z > 0) {
                console.log("正半轴上，顺时针旋转将要进入第四象限，一直到从第三象限出来 z 一直变小");
                newZ = point1.z - delta;
                newX = calculateNewZ(newZ, radius);
            } else {
                console.log("负半轴上，顺时针旋转将要进入第三象限，一直到从第四象限出来 z 一直变大");
                newZ = point1.z + delta;
                newX = 0 - calculateNewZ(newZ, radius);
            }
        } else {
            console.log('camer不在X轴上');
            if (point1.x > 0) {
                console.log('camera在第一第二象限，顺时针旋转z会一直变小,x始终为正');
                newZ = point1.z - delta;
                newX = calculateNewZ(newZ, radius);
            } else {
                console.log('camera在第三第四象限，顺时针旋转z会一直变大,x始终为负');
                newZ = point1.z + delta;
                newX = 0 - calculateNewZ(newZ, radius);
            }
        }
    } else {
        if (point1.x == 0) {
            console.log("camera在Z轴");
            if (point1.z > 0) {
                console.log("正半轴上，逆时针旋转将要进入第四象限，一直到从第三象限出来 z 一直变小");
                //主义 delta 为负
                newZ = point1.z + delta;
                newX = 0 - calculateNewZ(newZ, radius);
            } else {
                console.log("负半轴上，逆时针旋转将要进入第二象限，一直到从第第一象限出来 z 一直变大");
                newZ = point1.z - delta;
                newX = calculateNewZ(newZ, radius);
            }
        } else {
            console.log('camer不在X轴上');
            if (point1.x > 0) {
                console.log('camera在第一第二象限，顺时针旋转z会一直变小,x始终为正');
                newZ = point1.z - delta;
                newX = calculateNewZ(newZ, radius);
            } else {
                console.log('camera在第三第四象限，顺时针旋转z会一直变大,x始终为负');
                newZ = point1.z + delta;
                newX = 0 - calculateNewZ(newZ, radius);
            }
        }
    }
    // console.log(point1, radius);
    rotatedObject.position.set(newX, newY, newZ);
    cameraInfoPanelElement.innerText = camera.toString();
}


function calculateNewZ(newZ, radius) {
    if (newZ > radius) {
        newZ = radius;
    } else if ((0 - newZ) > radius) {
        newZ = 0 - radius;
    }
    return Math.sqrt(Math.pow(radius, 2) - Math.pow(newZ, 2));
}


