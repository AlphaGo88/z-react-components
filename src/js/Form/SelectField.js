// Select Field
// ---------------------------

const classNames = require('classnames');
const Select = require('../Select');
const Formsy = require('formsy-react');

const SelectField = React.createClass({

    mixins: [Formsy.Mixin],

    componentDidMount() {
        const value = this.props.value || '';
        this.setValue(value);
    },

    changeValue(value) {
        this.setValue(value);
    },

    render() {

        const { 
            validationError, 
            validationErrors, 
            className, 
            inputClassName,
            title, 
            name, 
            value, 
            onChange,
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

        return (
            <div className={`form-group ${className}`}>
                <label className="form-label">{title}</label> 
                <Select 
                    className="form-control"
                    inputClassName={classNames({
                        'required': this.showRequired(),
                        'error': this.showError()
                    })}
                    onChange={this.changeValue}
                    value={this.getValue()}
                    {...otherProps}
                />
                <span className='validation-error'>{errorMessage}</span>
            </div>
        );
    }
});

module.exports = SelectField;