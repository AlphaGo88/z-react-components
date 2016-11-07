// Select Field
// ---------------------------

const React = require('react');
const cx = require('classnames');
const Select = require('../Select');
const Formsy = require('formsy-react');

const SelectField = React.createClass({

    mixins: [Formsy.Mixin],

    componentWillMount() {
        if (this.props.defaultValue) {
            this.setValue(this.props.defaultValue);
        }
    },

    changeValue(value) {
        this.setValue(value);
        this.props.onChange && this.props.onChange(value);
    },

    render() {

        const { 
            validationError, 
            validationErrors, 
            validations,
            title, 
            className, 
            labelClassName, 
            controlClassName,
            multi,
            ...otherProps 
        } = this.props;
        const errorMessage = this.getErrorMessage();

        let _value;
        if (multi) {
            _value = this.getValue() || [];
        } else {
            _value = this.getValue() || '';
        }

        return (
            <div className={cx('form-group', className)}>
                <label className={cx('form-label', labelClassName)}>
                    {title}
                </label>
                <Select 
                    {...otherProps}
                    className={cx('form-control', controlClassName)}
                    selectClassName={cx({
                        'required': this.showRequired(),
                        'error': this.showError()                        
                    })}
                    selectStyle={{width: '100%'}}
                    multi={multi}
                    value={_value}
                    onChange={this.changeValue}
                />
                <span className='validation-error'>
                    {errorMessage}
                </span>
            </div>
        );
    }
});

module.exports = SelectField;