// 移动端适用
!(function (win) {
    var doc = win.document;
    var el = doc.documentElement;
    var designSize = 750;
    var ratio = designSize / 100;
    var resizeEvent = 'orientationchange' in win ? 'orientationchange' : 'resize';

    function handleResize() {
        var clientWidth = el.clientWidth || 375;
        clientWidth > designSize && (clientWidth = designSize);
        el.style.fontSize = clientWidth / ratio + 'px';
        setTimeout(function () { el.className = 'complete-body'; }, 500);
    }
    if (doc.addEventListener) {
        win.addEventListener(resizeEvent, handleResize, false);
        doc.addEventListener('DOMContentLoaded', handleResize, false);
    }
})(window)