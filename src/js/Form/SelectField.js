// Select Field
// ---------------------------

const React = require('react');
const classNames = require('classnames');
const Select = require('../Select');
const Formsy = require('formsy-react');

const SelectField = React.createClass({

    mixins: [Formsy.Mixin],

    componentDidMount() {
        const value = this.props.defaultValue || '';
        this.setValue(value);
    },

    changeValue(value) {
        this.setValue(value);
    },

    render() {

        const { 
            title, 
            name, 
            className, 
            labelClassName, 
            controlClassName,
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

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
                    onChange={this.changeValue}
                    value={this.getValue()}
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