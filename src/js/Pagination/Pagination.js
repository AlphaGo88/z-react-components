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
         * The active page number.
         * The component is controlled with this prop.
         * This prop will override `defaultActivePage`.
         */
        activePage: React.PropTypes.number,

        /**
         * The default active page number.
         */
        defaultActivePage: React.PropTypes.number,

        /**
         * Callback when the activePage page changes.
         * @param {number} pageNo
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            recordCount: 0,
            pageDisplay: 10,
            pageSize: 10,
            defaultActivePage: 1,
            onChange: () => {}
        };
    },

    componentWillMount() {
        if (!this.props.activePage) {
            this.setState ({
                activePage: this.props.defaultActivePage
            });
        }
    },

    handlePageChange(page) {
        if (!this.props.activePage) {
            this.setState({
                activePage: page
            });
        }
        this.props.onChange(page);
    },

    render() {
        const { 
            className,
            pageClassName,
            style,
            pageStyle,
            recordCount, 
            pageDisplay, 
            pageSize
        } = this.props;

        if (recordCount <= pageSize) return null;

        const activePage = this.props.activePage || this.state.activePage;
        const pageCount = Math.ceil(recordCount / pageSize);
        const leftNo = Math.ceil(activePage / pageDisplay) * pageDisplay - pageDisplay + 1;
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
                        'disabled': activePage === 1
                    })}
                    onClick={e => {
                        if (1 !== activePage) this.handlePageChange(1);
                    }}
                />
                <span 
                    className={cx('page-btn fa fa-angle-left', {
                        'disabled': activePage === 1
                    })}
                    onClick={e => {
                        if (1 !== activePage) this.handlePageChange(activePage - 1);
                    }}
                />
                {pageNos.map(pageNo => (
                    <span 
                        key={pageNo}
                        style={pageStyle} 
                        className={cx('page', pageClassName, {
                            'active': pageNo === activePage
                        })} 
                        onClick={e => {
                            if (pageNo !== activePage) this.handlePageChange(pageNo);
                        }}
                    >
                        {pageNo}
                    </span>
                ))}
                <span 
                    className={cx('page-btn fa fa-angle-right', {
                        'disabled': activePage === pageCount
                    })}
                    onClick={e => {
                        if (pageCount !== activePage) this.handlePageChange(activePage + 1);
                    }}
                />
                <span 
                    className={cx('page-btn fa fa-angle-double-right', {
                        'disabled': activePage === pageCount
                    })}
                    onClick={e => {
                        if (pageCount !== activePage) this.handlePageChange(pageCount);
                    }}
                />
            </div>
        );
    }
});

module.exports = Pagination;