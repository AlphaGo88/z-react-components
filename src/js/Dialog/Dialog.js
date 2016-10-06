// 对话框组件

const classNames = require('classnames');

const Dialog = React.createClass({

    getDefaultProps() {
        return {
            style: null,
            visible: false,
            title: '',
            footer: null,    //自定义footer
            onOK: () => {},
            onCancel: null,
        };
    },

    getInitialState() {
        return { visible: this.props.visible };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({ visible: nextProps.visible });
    },

    close() {
        this.setState({ visible: false });
    },

    render() {
        const { title, style, children, onOK, onCancel, footer } = this.props;
        const { visible } = this.state;

        const layerClass = classNames('dlg-mask', { 'show': visible });

        return (
            <div className={layerClass}>
                <div className="dlg" style={style}>
                    <a className="fa fa-close dlg-close" onClick={this.close}></a>
                    <h3 className="dlg-title">{title}</h3>
                    <div className="dlg-body">{children}</div>
                    {footer ? 
                        <div className="dlg-foot">
                            {footer}
                        </div>
                        : 
                        <div className="dlg-foot">
                            <span className="btn-flat" onClick={onOK}>确认</span>
                            <span className="btn-flat" onClick={onCancel || this.close}>取消</span>
                        </div>
                    }
                </div>
            </div>
        );
    }
    
});

module.exports = Dialog;