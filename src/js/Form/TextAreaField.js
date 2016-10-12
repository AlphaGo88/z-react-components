// TextArea Field
// ---------------------------

const classNames = require('classnames');
const Formsy = require('formsy-react');

const TextAreaField = React.createClass({

    mixins: [Formsy.Mixin],

    componentDidMount() {
        this.setValue(this.props.defaultValue || '');
    },

    changeValue(event) {
        this.setValue(event.target.innerText);
    },

    render() {

        const { 
            validationError, 
            validationErrors, 
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
                <textarea 
                    className={classNames({
                        [`form-control ${controlClassName}`]: true,
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
                    name={name}
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

module.exports = TextAreaField;