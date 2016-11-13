
const { RadioGroup } = zui;
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
                    <h4>RadioGroup</h4>
                    <RadioGroup items={emps} defaultValue="emp1"/>
                </section>
                <section>
                    <h4>Controlled RadioGroup</h4>
                    <RadioGroup items={emps} onChange={this.handleEmpChange}/>
                </section>
                <section>
                    <h4>Disabled RadioGroup</h4>
                    <RadioGroup items={emps} disabled={true}/>
                </section>
                <section>
                    <h4>Custom style</h4>
                    <RadioGroup items={emps} itemStyle={{width: 140}}/>
                </section>
                <section>
                    <h4>Align vertically</h4>
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