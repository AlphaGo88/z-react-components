
const { Message, Dialog, Form } = Z;

const countries = [{
    value: 'usa',
    text: '美国'
}, {
    value: 'china',
    text: '中国'
}];

const cities = [{
        value: 'dc',
        text: '华盛顿'
    }, {
        value: 'ny',
        text: '纽约'
    }];

let App = React.createClass({

    getInitialState: function() {
        return { 
            dlg1Open: false,
            dlg2Open: false,
            dlg3Open: false
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
        this.setState({ dlg1Open: true });
    },

    openDialog1() {
        this.setState({ dlg2Open: true });
    },

    openDialog2() {
        this.setState({ 
            dlg3Open: true 
        }, () => {
            this.refs.form.reset({
                id: 'sdfsd',
                name: 'jokoifkwe',
                country: 'kj',
                city: 'nykk',
                cb1: true,
                cb3: true
            });
        });
    },

    closeDlg() {
        this.setState({ dlg1Open: false });
    },

    closeDlg1() {
        this.setState({ dlg2Open: false });
    },

    closeDlg2() {
        this.setState({ dlg3Open: false });
    },

    render() {
        let { dlg1Open, dlg2Open, dlg3Open } = this.state;

        return (
            <div>
                <section>
                    <a onClick={this.msg1}>Message</a>
                </section>
                <section>
                    <a onClick={this.msg2}>Success message</a>
                </section>
                <section>
                    <a onClick={this.msg3}>Warning message</a>
                </section>
                <section>
                    <a onClick={this.msg4}>Error message</a>
                </section>
                <hr/>
                <section>
                    <a onClick={this.openDialog}>Normal dialog</a>
                </section>
                <section>
                    <a onClick={this.openDialog1}>Dialog with full width</a>
                </section>
                <section>
                    <a onClick={this.openDialog2}>Dialog with form</a>
                </section>
                <Dialog isOpen={dlg1Open} title='对话框' style={{width: 500}} onCancel={this.closeDlg}>
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                </Dialog>
                <Dialog isOpen={dlg2Open} style={{width: "100%"}} onCancel={this.closeDlg1}>
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                </Dialog>
                <Dialog title="带表单的对话框" isOpen={dlg3Open} onCancel={this.closeDlg2}>
                    <Formsy.Form ref="form" className="clearfix">
                      <Formsy.TextField className="col-6" name="id" title="id" value="111">330234</Formsy.TextField>
                      <Formsy.InputField className="col-6" name="name" title="name" />
                      <Formsy.SelectField className="col-6" name="country" options={countries} title="country"/>
                      <Formsy.SelectField className="col-6" name="city" options={cities} title="city"/>
                      <Formsy.CheckboxField className="col-6" name="cb1" title="是否已婚"/>
                      <Formsy.CheckboxField className="col-6" name="cb2" title="是否单身"/>
                      <Formsy.CheckboxField className="col-12" name="cb3" title="喜欢运动"/>
                      <Formsy.CheckboxField className="col-12" name="cb4" title="喜欢吃火锅"/>
                    </Formsy.Form>
                </Dialog>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)