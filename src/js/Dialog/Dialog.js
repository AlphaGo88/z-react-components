// Dialog
// ------------------------

const classNames = require('classnames');

const Dialog = React.createClass({

    getDefaultProps() {
        return {
            style: null,
            visible: false,
            title: '',
            footer: null,    //自定义footer
            onOK: () => {},
            onCancel: null,
        };
    },

    getInitialState() {
        return { visible: this.props.visible };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible });
    },

    close() {
        this.setState({ visible: false });
    },

    render() {
        const { title, style, children, onOK, onCancel, footer } = this.props;
        const { visible } = this.state;

        return (
            <div className={classNames('modal-mask', { 'show': visible })}>
                <div className="modal" style={style}>
                    {title && 
                        <h3 className="modal-title">{title}</h3>
                    }
                    <div className="modal-body">{children}</div>
                    {footer ? 
                        <div className="modal-foot">
                            {footer}
                        </div>
                        : 
                        <div className="modal-foot">
                            <span className="btn-flat btn-primary" onClick={onCancel || this.close}>取消</span>
                            <span className="btn-flat btn-primary" onClick={onOK}>确认</span>
                        </div>
                    }
                </div>
            </div>
        );
    }
    
});

module.exports = Dialog;