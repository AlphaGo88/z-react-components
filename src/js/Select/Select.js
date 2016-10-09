// Select
// ------------------------

const classNames = require('classnames');

const Select = React.createClass({

    getDefaultProps() {
        return {
            data: [],
            defaultValue: '',
            mulitiple: false,
            disabled: false,
            onPageChange: () => {}
        };
    },

    getInitialState() {
        return {
            visible: false,
            value: this.props.defaultValue
        };
    },

    componentDidMount() {
        
    },

    toggle() {
        const newVisible = !this.state.visible;
        this.setState({
            visible: newVisible
        });
    },

    selectItem(value) {
        this.setState({
            value: value,
            visible: false
        });
    },

    render() {

        return (
            <div className="select-wrapper" onClick={this.toggle}>
                <input 
                    type="text" 
                    className="select-trigger" 
                    disabled={this.props.disabled} 
                    readOnly
                />
                <span className="caret"/>
                <ul className={classNames('select-dropdown', {
                    'visible': this.state.visible
                })}>
                    {date.map(item => (
                        <li 
                            className={classNames({
                                'disabled': item.disabled,
                                'active': item.value === this.state.value
                            })}
                            onClick={(e) => {this.selectItem(item.value)}}
                        >
                            {item.text}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
});

module.exports = Select;