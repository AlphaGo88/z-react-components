// CheckboxGroup
// ---------------------------

const React = require('react');
const cx = require('classnames');
const Checkbox = require('../Checkbox');

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
         * x: align horizonally.
         * y: align vertically.
         */
        align: React.PropTypes.string,

        /**
         * Whether the component is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * The items of the component, 
         * each with a `value` prop and a `text` prop.
         */
        items: React.PropTypes.array,

        /**
         * The selected values.
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
            align: 'x',
            disabled: false,
            items: [],
            value: [],
            onChange: () => {}
        };
    },

    handleChange(value, checked) {
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
                className={cx('checkbox-group', className, {
                    'horizonal': align === 'x'
                })}
            >
                {items.map((item, i) => (
                    <li 
                        key={i}
                        style={itemStyle}
                        className={itemClassName}
                    >
                        <Checkbox
                            label={item.text}
                            disabled={item.disabled}
                            onCheck={(checked) => this.handleChange(item.value, checked)}
                        />
                    </li>
                ))}
            </ul>
        );
    }

});

module.exports = CheckboxGroup;