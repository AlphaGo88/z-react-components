// 页码组件

const classNames = require('classnames');

const Pagination = React.createClass({

    getDefaultProps() {
        return {
            recordCount: 0,             //记录总条数
            pageDisplay: 5,             //同时显示的页码数
            pageSize: 10,               //每页显示记录条数
            initialPageNo: 1,           //初始页码
            onPageChange: () => {}
        };
    },

    getInitialState: function() {
        return { pageNo: this.props.initialPageNo };
    },

    handleClick(pageNo) {
        if (pageNo !== this.state.pageNo) {
            this.setState({ pageNo });
            this.props.onPageChange(pageNo);
        }
    },

    render() {
        const { recordCount, pageDisplay, pageSize } = this.props;

        if (recordCount === 0) return null;

        const activeNo = this.state.pageNo;
        const pageCount = Math.ceil(recordCount / pageSize); //总共的页数
        const leftNo = Math.ceil(activeNo / pageDisplay) * pageDisplay - pageDisplay + 1; //最左边的页码
        const rightNo = Math.min(leftNo + pageDisplay - 1, pageCount); //最右边的页码
        
        let pageNos = [];

        // 生成页码
        for (let i = leftNo; i <= rightNo; i++) {
            pageNos.push(i);
        }

        return (
            <div className="pagination">
                {activeNo === 1 ||
                    <div>
                        <span onClick={e => {this.handleClick(1)}}>首页</span>
                        <span onClick={e => {this.handleClick(activeNo - 1)}}>上一页</span>
                    </div>
                }
                {pageNos.map(pageNo => (
                        <span 
                            key={pageNo} 
                            className={classNames({'active': pageNo === activeNo})} 
                            onClick={e => {this.handleClick(pageNo)}}
                        >
                            {pageNo}
                        </span>
                    )
                )}
                {activeNo === pageCount ||
                    <div>
                        <span onClick={e => {this.handleClick(activeNo + 1)}}>下一页</span>
                        <span onClick={e => {this.handleClick(pageCount)}}>尾页</span>
                    </div>
                }
            </div>
        );
    }
});

module.exports = Pagination;