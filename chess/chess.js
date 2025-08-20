var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");

// Draw the chessboard
function drawBoard() {
    var colors = ["#eee", "#ddd"];
    for (var row = 0; row < 8; row++) {
        for (var col = 0; col < 8; col++) {
            ctx.fillStyle = colors[(row + col) % 2];
            ctx.fillRect(col * 100, row * 100, 100, 100);
        }
    }
}

drawBoard();