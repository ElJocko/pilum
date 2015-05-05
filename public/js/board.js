window.graphicModule = window.graphicModule || {};
window.graphicModule.board = (function () {

    'use strict';

    var colors = ['red', 'blue', 'yellow', 'green', 'orange', 'purple'];

    var baseSizes = [
        {width: 40, height: 15},
        {width: 40, height: 20},
        {width: 40, height: 30},
        {width: 40, height: 40}
    ];

    function getRandomColor() {
        return colors[Math.round(Math.random() * 1)];
    }

    function getRandomBaseSize() {
        return baseSizes[Math.round(Math.random() * 3)];
    }

    function init(count) {
        for (var n = 0; n < count; n++) {
            var color = Kinetic.Util.getRGB(getRandomColor());
            var baseSize = getRandomBaseSize();
            var shape = new Kinetic.Rect({
                id: n,
                x: Math.random() * stage.width(),
                y: Math.random() * stage.height(),
                width: baseSize.width,
                height: baseSize.height,
                fillRed: color.r,
                fillGreen: color.g,
                fillBlue: color.b,
                opacity: 1.0,
                draggable: true
            });

            shape.on('dragstart', function(event) {
                console.log('drag start');
            });

            shape.on('dragmove', function(event) {
                var dragShape = event.target;
                var dragId = dragShape.getId();
                for (var n = 0; n < layer.getChildren().length; n++) {
                    var testShape = layer.getChildren()[n];
                    var testId = testShape.getId();
                    if (dragShape.getId() !== testShape.getId()) {
                        if (window.graphicModule.moveUtils.detectCollision(dragShape, testShape)) {
                            dragShape.setDraggable(false);
                            console.log('COLLISION');
                        }
                    }
                }
            });
            shape.on('dragend', function(event) {
                console.log('drag end');
            });

            layer.add(shape);
        }

        stage.add(layer);
    }

    function tango() {
        for (var n = 0; n < layer.getChildren().length; n++) {
            var color = Kinetic.Util.getRGB(getRandomColor());
            var shape = layer.getChildren()[n];
            var stage = shape.getStage();
            var radius = Math.random() * 100 + 20;

            new Kinetic.Tween({
                node: shape,
                duration: 1,
                x: Math.random() * stage.width(),
                y: Math.random() * stage.height(),
//                rotation: Math.random() * 360,
                radius: radius,
//                opacity: (radius - 20) / 100,
                easing: Kinetic.Easings.EaseInOut,
//                fillRed: color.r,
//                fillGreen: color.g,
//                fillBlue: color.b
            }).play();
        }
    }

    var stage = new Kinetic.Stage({
        container: 'container',
        width: 800,
        height: 800
    });

    var layer = new Kinetic.Layer();

    return {
        init: init,
        tango: tango
    };

}());