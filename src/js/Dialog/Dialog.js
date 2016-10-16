// Dialog
// ------------------------

const React = require('react');
const classNames = require('classnames');

const Dialog = React.createClass({

    propTypes: {
        /**
         * The inline styles of the dialog element.
         */
        style: React.PropTypes.object,

        /**
         * The dialog's title.
         */
        title: React.PropTypes.node,

        /**
         * The dialog's content.
         */
        children: React.PropTypes.node,

        /**
         * Replace default action buttons with this prop.
         * Pass a react element or an Array of react elements.
         */
        actions: React.PropTypes.node,

        /**
         * Whether the dialog is visible.
         */
        isOpen: React.PropTypes.bool,

        /**
         * Fires when the cancel button is clicked.
         */
        onCancel: React.PropTypes.func,

        /**
         * Fires when the ok button is clicked.
         */
        onOK: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            isOpen: false,
            onOK() {},
            onCancel() {}
        };
    },

    render() {
        const { isOpen, style, title, children, actions, onOK, onCancel } = this.props;

        return (
            <div className={classNames('modal-mask', { 'show': isOpen })}>
                <div className="modal" style={style}>
                    {title && 
                        <h3 className="modal-title">{title}</h3>
                    }
                    <div className="modal-body">{children}</div>
                    <div className="modal-foot">
                        {actions || 
                            [
                                <span key={0} className="btn-flat btn-primary" onClick={onCancel}>取消</span>,
                                <span key={1} className="btn-flat btn-primary" onClick={onOK}>确认</span>
                            ]
                        }
                    </div>
                </div>
            </div>
        );
    }
    
});

module.exports = Dialog;