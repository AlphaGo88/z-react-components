
const { Tabs } = Z;

let App = React.createClass({

    getInitialState() {
        return { 
            activeTab: 0
        };
    },

    handleTabChange(tabIndex) {
        this.setState({ activeTab: tabIndex });
    },

    render() {

        return (
            <section>
                <Tabs 
                    activeIndex={this.state.activeTab}
                    onChange={this.handleTabChange}
                >
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
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)