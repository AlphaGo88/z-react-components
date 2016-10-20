// Datepicker Field
// ---------------------------

const React = require('react');
const classNames = require('classnames');
const DatePicker = require('../DatePicker');
const Formsy = require('formsy-react');

const DateField = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    componentDidMount() {
        this.setValue(this.props.defaultValue || '');
    },

    changeValue(dateStr, dateObj) {
        this.setValue(dateStr);
        this.props.onChange && this.props.onChange(dateStr, dateObj);
    },

    render() {

        const { 
            className, 
            title, 
            name, 
            labelClassName, 
            controlClassName,
            onChange,
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

        return (
            <div className={classNames(
                'form-group', {
                    [`${className}`]: className
                }
            )}>
                <label className={classNames(
                    'form-label', {
                        [`${labelClassName}`]: labelClassName
                    }
                )}>
                    {title}
                </label> 
                <DatePicker 
                    className={classNames(
                        'form-control', {
                            [`${controlClassName}`]: controlClassName
                        }
                    )}
                    inputClassName={classNames({
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
                    onChange={this.changeValue}
                    value={this.getValue()}
                    {...otherProps}
                />
                <span className="validation-error">
                    {errorMessage}
                </span>
            </div>
        );
    }
});

module.exports = DateField;