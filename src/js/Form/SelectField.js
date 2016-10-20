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
            title, 
            name, 
            className, 
            labelClassName, 
            controlClassName,
            multi,
            onChange,
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

        const value = multi ? '' : this.getValue();
        const values = multi ? this.getValue() : [];

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
                    className={classNames(
                        'form-control', {
                            [`${controlClassName}`]: controlClassName
                        }
                    )}
                    inputClassName={classNames({
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
                    multi={multi}
                    onChange={this.changeValue}
                    value={value}
                    values={values}
                    {...otherProps}
                />
                <span className='validation-error'>
                    {errorMessage}
                </span>
            </div>
        );
    }
});

module.exports = SelectField;