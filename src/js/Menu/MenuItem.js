// MenuItem
// ------------------------

const React = require('react');
const cx = require('classnames');

const MenuItem = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * Whether the `MenuItem` is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * The value of the `MenuItem`.
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),

        /**
         * The text of the `MenuItem`.
         */
        text: React.PropTypes.node,

        /**
         * The secondary text that displayed on the right side.
         */
        secondaryText: React.PropTypes.node,

        /**
         * The left icon.
         */
        leftIcon: React.PropTypes.node,

        /**
         * The right icon.
         */
        rightIcon: React.PropTypes.node,

        /**
         * The click callback.
         */
        onSelect: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            onSelect: () => {}
        };
    },

    handleClick(event) {
        if (!this.props.disabled) {
            this.props.onSelect(this.props.value);
        }
    },

    render() {
        const { 
            className,
            style,
            disabled,
            text,
            secondaryText,
            leftIcon,
            rightIcon
        } = this.props;

        return (
            <div 
                className={cx('z-menu-item', className, {
                    'disabled': disabled
                })}
                style={style}
                onClick={this.handleClick}
            >
                {leftIcon &&
                    <span className="left-icon">{leftIcon}</span>
                }
                {text &&
                    <span>{text}</span>
                }
                {rightIcon &&
                    <span className="right-icon">{rightIcon}</span>
                }
                {!rightIcon && secondaryText &&
                    <span className="right-text">{secondaryText}</span>
                }
            </div>
        );
    }
});

module.exports = MenuItem;