// Datepicker Field
// ---------------------------

const classNames = require('classnames');
const DatePicker = require('../DatePicker');
const Formsy = require('formsy-react');

const DateField = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    componentDidMount() {
        const value = this.props.defaultValue || '';
        this.setValue(value);
    },

    changeValue(dateStr, dateObj) {
        this.setValue(dateStr);
    },

    render() {

        const { 
            validationError, 
            validationErrors, 
            className, 
            title, 
            name, 
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

        return (
            <div className={`form-group ${className}`}>
                <label className="form-label">{title}</label> 
                <DatePicker 
                    className="form-control"
                    inputClassName={classNames({
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
                    onChange={this.changeValue}
                    value={this.getValue()}
                    {...otherProps}
                />
                <span className="validation-error">{errorMessage}</span>
            </div>
        );
    }
});

module.exports = DateField;