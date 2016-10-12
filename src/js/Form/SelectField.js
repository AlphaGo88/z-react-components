// Select Field
// ---------------------------

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
                <label className={`form-label ${labelClassName}`}>
                    {title}
                </label> 
                <Select 
                    className={`form-control ${controlClassName}`}
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