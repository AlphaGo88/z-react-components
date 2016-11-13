// Select
// ------------------------

const React = require('react');
const cx = require('classnames');

let tabPressed = false;

function handleTabPress(event) {
    tabPressed = event.which === 9;
}

const Select = React.createClass({

    propTypes: {
        /**
         * The css class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The css class name of the trigger element.
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
         * Overwrite the inline styles of the trigger element.
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
         * The select's options.
         * Each option has a `value` prop and a `text` prop.
         */
        options: React.PropTypes.array,

        /**
         * The placeholder text.
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
            if (this.props.defaultValue != undefined) {
                state.value = this.props.defaultValue;
            } else {
                state.value = this.props.multi ? [] : '';
            }
        }
        return state;
    },

    componentDidMount() {
        // Listen to tab pressing so that we know when it's a keyboard focus. 
        document.addEventListener('keydown', handleTabPress, false);
    },

    componentWillUnmount() {
        this.cancelFocusTimeout();
        document.removeEventListener('keydown', handleTabPress, false);
    },

    cancelFocusTimeout() {
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
            this.focusTimeout = null;
        }
    },

    handleFocus(event) {
        if (event) event.persist();
        if (!this.props.disabled) {
            // setTimeout is needed because the focus event fires first
            // Wait so that we can capture if this was a keyboard focus
            this.focusTimeout = setTimeout(() => {
                if (tabPressed) {
                    this.setState({ isOpen: true });
                }
            }, 150);
        }
    },

    handleBlur(event) {
        this.cancelFocusTimeout();
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
        }
    },

    handleTriggerClick(event) {
        if (!this.props.disabled) {
            tabPressed = false;
            this.setState({ 
                isOpen: !this.state.isOpen 
            });
        }
    },

    isControlled() {
        return this.props.value != undefined;
    },

    getValue() {
        return this.isControlled() ? this.props.value : this.state.value;
    },

    handleMouseLeave(event) {
        this.setState({ hoverIndex: -1 });
    },

    handleOptionHover(event, index) {
        this.setState({ hoverIndex: index });
    },

    handleOptionClick(event, item, selected) {
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

        event.preventDefault();
        
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
            selectClassName,
            dropdownClassName,
            style, 
            selectStyle,
            dropdownStyle,
            placeholder, 
            multi, 
            disabled,
            options
        } = this.props;
        const { isOpen, hoverIndex } = this.state;
        const value = this.getValue();

        let selectedOptionText = '';    // the selected option's text when `multi` is false
        let selectedOptions = [];       // the selected options when `multi` is true
        let triggerContent;

        if (multi) {
            // get selected options when `multi` is true
            if (value && value.length > 0) {
                let k, idx;
                for (k = 0; k < options.length; k++) {
                    idx = value.indexOf(options[k].value);
                    if (idx > -1) {
                        selectedOptions[idx] = options[k];
                    }
                }
                if (selectedOptions.length < 1) {
                    console.warn('The `value` prop of `Select` does not match any of its options.');
                }
            }
        } else {
            // when `multi` is false, get the selected item's text.
            if (value || value === 0) {
                const selectedOption = options.filter(item => 
                    item.value === value
                );
                if (selectedOption.length) {
                    selectedOptionText = selectedOption[0].text;
                } else {
                    console.warn('The `value` prop of `Select` does not match any of its options.');
                }
            }
        }

        if (multi) {
            triggerContent = (selectedOptions.length ?
                <ul>
                    {selectedOptions.map((option, i) => (
                        <li
                            key={i}
                            onClick={e => {
                                e.stopPropagation();
                                this.deSelectOption(option.value);
                            }}
                        >
                            {option.text}
                            <i className="fa fa-close"/>
                        </li>
                    ))}
                </ul>
                :
                <span className="placeholder">{placeholder}</span>
            );
        } else {
            triggerContent = (
                <div>
                    {selectedOptionText ||
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

        const renderedOptions = options.map((option, i) => {
            const selected = multi ? value.indexOf(option.value) > -1 : 
                value === option.value;
            return (
                <li 
                    key={i}
                    className={cx('select-option', {
                        'disabled': option.disabled,
                        'selected': selected,
                        'hover': i === hoverIndex
                    })}
                    onMouseOver={e => this.handleOptionHover(e, i)}
                    onClick={e => this.handleOptionClick(e, option, selected)}
                >
                    {option.text}
                </li>
            );
        });

        return (
            <div 
                className={cx('dropdown-wrapper select-wrapper', className)}
                style={style}
                tabIndex={disabled ? undefined : '0'}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
            >
                <div
                    className={cx('dropdown-trigger', selectClassName, {
                        'select-trigger-single': !multi,
                        'select-trigger-multi': multi,
                        'disabled': disabled
                    })}  
                    style={selectStyle}
                    onClick={this.handleTriggerClick}
                >
                    {triggerContent}
                </div>
                <div 
                    className={cx('dropdown select-dropdown', dropdownClassName, {
                        'offscreen': !isOpen 
                    })}
                    style={dropdownStyle}
                >
                    <ul onMouseLeave={this.handleMouseLeave}>
                        {renderedOptions}
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = Select;