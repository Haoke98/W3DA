let canvas,  //画布标签  绘图API
    stats;     //性能检测器

let camera, //相机
    CAMERA_NEAR = 20,
    CAMERA_FAR = 10000,
    CAMERA_FOV = 60,//人的眼睛大约能够看到180度的视场，视角大小设置要根据具体应用，一般游戏会设置60~90度
    orbitControls;

let scene,     //场景
    renderer,  //渲染器
    group,     //物体组
    mouseX = 0,  //鼠标横向位置
    mouseY = 0,  //鼠标纵向位置
    windowHalfX = window.innerWidth / 2,  //视口大小的一般
    windowHalfY = window.innerHeight / 2; //视口大小的一半
let curr_texture = "https://mmbiz.qlogo.cn/mmbiz_jpg/lBSHibv6GicCZ6Qy6pPpoJOoVbzP7o4uUpwnO62dic1C9Iz5du3jhxGNPaY5SVxm93eP46d2uUCnTvFmhTibHrDzpg/0?wx_fmt=jpeg";
let earth_radius = 100;
let WIDTH_SEGMENTS = 30, HEIGHT_SEGMENTS = 30;
let curr_mesh;
var i = 0;
let play = false;
let clock = new THREE.Clock();
let mixer;
let AnimationAction;
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
initCamera(canvas_rect);
scene = new THREE.Scene();
// 创建一个组合
group = new THREE.Group();
scene.add(group);  //将组合添加进场景中渲染
initXYZ();
mainPageReady();
// KeyFrameTrack();
windowAddMouseWheel();


animate();  //渲染动画应该放在最后


function initCamera(canvas_rect) {
    camera = new THREE.PerspectiveCamera(CAMERA_FOV, canvas_rect.width / canvas_rect.height, CAMERA_NEAR, CAMERA_FAR);
    camera.position.set(CAMERA_FAR / 2, CAMERA_FAR / 2, CAMERA_FAR / 2);
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
}

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
        // */
    });
    // 指定渲染器宽高
    renderer.setSize(canvas_rect.width, canvas_rect.height);
}

function playOrStop(src) {
    let PLAY_ICON = './img/play.png';
    let STOP_ICON = './img/stop.png';
    let btnPlay = document.getElementById('btnPlay');
    if (play) {
        //正处于运动状态(stop.png)，需要变成不运动状态（play.png)
        btnPlay.setAttribute('src', PLAY_ICON);
    } else {
        btnPlay.setAttribute('src', STOP_ICON);
    }
    play = !play;
    AnimationAction.play();
}

function removeMask() {
    $('#mask').hide();
}

function Export() {
    $('#mask').show();
}

// geometryPanel.data.x = 0;
function mainPageReady() {

    // initPanel("geometryContainerView", geometryElements, function (panelElement) {
    //     return '<view onclick="CreateGeometry()" data-type="' + panelElement.data_type + '"><img src="' + panelElement.src + '">' + panelElement.name + '</view>';
    // });
    initGeometryElements('geometryContainerView', geometryElements);
    initMap();

}


function initMap() {
    var xhr = new XMLHttpRequest();//第一步：建立所需的对象
    xhr.open('GET', '/W3DA/getMaps', true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    xhr.send();//第三步：发送请求  将请求参数写在URL中
    /**
     * 获取数据后的处理程序
     */
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var json = JSON.parse(xhr.responseText);//获取到json字符串，还需解析
            console.log(json, json.objects);
            initPanel("mapsContainerView", json.objects, function (panelElement) {
                return '<view onclick="changeTexture(dataset.src)" data-src="' + panelElement.src + '"><img src="' + panelElement.src + '">' + panelElement.name + '</view>';
            });
        }
    };
}

function initGeometryElements(container_id, elements_dic) {
    let container = document.getElementById(container_id);
    let innerHTMLContext = "";
    for (key in elements_dic) {
        innerHTMLContext += '<view onclick="CreateGeometry(dataset.key)" data-key="' + key + '"><img src="' + elements_dic[key].src + '">' + key + '</view>';
    }
    container.innerHTML = innerHTMLContext;
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
    var axes = new THREE.AxisHelper(500);
    scene.add(axes);
}

let ballObjectCount = 0;
document.onkeydown = function (event) {
    let object = camera;
    let delta = 10;
    console.log('keyCode', event.keyCode);
    switch (event.keyCode) {
        case 37:
            console.log('turnLeft');
            // object.rotateX(Math.PI/4);
            // cameraZoomIn(cameraZoomInOutFactor);
            cameraRotate(camera, 0 - delta);
            break;
        case 38:
            console.log('turnUP');
            object.position.y += delta;
            cameraInfoPanelElement.innerText = camera.toString();
            break;
        case 39:
            console.log('turnRight');
            // object.rotateX(0-Math.PI/4);
            // cameraZoomIn(0-cameraZoomInOutFactor);
            // camera 顺时针旋转 相当于 物体和场景逆时针渲染
            cameraRotate(camera, delta);
            break;
        case 40:
            console.log('turnDown');
            object.position.y -= delta;
            cameraInfoPanelElement.innerText = camera.toString();
            break;
    }
};


