var DOM_ID = {
    INFINITY_ITERATION_FIELD: 'infinity_iteration_field',
    ITERATION_FIELD: 'iteration_field',
    RADIUS_FIELD: 'radius_field',
    MANDELBROT_CANVAS: 'mandelbrot_canvas',
    COLOR_SCHEME_SELECT: 'color_scheme_select',
    LOADER: 'loader',
    SLIDER: 'slider',
};
var mandelbrotParams = {
    XYiteration: 320,
    Iiteration: 200,
    radius: 2,
};
var DomManipulation = function () {
    var mandelbrotCanvas;

    function init() {
        mandelbrotCanvas = document.getElementById(DOM_ID.MANDELBROT_CANVAS);
        document.getElementById(DOM_ID.INFINITY_ITERATION_FIELD).value = mandelbrotParams.XYiteration.toString();
        document.getElementById(DOM_ID.RADIUS_FIELD).value = mandelbrotParams.radius.toString();
        setUpSlider();
    }
    function setUpSlider() {
        var slider = document.getElementById(DOM_ID.SLIDER);
        if (slider) {
            slider.setAttribute('min', '100');
            slider.setAttribute('max', '1000');
            slider.setAttribute('step', '50');
            slider.setAttribute('value', '500');
        }
    }
    this.getMandelbrotCanvas = function () {
        return mandelbrotCanvas;
    }
    this.getCanvasContext = function() {
        return mandelbrotCanvas.getContext('2d');
    }
    this.clearCanvas = function() {
        this.getCanvasContext().clearRect(0, 0, mandelbrotCanvas.width, mandelbrotCanvas.height);
    }
    init();

}