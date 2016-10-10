// Select
// ------------------------

const classNames = require('classnames');

const Select = React.createClass({

    getDefaultProps() {
        return {
            wrapperClassName: '',
            inputClassName: '',
            multi: false,    //是否支持多选
            data: [],           //选项列表
            defaultValue: '',   //默认选中的值, 单选
            defaultValues: [],  //默认选中的值, 多选
            value: '',          //指定选中的值, 单选
            values: [],         //指定选中的值, 多选
            disabled: false,
            placeholder: '请选择',
            onChange: () => {}
        };
    },

    getInitialState() {
        const { multi, defaultValue, defaultValues, value, values } = this.props;
        let selectedValues = ''; 
        let selectedValue = '';

        if (multi) {
            selectedValues = values.length ? values.slice() : defaultValues.slice();
        } else {
            selectedValue = value ? value : defaultValue;
        }

        return {
            visible: false,
            selectedValues,
            selectedValue
        };
    },

    toggle() {
        this.setState({ visible: !this.state.visible });
    },

    handleBlur() {
        this.hover || this.setState({ visible: false });
    },

    handleMouseEnter() {
        this.hover = true;
    },

    handleMouseLeave() {
        this.hover = false;
    },

    //选择项
    selectItem(item) {
        if (this.props.multi) {
            // this.state({
            //     selectedValues: this.state.selectedValues.concat([item.value]) 
            // });
        } else {
            if (!this.props.value) {
                this.setState({
                    selectedValue: item.value,
                    visible: false
                });
            } else {
                this.setState({
                    visible: false
                });
            }
            if (item.value !== this.state.selectedValue) {
                this.props.onChange(item.value);
            }
        }
    },

    render() {
        const { wrapperClassName, inputClassName, multi, style, disabled, data, placeholder } = this.props;
        const { visible, selectedValues, selectedValue } = this.state;

        //input的文本，单选显示选中项目的text，多选以逗号连接选中项目的text
        let inputText = '';
        if (multi) {
            const selectedItems = data.filter((item) => selectedValues.indexOf(item.value) !== -1); //选中的项目
            let selectedText = []; //选中项目的文本
            selectedItems.forEach((item) => {
                selectedText.push(item.text);
            });
            inputText = selectedText.join(',');
        } else {
            const selectedItem = data.filter((item) => item.value === selectedValue);
            if (selectedItem.length) {
                inputText = selectedItem[0].text;
            }
        }

        return (
            <div style={style} className={`select-wrapper ${wrapperClassName}`}>
                <span className={classNames('caret', {
                    'up': visible
                })}>
                    <b></b>
                </span>
                <input 
                    type="text" 
                    className={`select-trigger ${inputClassName}`}
                    value={inputText}
                    disabled={disabled}
                    placeholder={placeholder}
                    readOnly
                    onClick={this.toggle}
                    onBlur={this.handleBlur}
                />
                <ul 
                    className={classNames('select-dropdown', {
                        'visible': visible
                    })}
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                >
                    {data.map((item, i) => (
                        <li 
                            key={i}
                            className={classNames({
                                'disabled': item.disabled,
                                'selected': selectedValues.indexOf(item.value) !== -1
                            })}
                            onClick={e => {this.selectItem(item)}}
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