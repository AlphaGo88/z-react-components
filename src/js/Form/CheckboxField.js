// Checkbox Field
// ---------------------------

const React = require('react');
const cx = require('classnames');
const Formsy = require('formsy-react');
const Checkbox = require('../Checkbox');

const CheckboxField = React.createClass({

    mixins: [Formsy.Mixin],

    componentWillMount() {
        if (this.props.defaultValue) {
            this.setValue(!!this.props.defaultValue);
        }
    },

    changeValue(checked) {
        this.setValue(checked);
        this.props.onChange && this.props.onChange(checked);
    },

    render() {
        const { 
            validationError, 
            validationErrors, 
            validations,
            title, 
            className,
            controlClassName,
            ...otherProps
        } = this.props;

        return (
            <div className={cx('form-group', className)}>
                <Checkbox
                    {...otherProps}
                    className={cx('form-control', controlClassName)}
                    label={title}
                    checked={!!this.getValue()}
                    onChange={this.changeValue}
                />
            </div>
        );
    }

});

module.exports = CheckboxField;