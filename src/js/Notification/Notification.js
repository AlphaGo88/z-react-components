// Notification
// ------------------------

const React = require('react');
const cx = require('classnames');

const Notification = React.createClass({

    propTypes: {
        type: React.PropTypes.string,
        duration: React.PropTypes.number,
        autoClose: React.PropTypes.bool,
        icon: React.PropTypes.node,
        title: React.PropTypes.node,
        content: React.PropTypes.node
    },

    getDefaultProps() {
        return {
            duration: 5000,
            autoClose: true
        };
    },

    getInitialState() {
        return {
            exiting: false 
        };
    },

    componentDidMount() {
        if (this.props.autoClose) {
            this.exitTimeOut = setTimeout(this.close, this.props.duration);   
        }
    },

    componentWillUnmount() {
        if (this.exitTimeOut) {
            clearTimeout(this.exitTimeOut);
            this.exitTimeOut = null;
        }
    },

    close() {
        this.setState({
            exiting: true 
        });
    },

    render() {
        const { 
            type,  
            title,
            content
        } = this.props;

        let icon;
        let iconClass = '';

        if (type) {
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
            icon = <i className={iconClass}/>;
        } else {
            icon = this.props.icon;
        }

        return (
            <div className={cx('z-notification', {
                'exit': this.state.exiting
            })}>
                <i className="fa fa-close z-notification-close" onClick={this.close}/>
                {icon &&
                    <div className="z-notification-icon">
                        {icon}
                    </div>
                }
                <div className={cx('z-notification-body', {
                    'with-icon': !!icon
                })}>
                    <div className="z-notification-title">
                        {title}
                    </div>
                    <div className="z-notification-content">
                        {content}
                    </div>
                </div>
            </div>
        );
    }
    
});

module.exports = Notification;