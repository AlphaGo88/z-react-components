// Datepicker Field
// ---------------------------

const React = require('react');
const cx = require('classnames');
const DatePicker = require('../DatePicker');
const Formsy = require('formsy-react');

const DateField = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    componentWillMount() {
        if (this.props.defaultValue) {
            this.setValue(this.props.defaultValue);
        }
    },

    changeValue(dateStr, dateObj) {
        this.setValue(dateStr);
        this.props.onChange && this.props.onChange(dateStr, dateObj);
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
        const errorMessage = this.getErrorMessage();

        return (
            <div className={cx('form-group', className)}>
                <label className={cx('form-label', labelClassName)}>
                    {title}
                </label> 
                <DatePicker 
                    {...otherProps}
                    className={cx('form-control', controlClassName)}
                    inputClassName={cx({
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
                    inputStyle={{width: '100%'}}
                    value={this.getValue() || ''}
                    onChange={this.changeValue}
                />
                <span className="validation-error">
                    {errorMessage}
                </span>
            </div>
        );
    }
});

module.exports = DateField;