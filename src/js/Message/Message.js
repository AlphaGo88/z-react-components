// Message
// ------------------------

module.exports = {

    _msg(type, content, duration) {

        // create message layer if not been created.
        let layer = document.getElementById('z-msg-layer');

        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'z-msg-layer';
            layer.addEventListener('transitionend', function(e) {
                layer.removeChild(e.target);
            }, false);
            document.body.appendChild(layer);
        }

        let msgBox = document.createElement('div');
        let _html = '<span class="msg-content">' + content + '</span>';

        switch (type) {
            case 'msg':
                break;
            case 'success':
                _html = '<i class="fa fa-check-circle icon-success"></i>' + _html;
                break;
            case 'info':
                _html = '<i class="fa fa-info-circle icon-info"></i>' + _html;
                break;
            case 'warning':
                _html = '<i class="fa fa-warning icon-warning"></i>' + _html;
                break;
            case 'error':
                _html = '<i class="fa fa-times-circle icon-error"></i>' + _html;
                break;
            default:
        }

        msgBox.className = 'z-msg';
        msgBox.innerHTML = _html;
        layer.appendChild(msgBox);

        setTimeout(function() {
            msgBox.className += ' exit';
        }, duration || 4000);
    },

    msg(content, duration) {
        this._msg('msg', content, duration);
    },

    success(content, duration) {
        this._msg('success', content, duration);
    },

    info(content, duration) {
        this._msg('info', content, duration);
    },

    warning(content, duration) {
        this._msg('warning', content, duration);
    },

    error(content, duration) {
        this._msg('error', content, duration);
    }
};