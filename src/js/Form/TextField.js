// Text Field
// ---------------------------

const React = require('react');
const Formsy = require('formsy-react');

const TextField = React.createClass({

    mixins: [Formsy.Mixin],

    componentDidMount() {
        this.setValue(this.props.value || '');
    },

    render() {
        return (
            <div className={classNames(
                'form-group', {
                    [`${className}`]: className
                }
            )}>
                <label 
                    className={classNames(
                        'form-label', {
                            [`${labelClassName}`]: labelClassName
                        }
                    )} 
                />
                <span className="form-text">
                    {this.getValue()}
                </span>
            </div>
        );
    }
});

module.exports = TextField;