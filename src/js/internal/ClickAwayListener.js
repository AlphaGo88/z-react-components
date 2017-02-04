// ClickAwayListener
// ------------------------

const React = require('react');

const isDescendant = (el, target) => {
    if (target !== null) {
        return el === target || isDescendant(el, target.parentNode);
    }
    return false;
};

const ClickAwayListener = React.createClass({

    propTypes: {
        children: React.PropTypes.node,
        onClickAway: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            onClickAway: () => {}
        };
    },

    componentDidMount() {
        document.addEventListener('click', this.handleClickAway);
    },

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickAway);
    },

    handleClickAway(event) {
        if (event.defaultPrevented) return;

        const el = ReactDOM.findDOMNode(this);

        if (document.documentElement.contains(event.target) && !isDescendant(el, event.target)) {
            this.props.onClickAway(event);
        }
    },

    render() {
        return this.props.children;
    }
    
});

module.exports = ClickAwayListener;