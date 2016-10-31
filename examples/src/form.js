
const { Formsy } = Z;
const TextField = Formsy.TextField;
const Input = Formsy.InputField;
const Select = Formsy.SelectField;
const RadioGroup = Formsy.RadioGroupField;
const CheckboxGroup = Formsy.CheckboxGroupField;
const Checkbox = Formsy.CheckboxField;
const Date = Formsy.DateField;
const TextArea = Formsy.TextAreaField;

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
            cities: {
                china: [{
                    value: 'bj',
                    text: '北京'
                }, {
                    value: 'sh',
                    text: '上海'
                }],
                usa: [{
                    value: 'dc',
                    text: '华盛顿'
                }, {
                    value: 'ny',
                    text: '纽约'
                }]
            },
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
        country: 'china',
        canSubmit: false,
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
    countryChange(value) {
        this.setState({
            country: value
        });
        this.refs.citySelect.setValue('');
    },
    render() {
        const { countries, cities, fruits } = this.props;
        const { country } = this.state;
        return (
            <div style={{padding: 20}}>
              <Formsy.Form style={{width: 400}} onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
                <TextField className="col-6" name="id" title="id" value="111">330234</TextField>
                <Input className="col-6" name="name" title="name" />
                <Date className="col-6" name="birth" title="birth"/>
                <Date className="col-6" name="birth" title="graduate" selectTime={true}/>
                <Checkbox className="col-6" name="cb1" title="是否已婚"/>
                <Checkbox className="col-6" name="cb2" title="是否单身"/>
                <Select className="col-6" name="select1" options={countries} title="country" onChange={this.countryChange}/>
                <Select ref="citySelect" className="col-6" name="select2" options={cities[country]} title="city"/>
                <RadioGroup className="col-6" name="radio" items={countries} required/>
                <CheckboxGroup className="col-6" name="checkbox" items={fruits} required/>
                <TextArea className="col-6" name="ta"/>
                <div className="form-group col-12">
                    <button className="btn-float btn-primary" disabled={!this.state.canSubmit}>Submit</button>
                </div>
              </Formsy.Form>
            </div>
        );
    }
});

ReactDOM.render(
    <MyAppForm />,
    document.getElementById('App')
)