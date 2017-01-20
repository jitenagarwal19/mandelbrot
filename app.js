var DOM_ID = {
    INFINITY_ITERATION_FIELD: 'infinity_iteration_field',
    ITERATION_FIELD: 'iteration_field',
    RADIUS_FIELD: 'radius_field',
    MANDELBROT_CANVAS: 'mandelbrot_canvas',
    COLOR_SCHEME_SELECT: 'color_scheme_select',
    LOADER: 'loader',
    SLIDER: 'slider',
};
var mandelbrotCanvas = document.getElementById(DOM_ID.MANDELBROT_CANVAS);
var mandelbrotParams = {
    XYiteration: 320,
    Iiteration: 200,
    radius: 2,
};
 var colorSchemes = ['without_smoothing', 'with_smoothing', 'something_beautiful', 'surprise_me'];
var colorSchemeMapping = {
    without_smoothing :{ 
        text: "Without Smoothing",
    },
    with_smoothing:{
        text: "With Smoothing",
    },
    something_beautiful :{
        text:"Something Beautiful"
    },
    surprise_me: {
        text:"Surprise Me!"
    }

}
var colorUtilitiesMethod = {
    generateColors : function(){},
    getGrayScaleString : function(){},
    
}
var colorArray = [];
function generateColors(maxIter) {
    var r, g, b;
    for (var i = 0; i < maxIter; i++) {
        r = Math.floor(Math.random() * 255).toString(16);
        g = Math.floor(Math.random() * 255).toString(16);
        b = Math.floor(Math.random() * 255).toString(16);
        color = "#" + r + g + b;
        // console.log('color at ' + i + "  " + color);
        colorArray[i] = color;
    }
}

function onBodyLoad() {
    showElementById('loader', false);
    generateColors(256);
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
function calculateSmoothingValue(i, zMagnitude) {
    var smoothingValue = i + 1 - Math.log2(Math.log2(zMagnitude));
    if (smoothingValue >= 0 && smoothingValue <= 255) {
        return Math.floor(smoothingValue);
    }
}
function getMagnitudeOfComplex(zx, zy) {
    return Math.sqrt(zx * zx + zy * zy);
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    color = {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
    return '#' + color.r.toString(16) + color.r.toString(16) + color.r.toString(16);
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }

    return '#' + Math.round(r * 255).toString(16) + Math.round(g * 255).toString(16) + Math.round(b * 255).toString(16);


}
function getGrayScaleColor(escapeCount) {
    escapeCount = escapeCount / mandelbrotParams.Iiteration * 255;
    return getColorString(Math.floor(escapeCount));
}
function getSmoothedGrayScaleCole(escapeCount, smoothColor) {
    return getColorString(Math.floor(smoothColor * 255 / mandelbrotParams.Iiteration));
}

function getColor(escapeCount, smoothColor) {
   
    switch (mandelbrotParams.colorScheme) {
        case colorSchemes[0]:
            return getGrayScaleColor(escapeCount);
            break;
        case colorSchemes[1]:
            return getSmoothedGrayScaleCole(escapeCount, smoothColor);
            break;
        case colorSchemes[2]:
            smoothColor /= mandelbrotParams.Iiteration
            return HSVtoRGB(.45 + 10 * smoothColor, .8, .9)
            break;
        case colorSchemes[3]:
            return HSVtoRGB(.45 + 10 * smoothColor, 5, 100)
            break;

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
            // drawOnCanvas(x, y, getScaleFactor(XYiteration), HSVtoRGB(.45 + 10 * smoothColor, .8, .9));
            drawOnCanvas(x, y, getScaleFactor(XYiteration), getColor(i, smoothColor));
        }
    }
    getColor()
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