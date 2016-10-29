// TextArea Field
// ---------------------------

const React = require('react');
const cx = require('classnames');
const Formsy = require('formsy-react');

const TextAreaField = React.createClass({

    mixins: [Formsy.Mixin],

    componentWillMount() {
        this.setValue(this.props.defaultValue || '');
    },

    changeValue(event) {
        this.setValue(event.target.value);
    },

    render() {
        const { 
            validationError, 
            validationErrors, 
            validations,
            title, 
            name, 
            className, 
            labelClassName, 
            controlClassName,
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

        return (
            <div className={cx('form-group', className)}>
                <label 
                    className={cx('form-label', labelClassName)}
                >
                    {title}
                </label> 
                <textarea 
                    {...otherProps}
                    className={cx('form-control', controlClassName, {
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
                    name={name}
                    value={this.getValue()}
                    onChange={this.changeValue}
                />
                <span className='validation-error'>
                    {errorMessage}
                </span>
            </div>
        );
    }
});

module.exports = TextAreaField;