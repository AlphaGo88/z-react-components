// TextArea Field
// ---------------------------

const classNames = require('classnames');
const Formsy = require('formsy-react');

const TextAreaField = React.createClass({

    mixins: [Formsy.Mixin],

    changeValue(event) {
        this.setValue(event.currentTarget['innerText']);
    },

    render() {

        const { validationError, validationErrors, type, title, name, className, ...otherProps } = this.props;
        const errorMessage = this.getErrorMessage();

        return (
            <div className={`form-group ${className}`}>
                <label className="form-label" htmlFor={name}>{title}</label> 
                <textarea 
                    className={
                        classNames('form-control', {
                            'required': this.showRequired(),
                            'error': this.showError()
                        })
                    }
                    name={name}
                    onChange={this.changeValue}
                    value={this.getValue()}
                    {...otherProps}
                />
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
});

module.exports = TextAreaField;