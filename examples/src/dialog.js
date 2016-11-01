
const { Message, Dialog } = Z;

let App = React.createClass({

    getInitialState: function() {
        return { 
            dlgOpen: false,
            dlgOpen1: false
        };
    },

    msg1() {
        Message.msg('This is some message.')
    },

    msg2() {
        Message.success('This is a success message.')
    },

    msg3() {
        Message.warning('This is a warning message.')
    },

    msg4() {
        Message.error('This is an error message.')
    },

    openDialog() {
        this.setState({ dlgOpen: true });
    },

    openDialog1() {
        this.setState({ dlgOpen1: true });
    },

    closeDlg() {
        this.setState({ dlgOpen: false });
    },

    closeDlg1() {
        this.setState({ dlgOpen1: false });
    },

    render() {
        let { dlgOpen, dlgOpen1 } = this.state;

        return (
            <div>
                <section>
                    <a style={{marginRight: 10}} onClick={this.msg1}>弹出消息1</a>
                    <a style={{marginRight: 10}} onClick={this.msg2}>弹出消息2</a>
                    <a style={{marginRight: 10}} onClick={this.msg3}>弹出消息3</a>
                    <a style={{marginRight: 10}} onClick={this.msg4}>弹出消息4</a>
                </section>
                <section>
                    <a style={{marginRight: 10}} onClick={this.openDialog}>显示对话框</a>
                    <a style={{marginRight: 10}} onClick={this.openDialog1}>显示对话框1</a>
                </section>
                <Dialog isOpen={dlgOpen} title='对话框' style={{width: 500}} onCancel={this.closeDlg}>
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                </Dialog>
                <Dialog isOpen={dlgOpen1} style={{width: "100%"}} onCancel={this.closeDlg1}>
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
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