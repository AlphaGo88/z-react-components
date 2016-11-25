const ReactDOM = require('react-dom');
const Message = require('./Message');

module.exports = {

    _msg(type, content, duration) {
        // create message layer if not been created.
        let layer = document.getElementById('z-msg-layer');

        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'z-msg-layer';
            layer.addEventListener('transitionend', (event) => {
                const container = event.target.parentNode;

                ReactDOM.unmountComponentAtNode(container);
                layer.removeChild(container);
            });
            document.body.appendChild(layer);
        }

        let container = document.createElement('div');
        layer.appendChild(container);

        ReactDOM.render(
            <Message type={type} duration={duration}>
                {content}
            </Message>,
            container
        );
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
}