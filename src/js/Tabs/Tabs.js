// Tabs
// ------------------------

const React = require('react');
const cx = require('classnames');
const Tab = require('./Tab');

let Tabs = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The css class name of the tab element.
         */
        tabClassName: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * The inline styles of the tab element.
         */
        tabStyle: React.PropTypes.object,

        /**
         * The active tab's index.
         */
        activeIndex: React.PropTypes.number,

        /**
         * The children of the component.
         * Each child is supposed to be a `Tab` component.
         */
        children: React.PropTypes.node,

        /**
         * Callback when the active tab changes.
         * @param {number} tabIndex
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            activeIndex: 0,
            onChange() {}
        };
    },

    handleChange(tabIndex) {
        if (tabIndex !== this.props.activeIndex) {
            this.props.onChange(tabIndex);
        }
    },

    render() {
        const { 
            className,
            tabClassName,
            style,
            tabStyle,
            activeIndex, 
            children 
        } = this.props;

        return (
            <div 
                className={className}
                style={style}
            >
                <ul className="tabs">
                    {React.Children.map(children, (child, i) => (
                        <li 
                            className={cx('tab', tabClassName, {
                                'active': i === activeIndex
                            })}
                            style={tabStyle}
                            onClick={e => this.handleChange(i)}
                        >
                            {child.props.label}
                            {i === activeIndex &&
                                <div className="marker"/>
                            }
                        </li>
                    ))}
                </ul>
                {React.Children.map(children, (child, i) => (
                    <div 
                        className={cx('tab-content', child.props.contentClassName, {
                            'active': i === activeIndex
                        })}
                        style={child.props.contentStyle}
                    >
                        {child.props.children}
                    </div>
                ))}
            </div>
        );
    }
});

Tabs.Tab = Tab;

module.exports = Tabs;