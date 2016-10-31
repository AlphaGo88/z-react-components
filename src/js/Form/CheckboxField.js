// Checkbox Field
// ---------------------------

const React = require('react');
const cx = require('classnames');
const Formsy = require('formsy-react');
const Checkbox = require('../Checkbox');

const CheckboxField = React.createClass({

    mixins: [Formsy.Mixin],

    componentWillMount() {
        this.setValue(this.props.defaultValue || false);
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
                    checked={this.getValue()}
                    onCheck={this.changeValue}
                />
            </div>
        );
    }

});

module.exports = CheckboxField;