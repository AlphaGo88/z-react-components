
const { DatePicker } = zui;

let App = React.createClass({

    getInitialState() {
        return {
            date: '2016-06-06' 
        };
    },

    handleChange(dateStr) {
        this.setState({
            date: dateStr
        });
    },

    handleClick() {
        const today = new Date();
        this.setState({
            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
        });
    },

    render() {
        return (
            <div>
                <section>
                    <h5>Date Picker</h5>
                    <DatePicker/>
                </section>
                <section>
                    <h5>Controlled Date Picker</h5>
                    <DatePicker value={this.state.date} onChange={this.handleChange}/>
                    <button style={{marginLeft: 20}} onClick={this.handleClick}>现在</button>
                </section>
                <section>
                    <h5>Date Picker with particular dates disabled</h5>
                    <DatePicker 
                        disableDates={date => {
                            return date.getDay() === 4
                        }}
                    />
                </section>
                <section>
                    <h5>Date Picker with time selection</h5>
                    <DatePicker 
                        selectTime={true}
                    />
                </section>
                <section>
                    <h5>Disabled Date Picker</h5>
                    <DatePicker 
                        disabled
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