var DOM_ID = {
    INFINITY_ITERATION_FIELD:'infinity_iteration_field',
    ITERATION_FIELD:'iteration_field',
    RADIUS_FIELD:'radius_field',
    MANDELBROT_CANVAS:'mandelbrot_canvas',
    LOADER:'loader',
    SLIDER:'slider',
};
var mandelbrotCanvas = document.getElementById(DOM_ID.MANDELBROT_CANVAS);
var mandelbrotParams = {
    XYiteration:320,
    Iiteration:200,
    radius:2,
}


function onBodyLoad() {
    showElementById('loader', false);
    initUI();
}
function setUpSlider() {
    document.getElementById('slider').setAttribute('min', '100');
    document.getElementById('slider').setAttribute('max', '1000');
    document.getElementById('slider').setAttribute('step', '50');
    document.getElementById('slider').setAttribute('value', '500');

}
function initUI() {
    document.getElementById(DOM_ID.INFINITY_ITERATION_FIELD).value = mandelbrotParams.XYiteration.toString();
    document.getElementById(DOM_ID.RADIUS_FIELD).value = mandelbrotParams.radius.toString();
    setUpSlider()
}
function showElementById(elementId, shouldShow) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style.display = shouldShow ? '' : 'none';
    }
}


function getContext() {
    return mandelbrotCanvas.getContext('2d');
}
function getColorString(i) {
    var color = i.toString(16);
    return "#" + color + color + color;
}
function getScaleFactor(XYiteration) {
    var canvasHeight = mandelbrotCanvas.height;
    var canvasWidth = mandelbrotCanvas.width;
    var minDimension = (canvasWidth > canvasHeight) ? canvasHeight : canvasWidth;
    return minDimension / XYiteration;

}
function getDenominator(radius, XYiteration) {
    return (XYiteration / radius) / 2;
}
function drawOnCanvas(x, y, scaleFactor, color) {
    
    var context = getContext();
    context.beginPath();
    context.rect(scaleFactor * x, scaleFactor * y, scaleFactor, scaleFactor);
    context.fillStyle = color;
    context.fill();
}

function drawMandelbrot() {
    var x, y;
    var i = 0;
    var XYiteration = mandelbrotParams.XYiteration;
    var Iiteration = mandelbrotParams.Iiteration;
    var radius = mandelbrotParams.radius;
    var denominator = getDenominator(radius, XYiteration);

    getScaleFactor();
    for (x = 0; x < XYiteration; x++) {
        for (y = 0; y < XYiteration; y++) {
            cx = -1 * radius + x / denominator;
            cy = -1 * radius + y / denominator;
            i = 0;
            zx = 0;
            zy = 0;
            do {
                xt = 2 * zx * zy;
                zx = zx * zx - zy * zy + cx;
                zy = xt + cy;
                i++;
            } while (i < 255 && (zx * zx + zy * zy) < (radius * radius));

            drawOnCanvas(x, y, getScaleFactor(XYiteration), getColorString(i));
        }
    }
    mandelbrotDrawCompleted();
}

var isDrawingInProgress = true;
function mandelbrotDrawStarted() {
    showElementById(DOM_ID.LOADER, true);
}
function mandelbrotDrawCompleted() {    
    showElementById(DOM_ID.LOADER, false);
}
function fillMandelbrotParamsFromUI() {
    if (document.getElementById(DOM_ID.INFINITY_ITERATION_FIELD) && document.getElementById(DOM_ID.INFINITY_ITERATION_FIELD).value) {
        mandelbrotParams.Iiteration = document.getElementById(DOM_ID.INFINITY_ITERATION_FIELD).value;
    }
    if (document.getElementById(DOM_ID.SLIDER) && document.getElementById(DOM_ID.SLIDER).value) {
        mandelbrotParams.XYiteration = document.getElementById(DOM_ID.SLIDER).value;
    }
    if (document.getElementById(DOM_ID.RADIUS_FIELD) && document.getElementById(DOM_ID.RADIUS_FIELD).value) {
        mandelbrotParams.radius = document.getElementById(DOM_ID.RADIUS_FIELD).value;
    }
    console.log('slider value ' + document.getElementById('slider').value);   
}
var drawMandelbrotButtonPressed = function () {
    if (isDrawingInProgress) {
        isDrawingInProgress = false;
        fillMandelbrotParamsFromUI();
        console.log('hey there')
        mandelbrotDrawStarted();
        
        setTimeout(drawMandelbrot, 100);
        
        console.log('hey there1231')
        isDrawingInProgress = true;
    }
}