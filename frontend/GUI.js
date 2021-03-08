function setCurrObject(currObject) {
    $("#curr_object_panel").click();
}


function activeRenderer() {
    console.log("activated");
    if (activeRender) {

    } else {
        activeRender = !activeRender;
        setTimeout(function () {
            activeRender = !activeRender
        }, 50)
    }
}