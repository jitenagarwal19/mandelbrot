var mandelbrotCanvas = document.getElementById('mandelbrotCanvas');

function getContext() {
    return mandelbrotCanvas.getContext('2d');
}
function getColorString(i) {
    var color = i.toString(16);
    return "#" + color + color + color;
}
function drawOnCanvas(x, y, scaleFactor ,color) {
    console.log('drawing x = ' + x + ' y = ' + y + ' color ' + color);
    var context = getContext();
    context.beginPath();
    context.rect(scaleFactor * x, scaleFactor * y, scaleFactor, scaleFactor);
    context.fillStyle = color;
    context.fill();
}

function drawMandelbrot() {
    var x, y;
    var i = 0;
    var XYiteration = 200;
    var Iiteration = 255;
    var denominator = 50;
    var scaleFactor = 4;
    for (x = 0; x < XYiteration; x++) {
        for (y = 0; y < XYiteration; y++) {
            cx = -2 + x / denominator;
            cy = -2 + y / denominator;
            i = 0;
            zx = 0;
            zy = 0;
            do {
                xt = 2 * zx * zy;
                zx = zx * zx - zy * zy + cx;
                zy = xt + cy;
                i++;
            } while (i < 255 && (zx * zx + zy * zy) < 4);
            
            drawOnCanvas(x, y, scaleFactor, getColorString(i));
        }
    }
}