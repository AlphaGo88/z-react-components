// DropdownMenu
// ------------------------

const React = require('react');
const cx = require('classnames');
const ClickAwayListener = require('../internal/ClickAwayListener');

let DropdownMenu = React.createClass({

    propTypes: {
        /**
         * The dropdown menu.
         */
        menu: React.PropTypes.node
    },

    getInitialState() {
        return {
            isOpen: false 
        };
    },

    handleClick() {
        this.setState({ isOpen: !this.state.isOpen });
    },

    handleClickAway() {
        this.setState({ isOpen: false });
    },

    render() {
        const { menu, children } = this.props;
        const { isOpen } = this.state;

        const processedChildren = React.cloneElement(children, {
            onClick: this.handleClick
        });
        const processedMenu = React.cloneElement(menu, {
            onSelect: (value) => {
                this.setState({ isOpen: false });
                menu.props.onSelect(value);
            }
        });

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div className="dropdown-wrapper">
                    {processedChildren}
                    <div 
                        className={cx('dropdown-no-border', {
                            'offscreen': !isOpen
                        })}
                        style={{boxShadow: 'none'}}
                    >
                        {processedMenu}
                    </div>
                </div>
            </ClickAwayListener>
        );
    }
});

module.exports = DropdownMenu;