// 消息组件

module.exports = {

    msg(content) {

        // create message layer if not been created.
        let layer = document.getElementById('msg-layer');

        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'msg-layer';
            layer.addEventListener('transitionend', function(e) {
                layer.removeChild(e.target);
            }, false);
            document.body.appendChild(layer);
        }

        let msgBox = document.createElement('div');

        msgBox.className = 'msg';
        msgBox.innerHTML = content;
        layer.appendChild(msgBox);

        setTimeout(function() {
            msgBox.className += ' msg-exit';
        }, 4000);
    }
};