let cameraZoomInOutFactor = 10;

function windowAddMouseWheel() {
    var scrollFunc = function (e) {
        e = e || window.event;
        if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
            if (e.wheelDelta > 0) { //当滑轮向上滚动时
                cameraZoomIn(cameraZoomInOutFactor);
            }
            if (e.wheelDelta < 0) { //当滑轮向下滚动时
                cameraZoomIn(0 - cameraZoomInOutFactor);
            }
        } else if (e.detail) {  //Firefox滑轮事件
            if (e.detail > 0) { //当滑轮向上滚动时
                cameraZoomIn(cameraZoomInOutFactor);
            }
            if (e.detail < 0) { //当滑轮向下滚动时
                cameraZoomIn(0 - cameraZoomInOutFactor);
            }
        }
    };
    //给页面绑定滑轮滚动事件
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scrollFunc, false);
    }
//滚动滑轮触发scrollFunc方法
    window.onmousewheel = document.onmousewheel = scrollFunc;
}

let cameraInfoPanelElement = document.getElementById('cameraInfoPanel');

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


let ZERO_POINT = {x: 0, y: 0, z: 0};


function changeTexture(src) {
    console.log(window.location, window.location.origin, src);
    var absolute_src = window.location.origin + src;
    console.log(absolute_src);
    curr_mesh.setMaterialMap_url(absolute_src);
}

var example1 = new Vue({
    el: '#objectContainerView',
    data: {
        objects: []
    }
});

function CreateGeometry(key) {
    let position;
    if (curr_mesh == undefined) {
        position = {x: 0, y: 0, z: 0}
    } else {
        position = curr_mesh.position;
    }
    let objectNameStr = geometryElements[key].createFunction();
    curr_mesh.position.set(position.x + 200, position.y, 100);
    group.add(curr_mesh);
    objectNameStr += i++;
    curr_mesh.name = objectNameStr;
    curr_mesh.elementId = curr_mesh.getElementId();
    makeUnActive();
    example1.objects.push(curr_mesh);
    // let view_id = curr_mesh.getElementId();
    // let htmlContext = '<view id="' + view_id + '" class="activeObject" onclick="activateTargetMesh(this,id)">' + objectNameStr +'X:<input type="text" value="'+position.x+'"/>'+'Y:<input type="text" value="'+position.y+'"/>'+'Z:<input type="text" value="'+position.z+'"/></view>';
    // let panel = document.getElementById("objectContainerView");
    // panel.innerHTML += htmlContext;
    KeyFrameTrack();
}

function activateTargetMesh(curr_element, id) {
    // var id = event.currentTarget.getAttribute('id');
    // var curr_element = document.getElementById(id);
    makeUnActive();
    curr_element.className = 'activeObject';
    var objectUUid = id.split("|")[0];
    var objectName = id.split("|")[1];
    curr_mesh = scene.getObjectByName(objectName);
    console.log(curr_mesh, curr_mesh.material, curr_mesh.material.map);
}

function getCurrentElement() {
    return document.getElementById(event.currentTarget.getAttribute('id'));
}

function makeUnActive() {
    console.log($(".activeObject"));
    let activeElement = document.getElementsByClassName('activeObject').item(0);
    if (activeElement != null) {
        activeElement.setAttribute('class', 'unActiveObject')
    }
}

function removeObject() {
    let id = curr_mesh.getElementId();
    document.getElementById(id).remove();
    group.remove(curr_mesh);
}

window.onresize = function () {
    var canvas_rect = getElementRectById('webglcanvas');
    renderer.setSize(canvas_rect.width, canvas_rect.height);
    camera.aspect = canvas_rect.width / canvas_rect.height;
    camera.updateProjectionMatrix();
};

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


function KeyFrameTrack() {
    var times = [0, 5, 10, 15, 20];
    var values = [0, 0, 0, 150, 0, 0, 0, 100, 0, 0, 0, 0, 0, 200, 0];
    var posTrack = new THREE.KeyframeTrack(curr_mesh.name + '.position', times, values);
    var colorTrack = new THREE.KeyframeTrack(curr_mesh.name + '.material.color', [10, 20], [1, 0, 0, 0, 0, 1]);
    var scaleTrack = new THREE.KeyframeTrack(curr_mesh.name + '.scale', [0, 20], [1, 1, 1, 3, 3, 3]);
    var duration = 20;
    var clip = new THREE.AnimationClip("default剪辑clip对象", duration, [posTrack, colorTrack, scaleTrack]);
    mixer = new THREE.AnimationMixer(group);
    AnimationAction = mixer.clipAction(clip);
    AnimationAction.timeScale = 3;
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

function animate() {
    // 请求运动帧
    requestAnimationFrame(animate);
    render()
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
        // if(i>=points.length){
        //   i=0;
        // }
        // let point = points[i++];
        // console.log(point);
        // curr_mesh.position.set(point.x,point.y,point.z);
        // curr_mesh.position.x = point.x;
        // curr_mesh.position.y = point.y;
        // curr_mesh.position.z = point.z;
        // curr_mesh.position.y += 1;
        // curr_mesh.position.x +=1;
        mixer.update(clock.getDelta());
    }

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