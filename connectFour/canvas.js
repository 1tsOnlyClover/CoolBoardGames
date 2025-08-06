const connectFourCanvas = document.getElementById("connectFourCanvas");
const ctx = connectFourCanvas.getContext("2d");
ctx.fillStyle = "#139F9F";
ctx.fillRect(0, 0, connectFourCanvas.width, connectFourCanvas.height);


function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    console.log("x: " + x + " y: " + y)
    return { x: x, y: y }
}


connectFourCanvas.addEventListener('click', function(e) {
    const pos = getCursorPosition(connectFourCanvas, e)
    console.log("Cursor Position: ", pos)
    console.log(pos.x, pos.y)
    switch (pos.x) {
        case pos.x < 100:
            console.log("Added token to column 0");
            // break;
        case pos.x < 200:
            console.log("Added token to column 1");
            // break;
        case pos.x < 300:
            console.log("Added token to column 2");
            // break;
        case pos.x < 400:
            console.log("Added token to column 3");
            // break;
        case pos.x < 500:
            console.log("Added token to column 4");
            // break;
        case pos.x < 600:
            console.log("Added token to column 5");
            // break;
        case pos.x < 700:
            console.log("Added token to column 6");
            // break;
    }
})


// ctx.clearRect(0, 0, connectFourCanvas.width, connectFourCanvas.height);