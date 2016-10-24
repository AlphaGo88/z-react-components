
const { DatePicker } = Z;

let App = React.createClass({

    getInitialState: function() {
        return { 
            date: ''
        };
    },

    handleChange(dateStr, dateObj) {
        this.setState({
            date: dateStr 
        });
    },

    render() {

        return (
            <div>
                <section>
                    <DatePicker value={this.state.date} onChange={this.handleChange}/>
                    &nbsp;&nbsp;&nbsp;
                    <input value={this.state.date}/>
                </section>
                <section>
                    <DatePicker 
                        defaultValue="2014-08-05"
                        maxValue="2016-09-20"
                        minValue="2010-03-14"
                    />
                </section>
                <section>
                    <DatePicker 
                        selectTime={true}
                    />
                </section>
                <section>
                    <DatePicker 
                        disabled
                    />
                </section>
                <section>
                    <DatePicker 
                        disableDate={date => {
                            return data.getDay() === 4
                        }}
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