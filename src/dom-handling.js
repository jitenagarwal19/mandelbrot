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
        initSelectOptions();
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
    this.getCanvasContext = function () {
        return mandelbrotCanvas.getContext('2d');
    }
    this.clearCanvas = function () {
        this.getCanvasContext().clearRect(0, 0, mandelbrotCanvas.width, mandelbrotCanvas.height);
    }
    this.showElementById = function (elementId, shouldShow) {
        var element = document.getElementById(elementId);
        if (element) {
            element.style.display = shouldShow ? '' : 'none';
        }
    }
    this.drawOnCanvas = function (x, y, scaleFactor, color) {
        var context = this.getCanvasContext();
        context.beginPath();
        context.rect(scaleFactor * x, scaleFactor * y, scaleFactor, scaleFactor);
        context.fillStyle = color;
        context.fill();
    }
    function getValueById(documentId) {
        if (document.getElementById(documentId)) {
            return document.getElementById(documentId).value;
        }
    }
    this.getMandelbrotParamsFromUI = function () {
        return {
            Iiteration: getValueById(DOM_ID.INFINITY_ITERATION_FIELD),
            XYiteration: getValueById(DOM_ID.SLIDER),
            radius: getValueById(DOM_ID.RADIUS_FIELD),
            colorScheme: getValueById(DOM_ID.COLOR_SCHEME_SELECT)
        }

    }
    this.validateFields = function () {
        var message = ""

        if (!getValueById(DOM_ID.INFINITY_ITERATION_FIELD)) {
            message = "Please enter an appropiate value in Escape Iteration Field";
        } else if (getValueById(DOM_ID.INFINITY_ITERATION_FIELD) <= 0) {
            message = "Please enter a positive value in Escape Iteration Field";
        } else if (!getValueById(DOM_ID.RADIUS_FIELD)) {
            message = "Please enter an appropiate value in Escape Radius Field";
        }
        if (message) {
            alert(message);
            return false;
        }
        return true;
    }
    var initSelectOptions = function () {
        var selectNode = document.getElementById(DOM_ID.COLOR_SCHEME_SELECT);
        var optionNode, textNode;
        if (selectNode) {
            for (key in colorSchemeMapping) {
                optionNode = document.createElement("option");
                textNode = document.createTextNode(colorSchemeMapping[key].text);
                optionNode.appendChild(textNode);
                optionNode.setAttribute("value", key);
                selectNode.appendChild(optionNode);
            }
        }
    }
    init();

}