// Option
// ------------------------

const React = require('react');
const cx = require('classnames');

const Option = React.createClass({

    propTypes: {
        /**
         * Whether the Option is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * Whether the Option is selected.
         */
        selected: React.PropTypes.bool,

        /**
         * The hover status of the Option.
         */
        hover: React.PropTypes.bool,

        /**
         * The value of the Option.
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),

        /**
         * The text of the Option.
         */
        text: React.PropTypes.string,

        /**
         * Fires when the option is hovered.
         */
        onMouseOver: React.PropTypes.func,

        /**
         * Fires when the option is clicked.
         */
        onClick: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            disabled: false,
            selected: false,
            hover: false,
            onClick: () => {}
        };
    },

    handleMouseOver(event) {
        if (!this.props.disabled) {
            this.props.onMouseOver(event);
        }
    },

    handleClick(event) {
        if (!this.props.disabled) {
            this.props.onClick(this.props.value, this.props.selected);
        }
    },

    render() {
        const { disabled, selected, hover, text } = this.props;

        return (
            <div 
                className={cx('select-option', {
                    'disabled': disabled,
                    'selected': selected,
                    'hover': hover
                })}
                onMouseOver={this.handleMouseOver}
                onClick={this.handleClick}
            >
                {text}
            </div>
        );
    }
});

module.exports = Option;