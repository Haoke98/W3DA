// let loader = new THREE.TextureLoader();
let curr_texture = "https://mmbiz.qlogo.cn/mmbiz_jpg/lBSHibv6GicCZ6Qy6pPpoJOoVbzP7o4uUpwnO62dic1C9Iz5du3jhxGNPaY5SVxm93eP46d2uUCnTvFmhTibHrDzpg/0?wx_fmt=jpeg";

function MyMesh(geometry, material) {
    THREE.Mesh.call(this, a = geometry, b = material);
    this.MaterialMapURL = null;
    this.setMaterialMap_url = function (string_url) {
        this.MaterialMapURL = string_url;
        loader.load(curr_texture, function (texture) {
            curr_mesh.material = new THREE.MeshBasicMaterial({map: texture});
        });
    }
    // this.isObject3D = true;
    // this.updateMorphTargets();
}