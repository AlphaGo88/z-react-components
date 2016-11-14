// DatePicker
// ------------------------

const React = require('react');
const cx = require('classnames');
const objectAssign = require('object-assign');

let tabPressed = false;

function handleTabPress(event) {
    tabPressed = event.which === 9;
}

// Whether the year is a leap year
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

// How many days does a month have
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

function getDateStr(year, month, date) {
    const monthStr = month > 8 ? month + 1 : '0' + (month + 1);
    const dateStr = date > 9 ? date : '0' + date;

    return `${year}-${monthStr}-${dateStr}`;
}

function getDateTimeStr(year, month, date, hours, minutes, seconds) {
    const hoursStr = hours > 9 ? hours : '0' + hours;
    const minutesStr = minutes > 9 ? minutes : '0' + minutes;
    const secondsStr = seconds > 9 ? seconds : '0' + seconds;
    const dateStr = getDateStr(year, month, date);

    return `${dateStr} ${hoursStr}:${minutesStr}:${secondsStr}`;
}

function getDateProps(date) {
    if (date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        return {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        };
    }
    return {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        date: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };
}

const DatePicker = React.createClass({

    propTypes: {
        /**
         * The class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The class name of the trigger element.
         */
        inputClassName: React.PropTypes.string,

        /**
         * The css class name of the dropdown element.
         */
        dropdownClassName: React.PropTypes.string,

        /**
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * The inline styles of the trigger element.
         */
        inputStyle: React.PropTypes.object,

        /**
         * Overwrite the inline styles of the dropdown element.
         */
        dropdownStyle: React.PropTypes.object,

        /**
         * The placeholder of the trigger element.
         */
        placeholder: React.PropTypes.string,

        /**
         * Whether the component is disabled.
         */
        disabled: React.PropTypes.bool,

        /**
         * Whether time selection is enabled.
         */
        selectTime: React.PropTypes.bool,

        /**
         * Default value of the component.
         */
        defaultValue: React.PropTypes.string,

        /**
         * The value of the component, meaning the component is controlled.
         * Will override `defaultValue`.
         */
        value: React.PropTypes.string,

        /**
         * Disable dates that satisfy the test function.
         * @param {date} date
         * @return {bool}
         */
        disableDates: React.PropTypes.func,

        /**
         * Callback when the component's value changes.
         * @param {string} dateStr
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            disabled: false,
            selectTime: false,
            disableDates: () => false,
            onChange: () => {}
        }
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState(getDateProps(nextProps.value));
        }
    },

    getInitialState() {
        const { defaultValue, value, disableDates } = this.props;
        let initialDate;

        // If neither `value` nor `defaultValue` is provided,
        // select today defaultly.
        // And do not select any date if today is disabled.
        if (value) {
            initialDate = value;
        } else if (defaultValue) {
            initialDate = defaultValue;
        } else {
            const today = new Date();
            if (disableDates(today) === false) {
                initialDate = today;
            }
        }

        const dateProps = getDateProps(initialDate);
        let state = {
            isOpen: false,
            view: 'date',
            ...dateProps
        };

        if (!value) {
            state.value = defaultValue || '';
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
            this.hideAndRestore();
        }
    },

    handleTriggerClick(event) {
        if (!this.props.disabled) {
            tabPressed = false;
            if (this.state.isOpen) {
                this.hideAndRestore();
            } else {
                this.setState({ isOpen: true });
            }
        }
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.view === 'year') {
            this.yearSelect.scrollTop = 2310;
        }
    },

    getValue() {
        return this.props.value || this.state.value;
    },

    // Restore the original state when no date is selected.
    hideAndRestore() {
        let newState = {
            isOpen: false,
            view: 'date'
        };

        if (this.getValue()) {
            objectAssign(newState, getDateProps(this.getValue()))
        }
        this.setState(newState);
    },

    // Switch to year selection.
    selectYear() {
        if (this.state.date) {
            this.setState({ view: 'year' });
        }
    },

    // Switch to time selection.
    selectTime() {
        if (this.state.date) {
            this.setState({ view: 'time' });
        }
    },

    // Switch to date selection.
    selectDate() {
        this.setState({ view: 'date' });
    },

    prevYear() {
        const { year, month, date } = this.state;

        this.setState({ 
            year: year - 1,
            date: month === 1 && date === 29 ? 
                28 : date
        });
    },

    nextYear() {
        const { year, month, date } = this.state;

        this.setState({ 
            year: year + 1,
            date: month === 1 && date === 29 ? 
                28 : date
        });
    },

    prevMonth() {
        const { year, month, date } = this.state;
        const prevMonth = month === 0 ? 11 : month - 1;
        const monthDays = getMonthDays(year, prevMonth);

        this.setState({
            year: month === 0 ? year - 1 : year,
            month: prevMonth,
            date: date > monthDays ? monthDays : date
        });
    },

    nextMonth() {
        const { year, month, date } = this.state;
        const nextMonth = month === 11 ? 0 : month + 1;
        const monthDays = getMonthDays(year, nextMonth);
        
        this.setState({
            year: month === 11 ? year + 1 : year,
            month: nextMonth,
            date: date > monthDays ? monthDays : date
        });
    },

    // Select a year.
    setYear(year) {
        this.setState({
            view: 'date',
            year 
        });
    },

    // Select a date.
    // If `selectTime` is true, just select it.
    // Other wise update the component's value.
    setDate(date) {
        if (this.props.selectTime) {
            if (date !== this.state.date) {
                this.setState({ date });
            }
        } else {
            const dateStr = getDateStr(this.state.year, this.state.month, date);
            let newState = {
                isOpen: false
            };

            if (!this.props.value) {
                objectAssign(newState, {
                    value: dateStr,
                    date
                });
            }
            this.setState(newState);
            this.props.onChange(dateStr);
        }
    },

    setHours(hours) {
        if (hours !== this.state.hours) {
            this.setState({ hours });
        }
    },

    setMinutes(minutes) {
        if (minutes !== this.state.minutes) {
            this.setState({ minutes });
        }
    },

    setSeconds(seconds) {
        if (seconds !== this.state.seconds) {
            this.setState({ seconds });
        }
    },

    clear() {        
        let newState = {
            isOpen: false,
            view: 'date'
        };

        if (!this.props.value) {
            const dateProps = getDateProps(this.initialSelectedDate);
            objectAssign(newState, {
                value: '',
                ...dateProps
            });
        }
        this.setState(newState);
        this.props.onChange('');
    },

    // Confirm selection when `multi` is true.
    confirm() {
        if (this.state.date) {
            const { year, month, date, hours, minutes, seconds } = this.state;
            const dateStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
            let newState = {
                isOpen: false,
                view: 'date'
            };

            if (!this.props.value) {
                newState.value = dateStr;
            }
            this.setState(newState);
            this.props.onChange(dateStr);
        }
    },

    isDateDisabled(year, month, date) {
        return this.props.disableDates(new Date(year, month, date));
    },

    handleKeyUp(event) {
        switch (event.which) {
            case 13:
                // Enter
                if (this.props.selectTime) {
                    this.confirm();
                } else {
                    if (this.state.view === 'date') {
                        this.setDate(this.state.date);
                    } else if (this.state.view === 'year') {
                        this.setState({
                            view: 'date'
                        });
                    }
                }
                break;

            case 27:
                // ESC
                if (this.state.isOpen) {
                    event.stopPropagation();
                    this.hideAndRestore();
                }
                break;

            default:
        }
    },

    handleKeyDown(event) {
        event.preventDefault();

        switch (event.which) {
            case 37:
                // Left Arrow
                this.state.view === 'date' && this.pressKeyToDate(-1);
                break;

            case 38:
                // Up Arrow
                if (this.state.view === 'date') {
                    this.pressKeyToDate(-7);
                } else if (this.state.view === 'year') {
                    this.setState({
                        year: this.state.year - 1 
                    });
                }
                break;

            case 39:
                // Right Arrow
                this.state.view === 'date' && this.pressKeyToDate(1);
                break;

            case 40:
                // Down Arrow
                if (this.state.view === 'date') {
                    this.pressKeyToDate(7);
                } else if (this.state.view === 'year') {
                    this.setState({
                        year: this.state.year + 1 
                    });
                }
                break;

            default:
        }
    },

    // Use keyboard to select a date.
    pressKeyToDate(offset) {
        if (offset > 31 || offset < -31) return;

        const { year, month, date } = this.state;
        const dateObj = new Date(new Date(year, month, date).valueOf() + offset * 24 * 3600000);
        const newYear = dateObj.getFullYear();
        const newMonth = dateObj.getMonth();
        const newDate = dateObj.getDate();

        if (this.isDateDisabled(newYear, newMonth, newDate)) {
            this.pressKeyToDate(offset > 0 ? offset + 1 : offset - 1);
        } else {
            this.setState({
                year: newYear,
                month: newMonth,
                date: newDate
            });
        }
    },

    renderPanelHead() {
        const { view, year, month, date, hours, minutes, seconds } = this.state;
        let dateTimeStr = '';
        
        if (view === 'time') {
            dateTimeStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
        }

        return (
            <div className="datepicker-head">
                <div className={cx({'hide': this.state.view === 'time'})}>
                    <a 
                        className="fa fa-angle-double-left datepicker-prev-year-btn"
                        onClick={this.prevYear}>
                    </a>
                    <a 
                        className="fa fa-angle-left datepicker-prev-month-btn"
                        onClick={this.prevMonth}>
                    </a>
                    <b 
                        className="datepicker-year" 
                        title="选择年份"
                        onClick={this.selectYear}
                    >
                        {`${year}年`}
                    </b>
                    <b className="datepicker-month">
                        {`${month + 1}月`}
                    </b>
                    <a 
                        className="fa fa-angle-right datepicker-next-month-btn"
                        onClick={this.nextMonth}>
                    </a>
                    <a 
                        className="fa fa-angle-double-right datepicker-next-year-btn"
                        onClick={this.nextYear}>
                    </a>
                </div>
                {view === 'time' &&
                    <div>
                        <b>{dateTimeStr}</b>
                    </div>
                }
            </div>
        );
    },

    renderPanelBody() {
        const { selectTime, value} = this.props;
        const { view, year, month, date } = this.state;

        /* Generates dates Start */

        let dates = [], i;
        let renderedDates = [];

        const dayCount = getMonthDays(year, month);
        
        // What day is the first date of the month.
        const offset = new Date(year, month, 1).getDay() || 7;   

        // Empty dates before the first date.
        for (i = 1; i < offset; i++) {
            dates.push({ value: 0 });
        }

        // Dates of current month.
        for (i = 1; i <= dayCount; i++) {
            dates.push({
                value: i,
                active: i === date,
                disabled: this.isDateDisabled(year, month, i)
            });
        }

        for (i = 0; i <= dates.length; i += 7) {
            renderedDates.push(
                <tr key={i}>
                    {dates.slice(i, i + 7).map((date, j) => (
                        <td key={j}>
                            {date.value > 0 &&
                                <span 
                                    className={cx('datepicker-date', { 
                                        'disabled': date.disabled, 
                                        'active': date.active 
                                    })}
                                    onClick={e => {
                                        !date.disabled && this.setDate(date.value);
                                    }}
                                >
                                    {date.value}
                                </span>
                            }
                        </td>
                    ))}
                </tr>
            );
        }

        /* Generates dates End */

        // Years
        let years = [];
        let renderedYears = [];

        for (i = year - 100; i <= year + 100; i++) {
            years.push(i);
        }
        renderedYears = years.map((year, i) => (
            <li 
                key={i}
                className={cx({
                    'active': year === this.state.year
                })}
                onClick={e => this.setYear(year)}
            >
                {year}
            </li>
        ));

        // Hours, minutes and seconds.
        let renderedTimeSelect = null;

        if (selectTime) {
            let timeArr = [];

            for (i = 0; i <= 59; i++) {
                timeArr.push(i < 10 ? ('0' + i) : i);
            }
            renderedTimeSelect = (
                <div className={cx('clearfix', {
                    'hide': view !== 'time'
                })}>
                    <ul className="datepicker-time-col">
                        {timeArr.slice(0, 24).map((hour, i) => (
                            <li 
                                key={i} 
                                onClick={e => this.setHours(i)} 
                                className={cx({'active': i === this.state.hours})}
                            >
                                {`${hour}时`}
                            </li>
                        ))}
                    </ul>
                    <ul className="datepicker-time-col">
                        {timeArr.map((minute, i) => (
                            <li 
                                key={i} 
                                onClick={e => this.setMinutes(i)} 
                                className={cx({'active': i === this.state.minutes})}
                            >
                                {`${minute}分`}
                            </li>
                        ))}
                    </ul>
                    <ul className="datepicker-time-col">
                        {timeArr.map((second, i) => (
                            <li 
                                key={i} 
                                onClick={e => this.setSeconds(i)} 
                                className={cx({'active': i === this.state.seconds})}
                            >
                                {`${second}秒`}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        return (
            <div className="datepicker-body">
                <table className={cx('datepicker-table', {
                    'hide': view !== 'date'
                })}>
                    <thead>
                        <tr>
                            <th><span>一</span></th>
                            <th><span>二</span></th>
                            <th><span>三</span></th>
                            <th><span>四</span></th>
                            <th><span>五</span></th>
                            <th><span>六</span></th>
                            <th><span>日</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderedDates}
                    </tbody>
                </table>
                {view === 'year' &&
                    <ul 
                        ref={(ul) => this.yearSelect = ul}
                        className="datepicker-year-select"
                    >
                        {renderedYears}
                    </ul>
                }
                {selectTime && renderedTimeSelect}
            </div>
        );
    },

    renderPanelFoot() {
        const { selectTime } = this.props;
        const { view, date } = this.state;

        return (
            <div className="datepicker-foot">
                {selectTime ?
                    <div>
                        <span className="datepicker-left-btn" onClick={this.clear}>
                            清空
                        </span>
                        {view === 'time' ?
                            <span onClick={this.selectDate}>
                                选择日期
                            </span>
                            :
                            <span 
                                className={cx({
                                    'disabled': !date || date < 0
                                })} 
                                onClick={this.selectTime}
                            >
                                选择时间
                            </span>
                        }
                        <span 
                            className={cx('datepicker-right-btn', {
                                'disabled': !date || date < 0
                            })} 
                            onClick={this.confirm}
                        >
                            确认
                        </span>
                    </div>
                    :
                    <div>
                        <span className="datepicker-left-btn" onClick={this.clear}>
                            清空
                        </span>
                    </div>
                }
            </div>
        );
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
            disabled 
        } = this.props;
        const { isOpen } = this.state;
        const dateStr = this.getValue();

        const panelHead = this.renderPanelHead();
        const panelBody = this.renderPanelBody();
        const panelFoot = this.renderPanelFoot();

        return (
            <div 
                className={cx('dropdown-wrapper datepicker-wrapper', className)}
                style={style}
                tabIndex={disabled ? undefined : '0'}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
            >
                <div
                    className={cx('dropdown-trigger datepicker-trigger', inputClassName, {
                        'disabled': disabled
                    })}  
                    style={inputStyle}
                    onClick={this.handleTriggerClick}
                >
                    {dateStr ||
                        <span className="placeholder">{placeholder}</span>
                    }
                    <i className="fa fa-calendar icon"></i>
                </div>
                <div 
                    className={cx('dropdown datepicker-panel', dropdownClassName, {
                        'offscreen': !isOpen
                    })}
                    style={dropdownStyle}
                >
                    {panelHead}
                    {panelBody}
                    {panelFoot}
                </div>
            </div>
        );
    }
});

module.exports = DatePicker;