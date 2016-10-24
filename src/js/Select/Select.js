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
         * The css class name of the select element.
         */
        selectClassName: React.PropTypes.string,

        /**
         * The css class name of the dropdown element.
         */
        dropdownClassName: React.PropTypes.string,

        /**
         * Overwrite the inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * Overwrite the inline styles of the select element.
         */
        selectStyle: React.PropTypes.object,

        /**
         * Overwrite the inline styles of the dropdown element.
         */
        dropdownStyle: React.PropTypes.object,

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
         * The selected value.
         * When `multi` is true, it's an array of selected values.
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.array
        ]),

        /**
         * Fires when the selected value change.
         * @param {string} `value`
         */
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            className: '',
            selectClassName: '',
            dropdownClassName: '',
            multi: false,
            options: [],
            disabled: false,
            placeholder: '请选择',
            onChange() {}
        };
    },

    getInitialState() {
        return { 
            isOpen: false,
            hoverIndex: 0
        };
    },

    handleClickAway() {
        this.state.isOpen && this.setState({ isOpen: false });
    },

    handleTriggerClick(event) {
        if (!this.props.disabled) this.setState({ isOpen: !this.state.isOpen });
    },

    handleOptionHover(index) {
        this.setState({ hoverIndex: index });
    },

    selectOption(optionValue) {
        if (this.props.multi) {
            this.props.onChange(this._value.concat([optionValue]));
        } else {
            this.setState({
                isOpen: false,
                hoverIndex: -1
            });
            if (optionValue !== this._value) {
                this.props.onChange(optionValue);
            }
        }
    },

    deSelectOption(optionValue) {
        let value = this._value.slice();
        value.splice(value.indexOf(optionValue), 1);
        this.props.onChange(value);
    },

    handleKeyDown(event) {
        const { multi, options, onChange } = this.props;
        const { hoverIndex } = this.state;

        switch (event.which) {
            case 27:
                // ESC
                this.setState({ isOpen: false });
                break;

            case 13:
                // Enter
                const selectedValue = options[hoverIndex].value;

                if (options[hoverIndex].disabled) {
                    break;
                }
                if (multi) {
                    const match = this._value.filter(it => it === selectedValue);
                    if (match.length > 0) {
                        this.deSelectOption(selectedValue);
                    } else {
                        onChange(this._value.concat([selectedValue]));
                    }
                } else {
                    if (this._value === selectedValue) {
                        this.setState({ isOpen: false });
                    } else {
                        this.setState({ isOpen: false });
                        onChange(selectedValue);
                    }
                }
                break;

            case 38:
                // Up Arrow
                this.setState({ 
                    hoverIndex: (hoverIndex === 0) ? (options.length - 1) : (hoverIndex - 1)
                });
                break;

            case 40:
                // Down Arrow
                this.setState({ 
                    hoverIndex: (hoverIndex === options.length - 1) ? 0 : (hoverIndex + 1)
                });
                break;

            default:
        }
    },

    render() {
        const { 
            className, 
            selectClassName,
            dropdownClassName,
            style, 
            selectStyle,
            dropdownStyle,
            placeholder, 
            multi, 
            disabled, 
            options, 
            value,
            children 
        } = this.props;
        const { isOpen, hoverIndex } = this.state;

        let displayText = '';
        let selectedItems = [];

        if (multi) {
            // get selected items when `multi` is true
            if (value && value.length > 0) {
                this._value = value;
                
                selectedItems = options.filter(item => 
                    this._value.indexOf(item.value) > -1
                );

                if (!selectedItems.length) {
                    console.warn('The `value` prop of `Select` does not match any of its options.');
                }
            } else {
                this._value = [];
            }
        } else {
            // when `multi` is false
            if (value || value === 0) {
                this._value = value;
                selectedItems = options.filter(item => 
                    item.value === this._value
                );
                
                if (selectedItems.length) {
                    displayText = selectedItems[0].text;
                } else {
                    console.warn('The `value` prop of `Select` does not match any of its options.');
                }
            } else {
                this._value = '';
            }
        }

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div 
                    className={`dropdown-wrapper ${className}`}
                    style={style}
                    tabIndex="0" 
                    onKeyDown={this.handleKeyDown}
                >
                    <div 
                        className={classNames({
                            [`select-trigger ${selectClassName}`]: true,
                            'select-trigger-single': !multi,
                            'select-trigger-multi': multi,
                            'focus': isOpen,
                            'disabled': disabled
                        })}
                        onClick={this.handleTriggerClick}
                    >
                        {multi ?
                            (selectedItems.length ?
                                <ul>
                                    {selectedItems.map((item, i) => (
                                        <li
                                            key={i}
                                            onClick={e => {
                                                e.stopPropagation();
                                                this.deSelectOption(item.value);
                                            }}
                                        >
                                            {item.text}
                                            <i className="fa fa-close"/>
                                        </li>
                                    ))}
                                </ul>
                                :
                                <span className="placeholder">{placeholder}</span>
                            )
                            :
                            (displayText ||
                                <span className="placeholder">{placeholder}</span>
                            )
                        }
                        {multi ||
                            <span className={classNames('caret', {'up': isOpen})}>
                                <b></b>
                            </span>
                        }
                    </div>
                    <div 
                        className={classNames({
                            [`dropdown ${dropdownClassName}`]: true, 
                            'offscreen': !isOpen 
                        })}
                        style={dropdownStyle}
                    >
                        <ul className="select-options">
                            {options.map((item, i) => {
                                const selected = multi ? (this._value.indexOf(item.value) > -1) : (this._value === item.value);
                                return (
                                    <li 
                                        key={i}
                                        className={classNames('select-option', {
                                            'disabled': item.disabled,
                                            'selected': selected,
                                            'hover': i === hoverIndex
                                        })}
                                        onMouseOver={e => this.handleOptionHover(i)}
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