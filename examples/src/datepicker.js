
const { DatePicker } = Z;

let App = React.createClass({
    render() {
        return (
            <div>
                <section>
                    <h5>Date Picker</h5>
                    <DatePicker/>
                </section>
                <section>
                    <h5>Date Picker with defaultValue and maximum&minimum value</h5>
                    <DatePicker 
                        defaultValue="2014-08-05"
                        maxValue="2016-09-20"
                        minValue="2010-03-14"
                    />
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