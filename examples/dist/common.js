webpackJsonp([3],{

/***/ 10:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(11);

/***/ },

/***/ 11:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	// DatePicker
	// ------------------------

	var classNames = __webpack_require__(5);

	//判断是否为闰年
	function isLeapYear(year) {
	    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
	}

	//获取某一年某一月份的天数
	function getMonthDays(year, month) {
	    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
	}

	function getDateStr(year, month, date) {
	    var monthStr = month > 8 ? month + 1 : '0' + (month + 1);
	    var dateStr = date > 9 ? date : '0' + date;
	    return year + '-' + monthStr + '-' + dateStr;
	}

	function getDateTimeStr(year, month, date, hours, minutes, seconds) {
	    var hoursStr = hours > 9 ? hours : '0' + hours;
	    var minutesStr = minutes > 9 ? minutes : '0' + minutes;
	    var secondsStr = seconds > 9 ? seconds : '0' + seconds;
	    var dateStr = getDateStr(year, month, date);
	    return dateStr + ' ' + hoursStr + ':' + minutesStr + ':' + secondsStr;
	}

	function getDateProps(date) {
	    return {
	        year: date.getFullYear(),
	        month: date.getMonth(),
	        date: date.getDate(),
	        hours: date.getHours(),
	        minutes: date.getMinutes(),
	        seconds: date.getSeconds()
	    };
	}

	var DatePicker = React.createClass({
	    displayName: 'DatePicker',
	    getDefaultProps: function getDefaultProps() {
	        return {
	            inputClassName: '',
	            wrapperClassName: '',
	            style: null,
	            placeholder: '',
	            disabled: false,
	            selectTime: false, //是否选择时间
	            defaultValue: '',
	            maxValue: '',
	            minValue: '',
	            onChange: function onChange() {},
	            disableDates: function disableDates() {
	                return false;
	            }
	        };
	    },
	    getInitialState: function getInitialState() {
	        var _props = this.props;
	        var defaultValue = _props.defaultValue;
	        var maxValue = _props.maxValue;
	        var minValue = _props.minValue;
	        var disableDates = _props.disableDates;

	        var _initialDate = void 0; //默认选中的日期
	        var set = false; //input是否有值
	        var todayDisabled = false; //今天是否在diabled日期范围内

	        if (defaultValue) {
	            _initialDate = new Date(defaultValue);
	            set = true;
	        } else {
	            var today = new Date();

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

	        var dateProps = getDateProps(_initialDate);
	        return _extends({
	            set: set,
	            visible: false,
	            view: 'date', //当前视图，日期选择('date')或时间选择('time')
	            todayDisabled: todayDisabled
	        }, dateProps);
	    },
	    componentDidMount: function componentDidMount() {
	        var _this = this;

	        //点击别处隐藏选择框
	        window.addEventListener('click', function () {
	            _this.hover || _this.hide();
	        }, false);
	    },
	    show: function show() {
	        this.hover = true;
	        this.setState({ visible: true });
	    },
	    hide: function hide() {
	        this.setState({
	            visible: false,
	            view: 'date'
	        });
	    },


	    //切换到选择时间（支持选择时间时有效）
	    selectTime: function selectTime() {
	        this.setState({ view: 'time' });
	    },


	    //切换到选择日期（支持选择时间时有效）
	    selectDate: function selectDate() {
	        this.setState({ view: 'date' });
	    },
	    prevYear: function prevYear() {
	        this.setState({ year: this.state.year - 1 });
	    },
	    nextYear: function nextYear() {
	        this.setState({ year: this.state.year + 1 });
	    },
	    prevMonth: function prevMonth() {
	        var curMonth = this.state.month;
	        var curYear = this.state.year;
	        if (curMonth === 0) {
	            this.setState({
	                year: this.state.year - 1,
	                month: 11
	            });
	        } else {
	            this.setState({
	                month: curMonth - 1
	            });
	        }
	    },
	    nextMonth: function nextMonth() {
	        var curMonth = this.state.month;
	        var curYear = this.state.year;
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
	    setDate: function setDate(date) {
	        if (this.props.selectTime) {
	            this.setState({ date: date });
	        } else {
	            var _state = this.state;
	            var year = _state.year;
	            var month = _state.month;

	            var dateStr = getDateStr(year, month, date);
	            var dateObj = new Date(year, month, date);

	            this.setState({
	                set: true,
	                date: date,
	                visible: false
	            });

	            this.props.onChange(dateStr, dateObj);
	        }
	    },
	    setHours: function setHours(hours) {
	        if (hours !== this.state.hours) this.setState({ hours: hours });
	    },
	    setMinutes: function setMinutes(minutes) {
	        if (minutes !== this.state.minutes) this.setState({ minutes: minutes });
	    },
	    setSeconds: function setSeconds(seconds) {
	        if (seconds !== this.state.seconds) this.setState({ seconds: seconds });
	    },


	    //选择今天(当selectTime == false)或现在(当selectTime == true)
	    setToday: function setToday() {
	        var today = new Date();
	        var dateProps = getDateProps(today);
	        var dateStr = this.props.selectTime ? getDateTimeStr(dateProps.year, dateProps.month, dateProps.date, dateProps.hours, dateProps.minutes, dateProps.seconds) : getDateStr(dateProps.year, dateProps.month, dateProps.date);

	        this.setState(_extends({
	            set: true,
	            visible: false
	        }, dateProps));
	        this.props.onChange(dateStr, today);
	    },
	    clear: function clear() {
	        this.setState({
	            set: false, //清空input的值
	            visible: false
	        });
	        this.props.onChange('', null);
	    },


	    //确认选择，当selectTime == true时有效
	    ok: function ok() {
	        var _state2 = this.state;
	        var year = _state2.year;
	        var month = _state2.month;
	        var date = _state2.date;
	        var hours = _state2.hours;
	        var minutes = _state2.minutes;
	        var seconds = _state2.seconds;

	        var dateStr = getDateStr(year, month, date, hours, minutes, seconds);
	        var dateObj = new Date(year, month, date, hours, minutes, seconds);

	        this.setState({
	            set: true,
	            visible: false,
	            view: 'date'
	        });

	        this.props.onChange(dateStr, dateObj);
	    },
	    mouseEnter: function mouseEnter() {
	        this.hover = true;
	    },
	    mouseLeave: function mouseLeave() {
	        this.hover = false;
	    },
	    renderInput: function renderInput() {
	        var _props2 = this.props;
	        var selectTime = _props2.selectTime;
	        var style = _props2.style;
	        var inputClassName = _props2.inputClassName;
	        var placeholder = _props2.placeholder;
	        var disabled = _props2.disabled;
	        var _state3 = this.state;
	        var set = _state3.set;
	        var year = _state3.year;
	        var month = _state3.month;
	        var date = _state3.date;
	        var hours = _state3.hours;
	        var minutes = _state3.minutes;
	        var seconds = _state3.seconds;

	        var dateStr = ''; //input显示的日期时间串

	        if (set) {
	            dateStr = selectTime ? getDateTimeStr(year, month, date, hours, minutes, seconds) : getDateStr(year, month, date);
	        }

	        return React.createElement('input', {
	            type: 'text',
	            className: inputClassName,
	            style: style,
	            value: dateStr,
	            placeholder: placeholder,
	            disabled: disabled,
	            readOnly: true
	        });
	    },
	    renderPanelHead: function renderPanelHead() {
	        var _state4 = this.state;
	        var view = _state4.view;
	        var year = _state4.year;
	        var month = _state4.month;
	        var date = _state4.date;
	        var hours = _state4.hours;
	        var minutes = _state4.minutes;
	        var seconds = _state4.seconds;

	        var dateStr = '';
	        if (view === 'time') {
	            dateStr = getDateTimeStr(year, month, date, hours, minutes, seconds);
	        }

	        return React.createElement(
	            'div',
	            { className: 'datepicker-head' },
	            React.createElement(
	                'div',
	                { className: classNames({ 'hide': view === 'time' }) },
	                React.createElement('i', { className: 'fa fa-angle-double-left datepicker-prev-year-btn', onClick: this.prevYear }),
	                React.createElement('i', { className: 'fa fa-angle-left datepicker-prev-month-btn', onClick: this.prevMonth }),
	                React.createElement(
	                    'b',
	                    null,
	                    year + '\u5E74'
	                ),
	                React.createElement(
	                    'b',
	                    null,
	                    month + 1 + '\u6708'
	                ),
	                React.createElement('i', { className: 'fa fa-angle-right datepicker-next-month-btn', onClick: this.nextMonth }),
	                React.createElement('i', { className: 'fa fa-angle-double-right datepicker-next-year-btn', onClick: this.nextYear })
	            ),
	            view === 'time' && React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'b',
	                    null,
	                    dateStr
	                )
	            )
	        );
	    },
	    renderPanelBody: function renderPanelBody() {
	        var _this2 = this;

	        var _props3 = this.props;
	        var selectTime = _props3.selectTime;
	        var maxValue = _props3.maxValue;
	        var minValue = _props3.minValue;
	        var disableDates = _props3.disableDates;
	        var _state5 = this.state;
	        var view = _state5.view;
	        var year = _state5.year;
	        var month = _state5.month;
	        var date = _state5.date;

	        /* 生成日期 Start */

	        var howManyDates = getMonthDays(year, month); //本月有多少天
	        var offset = new Date(year, month, 1).getDay(); //本月第一天是星期几
	        var _maxValue = maxValue ? new Date(maxValue).valueOf() : 0;
	        var _minValue = minValue ? new Date(minValue).valueOf() : 0;

	        var dates = [],
	            rows = [],
	            i = void 0;
	        var curDateValue = void 0,
	            disabled = false;

	        //第一行本月1号之前的空日期
	        for (i = 0; i < offset; i++) {
	            dates.push({ value: 0 });
	        }

	        //本月的日期
	        for (i = 1; i <= howManyDates; i++) {

	            //如果小于最小日期或大于最大日期，disable
	            if (_maxValue && curDateValue > _maxValue || _minValue && curDateValue < _minValue) {
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
	        var hours = [],
	            minutes = [],
	            seconds = [];
	        if (selectTime) {
	            var timeArr = [];

	            for (i = 0; i <= 60; i++) {
	                timeArr.push(i < 10 ? '0' + i : i);
	            }
	            hours = timeArr.slice(0, 24);
	            minutes = timeArr.slice(0, 60);
	            seconds = timeArr.slice(0, 60);
	        }
	        /* 生成小时分秒 End */

	        return React.createElement(
	            'div',
	            { className: 'datepicker-body' },
	            React.createElement(
	                'table',
	                { className: classNames('datepicker-table', { 'hide': view === 'time' }) },
	                React.createElement(
	                    'thead',
	                    null,
	                    React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                            'th',
	                            null,
	                            '\u65E5'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '\u4E00'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '\u4E8C'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '\u4E09'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '\u56DB'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '\u4E94'
	                        ),
	                        React.createElement(
	                            'th',
	                            null,
	                            '\u516D'
	                        )
	                    )
	                ),
	                React.createElement(
	                    'tbody',
	                    null,
	                    rows.map(function (row, idx) {
	                        return React.createElement(
	                            'tr',
	                            { key: idx },
	                            row.map(function (item, idx) {
	                                return React.createElement(
	                                    'td',
	                                    { key: idx },
	                                    item.value > 0 && React.createElement(
	                                        'span',
	                                        {
	                                            className: classNames('datepicker-date', {
	                                                'disabled': item.disabled,
	                                                'active': item.active
	                                            }),
	                                            onClick: function onClick() {
	                                                item.disabled || _this2.setDate(item.value);
	                                            }
	                                        },
	                                        item.value
	                                    )
	                                );
	                            })
	                        );
	                    })
	                )
	            ),
	            selectTime && React.createElement(
	                'div',
	                { className: classNames('clearfix', { 'hide': view === 'date' }) },
	                React.createElement(
	                    'ul',
	                    { className: 'datepicker-time-col' },
	                    hours.map(function (hour, idx) {
	                        return React.createElement(
	                            'li',
	                            {
	                                key: idx,
	                                onClick: function onClick(e) {
	                                    _this2.setHours(idx);
	                                },
	                                className: classNames({ 'active': idx === _this2.state.hours })
	                            },
	                            hour + '\u65F6'
	                        );
	                    })
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'datepicker-time-col' },
	                    minutes.map(function (minute, idx) {
	                        return React.createElement(
	                            'li',
	                            {
	                                key: idx,
	                                onClick: function onClick(e) {
	                                    _this2.setMinutes(idx);
	                                },
	                                className: classNames({ 'active': idx === _this2.state.minutes })
	                            },
	                            minute + '\u5206'
	                        );
	                    })
	                ),
	                React.createElement(
	                    'ul',
	                    { className: 'datepicker-time-col' },
	                    seconds.map(function (second, idx) {
	                        return React.createElement(
	                            'li',
	                            {
	                                key: idx,
	                                onClick: function onClick(e) {
	                                    _this2.setSeconds(idx);
	                                },
	                                className: classNames({ 'active': idx === _this2.state.seconds })
	                            },
	                            second + '\u79D2'
	                        );
	                    })
	                )
	            )
	        );
	    },
	    renderPanelFoot: function renderPanelFoot() {
	        var selectTime = this.props.selectTime;
	        var _state6 = this.state;
	        var view = _state6.view;
	        var todayDisabled = _state6.todayDisabled;


	        return React.createElement(
	            'div',
	            { className: 'datepicker-foot' },
	            React.createElement(
	                'div',
	                { className: classNames({ 'hide': view === 'time' }) },
	                React.createElement(
	                    'span',
	                    { className: 'datepicker-clear-btn', onClick: this.clear },
	                    '\u6E05\u7A7A'
	                ),
	                selectTime && React.createElement(
	                    'span',
	                    { onClick: this.selectTime },
	                    '\u9009\u62E9\u65F6\u95F4'
	                ),
	                todayDisabled || React.createElement(
	                    'span',
	                    { className: 'datepicker-today-btn', onClick: this.setToday },
	                    selectTime ? '现在' : '今天'
	                )
	            ),
	            selectTime && React.createElement(
	                'div',
	                { className: classNames({ 'hide': view === 'date' }) },
	                React.createElement(
	                    'span',
	                    { onClick: this.selectDate },
	                    '\u9009\u62E9\u65E5\u671F'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'datepicker-ok-btn', onClick: this.ok },
	                    '\u786E\u8BA4'
	                )
	            )
	        );
	    },
	    render: function render() {
	        var wrapperClassName = this.props.wrapperClassName;
	        var visible = this.state.visible;


	        var input = this.readerInput();
	        var panelHead = this.renderPanelHead();
	        var panelBody = this.renderPanelBody();
	        var panelFoot = this.renderPanelFoot();

	        return React.createElement(
	            'div',
	            { className: 'datepicker-wrapper ' + wrapperClassName },
	            React.createElement(
	                'div',
	                { className: 'datepicker-trigger', onClick: this.show },
	                input,
	                React.createElement('i', { className: 'fa fa-calendar' })
	            ),
	            React.createElement(
	                'div',
	                {
	                    className: classNames('datepicker-panel', { 'show': visible }),
	                    onMouseEnter: this.mouseEnter,
	                    onMouseLeave: this.mouseLeave
	                },
	                panelHead,
	                panelBody,
	                panelFoot
	            )
	        );
	    }
	});

	module.exports = DatePicker;

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(13);

