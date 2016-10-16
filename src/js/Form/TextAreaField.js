// TextArea Field
// ---------------------------

const React = require('react');
const classNames = require('classnames');
const Formsy = require('formsy-react');

const TextAreaField = React.createClass({

    mixins: [Formsy.Mixin],

    componentDidMount() {
        this.setValue(this.props.defaultValue || '');
    },

    changeValue(event) {
        this.setValue(event.target.value);
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
                <textarea 
                    className={classNames({
                        'form-control': true,
                        [`${controlClassName}`]: controlClassName,
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
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

module.exports = TextAreaField;