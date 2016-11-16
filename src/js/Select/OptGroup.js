// OptGroup
// ------------------------

const React = require('react');
const cx = require('classnames');

const OptGroup = React.createClass({

    render() {
        return (
            <div className="select-optgroup">
                {children}
            </div>
        );
    }
});

module.exports = OptGroup;