
const classNames = require('classnames');
const DatePicker = require('../DatePicker');
const Formsy = require('formsy-react');

const DateField = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    changeValue(dateStr, dateObj) {
        this.setValue(dateStr);
    },

    render() {

        const errorMessage = this.getErrorMessage();

        return (
            <div className={`form-group ${this.props.className}`}>
                <label className="form-label">{this.props.title}</label> 
                <DatePicker 
                    wrapperClassName="form-control"
                    inputClassName={
                        classNames({
                            'required': this.showRequired(),
                            'error': this.showError()
                        })
                    }
                    onChange={this.changeValue}
                    initialDate={this.getValue()}
                    {...this.props}
                />
                <span className="validation-error">{errorMessage}</span>
            </div>
        );
    }
});

module.exports = DateField;