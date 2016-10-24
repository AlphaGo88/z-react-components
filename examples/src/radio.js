
const { RadioGroup, CheckboxGroup } = Z;

let App = React.createClass({

    getInitialState: function() {
        return { 
            emp: '',
            hobby: [],
            emps: [{
                value: 'emp1',
                text: 'Jack'
            }, {
                value: 'emp2',
                text: 'Steve'
            }, {
                value: 'emp3',
                text: 'Jim'
            }, {
                value: 'emp4',
                text: 'Michael'
            }],
            hobbies: [{
                value: 'b',
                text: '篮球'
            }, {
                value: 'f',
                text: '足球'
            }, {
                value: 's',
                text: '游泳'
            }]
        };
    },

    handleEmpChange(value) {
        this.setState({
            emp: value
        })
        console.log(value)
    },

    handleHobbyChange(value) {
        this.setState({
            hobby: value
        })
        console.log(value)
    },

    render() {
        const { emps, emp, hobby, hobbies } = this.state;

        return (
            <div>
                <section>
                    <RadioGroup value={emp} items={emps} onChange={this.handleEmpChange}/>
                </section>
                <section>
                    <CheckboxGroup value={hobby} items={hobbies} onChange={this.handleHobbyChange}/>
                </section>
                <section>
                    <RadioGroup align="y" value={emp} items={emps} onChange={this.handleEmpChange}/>
                </section>
                <section>
                    <CheckboxGroup align="y" value={hobby} items={hobbies} onChange={this.handleHobbyChange}/>
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)