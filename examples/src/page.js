
const { Pagination } = Z;

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
            <section>
                <Pagination 
                    recordCount={100} 
                    current={this.state.pageNo}
                    onChange={this.handlePageChange}
                />
            </section>
        )
    }
})

ReactDOM.render(
    <App />,
    document.getElementById('App')
)