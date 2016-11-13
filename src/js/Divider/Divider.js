// Divider
// ------------------------

const React = require('react');
const cx = require('classnames');

const Divider = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object
    },

    render() {
        const { 
            className,
            style
        } = this.props;

        return (
            <div 
                className={cx('divider', className)}
                style={style}
            />
        );
    }
});

module.exports = Divider;