// Text Field
// ---------------------------

const React = require('react');
const Formsy = require('formsy-react');
const cx = require('classnames');

const TextField = React.createClass({

    mixins: [Formsy.Mixin],

    componentWillMount() {
        this.setValue(this.props.value || '');
    },

    render() {
        const { 
            className, 
            labelClassName,
            title
        } = this.props;

        return (
            <div className={cx('form-group', className)}>
                <label 
                    className={cx('form-label', labelClassName)} 
                >
                    {title}
                </label>
                <span className="form-text">
                    {this.props.children}
                </span>
            </div>
        );
    }
});

module.exports = TextField;