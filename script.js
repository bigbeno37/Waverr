var canvasWidth;
var canvasHeight;

var canvas;
var draw;

var rangeMin, rangeMax;
var domMin, domMax;

var accuracy;

$(function () {
    canvasWidth = $(window).width();
    canvasHeight = $(window).height()-($(".form-row").height() + 10);

    canvas = $("canvas");
    draw = canvas[0].getContext('2d');

    canvas.attr({"width": canvasWidth, "height": canvasHeight});

    drawFunction();
});

function convertToRange(min, max, newMin, newMax, point) {
    var m = (newMax-newMin)/(max-min);

    console.log("Point " + point + " goes to " + (((m * point) + newMin) - (m * min)));

    return (((m * point) + newMin) - (m * min));
}

function getSineOf(value) {
    return Math.sin(value);
}

function drawFunction() {
    // TODO: Check these values are actual numbers
    rangeMin = parseFloat($("#rangeMin").val());
    rangeMax = parseFloat($("#rangeMax").val());
    domMin = parseFloat($("#domMin").val());
    domMax = parseFloat($("#domMax").val());
    accuracy = $("#accuracy").val();

    points = [];
    draw.clearRect(0, 0, canvas[0].width, canvas[0].height);

    draw.beginPath();

    for (var i = 0; i <= accuracy; i++) {
        var point_x = i * (canvasWidth/accuracy);
        var point_y = convertToRange(rangeMin, rangeMax, 0, canvasHeight, getSineOf(convertToRange(0, canvasWidth, domMin, domMax, point_x)));

        if (i === 0) {
            draw.moveTo(point_x, point_y);
        } else {
            draw.lineTo(point_x, point_y);
        }
    }

    draw.stroke();
}