// Pagination
// ------------------------

const React = require('react');
const classNames = require('classnames');

const Pagination = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * How many page numbers are displayed at the same time.
         */
        pageDisplay: React.PropTypes.number,

        /**
         * How many records are displayed in one page.
         */
        pageSize: React.PropTypes.number,

        /**
         * The total count of the records.
         */
        recordCount: React.PropTypes.number,

        /**
         * The current page.
         */
        current: React.PropTypes.number,

        /**
         * Fires when the current page changes.
         * @param {number} pageNo
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            recordCount: 0,
            pageDisplay: 5,
            pageSize: 10,
            current: 1,
            onChange() {}
        };
    },

    render() {
        const { 
            className,
            style,
            recordCount, 
            pageDisplay, 
            pageSize, 
            current, 
            onChange 
        } = this.props;

        if (recordCount === 0) return null;

        const pageCount = Math.ceil(recordCount / pageSize);
        const leftNo = Math.ceil(current / pageDisplay) * pageDisplay - pageDisplay + 1;
        const rightNo = Math.min(leftNo + pageDisplay - 1, pageCount);
        
        let pageNos = [];

        // get page numbers
        for (let i = leftNo; i <= rightNo; i++) {
            pageNos.push(i);
        }

        return (
            <div 
                style={style} 
                className={classNames('pagination', {
                    [`${className}`]: className
                })}
            >
                {current === 1 ||
                    [
                        <span key={0} className="page" onClick={e => onChange(1)}>首页</span>,
                        <span key={1} className="page" onClick={e => onChange(current - 1)}>上一页</span>
                    ]
                }
                {pageNos.map(pageNo => (
                    <span 
                        key={pageNo} 
                        className={classNames('page', {'active': pageNo === current})} 
                        onClick={e => {
                            if(pageNo !== current) onChange(pageNo);
                        }}
                    >
                        {pageNo}
                    </span>
                ))}
                {current === pageCount ||
                    [
                        <span key={0} className="page" onClick={e => onChange(current + 1)}>下一页</span>,
                        <span key={1} className="page" onClick={e => onChange(pageCount)}>尾页</span>
                    ]
                }
            </div>
        );
    }
});

module.exports = Pagination;