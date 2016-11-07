// RadioGroup
// ---------------------------

const React = require('react');
const cx = require('classnames');

const RadioGroup = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The css class name of the radio item.
         */
        itemClassName: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * The inline styles of the radio items.
         */
        itemStyle: React.PropTypes.object,

        /**
         * How the items align.
         * x: align horizonal.
         * y: align vertical.
         */
        align: React.PropTypes.string,

        /**
         * Whether the component is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * The items of the `RadioGroup`, 
         * each with a `value` prop and a `text` prop.
         */
        items: React.PropTypes.array,

        /**
         * The selected value.
         * The component is controlled with this prop.
         * This prop overrides `defaultValue`.
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),

        /**
         * The defaultly selected value.
         */
        defaultValue: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),

        /**
         * Callback when the selected value changes.
         * @param {string} `value`
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            align: 'x',
            disabled: false,
            onChange: () => {}
        };
    },

    componentWillMount() {
        if (!this.props.value) {
            this.setState({
                value: this.props.defaultValue || ''
            });
        }
    },

    handleChange(event, value) {
        if (!this.props.disabled) {
            if (!this.props.value) {
                this.setState({ value });
            }
            this.props.onChange(value);
        }
    },

    render() {
        const { 
            className,
            itemClassName,
            style,
            itemStyle,
            align,
            items
        } = this.props;

        const selectedValue = this.props.value || this.state.value;

        return (
            <ul 
                style={style}
                className={cx('radio-group', className, {
                    'horizonal': align === 'x'
                })}
            >
                {items.map((item, i) => (
                    <li 
                        key={i}
                        style={itemStyle}
                        className={itemClassName}
                    >
                        <label 
                            className={cx('radio', {
                                'disabled': item.disabled || this.props.disabled
                            })}
                        >
                            <input
                                type="radio"
                                value={item.value}
                                disabled={item.disabled || this.props.disabled}
                                checked={item.value === selectedValue}
                                onChange={e => this.handleChange(e, item.value)}
                            />
                            <span>{item.text}</span>
                        </label>
                    </li>
                ))}
            </ul>
        );
    }

});

module.exports = RadioGroup;