// Select
// ------------------------

const React = require('react');
const classNames = require('classnames');
const ClickAwayListener = require('../internal/ClickAwayListener');

const Select = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The css class name of the input element.
         */
        inputClassName: React.PropTypes.string,

        /**
         * Overwrite the inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * Whether multi-selection is enabled.
         */
        multi: React.PropTypes.bool,

        /**
         * The placeholder of the input element.
         */
        placeholder: React.PropTypes.string,

        /**
         * Whether the component is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * The selected value(`multi` == false).
         */
        value: React.PropTypes.string,

        /**
         * The selected values(`multi` == true).
         */
        values: React.PropTypes.array,

        /**
         * Fires when the selected value change.
         * @param {string} `value`
         */
        onChange: React.PropTypes.func,

        /**
         * The dropdown's z-index.
         */
        zIndex: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            multi: false,
            data: [],
            value: '',
            values: [],
            disabled: false,
            placeholder: '请选择',
            onChange() {}
        };
    },

    getInitialState() {
        return { isOpen: false };
    },

    handleClickAway() {
        this.state.isOpen && this.setState({ isOpen: false });
    },

    handleInputClick(event) {
        this.setState({ isOpen: !this.state.isOpen });
    },

    selectOption(value) {
        if (this.props.multi) {
            this.props.onChange(this.props.values.concat([value]));
        } else {
            this.setState({
                isOpen: false
            });
            if (value !== this.props.value) {
                this.props.onChange(value);
            }
        }
    },

    deSelectOption(value) {
        let valueArr = this.props.values.slice();
        valueArr.splice(valueArr.indexOf(value), 1);
        this.props.onChange(valueArr);
    },

    render() {
        const { 
            className, 
            inputClassName, 
            style, 
            placeholder, 
            multi, 
            disabled, 
            data, 
            value,
            values,
            children 
        } = this.props;
        const { isOpen } = this.state;

        //input的文本，单选显示选中项目的text，多选以逗号连接选中项目的text
        let inputText = '';

        if (multi && values.length > 0) {
            //选中的项目
            const selectedItems = data.filter((item) => 
                values.indexOf(item.value) > -1
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
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div 
                    style={style} 
                    className={classNames('dropdown-wrapper', {
                        [`${className}`]: className
                    })}
                >
                    <span className={classNames('select-caret', { 'up': isOpen })}>
                        <b></b>
                    </span>
                    <input 
                        type="text" 
                        className={classNames('select-trigger', {
                            [`${inputClassName}`]: inputClassName
                        })}
                        value={inputText}
                        disabled={disabled}
                        placeholder={placeholder}
                        onClick={this.handleInputClick}
                    />
                    <div className={classNames('dropdown', { 'offscreen': !isOpen })}>
                        <ul className="select-options">
                            {data.map((item, i) => {
                                const selected = multi ? (values.indexOf(item.value) > -1) : (value === item.value);
                                return (
                                    <li 
                                        key={i}
                                        className={classNames('select-option', {
                                            'disabled': item.disabled,
                                            'selected': selected
                                        })}
                                        onClick={e => {
                                            if (item.disabled) return;
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
            </ClickAwayListener>
        );
    }
});

module.exports = Select;