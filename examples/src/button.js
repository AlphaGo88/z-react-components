
const { Button } = Z;

let App = React.createClass({

    render() {

        return (
            <div>
                <section>
                    <h4>Button Size</h4>
                    <Button size="small" primary={true}>small</Button>&nbsp;&nbsp;
                    <Button size="medium" primary={true}>medium</Button>&nbsp;&nbsp;
                    <Button size="large" primary={true}>large</Button>
                </section>
                <section>
                    <h4>Float Button</h4>
                    <Button>default</Button>&nbsp;&nbsp;
                    <Button primary={true} focus={true}>primary</Button>&nbsp;&nbsp;
                    <Button disabled={true}>disabled</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <h4>Flat Button</h4>
                    <Button type="flat" focus={true}>default</Button>&nbsp;&nbsp;
                    <Button type="flat" primary={true}>primary</Button>&nbsp;&nbsp;
                    <Button type="flat" disabled={true}>disabled</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <h4>Link Button</h4>
                    <Button type="flat" link="https://github.com/">Github</Button>&nbsp;&nbsp;
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)