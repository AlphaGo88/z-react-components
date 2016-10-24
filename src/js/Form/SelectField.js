// Select Field
// ---------------------------

const React = require('react');
const classNames = require('classnames');
const Select = require('../Select');
const Formsy = require('formsy-react');

const SelectField = React.createClass({

    mixins: [Formsy.Mixin],

    componentDidMount() {
        const { multi, defaultValue } = this.props;

        if (multi) {
            this.setValue(defaultValue || []);
        } else {
            this.setValue(defaultValue || '');
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
            multi,
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

        let _value;
        if (multi) {
            _value = this.getValue() || [];
        } else {
            _value = this.getValue() || '';
        }

        return (
            <div className={classNames(
                'form-group', {
                    [`${className}`]: className
                }
            )}>
                <label 
                    className={classNames(
                        'form-label', {
                            [`${labelClassName}`]: labelClassName
                        }
                    )}
                >
                    {title}
                </label>
                <Select 
                    {...otherProps}
                    className={classNames(
                        'form-control', {
                            [`${controlClassName}`]: controlClassName,
                            'required': this.showRequired(),
                            'error': this.showError()
                        }
                    )}
                    multi={multi}
                    value={_value}
                    onChange={this.changeValue}
                />
                <span className='validation-error'>
                    {errorMessage}
                </span>
            </div>
        );
    }
});

module.exports = SelectField;