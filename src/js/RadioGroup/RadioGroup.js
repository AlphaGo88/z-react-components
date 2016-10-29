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
         */
        value: React.PropTypes.string,

        /**
         * Fires when the selected value changes.
         * @param {string} `value`
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            align: 'x',
            items: [],
            value: '',
            onChange() {}
        };
    },

    handleChange(event, value) {
        if (this.props.value !== value) {
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
            items,
            value 
        } = this.props;

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
                                checked={value === item.value}
                                onChange={(e) => this.handleChange(e, item.value)}
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