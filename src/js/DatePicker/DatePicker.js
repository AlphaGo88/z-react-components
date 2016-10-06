// 日期选择组件

const classNames = require('classnames');

//判断是否为闰年
function isLeapYear(year) {
    return (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);
}

//获取某一年某一月份的天数
function getMonthDays(year, month) {
    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
}

function getDateStr (year, month, date) {
    const monthStr = month > 8 ? month + 1 : '0' + (month + 1);
    const dateStr = date > 9 ? date : '0' + date;

    return `${year}-${monthStr}-${dateStr}`;
}

function getDateTimeStr (year, month, date, hours, minutes, seconds) {
    const hoursStr = hours > 9 ? hours : '0' + hours;
    const minutesStr = minutes > 9 ? minutes : '0' + minutes;
    const secondsStr = seconds > 9 ? seconds : '0' + seconds;

    return getDateStr(year, month, date) + ` ${hoursStr}:${minutesStr}:${secondsStr}`;
}

function getDateProps(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        day: date.getDay(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    }
}

const DatePicker = React.createClass({

    getDefaultProps() {
        return {
            inputClassName: '',
            wrapperClassName: '',
            style: null,
            placeholder: '',
            disabled: false,
            selectTime: false,  //是否选择时间
            initialDate: null,
            maxDate: null,
            minDate: null,
            onChange: () => {},
            disableDates: () => {return false;}
        };
    },

    getInitialState() {
        const { initialDate, maxDate, minDate } = this.props;
        let _initialDate, set, todayDisabled = false;

        if (initialDate) {
            _initialDate = new Date(initialDate);
            set = true;
        } else {
            const today = new Date();
            _initialDate = today;

            //如果今天大于最大日期，默认选中最大日期
            if (maxDate) {
                const _maxDate = new Date(maxDate);
                if (today.valueOf() > _maxDate.valueOf()) {
                    _initialDate = _maxDate;
                    todayDisabled = true;
                }
            }

            //如果今天小于最小日期，默认选中最小日期
            if (minDate) {
                const _minDate = new Date(minDate);
                if (today.valueOf() < _minDate.valueOf()) {
                    _initialDate = _minDate;
                    todayDisabled = true;
                }
            }

            set = false;
        }

        return Object.assign({
            set: set,
            visible: false,
            view: 'date',
            todayDisabled: todayDisabled,
        }, getDateProps(_initialDate));
    },

    componentDidMount() {
        window.addEventListener('click', () => {
            this.hover || this.hide();
        }, false);
    },

    show() {
        this.hover = true;
        this.setState({ visible: true });
    },

    hide() {
        this.setState({ 
            visible: false,
            view: 'date'
        });
    },

    selectTime() {
        this.setState({ view: 'time' });
    },

    selectDate() {
        this.setState({ view: 'date' });
    },

    prevYear() {
        this.setState({ year: this.state.year - 1 });
    },

    nextYear() {
        this.setState({ year: this.state.year + 1 });
    },

    prevMonth() {
        const curMonth = this.state.month;
        const curYear = this.state.year;
        if (curMonth === 0) {
            this.setState({
                year: this.state.year - 1,
                month: 11
            })
        } else {
            this.setState({
                month: curMonth - 1
            });
        }
    },

    nextMonth() {
        const curMonth = this.state.month;
        const curYear = this.state.year;
        if (curMonth === 11) {
            this.setState({
                year: curYear + 1,
                month: 0
            });
        } else {
            this.setState({
                month: curMonth + 1
            });
        }
    },

    setDate(date) {
        if (this.props.selectTime) {
            this.setState({ date });
        } else {
            const { year, month } = this.state;
            const dateStr = getDateStr(year, month, date);
            const dateObj = new Date(year, month, date);

            this.setState({
                set: true,
                date: date,
                visible: false
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

    //选择今天或现在（当selectTime == true）
    setToday() {
        const today = new Date();
        const dateProps = getDateProps(today);
        const dateStr = this.props.selectTime ?
            getDateTimeStr(dateProps.year, dateProps.month, dateProps.date, dateProps.hours, dateProps.minutes, dateProps.seconds)
            :
            getDateStr(dateProps.year, dateProps.month, dateProps.date);

        const newState = Object.assign({
            set: true,
            visible: false,
        }, dateProps);

        this.setState(newState);
        this.props.onChange(dateStr, today);
    },

    clear() {
        this.setState({
            set: false,
            visible: false,
        });
        this.props.onChange('', null);
    },

    //确认选择，当selectTime == true时有效
    ok() {
        const {year, month, date, hours, minutes, seconds} = this.state;
        const dateStr = getDateStr(year, month, date, hours, minutes, seconds);
        const dateObj = new Date(year, month, date, hours, minutes, seconds);

        this.setState({
            set: true,
            visible: false,
            view: 'date'
        });

        this.props.onChange(dateStr, dateObj);
    },

    mouseEnter() {
        this.hover = true;
    },

    mouseLeave() {
        this.hover = false;
    },

    renderHead() {
        const { view, year, month, date, hours, minutes, seconds } = this.state;
        let dateTimeStr = '';
        if (view === 'time') {
            dateTimeStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
        }

        return (
            <div className="datepicker-head">
                <div className={classNames({'hide': view === 'time'})}>
                    <i className="fa fa-angle-double-left datepicker-prev-year-btn" onClick={this.prevYear}></i>
                    <i className="fa fa-angle-left datepicker-prev-month-btn" onClick={this.prevMonth}></i>
                    <b>{`${year}年`}</b>
                    <b>{`${month + 1}月`}</b>
                    <i className="fa fa-angle-right datepicker-next-month-btn" onClick={this.nextMonth}></i>
                    <i className="fa fa-angle-double-right datepicker-next-year-btn" onClick={this.nextYear}></i>
                </div>
                {view === 'time' &&
                    <div>
                        <b>{dateTimeStr}</b>
                    </div>
                }
            </div>
        );
    },

    renderBody() {
        const { selectTime, maxDate, minDate, disableDates} = this.props;
        const { view, set, year, month, date, todayDisabled } = this.state;

        /* 生成日期 Start */
        const howManyDates = getMonthDays(year, month);     //本月有多少天
        const offset = new Date(year, month, 1).getDay();   //本月第一天是星期几
        const maxValue = maxDate ? new Date(maxDate).valueOf() : undefined;
        const minValue = minDate ? new Date(minDate).valueOf() : undefined;

        let dates = [], rows = [], i;
        let curDateValue, disabled = false;

        //第一行本月1号之前的空日期
        for (i = 0; i < offset; i++) {
            dates.push({ value: 0 });
        }

        //本月的日期
        for (i = 1; i <= howManyDates; i++) {

            //如果小于最小日期或大于最大日期，disable
            if (maxValue || minValue) {
                curDateValue = new Date(year, month, i).valueOf();
                disabled = curDateValue > maxValue || curDateValue < minValue;
            }
            dates.push({
                value: i,
                disabled: disabled,
                active: i === date
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
                timeArr.push(i < 10 ? '0' + i : i);
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
                            <th>日</th>
                            <th>一</th>
                            <th>二</th>
                            <th>三</th>
                            <th>四</th>
                            <th>五</th>
                            <th>六</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={`tr${index}`}>
                                {row.map((item, index) => (
                                    <td key={`th${index}`} >
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
                                    </td>)
                                )}
                            </tr>)
                        )}
                    </tbody>
                </table>
                {selectTime &&
                    <div className={classNames('clearfix', {'hide': view === 'date'})}>
                        <ul className="datepicker-time-col">
                            {hours.map((hour, idx) => (
                                <li 
                                    key={`hour${idx}`} 
                                    onClick={e => {this.setHours(idx)}} 
                                    className={classNames({'active': idx === this.state.hours})}
                                >
                                    {`${hour}时`}
                                </li>
                            )
                            )}
                        </ul>
                        <ul className="datepicker-time-col">
                            {minutes.map((minute, idx) => (
                                <li 
                                    key={`minute${idx}`} 
                                    onClick={e => {this.setMinutes(idx)}} 
                                    className={classNames({'active': idx === this.state.minutes})}
                                >
                                    {`${minute}分`}
                                </li>
                            )
                            )}
                        </ul>
                        <ul className="datepicker-time-col">
                            {seconds.map((second, idx) => (
                                <li 
                                    key={`second${idx}`} 
                                    onClick={e => {this.setSeconds(idx)}} 
                                    className={classNames({'active': idx === this.state.seconds})}
                                >
                                    {`${second}秒`}
                                </li>
                            )
                            )}
                        </ul>
                    </div>
                }
            </div>
        );
    },

    renderFoot() {
        const { selectTime } = this.props;
        const { view, todayDisabled } = this.state;

        return (
            <div className="datepicker-foot">
                <div className={classNames({'hide': view === 'time'})}>
                    <span className="datepicker-clear-btn" onClick={this.clear}>清空</span>
                    {selectTime &&
                        <span onClick={this.selectTime}>选择时间</span>
                    }
                    {todayDisabled ||
                        <span className="datepicker-today-btn" onClick={this.setToday}>
                            {selectTime ? '现在' : '今天'}
                        </span>
                    }
                </div>
                {selectTime &&
                    <div className={classNames({'hide': view === 'date'})}>
                        <span onClick={this.selectDate}>选择日期</span>
                        <span className="datepicker-ok-btn" onClick={this.ok}>确认</span>
                    </div>
                }
            </div>
        );
    },

    render() {
        const { selectTime, style, inputClassName, wrapperClassName, placeholder, disabled } = this.props;
        const { set, visible, year, month, date, hours, minutes, seconds } = this.state;
        let dateStr = '';   //input显示的日期时间串

        if (set) {
            dateStr = selectTime ? 
                getDateTimeStr(year, month, date, hours, minutes, seconds) :
                getDateStr(year, month, date);
        }

        const head = this.renderHead();
        const body = this.renderBody();
        const foot = this.renderFoot();

        return (
            <div className={`datepicker-wrapper ${wrapperClassName}`}>
                <div className="datepicker-trigger" onClick={this.show}>
                    <input 
                        type="text" 
                        className={inputClassName} 
                        style={style} 
                        value={dateStr} 
                        placeholder={placeholder} 
                        disabled={disabled}
                        readOnly
                    />
                    <i className="fa fa-calendar"></i>
                </div>
                <div 
                    className={classNames('datepicker-panel', { 'show': visible })} 
                    onMouseEnter={this.mouseEnter} 
                    onMouseLeave={this.mouseLeave}
                >
                    {head}
                    {body}
                    {foot}
                </div>
            </div>
        );
    }
});

module.exports = DatePicker;