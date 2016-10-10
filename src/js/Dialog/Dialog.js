// Dialog
// ------------------------

const classNames = require('classnames');

const Dialog = React.createClass({

    getDefaultProps() {
        return {
            isOpen: false,
            title: '',
            onOK: () => {},
            onCancel: () => {}
        };
    },

    render() {
        const { isOpen, style, title, children, footer, onOK, onCancel } = this.props;

        return (
            <div className={classNames('modal-mask', { 'show': isOpen })}>
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
                            <span className="btn-flat btn-primary" onClick={onCancel}>取消</span>
                            <span className="btn-flat btn-primary" onClick={onOK}>确认</span>
                        </div>
                    }
                </div>
            </div>
        );
    }
    
});

module.exports = Dialog;