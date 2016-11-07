// Tab
// ------------------------

const React = require('react');
const cx = require('classnames');

const Tab = React.createClass({

    propTypes: {
        /**
         * The css class name of the tab.
         */
        className: React.PropTypes.string,

        /**
         * The css class name of the content element.
         */
        contentClassName: React.PropTypes.string,

        /**
         * The inline styles of the tab.
         */
        style: React.PropTypes.object,

        /**
         * The inline styles of the content element.
         */
        contentStyle: React.PropTypes.object,

        /**
         * The label of the tab.
         */
        label: React.PropTypes.node,

        /**
         * Required if the Tabs component has a `value` prop.
         * The value to identify the tab.
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),

        /**
         * Whether the tab is active.
         */
        active: React.PropTypes.bool,

        /**
         * Fires when the tab is selected.
         */
        onActive: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            active: false,
            onActive: () => {}
        };
    },

    handleClick(event) {
        if (!this.props.active) {
            this.props.onActive(this.props.value);
        }
    },

    render() {
        const {
            className,
            style,
            label,
            active
        } = this.props;

        return (
            <div 
                className={cx('z-tab', className, {
                    'active': active
                })}
                style={style}
                onClick={this.handleClick}
            >
                {label}
                {active &&
                    <div className="ink-bar"/>
                }
            </div>
        );
    }
});

module.exports = Tab;