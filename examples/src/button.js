
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
                    <Button size="small">small</Button>&nbsp;&nbsp;
                    <Button size="medium">medium</Button>&nbsp;&nbsp;
                    <Button size="large">large</Button>
                </section>
                <section>
                    <h4>Float Button</h4>
                    <Button colorType="default">default</Button>&nbsp;&nbsp;
                    <Button focus={true}>primary</Button>&nbsp;&nbsp;
                    <Button disabled={true}>disabled</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <h4>Flat Button</h4>
                    <Button type="flat" colorType="default" focus={true} onClick={this.handleClick}>default</Button>&nbsp;&nbsp;
                    <Button type="flat">primary</Button>&nbsp;&nbsp;
                    <Button type="flat" disabled={true}>disabled</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <h4>Link Button</h4>
                    <Button type="flat" link="https://github.com/">Github</Button>&nbsp;&nbsp;
                </section>
                <section>
                    <h4>Custom style</h4>
                    <Button type="float" primary={true} style={{width: 200}}>
                        custom&nbsp;&nbsp;<i className="fa fa-envelope"/>
                    </Button>&nbsp;&nbsp;
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