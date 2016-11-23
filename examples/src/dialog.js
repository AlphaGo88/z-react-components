
const { Dialog, Form } = zui;

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

    openDialog1() {
        this.setState({ dlg1Open: true });
    },

    openDialog2() {
        this.setState({ dlg2Open: true });
    },

    openDialog3() {
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

    openDialog4() {
        this.setState({ dlg4Open: true });
    },

    closeDlg1() {
        this.setState({ dlg1Open: false });
    },

    closeDlg2() {
        this.setState({ dlg2Open: false });
    },

    closeDlg3() {
        this.setState({ dlg3Open: false });
    },

    closeDlg4() {
        this.setState({ dlg4Open: false });
    },

    render() {
        let { dlg1Open, dlg2Open, dlg3Open, dlg4Open } = this.state;

        return (
            <div>
                <section>
                    <a onClick={this.openDialog1}>Normal dialog</a>
                </section>
                <section>
                    <a onClick={this.openDialog2}>Dialog with full width</a>
                </section>
                <section>
                    <a onClick={this.openDialog3}>Dialog with form</a>
                </section>
                <section>
                    <a onClick={this.openDialog4}>Scrollable Dialog</a>
                </section>
                <Dialog isOpen={dlg1Open} title='Dialog' style={{width: 500}} onRequestClose={this.closeDlg1}>
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                </Dialog>
                <Dialog isOpen={dlg2Open} style={{width: "100%"}} onRequestClose={this.closeDlg2}>
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                    啊三季度来看房萨芬的， 啊释放了空间撒反对。阿斯蒂芬撒旦发你离开雷克萨减肥的按说反击率。
                </Dialog>
                <Dialog title="Dialog with Form" isOpen={dlg3Open} onRequestClose={this.closeDlg3}>
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
                <Dialog title="Scrollable Dialog" isOpen={dlg4Open} onRequestClose={this.closeDlg4} autoScrollContent={true}>
                    <p>Passage 1</p>
                    <p>Passage 2</p>
                    <p>Passage 3</p>
                    <p>Passage 4</p>
                    <p>Passage 5</p>
                    <p>Passage 6</p>
                    <p>Passage 7</p>
                    <p>Passage 8</p>
                    <p>Passage 9</p>
                    <p>Passage 10</p>
                    <p>Passage 11</p>
                    <p>Passage 12</p>
                    <p>Passage 13</p>
                    <p>Passage 14</p>
                    <p>Passage 15</p>
                    <p>Passage 16</p>
                    <p>Passage 17</p>
                    <p>Passage 18</p>
                    <p>Passage 19</p>
                    <p>Passage 20</p>
                </Dialog>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)