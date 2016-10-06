
require('../../src/js/z.js')
const {Pagination, Message, Dialog, DatePicker} = Z;

let App = React.createClass({

    getInitialState: function() {
        return {
            dlgVisible: false 
        };
    },

    handleClick() {
        Message.msg('This is some message.')
    },

    showDialog() {
        this.setState({
            dlgVisible: true
        });
    },

    setFruit(fruit) {
        console.log(fruit)
    },

    render() {
        let {dlgVisible} = this.state;

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
                <Dialog visible={dlgVisible} title='对话框' style={{width: 500}}>
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