
require('../../src/js/z.js');

const {
    Pagination, 
    Message, 
    Dialog, 
    DatePicker,
    Select
} = Z;

let App = React.createClass({

    getInitialState: function() {
        return { 
            dlgOpen: false,
            emp: ['emp1','emp2'],
            emps: [{
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
            }]
        };
    },

    handleClick() {
        Message.msg('This is some message.', 4000)
    },

    showDialog() {
        this.setState({ dlgOpen: true });
    },

    closeDlg() {
        this.setState({ dlgOpen: false });
    },

    setFruit(fruit) {
        console.log(fruit)
    },

    changeEmp(value) {
        this.setState({
            emp: value
        })
    },

    render() {
        let { dlgOpen, emps, emp } = this.state;

        return (
            <div>
                <section>
                    <span className="btn-float btn-primary" onClick={this.handleClick}>弹出消息</span>
                    &nbsp;&nbsp;&nbsp;
                    <span className="btn-float btn-primary" onClick={this.showDialog}>显示对话框</span>
                </section>
                <section>
                    <Pagination recordCount={100} />
                </section>
                <section>
                    <DatePicker selectTime={true} />
                </section>
                <section>
                    <Select multi={true} data={emps} value={emp} onChange={this.changeEmp}/>
                    &nbsp;&nbsp;&nbsp;
                </section>
                <Dialog isOpen={dlgOpen} title='对话框' style={{width: 500}} onCancel={this.closeDlg}>
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                </Dialog>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)