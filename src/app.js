var domManipulation;
function onBodyLoad() {
    domManipulation = new DomManipulation();
    domManipulation.showElementById('loader', false);
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
            domManipulation.drawOnCanvas(x, y, getScaleFactor(XYiteration), getColor(i, smoothColor));
        }
    }

    mandelbrotDrawCompleted();
}

var isDrawingInProgress = true;
function mandelbrotDrawStarted() {
    domManipulation.showElementById(DOM_ID.LOADER, true);
}
function mandelbrotDrawCompleted() {
    domManipulation.showElementById(DOM_ID.LOADER, false);
}
function fillMandelbrotParamsFromUI() {
    mandelbrotParams = domManipulation.getMandelbrotParamsFromUI();
}
var drawMandelbrotButtonPressed = function () {
    if (isDrawingInProgress) {
        isDrawingInProgress = false;
        fillMandelbrotParamsFromUI();
        if (colorSchemeMapping[mandelbrotParams.colorScheme].init)
            colorSchemeMapping[mandelbrotParams.colorScheme].init();
        if (domManipulation.validateFields()) {
            mandelbrotDrawStarted();
            setTimeout(drawMandelbrot, 100);
            isDrawingInProgress = true;
        }
    }
}