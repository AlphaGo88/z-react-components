
const { Button, Menu, DropdownMenu, Divider } = zui;

let App = React.createClass({

    render() {

        const menu = (
            <Menu>
                <Menu.MenuItem value="a" text="Menu1"/>
                <Menu.MenuItem value="b" text="Menu2"/>
                <Menu.MenuItem value="c" text="Menu3" disabled={true}/>
            </Menu>
        );

        return (
            <div>
                <section>
                    <h4>Menu</h4>
                    <Menu onSelect={value => alert(value)}>
                        <Menu.MenuItem 
                            value="1"
                            text="Menu1"
                            secondaryText="Go"
                            leftIcon={<i className="fa fa-envelope"/>}
                        />
                        <Menu.SubMenu 
                            value="2"
                            text="Menu2"
                            leftIcon={<i className="fa fa-bank"/>}
                        >
                            <Menu.MenuItem text="subMenu" value="11"/>
                            <Menu.MenuItem text="subMenu" value="12"/>
                            <Menu.SubMenu text="subMenu" value="13">
                                <Menu.MenuItem text="subMenu" value="21"/>
                                <Menu.MenuItem text="subMenu" value="22"/>
                            </Menu.SubMenu>
                        </Menu.SubMenu>
                        <Divider/>
                        <Menu.MenuItem 
                            value="3"
                            text="Menu3"
                            disabled={true}
                        />
                    </Menu>
                </section>
                <section>
                    <h4>Dropdown Menu</h4>
                    <DropdownMenu menu={menu}>
                        <Button type="float" primary={true}>
                            下拉菜单
                        </Button>
                    </DropdownMenu>
                </section>
            </div>
        );
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)