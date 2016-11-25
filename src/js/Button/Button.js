// Button
// ------------------------

const React = require('react');
const cx = require('classnames');
let tabPressed = false;

function handleTabPress(event) {
    tabPressed = event.which === 9;
}

const Button = React.createClass({

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
         * The type of the button.
         */
        type: React.PropTypes.oneOf(['float', 'flat', 'outline']),

        /**
         * The button's size.
         */
        size: React.PropTypes.oneOf(['small', 'medium', 'large', 'larger']),

        /**
         * If true, colors the button with the theme's primary color.
         */
        primary: React.PropTypes.bool,

        /**
         * If true, colors the button with the theme's secondary color.
         */
        secondary: React.PropTypes.bool,

        /**
         * If true, the button will take up the full width of its container.
         */
        fullWidth: React.PropTypes.bool,

        /**
         * Link to a url.
         */
        link: React.PropTypes.string,

        /**
         * Whether the button has focus style.
         */
        focus: React.PropTypes.bool,

        /**
         * Whether the button is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * Fires when the button is focused.
         */
        onFocus: React.PropTypes.func,

        /**
         * Fires when the button is blurred.
         */
        onBlur: React.PropTypes.func,

        /**
         * Fires when clicking the button.
         */
        onClick: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            type: 'float',
            size: 'medium',
            primary: false,
            secondary: false,
            fullWidth: false,
            disabled: false,
            focus: false,
            onFocus: () => {},
            onBlur: () => {},
            onClick: () => {}
        };
    },

    getInitialState() {
        return {
            focused: !this.props.disabled && this.props.focus
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.disabled && this.state.focused) {
            this.setState({ focused: false });
        }
    },

    componentDidMount() {
        if (!this.props.disabled && this.props.focus) {
            this.button.focus();
        }
        // Listen to tab pressing so that we know when it's a keyboard focus. 
        document.addEventListener('keydown', handleTabPress);
    },

    componentWillUnmount() {
        this.cancelFocusTimeout();
        document.removeEventListener('keydown', handleTabPress);
    },

    cancelFocusTimeout() {
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
            this.focusTimeout = null;
        }
    },

    handleFocus(event) {
        if (event) event.persist();
        if (!this.props.disabled) {
            // setTimeout is needed because the focus event fires first
            // Wait so that we can capture if this was a keyboard focus
            this.focusTimeout = setTimeout(() => {
                if (tabPressed) {
                    this.setState({ focused: true });
                }
            }, 150);
            this.props.onFocus(event);
        }
    },

    handleBlur(event) {
        this.cancelFocusTimeout();
        this.setState({ focused: false });
        this.props.onBlur(event);
    },

    handleClick(event) {
        if (!this.props.disabled) {
            tabPressed = false;
            this.props.onClick(event);
        }
    },

    render() {
        const { 
            className,
            style,
            type,
            size,
            primary,
            secondary,
            fullWidth,
            link,
            disabled,
            children,
        } = this.props;
        const { focused } = this.state;

        let colorStyle;
        if (disabled) {
            colorStyle = 'disabled';
        } else {
            colorStyle = primary ? 'primary' : (secondary ? 'secondary' : 'default');
        }

        const renderProps = {
            ref: (ref) => this.button = ref,
            className: cx(className, {
                [`btn-${type}`]: true,
                [`btn-${size}`]: true,
                [`btn-${colorStyle}`]: true,
                'btn-focus': focused,
                'btn-block': fullWidth
            }),
            style: style,
            disabled: disabled,
            tabIndex: "0",
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onClick: this.handleClick
        };

        const _children = [
            <div key={0} className="ripple"/>,
            <div key={1} className="btn-label">
                {children}
            </div>
        ];

        return (link ?
            <a href={disabled ? undefined : link} {...renderProps}>
                {_children}
            </a> 
            :
            <button {...renderProps}>
                {_children}
            </button>
        );
    }
});

module.exports = Button;