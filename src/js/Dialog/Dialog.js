// Dialog
// ------------------------

const React = require('react');
const cx = require('classnames');

const Dialog = React.createClass({

    propTypes: {
        /**
         * The css class name of the dialog element.
         */
        className: React.PropTypes.string,

        /**
         * The css class name of the title container.
         */
        titleClassName: React.PropTypes.string,

        /**
         * The css class name of the content container.
         */
        contentClassName: React.PropTypes.string,

        /**
         * The css class name of the actions container.
         */
        actionsContainerClassName: React.PropTypes.string,

        /**
         * The inline styles of the dialog element.
         */
        style: React.PropTypes.object,

        /**
         * The inline styles of the title container.
         */
        titleStyle: React.PropTypes.object,

        /**
         * The inline styles of the content container.
         */
        contentStyle: React.PropTypes.object,

        /**
         * The inline styles of the actions container.
         */
        actionsContainerStyle: React.PropTypes.object,

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
        const { 
            className, 
            titleClassName, 
            contentClassName, 
            actionsContainerClassName, 
            style, 
            titleStyle, 
            contentStyle, 
            actionsContainerStyle, 
            title, 
            children, 
            actions, 
            isOpen, 
            onOK, 
            onCancel 
        } = this.props;

        return (
            <div 
                className={cx('z-dialog-mask', { 
                    'show': isOpen 
                })}
            >
                <div 
                    style={style}
                    className={cx('dialog', className)} 
                >
                    {title && 
                        <h3 
                            style={titleStyle}
                            className={cx('dialog-title', titleClassName)}
                        >
                            {title}
                        </h3>
                    }
                    <div 
                        style={contentStyle}
                        className={cx('dialog-content', contentClassName)}
                    >
                        {children}
                    </div>
                    <div 
                        style={actionsContainerStyle}
                        className={cx('dialog-action-container', actionsContainerClassName)}
                    >
                        {actions || 
                            [
                                <span 
                                    key={0} 
                                    className="btn-flat btn-primary" 
                                    onClick={onCancel}
                                >
                                    取消
                                </span>,
                                <span 
                                    key={1} 
                                    className="btn-flat btn-primary" 
                                    onClick={onOK}
                                >
                                    确认
                                </span>
                            ]
                        }
                    </div>
                </div>
            </div>
        );
    }
    
});

module.exports = Dialog;