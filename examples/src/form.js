
const { Form } = Z;
const Input = Form.InputField;
const Select = Form.SelectField;
const RadioGroup = Form.RadioGroupField;
const CheckboxGroup = Form.CheckboxGroupField;
const Date = Form.DateField;
const TextArea = Form.TextAreaField;

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
          <Form style={{width: 400}} onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
            <Input className="col-6" name="name" title="name" defaultValue="sdf"/>
            <Date className="col-6" name="birth" title="birth" selectTime={true} defaultValue="2015-06-03"
                disableDates={(date) => date.getDay() === 5}
            />
            <Select className="col-6" name="select1" data={countries} title="aabv" />
            <Input className="col-6" name="input_iosdjf" title="iosdjf" validations="isUrl" validationError="请输入合法的URL"/>
            <RadioGroup className="col-6" name="radio" items={countries} defaultValue="usa" required/>
            <CheckboxGroup className="col-6" name="checkbox" items={fruits} required/>
            <TextArea className="col-6" name="ta" defaultValue="sdf"/>
            <div className="form-group col-12">
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