// Form
// ------------------------

const React = require('react');
const Formsy = require('formsy-react');

let Form = Formsy.Form;

Form.InputField = require('./InputField');
Form.SelectField = require('./SelectField');
Form.DateField = require('./DateField');
Form.RadioGroupField = require('./RadioGroupField');
Form.CheckboxGroupField = require('./CheckboxGroupField');
Form.TextAreaField = require('./TextAreaField');

module.exports = Form;