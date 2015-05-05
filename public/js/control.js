window.onload = function () {
    window.graphicModule.board.init(12);

    document.getElementById('tango').addEventListener(
        'click',
        function () {
            window.graphicModule.board.tango();
        },
        false);
}