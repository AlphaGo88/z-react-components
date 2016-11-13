const ReactDOM = require('react-dom');
const Notification = require('./Notification');

module.exports = {

    open(opt) {
        // create Notification layer if not been created.
        let layer = document.getElementById('z-notification-layer');

        if (!layer) {
            layer = document.createElement('div');
            layer.id = 'z-notification-layer';
            document.body.appendChild(layer);
        }

        let container = document.createElement('div');

        container.addEventListener('transitionend', (event) => {
            ReactDOM.unmountComponentAtNode(container);
            layer.removeChild(container);
        });
        layer.appendChild(container);

        ReactDOM.render(
            <Notification 
                type={opt.type}
                autoClose={opt.autoClose}
                duration={opt.duration}
                icon={opt.icon}
                title={opt.title}
                content={opt.content}
            />,
            container
        );
    }

}