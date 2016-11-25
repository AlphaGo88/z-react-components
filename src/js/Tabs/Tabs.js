// Tabs
// ------------------------

const React = require('react');
const cx = require('classnames');
const assign = require('object-assign');
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
         * Initial active index.
         */
        defaultActiveIndex: React.PropTypes.number,

        /**
         * Select the tab whose prop matches this prop.
         * The component is controlled with this prop.
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),

        /**
         * The children of the component.
         * Each child is supposed to be a `Tab` component.
         */
        children: React.PropTypes.node,

        /**
         * Callback when the active tab changes.
         * @param {number} tabIndex
         */
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            defaultActiveIndex: 0,
            onChange: () => {}
        };
    },

    componentWillMount: function() {
        if (this.props.value == undefined) {
            this.setState({
                activeIndex: this.props.defaultActiveIndex
            });
        }
    },

    handleChange(tabIndex, value) {
        if (this.props.value == undefined) {
            this.setState({
                activeIndex: tabIndex 
            });
        }
        this.props.onChange(value);
    },

    render() {
        const { 
            className,
            tabClassName,
            style,
            tabStyle,
            children 
        } = this.props;

        let tabs = [];
        let contents = [];

        React.Children.forEach(children, (child, i) => {
            let active;
            if (this.state) {
                active = this.state.activeIndex === i;
            } else {
                active = this.props.value === child.props.value;
            }

            let contentStyle = {
                display: active ? 'block' : 'none'
            };
            assign(contentStyle, child.props.contentStyle);

            tabs.push(
                <Tab 
                    key={i}
                    className={tabClassName}
                    style={tabStyle}
                    label={child.props.label}
                    value={child.props.value}
                    active={active}
                    onActive={value => {
                        this.handleChange(i, value);
                        child.props.onActive && child.props.onActive(value);
                    }}
                />
            );

            contents.push(
                <div 
                    key={i}
                    className={child.props.contentClassName}
                    style={contentStyle}
                >
                    {child.props.children}
                </div>
            );
        });

        return (
            <div 
                className={cx('z-tab-container', className)}
                style={style}
            >
                <div className="z-tabs">
                    {tabs}
                </div>
                <div className="z-tab-content-container">
                    {contents}
                </div>
            </div>
        );
    }
});

Tabs.Tab = Tab;
module.exports = Tabs;