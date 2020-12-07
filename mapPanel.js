function initMap() {
    var xhr = new XMLHttpRequest();//第一步：建立所需的对象
    xhr.open('GET', '/W3DA/getMaps', true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
    xhr.send();//第三步：发送请求  将请求参数写在URL中
    /**
     * 获取数据后的处理程序
     */
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var json = JSON.parse(xhr.responseText);//获取到json字符串，还需解析
            console.log(json, json.objects);
            initPanel("mapsContainerView", json.objects, function (panelElement) {
                return '<view onclick="changeTexture(dataset.src)" data-src="' + panelElement.src + '"><img src="' + panelElement.src + '">' + panelElement.name + '</view>';
            });
        }
    };
}

let SELECTED_ORIGINAL_MATERIAL_URL;

function changeTexture(src) {
    // src = src.toString().split('.cn/')[1];
    src = window.location.origin + src;
    console.log(window.location, src);
    // let tempMesh = new THREE.Mesh(new THREE.CubeGeometry(50,50,50));
    // tempMesh.setMaterialMap_url(absolute_src);
    // SELECTED.setMaterialMap_url(absolute_src);
    // console.log("this is temp material:",tempMesh.material);
    // SELECTED_ORIGINAL_MATERIAL = tempMesh.material;
    SELECTED_ORIGINAL_MATERIAL_URL = src;
}
