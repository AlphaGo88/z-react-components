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
         * The css class name of the trigger element.
         */
        selectClassName: React.PropTypes.string,

        /**
         * The css class name of the dropdown element.
         */
        dropdownClassName: React.PropTypes.string,

        /**
         * The css class name of the option element.
         */
        optionClassName: React.PropTypes.string,

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
         * Overwrite the inline styles of the option element.
         */
        optionStyle: React.PropTypes.object,

        /**
         * Whether multi-selection is enabled.
         */
        multi: React.PropTypes.bool,

        /**
         * The placeholder text.
         */
        placeholder: React.PropTypes.string,

        /**
         * Whether the component is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * The options for the `Select`.
         */
        options: React.PropTypes.array,

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
            disabled: false,
            options: [],
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

    handleOptionClick(event, option, isSelected) {
        if (!option.disabled) {
            if (this.props.multi && isSelected) {
                this.deSelectOption(option.value);
            } else {
                this.selectOption(option.value, isSelected);
            }
        }
    },

    selectOption(optionValue, isSelected) {
        if (this.props.multi) {
            const value = this.getValue().concat([optionValue]);

            if (!this.isControlled()) {
                this.setState({ value });
            }
            this.props.onChange(value);
        } else {
            let newState = { isOpen: false };

            if (!isSelected) {
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
        event.preventDefault();
        
        const { options } = this.props;
        const { isOpen, hoverIndex } = this.state;

        switch (event.which) {
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
        switch (event.which) {
            case 13:
                // Enter
                // select or deselect the option.
                const { multi, options } = this.props;
                const { hoverIndex } = this.state;

                if (hoverIndex < 0 || options[hoverIndex].disabled) {
                    return;
                }

                const optionValue = options[hoverIndex].value;
                const value = this.getValue();

                if (multi) {
                    const isOptionSelected = value.filter(it => it === optionValue).length > 0;

                    if (isOptionSelected) {
                        this.deSelectOption(optionValue);
                    } else {
                        this.selectOption(optionValue);
                    }
                } else {
                    this.selectOption(optionValue, value === optionValue);
                }

                break;

            case 27:
                // ESC
                if (this.state.isOpen) {
                    event.stopPropagation();
                    this.setState({ isOpen: false });
                }
                break;

            default:
        }
    },

    render() {
        const { 
            className, 
            selectClassName,
            dropdownClassName,
            optionClassName,
            style, 
            selectStyle,
            dropdownStyle,
            optionStyle,
            placeholder, 
            multi, 
            disabled,
            options
        } = this.props;
        const { isOpen, hoverIndex } = this.state;
        const value = this.getValue();        

        let selectedText = '';
        let selectedItems = [];
        let renderedOptions = [];

        options.forEach((option, i) => {
            let selected = false;

            if (multi && value && value.length) {
                const idx = value.indexOf(option.value);
                if (idx > -1) {
                    selected = true;
                    selectedItems[idx] = (
                        <li
                            key={idx}
                            onClick={e => {
                                e.stopPropagation();
                                this.deSelectOption(option.value);
                            }}
                        >
                            {option.text}
                            <i className="fa fa-close"/>
                        </li>
                    );
                }
            } else if (value === option.value) {
                selected = true;
                selectedText = option.text;
            }

            renderedOptions.push(
                <div
                    key={i}
                    className={cx('select-option', optionClassName, {
                        'hover': hoverIndex === i,
                        'disabled': option.disabled,
                        'selected': selected
                    })}
                    style={optionStyle}
                    onMouseEnter={e => this.handleOptionHover(e, i)}
                    onClick={e => this.handleOptionClick(e, option, selected)}
                >
                    {option.text}
                </div>
            );
        });

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div 
                    className={cx('dropdown-wrapper select-wrapper', className)}
                    style={style}
                    tabIndex={disabled ? undefined : '0'}
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                >
                    <div
                        className={cx('dropdown-trigger', selectClassName, {
                            'select-trigger-single': !multi,
                            'select-trigger-multi': multi,
                            'open': isOpen,
                            'disabled': disabled
                        })}  
                        style={selectStyle}
                        onClick={this.handleTriggerClick}
                    >
                        {multi ?
                            (selectedItems.length > 0 ?
                                <ul>{selectedItems}</ul>
                                :
                                <span className="placeholder">{placeholder}</span>
                            )
                            :
                            <div>
                                {selectedText ||
                                    <span className="placeholder">{placeholder}</span>
                                }
                                <span className={cx({
                                    'caret-down': !isOpen,
                                    'caret-up': isOpen
                                })}>
                                    <b></b>
                                </span>
                            </div>
                        }
                    </div>
                    <div 
                        className={cx('dropdown select-dropdown', dropdownClassName, {
                            'offscreen': !isOpen 
                        })}
                        style={dropdownStyle}
                    >
                        {renderedOptions.length &&
                            <div onMouseLeave={this.handleMouseLeave}>
                                {renderedOptions}
                            </div>
                        }
                    </div>
                </div>
            </ClickAwayListener>
        );
    }
});

module.exports = Select;