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
         * The css class name of the dropdown element.
         */
        dropdownClassName: React.PropTypes.string,

        /**
         * Overwrite the inline styles of the root element.
         */
        style: React.PropTypes.object,

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
            dropdownClassName: '',
            multi: false,
            options: [],
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

    handleTriggerClick(event) {
        if (!this.props.disabled) this.setState({ isOpen: !this.state.isOpen });
    },

    selectOption(optionValue) {
        if (this.props.multi) {
            this.props.onChange(this._value.concat([optionValue]));
        } else {
            this.setState({
                isOpen: false
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

    render() {
        const { 
            className, 
            inputClassName, 
            dropdownClassName,
            style, 
            inputStyle,
            dropdownStyle,
            placeholder, 
            multi, 
            disabled, 
            options, 
            value,
            children 
        } = this.props;
        const { isOpen } = this.state;

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
                    className={classNames({
                        'select-wrapper-single': !multi,
                        'select-wrapper-multi': multi,
                        [`dropdown-wrapper ${className}`]: true,
                        'focus': isOpen
                    })}
                    style={style} 
                >
                    <div 
                        className="select-trigger"
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
                            <span className={classNames('select-caret', {'up': isOpen})}>
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