
const { Checkbox, CheckboxGroup } = zui;
const fruits = [{
    value: 'apple',
    text: 'apple'
}, {
    value: 'banana',
    text: 'banana'
}, {
    value: 'orange',
    text: 'orange'
}];
const sports = [{
    value: 'football',
    text: 'football'
}, {
    value: 'swimming',
    text: 'swimming'
}, {
    value: 'tennis',
    text: 'tennis'
}]

let App = React.createClass({
    handleChange(value) {
        alert(JSON.stringify(value))
    },

    render() {
        return (
            <div>
                <section>
                    <h4>Checkbox</h4>
                    <Checkbox label="checkbox" defaultChecked={true}/>
                </section>
                <section>
                    <h4>Disabled Checkbox</h4>
                    <Checkbox label="Disabled checkbox" disabled={true} defaultChecked={true}/>
                </section>
                <section>
                    <h4>Controlled Checkbox</h4>
                    <Checkbox label="controlled checkbox" checked={true}/>
                </section>
                <section>
                    <h4>CheckboxGroup</h4>
                    <CheckboxGroup items={fruits} onChange={this.handleChange}/>
                </section>
                <section>
                    <h4>Verticall CheckboxGroup</h4>
                    <CheckboxGroup align="y" items={sports}/>
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)