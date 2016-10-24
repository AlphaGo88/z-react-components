// CheckboxGroup
// ---------------------------

const React = require('react');
const classNames = require('classnames');

const CheckboxGroup = React.createClass({

    propTypes: {
        /**
         * The class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The class name of the checkbox item.
         */
        itemClassName: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * The inline styles of the checkbox item.
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
         * The items of the `CheckboxGroup`, 
         * each with a `value` prop and a `text` prop.
         */
        items: React.PropTypes.array,

        /**
         * A list of selected values.
         */
        value: React.PropTypes.array,

        /**
         * Fires when the selected values change.
         * @param {array} value
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            className: '',
            itemClassName: '',
            align: 'x',
            items: [],
            value: [],
            onChange() {}
        };
    },

    handleChange(event, value) {
        const checked = event.currentTarget.checked;
        let newValue = [];

        if (checked) {
            newValue = this.props.value.concat(value);
        } else {
            newValue = this.props.value.filter(it => it !== value);
        }

        this.props.onChange(newValue);
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
                className={classNames({
                    [`checkbox-group ${className}`]: true,
                    'horizonal': align === 'x'
                })}
            >
                {items.map((item, i) => (
                    <li 
                        key={i}
                        style={itemStyle}
                        className={`${itemClassName}`}
                    >
                        <label 
                            key={i} 
                            className={classNames('checkbox', {
                                'disabled': item.disabled || this.props.disabled
                            })}
                        >
                            <input
                                type="checkbox"
                                disabled={item.disabled || this.props.disabled}
                                value={item.value}
                                checked={value.indexOf(item.value) > -1}
                                onChange={(e) => this.handleChange(e, item.value)}
                            />
                            <span>{item.text}</span>
                        </label>
                    </li>
                ))
            }
            </ul>
        );
    }

});

module.exports = CheckboxGroup;