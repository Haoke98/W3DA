let loader = new THREE.TextureLoader();

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