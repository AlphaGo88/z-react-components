// Message
// ------------------------

const React = require('react');
const cx = require('classnames');

const Message = React.createClass({

    propTypes: {
        type: React.PropTypes.string,
        duration: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            type: 'msg',
            duration: 4000
        };
    },

    getInitialState() {
        return { exiting: false };
    },

    componentDidMount() {
        this.exitTimeOut = setTimeout(() => {
            this.setState({
                exiting: true 
            });
        }, this.props.duration);
    },

    componentWillUnmount() {
        clearTimeout(this.exitTimeOut);
    },

    render() {
        const { type, children } = this.props;
        let iconClass = '';

        switch (type) {
            case 'success':
                iconClass = 'fa fa-check-circle icon-success';
                break;
            case 'info':
                iconClass = 'fa fa-info-circle icon-info';
                break;
            case 'warning':
                iconClass = 'fa fa-warning icon-warning';
                break;
            case 'error':
                iconClass = 'fa fa-times-circle icon-error';
                break;
            default:
        }

        return (
            <div className={cx('z-msg', {
                'exit': this.state.exiting
            })}>
                {type !== 'msg' &&
                    <i className={iconClass}/>
                }
                {children}
            </div>
        );
    }
    
});

module.exports = Message;