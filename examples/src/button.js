
const { Button } = zui;

let App = React.createClass({

    handleClick(event) {
        alert('clicked!');
    },

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
                    <Button type="flat" focus={true} onClick={this.handleClick}>default</Button>&nbsp;&nbsp;
                    <Button type="flat" primary={true}>primary</Button>&nbsp;&nbsp;
                    <Button type="flat" disabled={true}>disabled</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <h4>Link Button</h4>
                    <Button type="flat" link="https://github.com/">Github</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <h4>Icon Button</h4>
                    <Button type="float" primary={true} size="small">
                        <i className="fa fa-envelope"/>
                    </Button>&nbsp;&nbsp;
                    <Button type="float" size="small">
                        <i className="fa fa-bell"/>
                    </Button>&nbsp;&nbsp;
                    <Button type="flat" size="small">
                        <i className="fa fa-comment"/>
                    </Button>&nbsp;&nbsp;
                </section>
                <section>
                    <h4>Custom style</h4>
                    <Button type="float" primary={true} style={{width: 200}}>custom</Button>&nbsp;&nbsp;
                    <Button type="float" style={{backgroundColor: 'red', color: '#fff'}}>custom</Button>&nbsp;&nbsp;
                </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)