// Pagination
// ------------------------

const classNames = require('classnames');

const Pagination = React.createClass({

    getDefaultProps() {
        return {
            recordCount: 0,             //记录总条数
            pageDisplay: 5,             //同时显示的页码数
            pageSize: 10,               //每页显示记录条数
            current: 1,                 //初始页码
            onChange: () => {}
        };
    },

    render() {
        const { recordCount, pageDisplay, pageSize, current, onChange } = this.props;

        if (recordCount === 0) return null;

        const pageCount = Math.ceil(recordCount / pageSize); //总共的页数
        const leftNo = Math.ceil(current / pageDisplay) * pageDisplay - pageDisplay + 1; //最左边的页码
        const rightNo = Math.min(leftNo + pageDisplay - 1, pageCount); //最右边的页码
        
        let pageNos = [];

        // 生成页码
        for (let i = leftNo; i <= rightNo; i++) {
            pageNos.push(i);
        }

        return (
            <div className="pagination">
                {current === 1 ||
                    <div>
                        <span onClick={e => onChange(1)}>首页</span>
                        <span onClick={e => onChange(current - 1)}>上一页</span>
                    </div>
                }
                {pageNos.map(pageNo => (
                        <span 
                            key={pageNo} 
                            className={classNames({'active': pageNo === current})} 
                            onClick={e => onChange(pageNo)}
                        >
                            {pageNo}
                        </span>
                    )
                )}
                {current === pageCount ||
                    <div>
                        <span onClick={e => onChange(current + 1)}>下一页</span>
                        <span onClick={e => onChange(pageCount)}>尾页</span>
                    </div>
                }
            </div>
        );
    }
});

module.exports = Pagination;