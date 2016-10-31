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
         * Fires when the checkbox is checked or unchecked.
         * @param {bool} checked
         */
        onCheck: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            disabled: false,
            defaultChecked: false,
            onCheck: () => {}
        };
    },

    componentWillMount() {
        if (typeof(this.props.checked) === 'undefined') {
            this.setState({
                checked: this.props.defaultChecked
            });
        }
    },

    handleChange(event) {
        if (!this.props.disabled) {
            const checked = event.currentTarget.checked;
            if (typeof(this.props.checked) === 'undefined') {
                this.setState({
                    checked 
                });
            }
            this.props.onCheck(checked);
        }
    },

    render() {
        const { 
            className,
            style,
            label,
            disabled
        } = this.props;

        const isChecked = typeof(this.props.checked) === 'undefined' ?
            this.state.checked
            :
            this.props.checked;

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
                        checked={isChecked}
                        onChange={this.handleChange}
                    />
                    <span>{label}</span>
                </label>
            </div>
        );
    }
});

module.exports = Checkbox;