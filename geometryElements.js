let geometryElements = {
    'ball':
        {
            src: "./img/ball.png",
            createFunction: function () {
                curr_mesh = new THREE.Mesh(new THREE.SphereGeometry(earth_radius, WIDTH_SEGMENTS, HEIGHT_SEGMENTS), new THREE.MeshBasicMaterial({color: getRendomColor()}));
                let objectNameStr = "Ball";
                return objectNameStr;
            }
        }
    ,
    'cube':
        {
            src: "./img/cube.png",
            createFunction: function () {
                curr_mesh = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50));
                return "Cube";
            }
        },
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
            curr_mesh = new THREE.Line(geometry);
            return "Ring"
        }
    }

// {
//     src: "./img/iconfont%20icon-ditu.png",
//     name: 'Triangle',
//     data_type: "",
// },
// {
//     src: "./img/iconfont%20icon-shebei.png",
//     name: 'triangle',
//     data_type: "",
// }
};