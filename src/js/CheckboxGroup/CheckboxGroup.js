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
         * The component is controlled with this prop.
         * This prop overrides `defaultValue`.
         */
        value: React.PropTypes.array,

        /**
         * The defaultly selected values.
         */
        defaultValue: React.PropTypes.array,

        /**
         * Callback when the selected values change.
         * @param {array} value
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
                value: this.props.defaultValue || []
            });
        }
    },

    handleChange(value, checked) {
        if (!this.props.disabled) {
            const oldValue = this.props.value || this.state.value;
            const newValue = checked ? oldValue.concat(value) :
                oldValue.filter(it => it !== value);

            if (!this.props.value) {
                this.setState({ value: newValue });
            }
            this.props.onChange(newValue);
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
        } = this.props;

        const selectedValues = this.props.value || this.state.value;

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
                            checked={selectedValues.indexOf(item.value) > -1}
                            onCheck={(checked) => this.handleChange(item.value, checked)}
                        />
                    </li>
                ))}
            </ul>
        );
    }

});

module.exports = CheckboxGroup;