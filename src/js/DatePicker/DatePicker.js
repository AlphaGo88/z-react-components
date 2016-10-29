// DatePicker
// ------------------------

const React = require('react');
const cx = require('classnames');
const ClickAwayListener = require('../internal/ClickAwayListener');

// Whether the year is a leap year
const isLeapYear = (year) => {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

// How many days does a month have
const getMonthDays = (year, month) => {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

const getDateStr = (year, month, date) => {
    const monthStr = month > 8 ? month + 1 : '0' + (month + 1);
    const dateStr = date > 9 ? date : '0' + date;
    return `${year}-${monthStr}-${dateStr}`;
}

const getDateTimeStr = (year, month, date, hours, minutes, seconds) => {
    const hoursStr = hours > 9 ? hours : '0' + hours;
    const minutesStr = minutes > 9 ? minutes : '0' + minutes;
    const secondsStr = seconds > 9 ? seconds : '0' + seconds;
    const dateStr = getDateStr(year, month, date);
    return `${dateStr} ${hoursStr}:${minutesStr}:${secondsStr}`;
}

const getDateProps = (date) => {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    }
}

const DatePicker = React.createClass({

    propTypes: {
        /**
         * The class name of the root element.
         */
        className: React.PropTypes.string,

        /**
         * The class name of the input element.
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
         * The inline styles of the input element.
         */
        inputStyle: React.PropTypes.object,

        /**
         * Overwrite the inline styles of the dropdown element.
         */
        dropdownStyle: React.PropTypes.object,

        /**
         * The placeholder of the input element.
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
         * 
         * The `defaultValue` must be:
         * 1. a valid date string, e.g. `2016-06-06`.
         * 2. a valid date value, e.g. 1476325700327.
         * 3. a date object.
         * So are `value`, `maxValue` and `minValue`.
         */
        defaultValue: React.PropTypes.any,

        /**
         * The value of the component, meaning the component is controlled.
         * Will override `defaultValue`.
         */
        value: React.PropTypes.any,

        /**
         * Maximum date value.
         */
        maxValue: React.PropTypes.any,

        /**
         * Minimum date value.
         */
        minValue: React.PropTypes.any,

        /**
         * Disable dates that satisfy the test function.
         * @param {date} date
         * @return {bool}
         */
        disableDates: React.PropTypes.func,

        /**
         * Fires when the component's value changes.
         * @param {string} dateStr
         * @param {date} dateObj
         */
        onChange: React.PropTypes.func,
    },

    getDefaultProps() {
        return {
            disabled: false,
            selectTime: false,
            onChange() {},
            disableDates: () => false
        }
    },

    getInitialState() {
        const { defaultValue, value, maxValue, minValue, disableDates } = this.props;
        const today = new Date(); 
        let selectedDate = today;   // defaultly selected date(may not be synchronized to the component's value).
        let curDate = '';   // the current date object(synchronized with the component's value).

        if (value) { 
            // select specified date
            selectedDate = new Date(value);
            curDate = selectedDate;
        } else if (defaultValue) {
            // select default value
            selectedDate = new Date(defaultValue);
            curDate = selectedDate;
        } else {
            // If no value is specified:
            // If today is greater than `maxValue`, select `maxValue` defaultly.
            // If today is before `minValue`, select `minValue` defaultly.
            // Otherwise select today defaultly.
            if (maxValue && today.valueOf() > new Date(maxValue).valueOf()) {
                selectedDate = new Date(maxValue);
            } else if (minValue && today.valueOf() < new Date(minValue).valueOf()) {
                selectedDate = new Date(minValue);
            }
        }

        this.initialSelectedDate = selectedDate;
        const dateProps = getDateProps(selectedDate);

        return {
            isOpen: false,
            view: 'date',
            curDate,
            ...dateProps
        };
    },

    // Restore the value when click away.
    handleClickAway() {
        this.state.isOpen && this.hideAndRestore();
    },

    // Restore the value when click away or cancel.
    hideAndRestore() {
        const dateProps = this.state.curDate ? 
            getDateProps(this.state.curDate) 
            : 
            getDateProps(this.initialSelectedDate);

        this.setState({
            isOpen: false,
            view: 'date',
            ...dateProps
        });
    },

    handleTriggerClick() {
        if (this.props.disabled) {
            return;
        }
        if (this.state.isOpen) {
            this.hideAndRestore();
        } else {
            this.setState({ isOpen: true });
        }
    },

    // Switch to time selection.
    selectTime() {
        this.setState({ view: 'time' });
    },

    // Switch to date selection.
    selectDate() {
        this.setState({ view: 'date' });
    },
    
    // When go to a year or month,
    // If the year and month are same with current, select current date,
    // Otherwise select no date.
    inCurrentYearAndMonth(year, month) {
        const { curDate } = this.state;
        const initialDate = this.initialSelectedDate;

        if (curDate) {
            if (curDate.getFullYear() === year &&
                curDate.getMonth() === month) {
                return curDate.getDate();
            }
        } else {
            if (initialDate.getFullYear() === year &&
                initialDate.getMonth() === month) {
                return initialDate.getDate();
            }
        }

        return 0;
    },

    prevYear() {
        this.setState({ 
            year: this.state.year - 1,
            date: this.inCurrentYearAndMonth(this.state.year - 1, this.state.month)
        });
    },

    nextYear() {
        this.setState({ 
            year: this.state.year + 1,
            date: this.inCurrentYearAndMonth(this.state.year + 1, this.state.month)
        });
    },

    prevMonth() {
        if (this.state.month === 0) {
            this.setState({
                year: this.state.year - 1,
                month: 11,
                date: this.inCurrentYearAndMonth(this.state.year - 1, 11)
            });
        } else {
            this.setState({
                month: this.state.month - 1,
                date: this.inCurrentYearAndMonth(this.state.year, this.state.month - 1)
            });
        }
    },

    nextMonth() {
        if (this.state.month === 11) {
            this.setState({
                year: this.state.year + 1,
                month: 0,
                date: this.inCurrentYearAndMonth(this.state.year + 1, 0)
            });
        } else {
            this.setState({
                month: this.state.month + 1,
                date: this.inCurrentYearAndMonth(this.state.year, this.state.month + 1)
            });
        }
    },

    // Select a date.
    // If `selectTime` is true, just select it.
    // Other wise update the component's value.
    setDate(date) {
        if (this.props.selectTime) {
            if (date !== this.state.date) this.setState({ date });
        } else {
            const { year, month } = this.state;
            const dateStr = getDateStr(year, month, date);
            const dateObj = new Date(year, month, date);

            this.setState({
                date,
                curDate: dateObj,
                isOpen: false
            });

            this.props.onChange(dateStr, dateObj);
        }
    },

    setHours(hours) {
        if (hours !== this.state.hours) this.setState({ hours });
    },

    setMinutes(minutes) {
        if (minutes !== this.state.minutes) this.setState({ minutes });
    },

    setSeconds(seconds) {
        if (seconds !== this.state.seconds) this.setState({ seconds });
    },

    setToday() {
        const today = new Date();
        const dateProps = getDateProps(today);
        const dateStr = this.props.selectTime ?
            getDateTimeStr(dateProps.year, dateProps.month, dateProps.date, dateProps.hours, dateProps.minutes, dateProps.seconds)
            :
            getDateStr(dateProps.year, dateProps.month, dateProps.date);

        this.setState({
            isOpen: false,
            curDate: today,
            ...dateProps
        });
        this.props.onChange(dateStr, today);
    },

    clear() {
        // Restore the initially selected date.
        const dateProps = getDateProps(this.initialSelectedDate);
        this.setState({
            curDate: '',
            isOpen: false,
            view: 'date',
            ...dateProps
        });
        this.props.onChange('', null);
    },

    // Confirm selection when `multi` is true.
    ok() {
        // Update if any date is selected.
        // Otherwise cancel.
        const { year, month, date, hours, minutes, seconds } = this.state;
        if (date) {
            const dateStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
            const dateObj = new Date(year, month, date, hours, minutes, seconds);
            this.setState({
                view: 'date',
                curDate: dateObj,
                isOpen: false
            });
            this.props.onChange(dateStr, dateObj);
        } else {
            this.hideAndRestore();
        }
    },

    isDateDisabled(year, month, date) {
        const { maxValue, minValue, disableDates } = this.props;
        const _maxValue = maxValue ? new Date(maxValue).valueOf() : 0;
        const _minValue = minValue ? new Date(minValue).valueOf() : 0;
        const dateObj = new Date(year, month, date);
        const dateValue = dateObj.valueOf();

        if (_maxValue && _maxValue < dateValue) {
            return true;
        }
        if (_minValue && _minValue > dateValue) {
            return true;
        }
        return disableDates(dateObj);
    },

    handleKeyDown(event) {
        switch (event.which) {
            case 27:
                // ESC
                this.hideAndRestore();
                break;

            case 13:
                // Enter
                if (this.props.selectTime) {
                    this.ok();
                } else {
                    this.setDate(this.state.date);
                }
                break;

            case 37:
                // Left Arrow
                this.state.view === 'date' && this.pressKeyToDate(-1);
                break;

            case 38:
                // Up Arrow
                this.state.view === 'date' && this.pressKeyToDate(-7);
                break;

            case 39:
                // Right Arrow
                this.state.view === 'date' && this.pressKeyToDate(1);
                break;

            case 40:
                // Down Arrow
                this.state.view === 'date' && this.pressKeyToDate(7);
                break;

            default:
        }
    },

    // Press on keyboard to select a date.
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

    renderTrigger() {
        const { inputClassName, inputStyle, placeholder, selectTime, disabled } = this.props;
        const { curDate, isOpen } = this.state;
        let dateStr = '';   // The date string displayed.

        // get date string base on current date object.
        if (curDate) {
            const dateProps = getDateProps(curDate);
            const { year, month, date, hours, minutes, seconds } = dateProps;
            dateStr = selectTime ? 
                getDateTimeStr(year, month, date, hours, minutes, seconds) 
                :
                getDateStr(year, month, date);
        }

        return (
            <div 
                className={cx('datepicker-trigger', inputClassName, {
                    'focus': isOpen,
                    'disabled': disabled
                })}
                style={inputStyle}
                onClick={this.handleTriggerClick}
            >
                <input
                    type="text"
                    className="datepicker-input"
                    value={dateStr}
                    placeholder={placeholder}
                    readOnly
                />
                <i className="fa fa-calendar icon"></i>
            </div>
        );
    },

    renderPanelHead() {
        const { maxValue, minValue } = this.props;
        const { year, month, date, hours, minutes, seconds } = this.state;
        const minDate = minValue && new Date(minValue) || ''; 
        const maxDate = maxValue && new Date(maxValue) || '';
        const preYearDisabled = minDate && minDate.getFullYear() >= year;
        const nextYearDisabled = maxDate && maxDate.getFullYear() <= year;
        const preMonthDisabled = minDate && minDate.getFullYear() === year && minDate.getMonth() >= month;
        const nextMonthDisabled = maxDate && maxDate.getFullYear() === year && maxDate.getMonth() <= month;

        let dateStr = '';
        
        if (this.state.view === 'time') {
            dateStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
        }

        return (
            <div className="datepicker-head">
                <div className={cx({'hide': this.state.view === 'time'})}>
                    <a 
                        className={cx(
                            'fa fa-angle-double-left datepicker-prev-year-btn',
                            {'disabled': preYearDisabled}
                        )} 
                        onClick={() => preYearDisabled || this.prevYear()}>
                    </a>
                    <a 
                        className={cx(
                            'fa fa-angle-left datepicker-prev-month-btn', 
                            {'disabled': preMonthDisabled}
                        )} 
                        onClick={() => preMonthDisabled || this.prevMonth()}>
                    </a>
                    <b>{`${year}年`}</b>
                    <b>{`${month + 1}月`}</b>
                    <a 
                        className={cx(
                            'fa fa-angle-right datepicker-next-month-btn', 
                            {'disabled': nextMonthDisabled}
                        )} 
                        onClick={() => nextMonthDisabled || this.nextMonth()}>
                    </a>
                    <a 
                        className={cx(
                            'fa fa-angle-double-right datepicker-next-year-btn',
                            {'disabled': nextYearDisabled}
                        )} 
                        onClick={() => nextYearDisabled || this.nextYear()}>
                    </a>
                </div>
                {this.state.view === 'time' &&
                    <div>
                        <b>{dateStr}</b>
                    </div>
                }
            </div>
        );
    },

    renderPanelBody() {
        const { selectTime, maxValue, minValue, disableDates, value} = this.props;
        const { view, year, month, date } = this.state;

        /* Generates dates Start */

        const howManyDates = getMonthDays(year, month);
        const offset = new Date(year, month, 1).getDay() || 7;   // What day is the first date of the month.

        let dates = [], rows = [], i;

        // Empty dates before the first date.
        for (i = 1; i < offset; i++) {
            dates.push({ value: 0 });
        }

        // Dates of current month.
        for (i = 1; i <= howManyDates; i++) {
            dates.push({
                value: i,
                active: i === date,
                disabled: this.isDateDisabled(year, month, i)
            });
        }

        // Rows of dates.
        for (i = 0; i <= dates.length; i += 7) {
            rows.push(dates.slice(i, i + 7));
        }

        /* Generates dates End */

        // Hours, minutes and seconds.
        let hours = [], minutes = [], seconds = [];
        if (selectTime) {
            let timeArr = [];

            for (i = 0; i <= 60; i++) {
                timeArr.push(i < 10 ? ('0' + i) : i);
            }
            hours = timeArr.slice(0, 24);
            minutes = timeArr.slice(0, 60);
            seconds = timeArr.slice(0, 60);
        }

        return (
            <div className="datepicker-body">
                <table className={cx('datepicker-table', {'hide': view === 'time'})}>
                    <thead>
                        <tr>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                            <th>日</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                                {row.map((item, idx) => (
                                    <td key={idx}>
                                        {item.value > 0 &&
                                            <span 
                                                className={cx('datepicker-date', { 
                                                    'disabled': item.disabled, 
                                                    'active': item.active 
                                                })}
                                                onClick={() => {
                                                    item.disabled || this.setDate(item.value);
                                                }}
                                            >
                                                {item.value}
                                            </span>
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={cx('datepicker-yearSelect', {'hide': view === 'year'})}>
                    
                </div>
                {selectTime &&
                    <div className={cx('clearfix', {'hide': view === 'date'})}>
                        <ul className="datepicker-time-col">
                            {hours.map((hour, idx) => (
                                <li 
                                    key={idx} 
                                    onClick={e => {this.setHours(idx)}} 
                                    className={cx({'active': idx === this.state.hours})}
                                >
                                    {`${hour}时`}
                                </li>
                            ))}
                        </ul>
                        <ul className="datepicker-time-col">
                            {minutes.map((minute, idx) => (
                                <li 
                                    key={idx} 
                                    onClick={e => {this.setMinutes(idx)}} 
                                    className={cx({'active': idx === this.state.minutes})}
                                >
                                    {`${minute}分`}
                                </li>
                            ))}
                        </ul>
                        <ul className="datepicker-time-col">
                            {seconds.map((second, idx) => (
                                <li 
                                    key={idx} 
                                    onClick={e => {this.setSeconds(idx)}} 
                                    className={cx({'active': idx === this.state.seconds})}
                                >
                                    {`${second}秒`}
                                </li>
                            ))}
                        </ul>
                    </div>
                }
            </div>
        );
    },

    renderPanelFoot() {
        const { selectTime } = this.props;
        const { view } = this.state;

        return (
            <div className="datepicker-foot">
                {selectTime ?
                    <div>
                        <span className="datepicker-left-btn" onClick={this.clear}>清空</span>
                        {view === 'time' ?
                            <span onClick={this.selectDate}>选择日期</span>
                            :
                            <span onClick={this.selectTime}>选择时间</span>
                        }
                        <span className="datepicker-right-btn" onClick={this.ok}>确认</span>
                    </div>
                    :
                    <div>
                        <span className="datepicker-left-btn" onClick={this.clear}>清空</span>
                    </div>
                }
            </div>
        );
    },

    render() {
        const { className, dropdownClassName, style, dropdownStyle } = this.props;
        const { isOpen } = this.state;

        const trigger = this.renderTrigger();
        const panelHead = this.renderPanelHead();
        const panelBody = this.renderPanelBody();
        const panelFoot = this.renderPanelFoot();

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div 
                    className={cx('dropdown-wrapper', className)}
                    style={style}
                    tabIndex="0"
                    onKeyDown={this.handleKeyDown}
                >
                    {trigger}
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
            </ClickAwayListener>
        );
    }
});

module.exports = DatePicker;