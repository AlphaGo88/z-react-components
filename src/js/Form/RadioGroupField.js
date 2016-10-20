// RadioGroup Field
// ---------------------------

const React = require('react');
const classNames = require('classnames');
const Formsy = require('formsy-react');
const RadioGroup = require('../RadioGroup');

const RadioGroupField = React.createClass({
    mixins: [Formsy.Mixin],

    componentDidMount() {
        this.setValue(this.props.defaultValue || '');
    },

    changeValue(value) {
        this.setValue(value);
        this.props.onChange && this.props.onChange(value);
    },

    render() {
        const { 
            name, 
            title, 
            items, 
            className,
            labelClassName, 
            controlClassName 
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
                    className={classNames(
                        'form-control', {
                            [`${controlClassName}`]: controlClassName
                        }
                    )}
                    items={items}
                    value={this.getValue()}
                    onChange={this.changeValue}
                />
            </div>
        );
    }

});

module.exports = RadioGroupField;