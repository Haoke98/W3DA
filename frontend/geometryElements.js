let earthRadius = 50;
let geometryElements = {
    'cube':
        {
            src: "./img/cube.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(earthRadius * 2, earthRadius * 2, earthRadius * 2),new THREE.MeshLambertMaterial({color: getRendomColor()}));
                newMesh.name = "Cube";
                return newMesh;
            }
        },

    'ball':
        {
            src: "./img/ball.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.SphereGeometry(earthRadius, WIDTH_SEGMENTS, HEIGHT_SEGMENTS), new THREE.MeshLambertMaterial({color: getRendomColor()}));
                newMesh.name = "Ball";
                return newMesh;
            }
        }
    ,
    'Circle': {
        src: "./img/ring.png",
        createFunction: function () {
            // var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
            // //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
            // var arc = new THREE.ArcCurve(0, 0, earthRadius, 0, 2 * Math.PI);
            // //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
            // var points = arc.getPoints(50);//分段数50，返回51个顶点
            // // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
            // geometry.setFromPoints(points);
            // //线条模型对象
            // var newMesh = new THREE.Line(geometry,new THREE.MeshLambertMaterial({color: getRendomColor()}));
            // newMesh.name = "Ring";
            // return newMesh;
            var geometry = new THREE.CircleBufferGeometry( Math.random()*100, Math.random()*32 );
            var material = new THREE.MeshLambertMaterial({color: getRendomColor()}) ;
            var circle = new THREE.Mesh( geometry, material );
            circle.name = "Circle";
            return circle
        }
    }

    ,
    'Cylinder':
        {
            src: "./img/cylinder.png",
            createFunction: function () {
                var geometry = new THREE.CylinderGeometry( Math.random()*50, Math.random()*50, Math.random()*50, Math.random()*50 );
                var material = new THREE.MeshLambertMaterial({color: getRendomColor()});
                var cylinder = new THREE.Mesh( geometry, material );
                cylinder.name = "Cylinder";
                return cylinder;
            }
        },
    'Cone':
        {
            src: "./img/yuanzhui.png",
            createFunction: function () {
                var geometry = new THREE.ConeGeometry( Math.random()*100, Math.random()*100, Math.random()*32,Math.random()*32 );
                var material = new THREE.MeshLambertMaterial({color: getRendomColor()});
                var cone = new THREE.Mesh( geometry, material );
                cone.name = "Cone"
                return cone;
            }
        },
    'Yuanbing':
        {
            src: "./img/yuanbing.png",
            createFunction: function () {
                var geometry = new THREE.CircleBufferGeometry( Math.random()*70, Math.random()*32 );
                var material = new THREE.MeshLambertMaterial({color: getRendomColor()}) ;
                var circle = new THREE.Mesh( geometry, material );
                circle.name = "Yuanbing"
                return circle;
            }
        },
    'Dodechadron':
        {
            src: "./img/quxian.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(Math.random()*50, Math.random()*50),new THREE.MeshLambertMaterial({color: getRendomColor()}));
                newMesh.name = "Dodechadron";
                return newMesh;
            }
        },
    'Zhixian':
        {
            src: "./img/zhixian.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50),new THREE.MeshLambertMaterial({color: getRendomColor()}));
                newMesh.name = "Zhixian";
                return newMesh;
            }
        },
    'Square':
        {
            src: "./img/square.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50),new THREE.MeshLambertMaterial({color: getRendomColor()}));
                newMesh.name = "Square";
                return newMesh;
            }
        },
    'Ring2': {
        src: "./img/ring_1.png",
        createFunction: function () {
            var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
            //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
            var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
            //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
            var points = arc.getPoints(50);//分段数50，返回51个顶点
            // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
            geometry.setFromPoints(points);
            //线条模型对象
            var newMesh = new THREE.Line(geometry,new THREE.MeshLambertMaterial({color: getRendomColor()}));
            newMesh.name = "Ring2";
            return newMesh;
        }
    },
    'AmbientLight':{
        src:"./img/ambientLight.png",
        createFunction:function () {
            var light= new THREE.AmbientLight();
            light.name = "AmbientLight";
            return light;
        }
    },
    'PointLight':{
        src:"./img/pointLight.png",
        createFunction:function () {
            var group = new THREE.Group();
            var light = new THREE.PointLight();
            var helper = new THREE.PointLightHelper(light);
            group.add(light);
            group.add(helper);
            group.name = "PointLight";
            return group;
        }
    },
    'DirectionLight':{
        src:'./img/directionLight(1).png',
        createFunction:function () {
            var group = new THREE.Group();
            var light = new THREE.DirectionalLight();
            var helper = new THREE.DirectionalLightHelper(light);
            group.add(light);
            group.add(helper);
            group.name = "DirectionalLight";
            return group;
        }
    },
    'SpotLight':{
        src:'./img/spotLight.png',
        createFunction:function () {
            var group = new THREE.Group();
            var light = new THREE.SpotLight();
            var helper = new THREE.SpotLightHelper(light);
            group.add(light);
            group.add(helper);
            group.name = "SpotLight";
            return group;
        }
    }

};
function initGeometryElements(container_id, elements_dic) {
    let container = document.getElementById(container_id);
    let innerHTMLContext = "";
    for (key in elements_dic) {
        innerHTMLContext += '<view class="geometry" onclick="CreateGeometry(dataset.key)" data-key="' + key + '"><img class="geometry" src="' + elements_dic[key].src + '" title="'+key+'">' + key + '</view>';
    }
    container.innerHTML = innerHTMLContext;
}
function initGeometryElements2(container_id, elements_dic) {
    let container = document.getElementById(container_id);
    let innerHTMLContext = "";
    for (key in elements_dic) {
        innerHTMLContext += '<img src="' + elements_dic[key].src + '" onclick="CreateGeometry(dataset.key)" data-key="' + key + '" title="'+key+'">';
    }
    container.innerHTML = innerHTMLContext;
}


function getRandomMaterial(){

}
