// Tab
// ------------------------

const React = require('react');

const Tab = React.createClass({

    propTypes: {
        /**
         * The css class name of the content element.
         */
        contentClassName: React.PropTypes.string,

        /**
         * The inline styles of the content element.
         */
        contentStyle: React.PropTypes.object,

        /**
         * The label of the tab.
         */
        label: React.PropTypes.node
    },

    render() {
        return null;
    }
});

module.exports = Tab;