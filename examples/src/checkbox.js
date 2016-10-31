
const { Checkbox, CheckboxGroup } = Z;
const fruits = [{
    value: '1',
    text: 'apple'
}, {
    value: '2',
    text: 'banana'
}, {
    value: '3',
    text: 'orange'
}]

let App = React.createClass({
    handleChange(value) {
        alert(JSON.stringify(value))
    },

    render() {
        return (
            <div>
                <section>
                    <Checkbox label="Normal checkbox"/>
                </section>
                <section>
                    <Checkbox label="Disabled checkbox" disabled={true}/>
                </section>
                <section>
                    <Checkbox label="checked checkbox" defaultChecked={true}/>
                </section>
                <section>
                    <CheckboxGroup items={fruits} onChange={this.handleChange}/>
                </section>
                <section>
                    <CheckboxGroup align="y" items={fruits}/>
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)