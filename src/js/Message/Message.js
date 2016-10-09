// Message
// ------------------------

module.exports = {

    msg(content, duration) {

        // create message layer if not been created.
        let layer = document.getElementById('z-msg-layer');

        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'z-msg-layer';
            layer.addEventListener('transitionend', function(e) {
                layer.removeChild(e.target.parentNode);
            }, false);
            document.body.appendChild(layer);
        }

        const msgWrapper = document.createElement('div');
        let msgBox = document.createElement('div');

        msgBox.className = 'z-msg';
        msgBox.innerHTML = content;
        msgWrapper.appendChild(msgBox);
        layer.appendChild(msgWrapper);

        setTimeout(function() {
            msgBox.className += ' exit';
        }, duration || 4000);
    }
};