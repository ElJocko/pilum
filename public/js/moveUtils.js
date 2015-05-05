window.graphicModule = window.graphicModule || {};
window.graphicModule.moveUtils = (function () {

    function detectCollision(rectShape1, rectShape2) {
        // Assume no rotation for now
        var r1leftX = rectShape1.getX();
        var r1rightX = r1leftX + rectShape1.getWidth();
        var r1topY = rectShape1.getY();
        var r1bottomY = r1topY + rectShape1.getHeight();

        var r2leftX = rectShape2.getX();
        var r2rightX = r2leftX + rectShape2.getWidth();
        var r2topY = rectShape2.getY();
        var r2bottomY = r2topY + rectShape2.getHeight();

        if (r1rightX <= r2leftX || r1leftX >= r2rightX || r1topY >= r2bottomY || r1bottomY <= r2topY) {
            return false;
        }
        else {
            return true;
        }
    }

    return {
        detectCollision: detectCollision
    };

}());