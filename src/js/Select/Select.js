// Select
// ------------------------

const React = require('react');
const cx = require('classnames');
const ClickAwayListener = require('../internal/ClickAwayListener');

let Select = React.createClass({

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

    handleOptionHover(index) {
        this.setState({ hoverIndex: index });
    },

    handleOptionClick(value, optionSelected) {
        if (this.props.multi && optionSelected) {
            this.deSelectOption(value);
        } else {
            this.selectOption(value, optionSelected);
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
        event.preventDefault();
        
        const { isOpen, hoverIndex } = this.state;

        switch (event.which) {
            case 38:
                // Up Arrow
                this.setState({ 
                    hoverIndex: (hoverIndex === 0) ? 
                        (this.data.length - 1) : (hoverIndex - 1)
                });
                break;

            case 40:
                // Down Arrow
                this.setState({ 
                    hoverIndex: (hoverIndex === this.data.length - 1) ? 
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
                const { multi } = this.props;
                const { hoverIndex } = this.state;

                if (hoverIndex < 0 || this.data[hoverIndex].disabled) {
                    return;
                }

                const optionValue = this.data[hoverIndex].value;
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
            style, 
            selectStyle,
            dropdownStyle,
            placeholder, 
            multi, 
            disabled,
            children
        } = this.props;
        const { isOpen, hoverIndex } = this.state;
        const value = this.getValue();        

        this.data = [];
        let curIndex = -1;
        let selectedText = '';
        let selectedItems = [];
        let processedChildren = [];

        React.Children.forEach(children, (child) => {
            if (child.props.onClick) {
                curIndex ++;
                const optionIndex = curIndex;

                this.data.push({
                    value: child.props.value,
                    text: child.props.text,
                    disabled: !!child.props.disabled
                });

                let selected = false;

                if (multi && value && value.length) {
                    const idx = value.indexOf(child.props.value);
                    if (idx > -1) {
                        selected = true;
                        selectedItems[idx] = (
                            <li
                                key={idx}
                                onClick={e => {
                                    e.stopPropagation();
                                    this.deSelectOption(child.props.value);
                                }}
                            >
                                {child.props.text}
                                <i className="fa fa-close"/>
                            </li>
                        );
                    }
                } else if (value || value === 0) {
                    if (value === child.props.value) {
                        selected = true;
                        selectedText = child.props.text;
                    }
                }

                processedChildren.push(React.cloneElement(child, {
                    hover: optionIndex === hoverIndex,
                    selected,
                    onMouseOver: e => this.handleOptionHover(optionIndex),
                    onClick: this.handleOptionClick
                }));
            } else {
                processedChildren.push(child);
            }
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
                        <div onMouseLeave={this.handleMouseLeave}>
                            {processedChildren}
                        </div>
                    </div>
                </div>
            </ClickAwayListener>
        );
    }
});

Select.Option = require('./Option');
Select.OptGroup = require('./OptGroup');;
module.exports = Select;