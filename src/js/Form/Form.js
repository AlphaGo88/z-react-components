// Form
// ------------------------

const React = require('react');
const Formsy = require('formsy-react');

let Form = React.createClass({

    render() {
        return (
            <Formsy.Form {...this.props}>
                {this.props.children}
            </Formsy.Form>
        );
    }

});

Form.InputField = require('./InputField');
Form.SelectField = require('./SelectField');
Form.DateField = require('./DateField');
Form.RadioGroupField = require('./RadioGroupField');
Form.CheckboxGroupField = require('./CheckboxGroupField');
Form.TextAreaField = require('./TextAreaField');

module.exports = Form;