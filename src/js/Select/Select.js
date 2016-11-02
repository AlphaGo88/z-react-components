// Select
// ------------------------

const React = require('react');
const cx = require('classnames');
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
         * This makes the component controllable and 
         * will override `defaultValue`.
         */
        value: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.array
        ]),

        /**
         * The default selected value.
         */
        defaultValue: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
            React.PropTypes.array
        ]),

        /**
         * Callback when the selected value changes.
         * @param {string} `value`
         */
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            multi: false,
            options: [],
            disabled: false,
            placeholder: '请选择',
            onChange() {}
        };
    },

    getInitialState() {
        let state = {
            isOpen: false,
            hoverIndex: -1
        };

        if (!this.isControlled()) {
            if (typeof this.props.defaultValue !== 'undefined') {
                state.value = this.props.defaultValue;
            } else {
                state.value = this.props.multi ? [] : '';
            }
        }
        return state;
    },

    isControlled() {
        return typeof this.props.value !== 'undefined';
    },

    getValue() {
        return this.isControlled() ? this.props.value : this.state.value;
    },

    handleClickAway() {
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
        }
    },

    handleTriggerClick(event) {
        if (!this.props.disabled) {
            this.setState({ 
                isOpen: !this.state.isOpen 
            });
        }
    },

    handleMouseLeave() {
        this.setState({ hoverIndex: -1 });
    },

    handleOptionHover(index) {
        this.setState({ hoverIndex: index });
    },

    handleOptionClick(item, selected) {
        if (!item.disabled) {
            if (this.props.multi && selected) {
                this.deSelectOption(item.value);
            } else {
                this.selectOption(item.value, selected);
            }
        }
    },

    selectOption(optionValue, selected) {
        if (this.props.multi) {
            const value = this.getValue().concat([optionValue]);

            if (!this.isControlled()) {
                this.setState({ value });
            }
            this.props.onChange(value);
        } else {
            let newState = { isOpen: false };

            if (!selected) {
                if (!this.isControlled()) {
                    newState.value = optionValue;
                }
                this.props.onChange(optionValue);
            }
            this.setState(newState);
        }
    },

    deSelectOption(optionValue) {
        let value = this.getValue().slice();

        value.splice(value.indexOf(optionValue), 1);
        if (!this.isControlled()) {
            this.setState({ value });
        }
        this.props.onChange(value);
    },

    handleKeyDown(event) {
        const { options } = this.props;
        const { isOpen, hoverIndex } = this.state;

        switch (event.which) {
            case 27:
                // ESC
                if (isOpen === true) {
                    event.stopPropagation();
                    this.setState({ isOpen: false });
                }
                break;

            case 38:
                // Up Arrow
                this.setState({ 
                    hoverIndex: (hoverIndex === 0) ? 
                        (options.length - 1) : (hoverIndex - 1)
                });
                break;

            case 40:
                // Down Arrow
                this.setState({ 
                    hoverIndex: (hoverIndex === options.length - 1) ? 
                        0 : (hoverIndex + 1)
                });
                break;

            default:
        }
    },

    handleKeyUp(event) {
        // Enter
        // select or deselect the option.
        if (event.which === 13) {
            const { multi, options } = this.props;
            const { hoverIndex } = this.state;

            if (hoverIndex < 0 || options[hoverIndex].disabled) {
                return;
            }

            const optionValue = options[hoverIndex].value;
            const value = this.getValue();

            if (multi) {
                const optionSelected = value.filter(it => it === optionValue).length > 0;

                if (optionSelected) {
                    this.deSelectOption(optionValue);
                } else {
                    this.selectOption(optionValue);
                }
            } else {
                this.selectOption(optionValue, value === optionValue);
            }
        }
    },

    render() {
        const { 
            className, 
            dropdownClassName,
            style, 
            dropdownStyle,
            multi, 
            disabled, 
            options
        } = this.props;
        const { isOpen, hoverIndex } = this.state;
        const value = this.getValue();
        const trigger = this.renderTigger();

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div 
                    className={cx('dropdown-wrapper select-wrapper', className)}
                    style={style}
                    tabIndex="0" 
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                >
                    {trigger}
                    <div 
                        className={cx('dropdown select-dropdown', dropdownClassName, {
                            'offscreen': !isOpen 
                        })}
                        style={dropdownStyle}
                    >
                        <ul onMouseLeave={this.handleMouseLeave}>
                            {options.map((item, i) => {
                                const selected = multi ? 
                                    value.indexOf(item.value) > -1 : 
                                    value === item.value;
                                return (
                                    <li 
                                        key={i}
                                        className={cx('select-option', {
                                            'disabled': item.disabled,
                                            'selected': selected,
                                            'hover': i === hoverIndex
                                        })}
                                        onMouseOver={e => this.handleOptionHover(i)}
                                        onClick={e => this.handleOptionClick(item, selected)}
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
    },

    renderTigger() {
        const { 
            selectClassName,
            selectStyle,
            placeholder, 
            multi, 
            disabled,
            options
        } = this.props;
        const { isOpen } = this.state;
        const value = this.getValue();

        let displayText = '';
        let selectedItems = [];
        let content;

        if (multi) {
            // get selected items when `multi` is true
            if (value && value.length > 0) {
                let k, idx;
                for (k = 0; k < options.length; k++) {
                    idx = value.indexOf(options[k].value);
                    if (idx > -1) {
                        selectedItems[idx] = options[k];
                    }
                }
                if (selectedItems.length < 1) {
                    console.warn('The `value` prop of `Select` does not match any of its options.');
                }
            }
        } else {
            // when `multi` is false
            if (value || value === 0) {
                const selectedItem = options.filter(item => 
                    item.value === value
                );
                if (selectedItem.length) {
                    displayText = selectedItem[0].text;
                } else {
                    console.warn('The `value` prop of `Select` does not match any of its options.');
                }
            }
        }

        if (multi) {
            content = (selectedItems.length ?
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
            );
        } else {
            content = (
                <div>
                    {displayText ||
                        <span className="placeholder">{placeholder}</span>
                    }
                    <span className={cx({
                        'caret-down': !isOpen,
                        'caret-up': isOpen
                    })}>
                        <b></b>
                    </span>
                </div>
            );
        }

        return (
            <div 
                className={cx(selectClassName, {
                    'select-trigger-single': !multi,
                    'select-trigger-multi': multi,
                    'focus': isOpen,
                    'disabled': disabled
                })}
                style={selectStyle}
                onClick={this.handleTriggerClick}
            >
                {content}
            </div>
        );
    }
});

module.exports = Select;