function createSpriteText(text, fontColor, fontSize) {
    //先用画布将文字画出
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    // ctx.fillStyle = "#ffa905";
    ctx.fillStyle = fontColor;
    ctx.font = "Bold " + fontSize + " Arial";
    ctx.lineWidth = 4;
    ctx.fillText(text, 4, 104);
    let texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    //使用Sprite显示文字
    let material = new THREE.SpriteMaterial({map: texture});
    let textObj = new THREE.Sprite(material);
    textObj.scale.set(0.5 * 100, 0.25 * 100, 0.75 * 100);
    textObj.position.set(0, 0, 98);
    return textObj;
}


