
const { Select } = zui;

let App = React.createClass({

    getInitialState: function() {
        return { 
            fruit: '',
            fruits: [{
                value: 1,
                text: 'apple'
            }, {
                value: 2,
                text: 'orange'
            }, {
                value: 3,
                text: 'banana'
            }],
            emp: [],
            emps: [{
                value: '1',
                text: 'Jack'
            }, {
                value: '2',
                text: 'Steve'
            }, {
                value: '3',
                text: 'Jim'
            }, {
                value: '4',
                text: 'Michael'
            },{
                value: '5',
                text: 'Adf',
                disabled: true,
            }, {
                value: '6',
                text: 'Gdfd'
            }, {
                value: '7',
                text: 'Hfgf'
            }, {
                value: '8',
                text: 'Ygdf'
            },{
                value: '9',
                text: 'Adhghf'
            }, {
                value: '10',
                text: 'Gdtr43fd'
            }, {
                value: '11',
                text: 'mhj6'
            }, {
                value: '12',
                text: 'R3re'
            }]
        };
    },

    changeEmp(value) {
        this.setState({
            emp: value
        })
    },

    changeFruit(value) {
        this.setState({
            fruit: value
        })
    },

    render() {
        let { emps, emp, fruits, fruit } = this.state;

        return (
            <div>
                <section>
                    <h5>Select</h5>
                    <Select options={fruits} value={fruit} onChange={this.changeFruit}/>
                </section>
                <section>
                    <h5>Select with default Value</h5>
                    <Select defaultValue={2} options={fruits}/>
                </section>
                <section>
                    <h5>Multi Select</h5>
                    <Select multi={true} style={{width: 300}} options={emps}/>
                </section>
                <section>
                    <h5>Disabled</h5>
                    <Select disabled options={fruits}/>
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)