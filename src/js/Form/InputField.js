// Input Field
// ---------------------------

const classNames = require('classnames');
const Formsy = require('formsy-react');

const InputField = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    componentDidMount() {
        this.setValue(this.props.defaultValue || '');
    },

    // setValue() will set the value of the component,
    // which in turn will validate it and the rest of the form
    changeValue(event) {
        this.setValue(event.target.value);
    },

    render() {

        // showRequired() is true when the value is empty and 
        // the required prop is passed to the input. 
        // showError() is true when the value typed is invalid.

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        const { 
            validationError, 
            validationErrors, 
            type, 
            title, 
            name, 
            className,
            labelClassName, 
            controlClassName,
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

        return (
            <div className={`form-group ${className}`}>
                <label 
                    className={`form-label ${labelClassName}`} 
                    htmlFor={name}
                >
                    {title}
                </label> 
                <input 
                    className={classNames({
                        [`form-control ${controlClassName}`]: true,
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
                    type={type || 'text'}
                    name={name}
                    onChange={this.changeValue}
                    {...otherProps}
                />
                <span className='validation-error'>
                    {errorMessage}
                </span>
            </div>
        );
    }
});

module.exports = InputField;