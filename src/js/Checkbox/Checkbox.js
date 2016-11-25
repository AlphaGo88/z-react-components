// Checkbox
// ---------------------------

const React = require('react');
const cx = require('classnames');

const Checkbox = React.createClass({

    propTypes: {
        /**
         * The class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * The checkbox's label.
         */
        label: React.PropTypes.string,

        /**
         * Whether the component is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * Checkbox is checked if true.
         * The compnent is controlled if this prop is set.
         * This prop will override `defaultChecked`.
         */
        checked: React.PropTypes.bool,

        /**
         * Checkbox is defaultly checked if true.
         */
        defaultChecked: React.PropTypes.bool,

        /**
         * Callback when the checkbox is checked or unchecked.
         * @param {bool} checked
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            disabled: false,
            defaultChecked: false,
            onChange: () => {}
        };
    },

    componentWillMount() {
        if (!this.props.checked) {
            this.setState({
                checked: this.props.defaultChecked
            });
        }
    },

    handleChange(event) {
        if (!this.props.disabled) {
            const checked = event.currentTarget.checked;

            if (!this.props.checked) {
                this.setState({ checked });
            }
            this.props.onChange(checked);
        }
    },

    render() {
        const { 
            className,
            style,
            label,
            disabled
        } = this.props;

        return (
            <div style={style} className={className}>
                <label 
                    className={cx('checkbox', {
                        'disabled': disabled
                    })}
                >
                    <input 
                        type="checkbox"
                        disabled={disabled}
                        checked={!!this.props.checked || this.state.checked}
                        onChange={this.handleChange}
                    />
                    <span>{label}</span>
                </label>
            </div>
        );
    }
});

module.exports = Checkbox;