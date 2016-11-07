// Form
// ------------------------

let Formsy = require('formsy-react');
const validationRules = require('./validationRules');

Formsy.HiddenField = require('./HiddenField');
Formsy.TextField = require('./TextField');
Formsy.InputField = require('./InputField');
Formsy.SelectField = require('./SelectField');
Formsy.DateField = require('./DateField');
Formsy.RadioGroupField = require('./RadioGroupField');
Formsy.CheckboxField = require('./CheckboxField');
Formsy.CheckboxGroupField = require('./CheckboxGroupField');
Formsy.TextAreaField = require('./TextAreaField');

for (let name in validationRules) {
    Formsy.addValidationRule(name, validationRules[name]);
}

module.exports = Formsy;