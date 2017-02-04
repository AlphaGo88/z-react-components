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
         * Fires when request to close the dialog.
         */
        onRequestClose: React.PropTypes.func,

        /**
         * Set true so that the content is scrollable to fit the viewport.
         */
        autoScrollContent: React.PropTypes.bool,

        /**
         * Fires when the ok button is clicked (if `actions` is not customized.).
         */
        onOK: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            isOpen: false,
            autoScrollContent: false,
            onRequestClose: () => {},
            onOK: () => {}
        };
    },

    componentDidMount() {
        this.positionDialog();
        window.addEventListener('resize', this.positionDialog);
    },

    componentDidUpdate(prevProps, prevState) {
        this.positionDialog();
    },

    componentWillUnmount() {
        window.removeEventListener('resize', this.positionDialog);
    },

    positionDialog() {
        if (!this.props.isOpen) return;

        const clientHeight = this.container.offsetHeight;
        const minPaddingTop = 12;
        
        // If `autoScrollContent` is true,
        // calculate the content's max height according to the client height.
        if (this.props.autoScrollContent) {
            const titleHeight = this.titleElem ? this.titleElem.offsetHeight : 0;
            const actionsHeight = this.actionsElem ? this.actionsElem.offsetHeight : 0;
            const minContentHeight = 10;

            let maxContentHeight = clientHeight - minPaddingTop * 2 - titleHeight - actionsHeight;
            if (maxContentHeight < minContentHeight) maxContentHeight = minContentHeight;

            this.contentElem.style.maxHeight = `${maxContentHeight}px`;
        }

        const dialogHeight = this.dialogElem.offsetHeight;
        let paddingTop = (clientHeight - dialogHeight) / 2;

        if (paddingTop < minPaddingTop) paddingTop = minPaddingTop;
        this.container.style.paddingTop = `${paddingTop}px`;
    },

    handleKeyUp(event) {
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
            isOpen, 
            autoScrollContent,
            onRequestClose,
            onOK 
        } = this.props;

        const actions = this.props.actions ||
            [                                
                <Button 
                    key={0}
                    type="flat" 
                    onClick={onRequestClose}
                >
                    取消
                </Button>,
                <Button 
                    key={1}
                    type="flat" 
                    focus={true}
                    onClick={onOK}
                >
                    确认
                </Button>
            ];

        return (
            <div 
                ref={(ref) => this.container = ref}
                className={cx('z-dialog-mask', { 
                    'offscreen': !isOpen 
                })}
            >
                <div 
                    ref={(ref) => this.dialogElem = ref}
                    tabIndex="0"
                    style={style} 
                    className={cx('z-dialog', className)}
                    onKeyUp={this.handleKeyUp}
                >
                    {isOpen &&
                        <div>
                            {title && 
                                <h3 
                                    ref={(ref) => this.titleElem = ref}
                                    style={titleStyle}
                                    className={cx('z-dialog-title', titleClassName)}
                                >
                                    {title}
                                </h3>
                            }
                            <div 
                                ref={(ref) => this.contentElem = ref}
                                style={contentStyle}
                                className={cx(contentClassName, {
                                    'z-dialog-content': !autoScrollContent,
                                    'z-dialog-content-scrollable': autoScrollContent,
                                    'z-dialog-content-no-title': !title
                                })}
                            >
                                {children}
                            </div>
                            <div 
                                ref={(ref) => this.actionsElem = ref}
                                style={actionsContainerStyle}
                                className={cx('z-dialog-action-container', actionsContainerClassName)}
                            >
                                {actions}
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
    
});

module.exports = Dialog;