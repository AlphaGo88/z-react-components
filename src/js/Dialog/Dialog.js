// Dialog
// ------------------------

const React = require('react');
const cx = require('classnames');
const Button = require('../Button');

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
         * Callback when request to close the dialog.
         */
        onRequestClose: React.PropTypes.func,

        /**
         * Callback when the ok button is clicked.
         * Won't work when `actions` is customed.
         */
        onOK: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            isOpen: false,
            onRequestClose: () => {},
            onOK: () => {},
        };
    },

    handleKeyDown(event) {
        // ESC
        if (event.which === 27) {
            this.props.onRequestClose();
        }
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
            onRequestClose,
            onOK 
        } = this.props;

        return (
            <div 
                className={cx('z-dialog-mask', { 
                    'offscreen': !isOpen 
                })}
            >
                {isOpen &&
                    <div 
                        tabIndex="0"
                        style={style} 
                        className={cx('z-dialog', className)}
                        onKeyDown={this.handleKeyDown}
                    >
                        {title && 
                            <h3 
                                style={titleStyle}
                                className={cx('z-dialog-title', titleClassName)}
                            >
                                {title}
                            </h3>
                        }
                        <div 
                            style={contentStyle}
                            className={cx('z-dialog-content', contentClassName)}
                        >
                            {children}
                        </div>
                        <div 
                            style={actionsContainerStyle}
                            className={cx('z-dialog-action-container', actionsContainerClassName)}
                        >
                            {actions || 
                                [
                                    <Button 
                                        key={0}
                                        type="flat" 
                                        primary={true}
                                        onClick={onRequestClose}
                                    >
                                        取消
                                    </Button>,
                                    <Button 
                                        key={1}
                                        type="flat" 
                                        primary={true}
                                        focus={true}
                                        onClick={onOK}
                                    >
                                        确认
                                    </Button>
                                ]
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
    
});

module.exports = Dialog;