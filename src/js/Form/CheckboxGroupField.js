// CheckboxGroup Field
// ---------------------------

const React = require('react');
const classNames = require('classnames');
const Formsy = require('formsy-react');
const CheckboxGroup = require('../CheckboxGroup');

const CheckboxGroupField = React.createClass({

    mixins: [Formsy.Mixin],

    getInitialState() {
        return { value: [] };
    },

    componentDidMount() {
        const value = this.props.defaultValue || [];
        this.setValue(value);
        this.setState({ value });
    },

    changeValue(value) {
        this.setValue(value);
        this.setState({ value });
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
                <CheckboxGroup
                    className={classNames(
                        'checkbox-group form-control', {
                            [`${controlClassName}`]: controlClassName
                        }
                    )}
                    items={items}
                    value={this.state.value}
                    onChange={this.changeValue}
                />
            </div>
        );
    }

});

module.exports = CheckboxGroupField;