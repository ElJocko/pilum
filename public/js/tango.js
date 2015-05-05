var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

function getRandomColor() {
    return colors[Math.round(Math.random() * 5)];
}

function tango(layer) {
    for(var n = 0; n < layer.getChildren().length; n++) {
        var color = Kinetic.Util.getRGB(getRandomColor());
        var shape = layer.getChildren()[n];
        var stage = shape.getStage();
        var radius = Math.random() * 100 + 20;

        new Kinetic.Tween({
            node: shape,
            duration: 1,
            x: Math.random() * stage.width(),
            y: Math.random() * stage.height(),
            rotation: Math.random() * 360,
            radius: radius,
            opacity: (radius - 20) / 100,
            easing: Kinetic.Easings.EaseInOut,
            fillRed: color.r,
            fillGreen: color.g,
            fillBlue: color.b
        }).play();
    }
}
var stage = new Kinetic.Stage({
    container: 'container',
    width: 600,
    height: 600
});

var layer = new Kinetic.Layer();

for(var n = 0; n < 10; n++) {
    var radius = Math.random() * 100 + 20;
    var color = Kinetic.Util.getRGB(getRandomColor());
    var shape = new Kinetic.Rect({
        width: Math.random() * stage.getWidth(),
        height: Math.random() * stage.getHeight(),
        fillRed: color.r,
        fillGreen: color.g,
        fillBlue: color.b,
        opacity: 1.0,
        draggable: true
    });

    layer.add(shape);
}

stage.add(layer);

document.getElementById('tango').addEventListener(
    'click',
    function () {
        tango(layer);
    },
    false);