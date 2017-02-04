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
         * The button's type.
         */
        type: React.PropTypes.oneOf(['float', 'flat']),

        /**
         * The button's size.
         */
        size: React.PropTypes.oneOf(['small', 'medium', 'large']),

        /**
         * The button's color type.
         */
        colorType: React.PropTypes.oneOf(['default', 'primary', 'secondary']),

        /**
         * If true, the button will take up the full width of its container.
         */
        fullWidth: React.PropTypes.bool,

        /**
         * Makes the button a url link.
         */
        link: React.PropTypes.string,

        /**
         * Whether the button is focused.
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
         * Fires when the button is clicked.
         */
        onClick: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            type: 'float',
            size: 'medium',
            colorType: 'primary',
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
        this.sizeRipple();
    },

    componentWillUnmount() {
        this.cancelFocusTimeout();
        document.removeEventListener('keydown', handleTabPress);
    },

    componentDidUpdate(prevProps, prevState) {
        this.sizeRipple();
    },

    sizeRipple() {
        const minHeight = this.button.offsetHeight * 3;
        const height = Math.max(minHeight, this.ripple.offsetWidth);
        const top = -(height - this.button.offsetHeight) / 2;
        
        this.ripple.style.height = `${height}px`;
        this.ripple.style.top = `${top}px`;
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
            colorType,
            fullWidth,
            link,
            disabled,
            children,
        } = this.props;
        const { focused } = this.state;

        const renderProps = {
            ref: (ref) => this.button = ref,
            className: cx(className, {
                [`btn-${type}`]: true,
                [`btn-${size}`]: true,
                [`btn-${colorType}`]: true,
                'btn-focus': focused,
                'btn-block': fullWidth
            }),
            style: style,
            disabled: disabled,
            tabIndex: '0',
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onClick: this.handleClick
        };

        const _children = (
            <div>
                <div className="ripple" ref={(ref) => this.ripple = ref}/>
                <div className="btn-label">
                    {children}
                </div>
            </div>
        );

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