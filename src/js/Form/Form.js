// 文本输入框组件

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
Form.DateField = require('./DateField');
Form.RadioGroupField = require('./RadioGroupField');
Form.CheckboxGroupField = require('./CheckboxGroupField');

module.exports = Form;