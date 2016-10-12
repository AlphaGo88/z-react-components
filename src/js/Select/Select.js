// Select
// ------------------------

const classNames = require('classnames');

const Select = React.createClass({

    getDefaultProps() {
        return {
            className: '',
            inputClassName: '',
            style: {},
            multi: false,       //是否支持多选
            data: [],           //选项列表
            value: '',          //指定选中的值
            disabled: false,
            placeholder: '请选择',
            onChange: () => {}
        };
    },

    getInitialState() {
        return { isOpen: false };
    },

    componentDidMount() {
        window.addEventListener('click', this.clickAway, false);
    },

    componentWillUnmount() {
        window.removeEventListener('click', this.clickAway, false);
    },

    clickAway() {
        !this.hover && this.state.isOpen && this.setState({ isOpen: false });
    },

    //点击input，显示或隐藏选择框
    handleInputClick(event) {
        this.setState({ isOpen: !this.state.isOpen });
        event.stopPropagation();
    },

    //鼠标进入选择框
    handleMouseEnter() {
        this.hover = true;
    },

    //鼠标离开选择框
    handleMouseLeave() {
        this.hover = false;
    },

    //选择某个选项
    selectOption(value) {
        if (this.props.multi) {
            this.props.onChange(this.props.value.concat([value]));
        } else {
            this.setState({
                isOpen: false
            });
            if (value !== this.props.value) {
                this.props.onChange(value);
            }
        }
    },

    //反选某个选项(多选有效)
    deSelectOption(value) {
        let valueArr = this.props.value.slice();
        valueArr.splice(valueArr.indexOf(value), 1);
        this.props.onChange(valueArr);
    },

    render() {
        const { className, inputClassName, style, placeholder, multi, disabled, data, value } = this.props;
        const { isOpen } = this.state;

        //input的文本，单选显示选中项目的text，多选以逗号连接选中项目的text
        let inputText = '';

        if (multi && value.length > 0) {
            //选中的项目
            const selectedItems = data.filter((item) => 
                value.indexOf(item.value) > -1
            );
            //选中项目的文本
            let selectedText = []; 

            selectedItems.forEach((item) => {
                selectedText.push(item.text);
            });
            inputText = selectedText.join(',');

        } else if (value.length > 0) {
            const selectedItem = data.filter(item => item.value === value);
            
            if (selectedItem.length) {
                inputText = selectedItem[0].text;
            }
        }

        return (
            <div style={style} className={`dropdown-wrapper ${className}`}>
                <span className={classNames('select-caret', { 'up': isOpen })}>
                    <b></b>
                </span>
                <input 
                    type="text" 
                    className={`select-trigger ${inputClassName}`}
                    value={inputText}
                    disabled={disabled}
                    placeholder={placeholder}
                    readOnly
                    onClick={this.handleInputClick}
                    onBlur={this.clickAway}
                />
                <div className={classNames({ 
                    'dropdown': true,
                    'offscreen': !isOpen
                })}>
                    <ul 
                        className="select-options"
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                    >
                        {data.map((item, i) => {
                            const selected = multi ? (value.indexOf(item.value) > -1) : (value === item.value);
                            return (
                                <li 
                                    key={i}
                                    className={classNames({
                                        'disabled': item.disabled,
                                        'selected': selected
                                    })}
                                    onClick={e => {
                                        (multi && selected) ? this.deSelectOption(item.value) : this.selectOption(item.value)
                                    }}
                                >
                                    {item.text}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Select;