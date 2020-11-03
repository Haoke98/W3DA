let geometryElements = {
    'cube':
        {
            src: "./img/cube.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
                newMesh.name = "Cube";
                return newMesh;
            }
        },

    'ball':
        {
            src: "./img/ball.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.SphereGeometry(earth_radius, WIDTH_SEGMENTS, HEIGHT_SEGMENTS), new THREE.MeshBasicMaterial({color: getRendomColor()}));
                newMesh.name = "Ball";
                return newMesh;
            }
        }
    ,
    'Ring': {
        src: "./img/ring.png",
        createFunction: function () {
            var geometry = new THREE.Geometry(); //声明一个几何体对象Geometry
            //参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
            var arc = new THREE.ArcCurve(0, 0, 100, 0, 2 * Math.PI);
            //getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
            var points = arc.getPoints(50);//分段数50，返回51个顶点
            // setFromPoints方法从points中提取数据改变几何体的顶点属性vertices
            geometry.setFromPoints(points);
            //线条模型对象
            var newMesh = new THREE.Line(geometry);
            newMesh.name = "Ring";
            return newMesh;
        }
    }

    ,
    'Cylinder':
        {
            src: "./img/cylinder.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
                newMesh.name = "Cylinder";
                return newMesh;
            }
        },
    'Yuanzhui':
        {
            src: "./img/yuanzhui.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
                newMesh.name = "Yuanzhui";
                return newMesh;
            }
        },
    'Yuanbing':
        {
            src: "./img/yuanbing.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
                newMesh.name = "Yuanbing";
                return newMesh;
            }
        },
    'Quxian':
        {
            src: "./img/quxian.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
                newMesh.name = "Quxian";
                return newMesh;
            }
        },
    'Zhixian':
        {
            src: "./img/zhixian.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
                newMesh.name = "Zhixian";
                return newMesh;
            }
        },
    'Square':
        {
            src: "./img/square.png",
            createFunction: function () {
                var newMesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
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
            var newMesh = new THREE.Line(geometry);
            newMesh.name = "Ring2";
            return newMesh;
        }
    }

};