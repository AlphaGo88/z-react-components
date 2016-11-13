
const { Tabs } = zui;

let App = React.createClass({

    getInitialState() {
        return { 
            activeTab: 'tab1'
        };
    },

    handleTabChange(value) {
        this.setState({ activeTab: value });
    },

    render() {

        return (
            <div>
            <section>
                <Tabs>
                    <Tabs.Tab label="tab1">
                        jdsifojflsmfd
                    </Tabs.Tab>
                    <Tabs.Tab label="tab2">
                        你好舍得离开房间
                    </Tabs.Tab>
                    <Tabs.Tab label="tab3">
                        女郎的子女阿佛i违法jo额外i付金额我if
                    </Tabs.Tab>
                </Tabs>
            </section>
            <section>
                <Tabs value={this.state.activeTab} onChange={this.handleTabChange}>
                    <Tabs.Tab label="tab1" value="tab1">
                        jdsifojflsmfd
                    </Tabs.Tab>
                    <Tabs.Tab label="tab2" value="tab2">
                        你好舍得离开房间
                    </Tabs.Tab>
                    <Tabs.Tab label="tab3" value="tab3" onActive={value => alert(value)}>
                        女郎的子女阿佛i违法jo额外i付金额我if
                    </Tabs.Tab>
                </Tabs>
            </section>
            <section>
                <Tabs defaultActiveIndex={1} tabStyle={{width: 200}}>
                    <Tabs.Tab label="tab1" contentStyle={{backgroundColor: 'yellow'}}>
                        jdsifojflsmfd
                    </Tabs.Tab>
                    <Tabs.Tab label="tab2">
                        你好舍得离开房间
                    </Tabs.Tab>
                    <Tabs.Tab label="tab3">
                        女郎的子女阿佛i违法jo额外i付金额我if
                    </Tabs.Tab>
                </Tabs>
            </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)