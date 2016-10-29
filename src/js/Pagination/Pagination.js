// Pagination
// ------------------------

const React = require('react');
const cx = require('classnames');

const Pagination = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The css class name of the pages.
         */
        pageClassName: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * The inline styles of the pages.
         */
        pageStyle: React.PropTypes.object,

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
            pageClassName,
            pageStyle,
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
                className={cx('pagination', className)}
            >
                <span 
                    className={cx('page-btn fa fa-angle-double-left', {
                        'disabled': current === 1
                    })}
                    onClick={e => {
                        if (1 !== current) onChange(1);
                    }}
                />
                <span 
                    className={cx('page-btn fa fa-angle-left', {
                        'disabled': current === 1
                    })}
                    onClick={e => {
                        if (1 !== current) onChange(current - 1);
                    }}
                />
                {pageNos.map(pageNo => (
                    <span 
                        key={pageNo}
                        style={pageStyle} 
                        className={cx('page', pageClassName, {
                            'active': pageNo === current
                        })} 
                        onClick={e => {
                            if (pageNo !== current) onChange(pageNo);
                        }}
                    >
                        {pageNo}
                    </span>
                ))}
                <span 
                    className={cx('page-btn fa fa-angle-right', {
                        'disabled': current === pageCount
                    })}
                    onClick={e => {
                        if (pageCount !== current) onChange(current + 1);
                    }}
                />
                <span 
                    className={cx('page-btn fa fa-angle-double-right', {
                        'disabled': current === pageCount
                    })}
                    onClick={e => {
                        if (pageCount !== current) onChange(pageCount);
                    }}
                />
            </div>
        );
    }
});

module.exports = Pagination;