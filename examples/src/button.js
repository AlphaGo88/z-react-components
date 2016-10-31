
const { Button } = Z;

let App = React.createClass({

    render() {

        return (
            <div>
                <section>
                    <Button size="small" primary={true}>small</Button>&nbsp;&nbsp;
                    <Button size="medium" primary={true}>medium</Button>&nbsp;&nbsp;
                    <Button size="large" primary={true}>large</Button>
                </section>
                <section>
                    <Button>default</Button>&nbsp;&nbsp;
                    <Button primary={true} focus={true}>primary</Button>&nbsp;&nbsp;
                    <Button disabled={true}>disabled</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <Button type="flat" focus={true}>default</Button>&nbsp;&nbsp;
                    <Button type="flat" primary={true}>primary</Button>&nbsp;&nbsp;
                    <Button type="flat" disabled={true}>disabled</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <Button type="flat" link="http://www.baidu.com">百度</Button>&nbsp;&nbsp;
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)