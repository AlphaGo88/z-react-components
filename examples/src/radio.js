
const { RadioGroup } = Z;
const emp = [{
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
            }];

let App = React.createClass({

    getInitialState: function() {
        return { 
            emp: ''
        };
    },

    handleEmpChange(value) {
        this.setState({
            emp: value
        })
        console.log(value)
    },

    render() {
        const { emp } = this.state;

        return (
            <div>
                <section>
                    <RadioGroup value={emp} items={emps} onChange={this.handleEmpChange}/>
                </section>
                <section>
                    <RadioGroup align="x" value={emp} items={emps}/>
                </section>
                <section>
                    <RadioGroup items={emps} diabled={true}/>
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)