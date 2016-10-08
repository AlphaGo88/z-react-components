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
            inputClassName: '',
            wrapperClassName: '',
            style: null,
            name: '',
            placeholder: '',
            disabled: false,
            selectTime: false,  //是否选择时间
            value: '',  //初始值
            maxValue: '',
            minValue: '',
            onChange: () => {},
            disableDates: () => {return false;}
        };
    },

    getInitialState() {
        const { value, maxValue, minValue, disableDates } = this.props;
        let _initialDate;   //默认选中的日期
        let set = false;    //input是否有值
        let todayDisabled = false;  //今天是否在diabled日期范围内

        if (value) {
            _initialDate = new Date(value);
            set = true;
        } else {
            const today = new Date();

            //如果今天大于最大日期，默认选中最大日期
            //如果今天小于最小日期，默认选中最小日期
            //否则默认选中今天
            if (maxValue && today.valueOf() > new Date(maxValue).valueOf()) {
                _initialDate = new Date(maxValue);
                todayDisabled = true;
            } else if (minValue && today.valueOf() < new Date(minValue).valueOf()) {
                _initialDate = new Date(minValue);
                todayDisabled = true;
            } else {
                _initialDate = today;
            }
        }

        const dateProps = getDateProps(_initialDate);
        return {
            set: set,
            visible: false,
            view: 'date',   //当前视图，日期选择('date')或时间选择('time')
            todayDisabled: todayDisabled,
            ...dateProps
        };
    },

    componentDidMount() {
        //点击别处隐藏选择框
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

    //切换到选择时间（支持选择时间时有效）
    selectTime() {
        this.setState({ view: 'time' });
    },

    //切换到选择日期（支持选择时间时有效）
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

    //选择某个日期
    //当支持选择时间，仅选中
    //当不支持选择时间，选中并更新到当前日期
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

    //选择今天(当selectTime == false)或现在(当selectTime == true)
    setToday() {
        const today = new Date();
        const dateProps = getDateProps(today);
        const dateStr = this.props.selectTime ?
            getDateTimeStr(dateProps.year, dateProps.month, dateProps.date, dateProps.hours, dateProps.minutes, dateProps.seconds)
            :
            getDateStr(dateProps.year, dateProps.month, dateProps.date);

        this.setState({
            set: true,
            visible: false,
            ...dateProps
        });
        this.props.onChange(dateStr, today);
    },

    clear() {
        this.setState({
            set: false, //清空input的值
            visible: false,
        });
        this.props.onChange('', null);
    },

    //确认选择，当selectTime == true时有效
    ok() {
        const { year, month, date, hours, minutes, seconds } = this.state;
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

    renderInput() {
        const { selectTime, style, inputClassName, placeholder, disabled } = this.props;
        const { set, year, month, date, hours, minutes, seconds } = this.state;
        let dateStr = '';   //input显示的日期时间串

        if (set) {
            dateStr = selectTime ? 
                getDateTimeStr(year, month, date, hours, minutes, seconds) :
                getDateStr(year, month, date);
        }

        return (
            <input 
                type="text" 
                className={inputClassName} 
                style={style} 
                value={dateStr} 
                placeholder={placeholder} 
                disabled={disabled}
                readOnly
            />
        );
    },

    renderPanelHead() {
        const { view, year, month, date, hours, minutes, seconds } = this.state;
        let dateStr = '';
        if (view === 'time') {
            dateStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
        }

        return (
            <div className="datepicker-head">
                <div className={classNames({'hide': view === 'time'})}>
                    <a className="fa fa-angle-double-left datepicker-prev-year-btn" onClick={this.prevYear}></a>
                    <a className="fa fa-angle-left datepicker-prev-month-btn" onClick={this.prevMonth}></a>
                    <b>{`${year}年`}</b>
                    <b>{`${month + 1}月`}</b>
                    <a className="fa fa-angle-right datepicker-next-month-btn" onClick={this.nextMonth}></a>
                    <a className="fa fa-angle-double-right datepicker-next-year-btn" onClick={this.nextYear}></a>
                </div>
                {view === 'time' &&
                    <div>
                        <b>{dateStr}</b>
                    </div>
                }
            </div>
        );
    },

    renderPanelBody() {
        const { selectTime, maxValue, minValue, disableDates} = this.props;
        const { view, year, month, date } = this.state;

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
                                    key={idx} 
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
                                    key={idx} 
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
                                    key={idx} 
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

    renderPanelFoot() {
        const { selectTime } = this.props;
        const { view, todayDisabled } = this.state;

        return (
            <div className="datepicker-foot">
                <div className={classNames({'hide': view === 'time'})}>
                    <span className="datepicker-left-btn" onClick={this.clear}>清空</span>
                    {selectTime &&
                        <span onClick={this.selectTime}>选择时间</span>
                    }
                    {todayDisabled ||
                        <span className="datepicker-right-btn" onClick={this.setToday}>
                            {selectTime ? '现在' : '今天'}
                        </span>
                    }
                </div>
                {selectTime &&
                    <div className={classNames({'hide': view === 'date'})}>
                        <span onClick={this.selectDate}>选择日期</span>
                        <span className="datepicker-right-btn" onClick={this.ok}>确认</span>
                    </div>
                }
            </div>
        );
    },

    render() {
        const { wrapperClassName, disabled, onChange } = this.props;
        const { visible } = this.state;

        const input = this.renderInput();
        const panelHead = this.renderPanelHead();
        const panelBody = this.renderPanelBody();
        const panelFoot = this.renderPanelFoot();

        return (
            <div className={`datepicker-wrapper ${wrapperClassName}`}>
                <div className="datepicker-trigger" onClick={() => {disabled || this.show()}}>
                    {input}
                    <i className="fa fa-calendar"></i>
                </div>
                <div 
                    className={classNames('datepicker-panel', { 'show': visible })} 
                    onMouseEnter={this.mouseEnter} 
                    onMouseLeave={this.mouseLeave}
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