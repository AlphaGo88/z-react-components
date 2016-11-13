
const { Pagination } = zui;

let App = React.createClass({

    getInitialState() {
        return { 
            pageNo: 1
        };
    },

    handlePageChange(pageNo) {
        this.setState({ pageNo });
    },

    render() {

        return (
            <div>
            <section>
                <Pagination 
                    recordCount={65} 
                />
            </section>
            <section>
                <Pagination 
                    recordCount={100} 
                    activePage={this.state.pageNo}
                    onChange={this.handlePageChange}
                />
            </section>
            </div>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)