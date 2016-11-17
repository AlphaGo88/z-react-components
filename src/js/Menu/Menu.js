// Menu
// ------------------------

const React = require('react');
const cx = require('classnames');
const SubMenu = require('./SubMenu');
const MenuItem = require('./MenuItem');

let Menu = React.createClass({

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
         * The menu items.
         */
        children: React.PropTypes.node,

        /**
         * Fires when select a menu.
         * @param {string} `value`
         */
        onSelect: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            onSelect: () => {}
        };
    },

    handleSelect(value) {
        this.props.onSelect(value);
    },

    render() {
        const { 
            className,
            style,
            children
        } = this.props;

        return (
            <div 
                className={cx('z-menu', className)}
                style={style}
            >
                {React.Children.map(children, (item) => {
                    return React.cloneElement(item, {
                        onSelect: this.handleSelect
                    });
                })}
            </div>
        )
    }
});

Menu.SubMenu = SubMenu;
Menu.MenuItem = MenuItem;
module.exports = Menu;