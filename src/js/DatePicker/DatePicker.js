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
    const mm = month > 8 ? month + 1 : `0${month + 1}`;
    const dd = date > 9 ? date : `0${date}`;

    return `${year}-${mm}-${dd}`;
}

function getDateTimeStr(year, month, date, hours, minutes, seconds) {
    const hh = hours > 9 ? hours : `0${hours}`;
    const mm = minutes > 9 ? minutes : `0${minutes}`;
    const ss = seconds > 9 ? seconds : `0${seconds}`;
    const dateStr = getDateStr(year, month, date);

    return `${dateStr} ${hh}:${mm}:${ss}`;
}

function getDateFields(date) {
    if (date) {
        if (typeof date === 'string') {
            // IE or firefox may not initialize the date with the '-' splitter correctly.
            date = new Date(date.replace(/-/g, '/'));

            if (isNaN(date.getFullYear())) {
                console.error('Invalid date string: check the props of DatePicker.');
            }
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
         * The locale of the DatePicker.
         */
        locale: React.PropTypes.string,

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
         * The start day of a week.
         */
        weekStart: React.PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),

        /**
         * Default value of the component.
         */
        defaultValue: React.PropTypes.string,

        /**
         * The value of the component, e.g. '2016-08-08'.
         * The `Datepicker` is controlled if this prop is set.
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
         * Fires when the component's value changes.
         * @param {string} dateStr
         */
        onChange: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            locale: 'zh_cn',
            weekStart: 1,
            disabled: false,
            selectTime: false,
            disableDates: () => false,
            onChange: () => {}
        }
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.value) {
            this.setState(getDateFields(nextProps.value));
        }
    },

    getInitialState() {
        const { defaultValue, value, disableDates } = this.props;
        let initialDate;

        // If neither `value` nor `defaultValue` is provided, select today defaultly.
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

        const dateFields = getDateFields(initialDate);
        let state = {
            isOpen: false,
            view: 'date',
            ...dateFields
        };

        if (!value) {
            state.value = defaultValue || '';
        }
        return state;
    },

    componentDidMount() {
        // Listen to tab pressing so that we know when it's a keyboard focus. 
        document.addEventListener('keydown', handleTabPress);
    },

    componentDidUpdate(prevProps, prevState) {
        if (this.state.view === 'year') {
            this.yearSelect.scrollTop = 2310;
        }
    },

    componentWillUnmount() {
        this.cancelFocusTimeout();
        document.removeEventListener('keydown', handleTabPress);
    },

    cancelFocusTimeout() {
        if (this.focusTimeout) {
            clearTimeout(this.focusTimeout);
            this.focusTimeout = null;
        }
    },

    handleFocus(event) {
        if (event) event.persist();
        if (!this.props.disabled && !this.hover) {
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
        // Because the blur event bubbles in IE.
        if (!this.hover || this.hover && tabPressed) {
            this.cancelFocusTimeout();
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

    getValue() {
        return this.props.value == undefined ? this.state.value : this.props.value;
    },

    // Restore the original state when no date is selected.
    hideAndRestore() {
        let newState = {
            isOpen: false,
            view: 'date'
        };

        objectAssign(newState, getDateFields(this.getValue()))
        this.setState(newState);
    },

    // Switch to year selection.
    selectYear() {
        this.setState({ view: 'year' });
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
            date: (month === 1 && date === 29) ? 28 : date
        });
    },

    nextYear() {
        const { year, month, date } = this.state;

        this.setState({ 
            year: year + 1,
            date: (month === 1 && date === 29) ? 28 : date
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
    // Otherwise update the component's value.
    setDate(date) {
        if (this.props.selectTime) {
            if (date !== this.state.date) {
                this.setState({ date });
            }
        } else {
            const dateStr = getDateStr(this.state.year, this.state.month, date);
            let newState = { isOpen: false };

            if (this.props.value == undefined) {
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

        if (this.props.value == undefined) {
            const dateFields = getDateFields();

            objectAssign(newState, {
                value: '',
                ...dateFields
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

            if (this.props.value == undefined) {
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
                        this.setState({ view: 'date' });
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
        switch (event.which) {
            case 37:
                // Left Arrow
                event.preventDefault();
                this.state.view === 'date' && this.pressKeyToDate(-1);
                break;

            case 38:
                // Up Arrow
                event.preventDefault();
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
                event.preventDefault();
                this.state.view === 'date' && this.pressKeyToDate(1);
                break;

            case 40:
                // Down Arrow
                event.preventDefault();
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
                <div className={cx({'hide': view === 'time'})}>
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
        /* Generates dates Start */
        let dates = [], i;
        let renderedDates = [];
        const dayCount = getMonthDays(this.state.year, this.state.month);

        let weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        if (this.props.weekStart !== 0) {
            weekDays = weekDays.slice(this.props.weekStart).concat(weekDays.slice(0, this.props.weekStart));
        }
        
        // What day is the first date of the month.
        let offset = 0;
        let firstDay = new Date(this.state.year, this.state.month, 1).getDay() || 7;
        let weekStart = this.props.weekStart || 7;
        if (firstDay >= weekStart) {
            offset = firstDay - weekStart;
        } else {
            offset = 7 - weekStart + firstDay;
        }

        // Empty dates before the 1st date.
        for (i = 1; i <= offset; i++) {
            dates.push({ value: 0 });
        }

        // Dates of current month.
        for (i = 1; i <= dayCount; i++) {
            dates.push({
                value: i,
                active: i === this.state.date,
                disabled: this.isDateDisabled(this.state.year, this.state.month, i)
            });
        }

        // Split dates into rows.
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
        let renderedYears = [];

        for (i = this.state.year - 100; i <= this.state.year + 100; i++) {
            const year = i;

            renderedYears.push(
                <li 
                    key={year + 100}
                    className={cx({
                        'active': year === this.state.year
                    })}
                    onClick={e => this.setYear(year)}
                >
                    {year}
                </li>
            );
        }

        // Hours, minutes and seconds.
        let renderedHours = [];
        let renderedMinutes = [];
        let renderedSeconds = [];

        if (this.props.selectTime) {
            for (i = 0; i <= 59; i++) {
                const timeValue = i;
                const timeStr = i < 10 ? `0${i}` : i;

                if (i < 24) {
                    renderedHours.push(
                        <li 
                            key={timeValue} 
                            onClick={e => this.setHours(timeValue)} 
                            className={cx({'active': timeValue === this.state.hours})}
                        >
                            {`${timeStr}时`}
                        </li>
                    );
                }
                renderedMinutes.push(
                    <li 
                        key={timeValue} 
                        onClick={e => this.setMinutes(timeValue)} 
                        className={cx({'active': timeValue === this.state.minutes})}
                    >
                        {`${timeStr}分`}
                    </li>
                );
                renderedSeconds.push(
                    <li 
                        key={timeValue} 
                        onClick={e => this.setSeconds(timeValue)} 
                        className={cx({'active': timeValue === this.state.seconds})}
                    >
                        {`${timeStr}秒`}
                    </li>
                );
            }
        }

        return (
            <div className="datepicker-body">
                <table className={cx('datepicker-table', {
                    'hide': this.state.view !== 'date'
                })}>
                    <thead>
                        <tr>
                            {weekDays.map(day => (
                                <th key={day}>
                                    <span>{day}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {renderedDates}
                    </tbody>
                </table>
                {this.state.view === 'year' &&
                    <ul 
                        ref={(el) => this.yearSelect = el}
                        className="datepicker-year-select"
                    >
                        {renderedYears}
                    </ul>
                }
                {this.props.selectTime && 
                    <div 
                        className="clearfix datepicker-time-select"
                        style={{
                            display: this.state.view === 'time' ? 'block' : 'none'
                        }}
                    >
                        <ul className="datepicker-time-col">
                            {renderedHours}
                        </ul>
                        <ul className="datepicker-time-col">
                            {renderedMinutes}
                        </ul>
                        <ul className="datepicker-time-col">
                            {renderedSeconds}
                        </ul>
                    </div>
                }
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
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onMouseEnter={e => this.hover = true}
                onMouseLeave={e => this.hover = false}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
            >
                <div
                    className={cx('dropdown-trigger datepicker-trigger', inputClassName, {
                        'open': isOpen,
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