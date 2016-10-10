
const Form = require('../../src/js/Form');
const Input = Form.InputField;
const RadioGroup = Form.RadioGroupField;
const CheckboxGroup = Form.CheckboxGroupField;
const DateField = Form.DateField;

const MyAppForm = React.createClass({
    getDefaultProps() {
        return {
            countries: [{
                value: 'usa',
                text: '美国'
            }, {
                value: 'china',
                text: '中国'
            }],
            fruits: [{
                value: 'apple',
                text: 'apple'
            }, {
                value: 'banana',
                text: 'banana'
            }]
        };
    },
    getInitialState() {
      return {
        canSubmit: false
      }
    },
    enableButton() {
      this.setState({
        canSubmit: true
      });
    },
    disableButton() {
      this.setState({
        canSubmit: false
      });
    },
    submit(model) {
      console.log(model)
    },
    render() {
        const { countries, fruits } = this.props;
        return (
          <Form style={{width: 600}} onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <Input className="col-6" name="name" title="name" defaultValue="sdf"/>
            <DateField className="col-6" name="birth" title="birth" defaultValue="2015-06-03"/>
            <RadioGroup className="col-6" name="country" items={countries} value="usa" required/>
            <CheckboxGroup className="col-6" name="fruit" items={fruits} required/>
            <div className="form-group">
                <button className="btn-float btn-primary" disabled={!this.state.canSubmit}>Submit</button>
            </div>
          </Form>
        );
    }
});

ReactDOM.render(
    <MyAppForm />,
    document.getElementById('App')
)