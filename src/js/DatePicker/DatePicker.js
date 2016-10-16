// DatePicker
// ------------------------

const React = require('react');
const classNames = require('classnames');
const ClickAwayListener = require('../internal/ClickAwayListener');

//判断是否为闰年
const isLeapYear = (year) => {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

//获取某一年某一月份的天数
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
         * The inline styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * The class name of the input element.
         */
        inputClassName: React.PropTypes.string,

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
        let selectedDate;   //初始默认选中的日期
        let curDate = '';   //当前日期值(与input的值同步)，如果没有指定值或默认值则为''

        if (value) { 
            //如果指定日期，选中指定日期
            selectedDate = new Date(value);
            curDate = selectedDate;
        } else if (defaultValue) {
            //如果有默认日期，选中默认日期
            selectedDate = new Date(defaultValue);
            curDate = selectedDate;
        } else {
            //如果没有指定或默认日期，
            //判断今天是否在disabled日期范围内
            //如果今天大于最大日期，默认选中最大日期
            //如果今天小于最小日期，默认选中最小日期
            //否则默认选中今天
            const today = new Date();
            if (maxValue && today.valueOf() > new Date(maxValue).valueOf()) {
                selectedDate = new Date(maxValue);
            } else if (minValue && today.valueOf() < new Date(minValue).valueOf()) {
                selectedDate = new Date(minValue);
            } else {
                selectedDate = today;
            }
        }

        this.initialSelectedDate = selectedDate;
        const dateProps = getDateProps(selectedDate);

        return {
            isOpen: false,
            view: 'date',   //当前视图，日期选择('date')或时间选择('time')
            curDate,
            ...dateProps
        };
    },

    //如果点击到别处关闭并还原日期
    handleClickAway() {
        this.state.isOpen && this.hideAndRestore();
    },

    //点击别处或取消，不保存，还原原来的日期
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

    //点击input，显示或隐藏选择框
    handleInputClick() {
        if (this.state.isOpen) {
            this.hideAndRestore();
        } else {
            this.setState({ isOpen: true });
        }
    },

    //切换到选择时间（支持选择时间时有效）
    selectTime() {
        this.setState({ view: 'time' });
    },

    //切换到选择日期（支持选择时间时有效）
    selectDate() {
        this.setState({ view: 'date' });
    },
    
    //当切换年份或月份时，
    //如果切换到的年份和月份与当前日期的年份和月份相同，选中当前日期的日
    //否则不选中任何日(date = 0)
    inCurrentYearAndMonth(year, month) {
        const { curDate } = this.state;

        if (curDate.getFullYear() === year && curDate.getMonth() === month) {
            return curDate.getDate();
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

    //选择某个日期
    //当可选择时间，仅选中
    //当不可选择时间，选中并更新到当前日期
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

    //选择今天(当selectTime == false)或现在(当selectTime == true)
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
        //恢复初始选中的日期
        const dateProps = getDateProps(this.initialSelectedDate);
        this.setState({
            curDate: '', //当前日期为空，将同步到input的值
            isOpen: false,
            view: 'date',
            ...dateProps
        });
        this.props.onChange('', null);
    },

    //确认选择，当可选择时间时有效
    ok() {
        //如果选择了日期，更新
        //如果没选择日期，相当于取消
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

    //判断某个日期是否在disabled范围内
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

    //按方向键，选择日期
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

    renderInput() {
        const { selectTime, style, inputClassName, placeholder, disabled, value } = this.props;
        const { curDate } = this.state;
        let dateStr = '';   //input显示的日期

        if (curDate) {
            const dateProps = getDateProps(curDate);
            const { year, month, date, hours, minutes, seconds } = dateProps;
            dateStr = selectTime ? 
                getDateTimeStr(year, month, date, hours, minutes, seconds) 
                :
                getDateStr(year, month, date);
        }

        return (
            <input 
                type="text" 
                className={classNames(
                    'datepicker-trigger', {
                        [`${inputClassName}`]: inputClassName
                    }
                )}  
                value={dateStr} 
                placeholder={placeholder} 
                disabled={disabled}
                readOnly
                onClick={this.handleInputClick}
                onKeyDown={this.handleKeyDown}
            />
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
                <div className={classNames({'hide': this.state.view === 'time'})}>
                    <a 
                        className={classNames(
                            'fa fa-angle-double-left datepicker-prev-year-btn',
                            {'disabled': preYearDisabled}
                        )} 
                        onClick={() => preYearDisabled || this.prevYear()}>
                    </a>
                    <a 
                        className={classNames(
                            'fa fa-angle-left datepicker-prev-month-btn', 
                            {'disabled': preMonthDisabled}
                        )} 
                        onClick={() => preMonthDisabled || this.prevMonth()}>
                    </a>
                    <b>{`${year}年`}</b>
                    <b>{`${month + 1}月`}</b>
                    <a 
                        className={classNames(
                            'fa fa-angle-right datepicker-next-month-btn', 
                            {'disabled': nextMonthDisabled}
                        )} 
                        onClick={() => nextMonthDisabled || this.nextMonth()}>
                    </a>
                    <a 
                        className={classNames(
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

        /* 生成日期 Start */
        const howManyDates = getMonthDays(year, month);     //本月有多少天
        const offset = new Date(year, month, 1).getDay() || 7;   //本月第一天是星期几

        let dates = [], rows = [], i;

        //第一行本月1号之前的空日期
        for (i = 1; i < offset; i++) {
            dates.push({ value: 0 });
        }

        //本月的日期
        for (i = 1; i <= howManyDates; i++) {
            dates.push({
                value: i,
                active: i === date,
                disabled: this.isDateDisabled(year, month, i)
            });
        }

        //按行分组
        for (i = 0; i <= dates.length; i += 7) {
            rows.push(dates.slice(i, i + 7));
        }
        /* 生成日期 End */

        /* 生成小时分秒 Start */
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
        /* 生成小时分秒 End */

        return (
            <div className="datepicker-body">
                <table className={classNames('datepicker-table', {'hide': view === 'time'})}>
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
                                                className={classNames('datepicker-date', { 
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
                <div className={classNames('datepicker-yearSelect', {'hide': view === 'year'})}>
                    
                </div>
                {selectTime &&
                    <div className={classNames('clearfix', {'hide': view === 'date'})}>
                        <ul className="datepicker-time-col">
                            {hours.map((hour, idx) => (
                                <li 
                                    key={idx} 
                                    onClick={e => {this.setHours(idx)}} 
                                    className={classNames({'active': idx === this.state.hours})}
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
                                    className={classNames({'active': idx === this.state.minutes})}
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
                                    className={classNames({'active': idx === this.state.seconds})}
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
        const { className, style } = this.props;
        const { isOpen } = this.state;

        const input = this.renderInput();
        const panelHead = this.renderPanelHead();
        const panelBody = this.renderPanelBody();
        const panelFoot = this.renderPanelFoot();

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <div 
                    className={classNames('dropdown-wrapper', {
                        [`${className}`]: className
                    })}
                    style={style}
                >
                    <i className="fa fa-calendar datepicker-icon"></i>
                    {input}
                    <div 
                        className={classNames(
                            'dropdown', 
                            'datepicker-panel',
                            {'offscreen': !isOpen }
                        )}
                        tabIndex="0"
                        onKeyDown={this.handleKeyDown}
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