
const { Select } = Z;

let App = React.createClass({

    getInitialState: function() {
        return { 
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

    render() {
        let { emps, emp } = this.state;

        return (
            <div>
                <section>
                    <Select 
                        multi={true} 
                        data={emps} 
                        value={emp} 
                        onChange={this.changeEmp}
                    />
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)