// RadioGroup Field
// ---------------------------

const React = require('react');
const cx = require('classnames');
const Formsy = require('formsy-react');
const RadioGroup = require('../RadioGroup');

const RadioGroupField = React.createClass({
    mixins: [Formsy.Mixin],

    componentWillMount() {
        if (this.props.defaultValue) {
            this.setValue(this.props.defaultValue);
        }
    },

    changeValue(value) {
        this.setValue(value);
        this.props.onChange && this.props.onChange(value);
    },

    render() {
        const { 
            validationError, 
            validationErrors, 
            validations,
            title, 
            className,
            labelClassName, 
            controlClassName,
            ...otherProps
        } = this.props;

        return (
            <div className={cx('form-group', className)}>
                {title && 
                    <label className={cx('form-label', labelClassName)}>
                        {title}
                    </label>
                }
                <RadioGroup
                    {...otherProps}
                    className={cx('form-control', controlClassName)}
                    value={this.getValue() || ''}
                    onChange={this.changeValue}
                />
            </div>
        );
    }

});

module.exports = RadioGroupField;