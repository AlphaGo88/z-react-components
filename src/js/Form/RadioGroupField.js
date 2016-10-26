// RadioGroup Field
// ---------------------------

const React = require('react');
const classNames = require('classnames');
const Formsy = require('formsy-react');
const RadioGroup = require('../RadioGroup');

const RadioGroupField = React.createClass({
    mixins: [Formsy.Mixin],

    componentWillMount() {
        this.setValue(this.props.defaultValue || '');
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
            ...otherProps
        } = this.props;

        return (
            <div className={classNames(
                'form-group', {
                    [`${className}`]: className
                }
            )}>
                {title && 
                    <label 
                        className={classNames(
                            'form-label', {
                                [`${labelClassName}`]: labelClassName
                            }
                        )}
                    >
                        {title}
                    </label>
                }
                <RadioGroup
                    {...otherProps}
                    className={classNames(
                        'form-control', {
                            [`${controlClassName}`]: controlClassName
                        }
                    )}
                    value={this.getValue()}
                    onChange={this.changeValue}
                />
            </div>
        );
    }

});

module.exports = RadioGroupField;