// DatePicker
// ------------------------

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
    const dateStr = getDateStr(year, month, date);
    return `${dateStr} ${hoursStr}:${minutesStr}:${secondsStr}`;
}

function getDateProps(date) {
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

    getDefaultProps() {
        return {
            className: '',
            inputClassName: '',
            placeholder: '',
            disabled: false,
            selectTime: false,  //是否选择时间
            defaultValue: '',  //初始值
            value: '',         //指定值，将覆盖defaultValue
            maxValue: '',
            minValue: '',
            onChange: () => {},
            disableDates: () => false
        };
    },

    getInitialState() {
        const { defaultValue, value, maxValue, minValue, disableDates } = this.props;
        let _initialDate;   //初始默认选中的日期
        let curDate = '';   //初始值，如果没有指定初始值则为''

        //判断今天是否在disabled日期范围内
        //如果今天大于最大日期，默认选中最大日期
        //如果今天小于最小日期，默认选中最小日期
        //否则默认选中今天
        const today = new Date();
        if (maxValue && today.valueOf() > new Date(maxValue).valueOf()) {
            _initialDate = new Date(maxValue);
        } else if (minValue && today.valueOf() < new Date(minValue).valueOf()) {
            _initialDate = new Date(minValue);
        } else {
            _initialDate = today;
        }

        //指定或默认日期
        if (value) {
            _initialDate = new Date(value);
            curDate = _initialDate;
        } else if (defaultValue) {
            _initialDate = new Date(defaultValue);
            curDate = _initialDate;
        }

        this.initialDate = _initialDate;
        const dateProps = getDateProps(_initialDate);

        return {
            isOpen: false,
            view: 'date',   //当前视图，日期选择('date')或时间选择('time')
            curDate,
            ...dateProps
        };
    },

    componentDidMount() {
        window.addEventListener('click', this.clickAway, false);
    },

    componentWillUnmount() {
        window.removeEventListener('click', this.clickAway, false);
    },

    //如果点击到别处关闭并还原日期
    clickAway() {
        !this.hover && this.state.isOpen && this.hideAndRestore();
    },

    //点击别处或取消，不保存，还原原来的日期
    hideAndRestore() {
        const dateProps = this.state.curDate ? 
            getDateProps(this.state.curDate) 
            : 
            getDateProps(this.initialDate);

        this.setState({
            isOpen: false,
            view: 'date',
            ...dateProps
        });
    },

    //点击input，显示或隐藏选择框
    handleInputClick(event) {
        this.setState({ isOpen: !this.state.isOpen });
        event.stopPropagation();
    },

    //鼠标进入日期选择框
    handleMouseEnter() {
        this.hover = true;
    },

    //鼠标离开日期选择框
    handleMouseLeave() {
        this.hover = false;
    },

    hide() {
        this.setState({ 
            isOpen: false,
            view: 'date'
        });
    },

    //切换到选择时间（支持选择时间时有效）
    selectTime() {
        this.setState({ view: 'time' });
    },

    //切换到选择日期（支持选择时间时有效）
    selectDate() {
        this.setState({ view: 'date' });
    },

    prevYear() {
        this.setState({ 
            year: this.state.year - 1,
            date: 0
        });
    },

    nextYear() {
        this.setState({ 
            year: this.state.year + 1,
            date: 0
        });
    },

    prevMonth() {
        const curMonth = this.state.month;
        const curYear = this.state.year;
        if (curMonth === 0) {
            this.setState({
                year: this.state.year - 1,
                month: 11,
                date: 0
            });
        } else {
            this.setState({
                month: curMonth - 1,
                date: 0
            });
        }
    },

    nextMonth() {
        const curMonth = this.state.month;
        const curYear = this.state.year;
        if (curMonth === 11) {
            this.setState({
                year: curYear + 1,
                month: 0,
                date: 0
            });
        } else {
            this.setState({
                month: curMonth + 1,
                date: 0
            });
        }
    },

    //选择某个日期
    //当支持选择时间，仅选中
    //当不支持选择时间，选中并更新到当前日期
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
        this.setState({
            curDate: '', //清空input的值
            isOpen: false,
        });
        this.props.onChange('', null);
    },

    //确认选择，当selectTime == true时有效
    ok() {
        const { year, month, date, hours, minutes, seconds } = this.state;
        const dateStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
        const dateObj = new Date(year, month, date, hours, minutes, seconds);

        this.setState({
            view: 'date',
            curDate: dateObj,
            isOpen: false
        });

        this.props.onChange(dateStr, dateObj);
    },

    renderInput() {
        const { selectTime, style, inputClassName, placeholder, disabled, value } = this.props;
        const { curDate } = this.state;
        let dateStr = '';   //input显示的日期时间串

        if (value || curDate) {
            const dateProps = value ? getDateProps(new Date(value)) : getDateProps(curDate);
            const { year, month, date, hours, minutes, seconds } = dateProps;
            dateStr = selectTime ? 
                getDateTimeStr(year, month, date, hours, minutes, seconds) 
                :
                getDateStr(year, month, date);
        }

        return (
            <input 
                type="text" 
                className={`datepicker-trigger ${inputClassName}`} 
                style={style} 
                value={dateStr} 
                placeholder={placeholder} 
                disabled={disabled}
                readOnly
                onClick={this.handleInputClick}
                onBlur={this.clickAway}
            />
        );
    },

    renderPanelHead() {
        const { year, month, date, hours, minutes, seconds } = this.state;
        let dateStr = '';
        if (this.state.view === 'time') {
            dateStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
        }

        return (
            <div className="datepicker-head">
                <div className={classNames({'hide': this.state.view === 'time'})}>
                    <a className="fa fa-angle-double-left datepicker-prev-year-btn" onClick={this.prevYear}></a>
                    <a className="fa fa-angle-left datepicker-prev-month-btn" onClick={this.prevMonth}></a>
                    <b>{`${year}年`}</b>
                    <b>{`${month + 1}月`}</b>
                    <a className="fa fa-angle-right datepicker-next-month-btn" onClick={this.nextMonth}></a>
                    <a className="fa fa-angle-double-right datepicker-next-year-btn" onClick={this.nextYear}></a>
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
        const { year, month, date } = this.state;

        /* 生成日期 Start */
        const howManyDates = getMonthDays(year, month);     //本月有多少天
        const offset = new Date(year, month, 1).getDay();   //本月第一天是星期几
        const _maxValue = maxValue ? new Date(maxValue).valueOf() : 0;
        const _minValue = minValue ? new Date(minValue).valueOf() : 0;

        let dates = [], rows = [], i;
        let curDateValue, disabled = false;

        //第一行本月1号之前的空日期
        for (i = 0; i < offset; i++) {
            dates.push({ value: 0 });
        }

        //本月的日期
        for (i = 1; i <= howManyDates; i++) {

            //如果小于最小日期或大于最大日期，disable
            if (_maxValue && curDateValue > _maxValue 
                || _minValue && curDateValue < _minValue) {
                disabled = true;
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
                timeArr.push(i < 10 ? ('0' + i) : i);
            }
            hours = timeArr.slice(0, 24);
            minutes = timeArr.slice(0, 60);
            seconds = timeArr.slice(0, 60);
        }
        /* 生成小时分秒 End */

        return (
            <div className="datepicker-body">
                <table className={classNames('datepicker-table', {'hide': this.state.view === 'time'})}>
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
                {selectTime &&
                    <div className={classNames('clearfix', {'hide': this.state.view === 'date'})}>
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
        const { view, todayDisabled } = this.state;

        return (
            <div className="datepicker-foot">
                {selectTime ?
                    <div>
                        <span className="datepicker-left-btn" onClick={this.hideAndRestore}>取消</span>
                        {view === 'time' ?
                            <span onClick={this.selectDate}>选择日期</span>
                            :
                            <span onClick={this.selectTime}>选择时间</span>
                        }
                        <span className="datepicker-right-btn" onClick={this.ok}>确认</span>
                    </div>
                    :
                    <div>
                        <span className="datepicker-left-btn" onClick={this.hideAndRestore}>取消</span>
                    </div>
                }
            </div>
        );
    },

    render() {
        const { className } = this.props;
        const { isOpen } = this.state;

        const input = this.renderInput();
        const panelHead = this.renderPanelHead();
        const panelBody = this.renderPanelBody();
        const panelFoot = this.renderPanelFoot();

        return (
            <div className={`datepicker-wrapper ${className}`}>
                <i className="fa fa-calendar datepicker-icon"></i>
                {input}
                <div 
                    className={classNames({
                        'datepicker-panel': true,
                        'offscreen': !isOpen 
                    })} 
                    onMouseEnter={this.handleMouseEnter} 
                    onMouseLeave={this.handleMouseLeave}
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