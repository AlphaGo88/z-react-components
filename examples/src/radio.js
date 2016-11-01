
const { RadioGroup } = Z;
const emps = [{
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

    handleEmpChange(value) {
        alert(value);
    },

    render() {
        return (
            <div>
                <section>
                    <RadioGroup items={emps} onChange={this.handleEmpChange}/>
                </section>
                <section>
                    <RadioGroup items={emps} defaultValue="emp1"/>
                </section>
                <section>
                    <RadioGroup items={emps} disabled={true}/>
                </section>
                <section>
                    <RadioGroup items={emps} itemStyle={{width: 140}}/>
                </section>
                <section>
                    <RadioGroup align="y" items={emps}/>
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)