var canvasWidth;
var canvasHeight;

var canvas;
var draw;

$(function () {
    canvasWidth = $(window).width();
    // Canvas was extending beyond the browser window for whatever reason
    // band-aid fix
    canvasHeight = $(window).height()-($(".form-row").height() + 12);

    canvas = $("canvas");
    draw = canvas[0].getContext('2d');

    canvas.attr({"width": canvasWidth, "height": canvasHeight});

    drawFunction();
    $(".advanced").hide();
});

// Function that maps a point in a specific range to a new point in
// another range
function convertToRange(min, max, newMin, newMax, point) {
    var m = (newMax-newMin)/(max-min);

    return (((m * point) + newMin) - (m * min));
}

function getTrigFunctionOf(value) {
    var a = parseFloat($("#a").val());
    var b = parseFloat($("#b").val());
    var c = parseFloat($("#c").val());
    var d = parseFloat($("#d").val());
    var trigFunction = $("#function").val();

    // If the trigFunction matches 'sin'
    if (!trigFunction.localeCompare("sin")) {
        return (a*(Math.sin(b*(value-c)))) + d;
    } else {
        return (a*(Math.cos(b*(value-c)))) + d;
    }
}

function drawFunction() {
    // TODO: Check these values are actual numbers
    var rangeMin = parseFloat($("#rangeMin").val());
    var rangeMax = parseFloat($("#rangeMax").val());
    var domMin = parseFloat($("#domMin").val());
    var domMax = parseFloat($("#domMax").val());

    // Accuracy is how many lines are drawn in total
    var accuracy = $("#accuracy").val();

    draw.clearRect(0, 0, canvas[0].width, canvas[0].height);

    draw.beginPath();

    for (var i = 0; i <= accuracy; i++) {
        // Divide the range up into equal parts, and draw lines to these points and their
        // sine values
        var point_x = i * (canvasWidth/accuracy);

        // First map the current x position to where it would be in the range [domMin, domMax],
        // find the sine value of this newly mapped value, and then map the sine value
        // to a value in the range of the canvas.
        var point_y = convertToRange(rangeMin, rangeMax, 0, canvasHeight, getTrigFunctionOf(convertToRange(0, canvasWidth, domMin, domMax, point_x)));

        // If this is the first point, it is at the origin and thus there is no line
        // to draw yet
        if (i === 0) {
            draw.moveTo(point_x, point_y);
        } else {
            draw.lineTo(point_x, point_y);
        }
    }

    draw.stroke();
}

function toggleAdvancedSettings() {
    $(".advanced").slideToggle("slow");
}