/***/ },

/***/ 13:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Form
	// ------------------------

	var Formsy = __webpack_require__(14);

	var Form = React.createClass({
	    displayName: 'Form',
	    render: function render() {
	        return React.createElement(
	            Formsy.Form,
	            this.props,
	            this.props.children
	        );
	    }
	});

	Form.InputField = __webpack_require__(54);
	Form.DateField = __webpack_require__(55);
	Form.RadioGroupField = __webpack_require__(56);
	Form.CheckboxGroupField = __webpack_require__(57);
	Form.TextAreaField = __webpack_require__(58);

	module.exports = Form;

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Input
	// ---------------------------

	var classNames = __webpack_require__(5);
	var Formsy = __webpack_require__(14);

	var InputField = React.createClass({
	    displayName: 'InputField',


	    // Add the Formsy Mixin
	    mixins: [Formsy.Mixin],

	    // setValue() will set the value of the component, which in
	    // turn will validate it and the rest of the form
	    changeValue: function changeValue(event) {
	        this.setValue(event.currentTarget['value']);
	    },
	    render: function render() {

	        // showRequired() is true when the value is empty and 
	        // the required prop is passed to the input. 
	        // showError() is true when the value typed is invalid.

	        // An error message is returned ONLY if the component is invalid
	        // or the server has returned an error message
	        var _props = this.props;
	        var type = _props.type;
	        var title = _props.title;
	        var name = _props.name;

	        var errorMessage = this.getErrorMessage();

	        return React.createElement(
	            'div',
	            { className: 'form-group ' + this.props.className },
	            React.createElement(
	                'label',
	                { className: 'form-label', htmlFor: name },
	                title
	            ),
	            React.createElement('input', {
	                className: classNames('form-control', {
	                    'required': this.showRequired(),
	                    'error': this.showError()
	                }),
	                type: type || 'text',
	                name: name,
	                onChange: this.changeValue,
	                value: this.getValue()
	            }),
	            React.createElement(
	                'span',
	                { className: 'validation-error' },
	                errorMessage
	            )
	        );
	    }
	});

	module.exports = InputField;

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	// Datepicker Field
	// ---------------------------

	var classNames = __webpack_require__(5);
	var DatePicker = __webpack_require__(10);
	var Formsy = __webpack_require__(14);

	var DateField = React.createClass({
	    displayName: 'DateField',


	    // Add the Formsy Mixin
	    mixins: [Formsy.Mixin],

	    changeValue: function changeValue(dateStr, dateObj) {
	        this.setValue(dateStr);
	    },
	    render: function render() {
	        var _props = this.props;
	        var className = _props.className;
	        var title = _props.title;
	        var name = _props.name;

	        var otherProps = _objectWithoutProperties(_props, ['className', 'title', 'name']);

	        var errorMessage = this.getErrorMessage();

	        return React.createElement(
	            'div',
	            { className: 'form-group ' + className },
	            React.createElement(
	                'label',
	                { className: 'form-label' },
	                title
	            ),
	            React.createElement(DatePicker, _extends({
	                wrapperClassName: 'form-control',
	                inputClassName: classNames({
	                    'required': this.showRequired(),
	                    'error': this.showError()
	                }),
	                onChange: this.changeValue,
	                initialDate: this.getValue()
	            }, otherProps)),
	            React.createElement(
	                'span',
	                { className: 'validation-error' },
	                errorMessage
	            )
	        );
	    }
	});

	module.exports = DateField;

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// RadioGroup
	// ---------------------------

	var classNames = __webpack_require__(5);
	var Formsy = __webpack_require__(14);

	var RadioGroupField = React.createClass({
	    displayName: 'RadioGroupField',

	    mixins: [Formsy.Mixin],

	    componentDidMount: function componentDidMount() {
	        var value = this.props.value;
	        this.setValue(value);
	        this.setState({ value: value });
	    },
	    changeValue: function changeValue(value) {
	        this.setValue(value);
	        this.setState({ value: value });
	    },
	    render: function render() {
	        var _this = this;

	        var _props = this.props;
	        var name = _props.name;
	        var title = _props.title;
	        var items = _props.items;


	        return React.createElement(
	            'div',
	            { className: 'form-group ' + this.props.className },
	            title && React.createElement(
	                'label',
	                { className: 'form-label' },
	                title
	            ),
	            React.createElement(
	                'div',
	                { className: 'form-control' },
	                items.map(function (item, i) {
	                    return React.createElement(
	                        'label',
	                        { key: i, className: 'radio' },
	                        React.createElement('input', {
	                            type: 'radio',
	                            name: name,
	                            onChange: _this.changeValue.bind(_this, item.value),
	                            checked: _this.state.value === item.value
	                        }),
	                        React.createElement(
	                            'span',
	                            null,
	                            item.text
	                        )
	                    );
	                })
	            )
	        );
	    }
	});

	module.exports = RadioGroupField;

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Checkbox
	// ---------------------------

	var classNames = __webpack_require__(5);
	var Formsy = __webpack_require__(14);

	var CheckboxGroupField = React.createClass({
	    displayName: 'CheckboxGroupField',

	    mixins: [Formsy.Mixin],

	    getInitialState: function getInitialState() {
	        return { value: [] };
	    },
	    componentDidMount: function componentDidMount() {
	        var value = this.props.value || [];
	        this.setValue(value);
	        this.setState({ value: value });
	    },
	    changeValue: function changeValue(value, event) {
	        var checked = event.currentTarget.checked;

	        var newValue = [];
	        if (checked) {
	            newValue = this.state.value.concat(value);
	        } else {
	            newValue = this.state.value.filter(function (it) {
	                return it !== value;
	            });
	        }

	        this.setValue(newValue);
	        this.setState({ value: newValue });
	    },
	    render: function render() {
	        var _this = this;

	        var _props = this.props;
	        var name = _props.name;
	        var title = _props.title;
	        var items = _props.items;


	        return React.createElement(
	            'div',
	            { className: 'form-group ' + this.props.className },
	            title && React.createElement(
	                'label',
	                { className: 'form-label' },
	                title
	            ),
	            React.createElement(
	                'div',
	                { className: 'form-control' },
	                items.map(function (item, i) {
	                    return React.createElement(
	                        'label',
	                        { key: i, className: 'checkbox' },
	                        React.createElement('input', {
	                            type: 'checkbox',
	                            name: name,
	                            onChange: _this.changeValue.bind(_this, item.value),
	                            checked: _this.state.value.indexOf(item.value) > -1
	                        }),
	                        React.createElement(
	                            'span',
	                            null,
	                            item.text
	                        )
	                    );
	                })
	            )
	        );
	    }
	});

	module.exports = CheckboxGroupField;

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// TextArea
	// ---------------------------

	var classNames = __webpack_require__(5);
	var Formsy = __webpack_require__(14);

	var TextAreaField = React.createClass({
	    displayName: 'TextAreaField',


	    mixins: [Formsy.Mixin],

	    changeValue: function changeValue(event) {
	        this.setValue(event.currentTarget['innerText']);
	    },
	    render: function render() {
	        var _props = this.props;
	        var type = _props.type;
	        var title = _props.title;
	        var name = _props.name;

	        var errorMessage = this.getErrorMessage();

	        return React.createElement(
	            'div',
	            { className: 'form-group ' + this.props.className },
	            React.createElement(
	                'label',
	                { className: 'form-label', htmlFor: name },
	                title
	            ),
	            React.createElement('textarea', {
	                className: classNames('form-control', {
	                    'required': this.showRequired(),
	                    'error': this.showError()
	                }),
	                name: name,
	                onChange: this.changeValue,
	                value: this.getValue()
	            }),
	            React.createElement(
	                'span',
	                { className: 'validation-error' },
	                errorMessage
	            )
	        );
	    }
	});

	module.exports = TextAreaField;

/***/ }

});