// SubMenu
// ------------------------

const React = require('react');
const cx = require('classnames');
const assign = require('object-assign');

const SubMenu = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The css class name of the menu element.
         */
        menuClassName: React.PropTypes.string,

        /**
         * The inline styles of root element.
         */
        style: React.PropTypes.object,

        /**
         * The inline styles of the menu element.
         */
        menuStyle: React.PropTypes.object,

        /**
         * Whether the `SubMenu` is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * The sub menu items.
         */
        children: React.PropTypes.node,

        /**
         * The text of the `SubMenu`.
         */
        text: React.PropTypes.node,

        /**
         * The left icon.
         */
        leftIcon: React.PropTypes.node,

        /**
         * Replace default right icon with this prop.
         */
        rightIcon: React.PropTypes.node,

        /**
         * Fires when select a sub menu item.
         */
        onSelect: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            rightIcon: <i className="fa fa-chevron-right"/>,
            onSelect: () => {}
        };
    },

    getInitialState() {
        return {
            isOpen: false 
        };
    },

    handleMouseEnter(event) {
        if (!this.props.disabled) {
            this.setState({ isOpen: true });
        }
    },

    handleMouseLeave(event) {
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
        }
    },

    handleSelect(value) {
        this.setState({ isOpen: false });
        this.props.onSelect(value);
    },

    render() {
        const { 
            className,
            menuClassName,
            style,
            disabled,
            text,
            leftIcon,
            rightIcon,
            children
        } = this.props;

        const menuStyle = assign({
            display: this.state.isOpen ? 'block' : 'none'
        }, this.props.menuStyle);

        return (
            <div 
                className={cx('z-menu-item', className, {
                    'disabled': disabled
                })}
                style={style}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {leftIcon &&
                    <span className="left-icon">{leftIcon}</span>
                }
                {text &&
                    <span>{text}</span>
                }
                <span className="right-icon">{rightIcon}</span>
                <div 
                    className={cx('z-sub-menu', menuClassName)}
                    style={menuStyle}
                >
                    {React.Children.map(children, (menuItem) => {
                        return React.cloneElement(menuItem, {
                            onSelect: this.handleSelect
                        });
                    })}
                </div>
            </div>
        );
    }
});

module.exports = SubMenu;