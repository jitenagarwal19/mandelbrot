



var colorArray = [];
var domManipulation;
function onBodyLoad() {
    showElementById('loader', false);
    domManipulation = new DomManipulation();
    colorArray = colorUtilitiesMethod.generateColors(256);
    // initUI();
}

function showElementById(elementId, shouldShow) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style.display = shouldShow ? '' : 'none';
    }
}


function getContext() {
    return domManipulation.getMandelbrotCanvas().getContext('2d');
}

function getScaleFactor(XYiteration) {
    var canvasHeight = domManipulation.getMandelbrotCanvas().height;
    var canvasWidth = domManipulation.getMandelbrotCanvas().width;
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

function getMagnitudeOfComplex(zx, zy) {
    return Math.sqrt(zx * zx + zy * zy);
}

function getColor(escapeCount, smoothColor) {
    var params = {
        escapeCount: escapeCount,
        smoothColor: smoothColor,
        Iiteration: mandelbrotParams.Iiteration,
    }
    if (mandelbrotParams.colorScheme) {
        return colorSchemeMapping[mandelbrotParams.colorScheme].method(params);
    }

}
function drawMandelbrot() {
    var x, y;
    var i = 0;
    var XYiteration = mandelbrotParams.XYiteration;
    var Iiteration = mandelbrotParams.Iiteration;
    var radius = mandelbrotParams.radius;
    var denominator = getDenominator(radius, XYiteration);
    var zMagnitude;
    domManipulation.clearCanvas();
    getScaleFactor();
    for (x = 0; x < XYiteration; x++) {
        for (y = 0; y < XYiteration; y++) {
            cx = -1 * radius + x / denominator;
            cy = -1 * radius + y / denominator;
            i = 0;
            zx = 0;
            zy = 0;
            smoothColor = Math.exp(-1 * getMagnitudeOfComplex(cx, cx))
            do {
                xt = 2 * zx * zy;
                zx = zx * zx - zy * zy + cx;
                zy = xt + cy;
                zMagnitude = (zx * zx + zy * zy);
                i++;
                smoothColor += Math.exp(-1 * getMagnitudeOfComplex(zx, zy))
            } while (i < Iiteration && zMagnitude < (radius * radius));
            drawOnCanvas(x, y, getScaleFactor(XYiteration), getColor(i, smoothColor));
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
    if (document.getElementById(DOM_ID.COLOR_SCHEME_SELECT) && document.getElementById(DOM_ID.COLOR_SCHEME_SELECT).value) {
        mandelbrotParams.colorScheme = document.getElementById(DOM_ID.COLOR_SCHEME_SELECT).value;
    }
    console.log('color scheme selected ' + mandelbrotParams.colorScheme);
}
var drawMandelbrotButtonPressed = function () {
    if (isDrawingInProgress) {
        isDrawingInProgress = false;
        fillMandelbrotParamsFromUI();
        mandelbrotDrawStarted();
        setTimeout(drawMandelbrot, 100);
        isDrawingInProgress = true;
    }
}