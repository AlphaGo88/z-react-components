webpackJsonp([0,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	var _Z = Z;
	var Pagination = _Z.Pagination;
	var Message = _Z.Message;
	var Dialog = _Z.Dialog;
	var DateTimePicker = _Z.DateTimePicker;


	var App = React.createClass({
	    displayName: 'App',


	    getInitialState: function getInitialState() {
	        return {
	            dlgVisible: false
	        };
	    },

	    handleClick: function handleClick() {
	        Message.info('This is some message.');
	    },
	    showDialog: function showDialog() {
	        this.setState({
	            dlgVisible: true
	        });
	    },
	    setFruit: function setFruit(fruit) {
	        console.log(fruit);
	    },
	    render: function render() {
	        var _this = this;

	        var dlgVisible = this.state.dlgVisible;


	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'span',
	                    { className: 'btn btn-primary', onClick: this.handleClick },
	                    '\u5F39\u51FA\u6D88\u606F'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'btn btn-primary', onClick: this.showDialog },
	                    '\u663E\u793A\u5BF9\u8BDD\u6846'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(Pagination, { recordCount: 100 })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(DateTimePicker, { maxDate: '2016-9-16' })
	            ),
	            React.createElement(
	                Dialog,
	                { visible: dlgVisible, title: '\u5BF9\u8BDD\u6846', style: { width: 500 } },
	                '\u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002'
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'form',
	                    { style: { width: 540 }, id: 'form' },
	                    React.createElement(
	                        'div',
	                        { className: 'form-group col-6' },
	                        React.createElement(
	                            'label',
	                            { className: 'form-label' },
	                            '\u59D3\u540D\uFF1A'
	                        ),
	                        React.createElement('input', { type: 'text', className: 'form-control', name: 'name', defaultValue: '\u5F20\u4E09' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group col-6' },
	                        React.createElement(
	                            'label',
	                            { className: 'form-label' },
	                            '\u751F\u65E5\uFF1A'
	                        ),
	                        React.createElement(DateTimePicker, { className: 'form-control', name: 'birthday' })
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group col-6' },
	                        React.createElement(
	                            'label',
	                            { className: 'form-label' },
	                            '\u5355\u9009\u6846\uFF1A'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'form-control' },
	                            React.createElement(
	                                'label',
	                                { className: 'radio' },
	                                React.createElement('input', { type: 'radio', name: 'fruit1', value: 'apple' }),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'Apple'
	                                )
	                            ),
	                            React.createElement(
	                                'label',
	                                { className: 'radio' },
	                                React.createElement('input', { type: 'radio', name: 'fruit1', value: 'banana' }),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'banana'
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group col-6' },
	                        React.createElement(
	                            'label',
	                            { className: 'form-label' },
	                            '\u590D\u9009\u6846\uFF1A'
	                        ),
	                        React.createElement(
	                            'div',
	                            { className: 'form-control' },
	                            React.createElement(
	                                'label',
	                                { className: 'checkbox' },
	                                React.createElement('input', { type: 'checkbox', name: 'fruit2', value: 'apple', onChange: function onChange() {
	                                        _this.setFruit('apple');
	                                    } }),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'Apple'
	                                )
	                            ),
	                            React.createElement(
	                                'label',
	                                { className: 'checkbox' },
	                                React.createElement('input', { type: 'checkbox', name: 'fruit2', value: 'banana', onChange: function onChange() {
	                                        _this.setFruit('banana');
	                                    } }),
	                                React.createElement(
	                                    'span',
	                                    null,
	                                    'banana'
	                                )
	                            )
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'form-group' },
	                        React.createElement(
	                            'a',
	                            { className: 'btn btn-primary', id: 'submit' },
	                            '\u786E\u8BA4'
	                        ),
	                        React.createElement(
	                            'a',
	                            { className: 'btn btn-default' },
	                            '\u53D6\u6D88'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	window.Z = {
	    Dialog: __webpack_require__(3),
	    Message: __webpack_require__(5),
	    Pagination: __webpack_require__(7),
	    DateTimePicker: __webpack_require__(9)
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	if (typeof Object.assign != 'function') {
	    (function () {
	        Object.assign = function (target) {
	            'use strict';
	            // We must check against these specific cases.

	            if (target === undefined || target === null) {
	                throw new TypeError('Cannot convert undefined or null to object');
	            }

	            var output = Object(target);
	            for (var index = 1; index < arguments.length; index++) {
	                var source = arguments[index];
	                if (source !== undefined && source !== null) {
	                    for (var nextKey in source) {
	                        if (source.hasOwnProperty(nextKey)) {
	                            output[nextKey] = source[nextKey];
	                        }
	                    }
	                }
	            }
	            return output;
	        };
	    })();
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(4);

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	// 对话框组件

	var Dialog = React.createClass({
	    displayName: 'Dialog',
	    getDefaultProps: function getDefaultProps() {
	        return {
	            style: null,
	            visible: false,
	            title: '',
	            onOK: function onOK() {},
	            onCancel: null,
	            footer: null //自定义footer
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            visible: this.props.visible
	        };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({
	            visible: nextProps.visible
	        });
	    },
	    close: function close() {
	        this.setState({
	            visible: false
	        });
	    },
	    render: function render() {
	        var _props = this.props;
	        var title = _props.title;
	        var style = _props.style;
	        var children = _props.children;
	        var onOK = _props.onOK;
	        var onCancel = _props.onCancel;
	        var footer = _props.footer;
	        var visible = this.state.visible;


	        var layerClass = visible ? 'dlg-layer show' : 'dlg-layer';

	        return React.createElement(
	            'div',
	            { className: layerClass },
	            React.createElement(
	                'div',
	                { className: 'dlg', style: style },
	                React.createElement('i', { className: 'fa fa-close dlg-close', onClick: this.close }),
	                React.createElement(
	                    'h3',
	                    { className: 'dlg-title' },
	                    title
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'dlg-body' },
	                    children
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'dlg-foot' },
	                    footer ? React.createElement(
	                        'div',
	                        null,
	                        footer
	                    ) : React.createElement(
	                        'div',
	                        null,
	                        React.createElement(
	                            'span',
	                            { className: 'btn-flat', onClick: onOK },
	                            '\u786E\u8BA4'
	                        ),
	                        React.createElement(
	                            'span',
	                            { className: 'btn-flat', onClick: onCancel ? onCancel : this.close },
	                            '\u53D6\u6D88'
	                        )
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Dialog;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(6);

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	// 消息组件

	$(document).ready(function () {
	    // create container for message popups
	    var $msgContainer = $('<div id="bjuc-msg-container"></div');

	    $msgContainer.appendTo('body');

	    // remove dom node when exit animation ends
	    $msgContainer.on('transitionend', '.msg-exit', function (e) {
	        $(e.target).remove();
	    });
	});

	module.exports = {
	    info: function info(msg) {
	        var $msg = $('<div class="msg">' + msg + '</div>');
	        $('#bjuc-msg-container').append($msg);
	        setTimeout(function () {
	            $msg.addClass('msg-exit');
	        }, 4000);
	    }
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(8);

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	// 页码组件

	var Pagination = React.createClass({
	    displayName: "Pagination",
	    getDefaultProps: function getDefaultProps() {
	        return {
	            recordCount: 0, //记录总条数
	            pageDisplay: 5, //同时显示的页码数
	            pageSize: 10, //每页显示记录条数
	            initialPageNo: 1, //初始页码
	            onPageChange: function onPageChange() {}
	        };
	    },


	    getInitialState: function getInitialState() {
	        return {
	            pageNo: this.props.initialPageNo
	        };
	    },

	    handleClick: function handleClick(pageNo) {
	        if (pageNo !== this.state.pageNo) {
	            this.setState({
	                pageNo: pageNo
	            });
	            this.props.onPageChange(pageNo);
	        }
	    },
	    render: function render() {
	        var _this = this;

	        var _props = this.props;
	        var pageDisplay = _props.pageDisplay;
	        var recordCount = _props.recordCount;

	        var curNo = this.state.pageNo;

	        if (recordCount === 0) {
	            return null;
	        }

	        var pageCount = Math.ceil(recordCount / pageDisplay); //总共的页数
	        var leftNo = Math.ceil(curNo / pageDisplay) * pageDisplay - pageDisplay + 1; //最左边的页码
	        var rightNo = Math.min(leftNo + pageDisplay - 1, pageCount); //最右边的页码
	        var pageNos = [];

	        // 生成页码
	        for (var i = leftNo; i <= rightNo; i++) {
	            pageNos.push(i);
	        }

	        return React.createElement(
	            "div",
	            { className: "pagination" },
	            curNo === 1 || React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "span",
	                    { onClick: function onClick(e) {
	                            return _this.handleClick(1);
	                        } },
	                    "\u9996\u9875"
	                ),
	                React.createElement(
	                    "span",
	                    { onClick: function onClick(e) {
	                            return _this.handleClick(curNo - 1);
	                        } },
	                    "\u4E0A\u4E00\u9875"
	                )
	            ),
	            React.createElement(
	                "div",
	                null,
	                pageNos.map(function (pageNo) {
	                    var activeClass = pageNo === curNo ? 'active' : null;
	                    return React.createElement(
	                        "span",
	                        { key: pageNo, className: activeClass, onClick: function onClick(e) {
	                                return _this.handleClick(pageNo);
	                            } },
	                        pageNo
	                    );
	                })
	            ),
	            curNo === pageCount || React.createElement(
	                "div",
	                null,
	                React.createElement(
	                    "span",
	                    { onClick: function onClick(e) {
	                            return _this.handleClick(curNo + 1);
	                        } },
	                    "\u4E0B\u4E00\u9875"
	                ),
	                React.createElement(
	                    "span",
	                    { onClick: function onClick(e) {
	                            return _this.handleClick(pageCount);
	                        } },
	                    "\u5C3E\u9875"
	                )
	            )
	        );
	    }
	});

	module.exports = Pagination;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(10);

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	// 日期时间选择组件

	//判断是否为闰年
	function isLeapYear(year) {
	    return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
	}

	//获取某一年某一月份的天数
	function getMonthDays(year, month) {
	    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
	}

	function getDateProps(date) {
	    return {
	        year: date.getFullYear(),
	        month: date.getMonth(),
	        date: date.getDate(),
	        day: date.getDay()
	    };
	}

	var DateTimePicker = React.createClass({
	    displayName: 'DateTimePicker',
	    getDefaultProps: function getDefaultProps() {
	        return {
	            className: '',
	            name: 'datepicker',
	            selectTime: false, //默认仅选择日期，不包括时间
	            format: 'yyyy-mm-dd',
	            initialDate: null,
	            maxDate: null,
	            minDate: null,
	            onChange: function onChange() {},
	            disableDates: function disableDates() {
	                return false;
	            }
	        };
	    },
	    getInitialState: function getInitialState() {
	        var _props = this.props;
	        var initialDate = _props.initialDate;
	        var maxDate = _props.maxDate;
	        var minDate = _props.minDate;

	        var _initialDate = void 0,
	            set = void 0,
	            todayDisabled = false;

	        if (initialDate) {
	            _initialDate = new Date(initialDate);
	            set = true;
	        } else {
	            var today = new Date();
	            _initialDate = today;

	            //如果今天大于最大日期，默认选中最大日期
	            if (maxDate) {
	                var _maxDate = new Date(maxDate);
	                if (today.valueOf() > _maxDate.valueOf()) {
	                    _initialDate = _maxDate;
	                    todayDisabled = true;
	                }
	            }

	            //如果今天小于最小日期，默认选中最小日期
	            if (minDate) {
	                var _minDate = new Date(minDate);
	                if (today.valueOf() < _minDate.valueOf()) {
	                    _initialDate = _minDate;
	                    todayDisabled = true;
	                }
	            }

	            set = false;
	        }

	        var dateProps = getDateProps(_initialDate);

	        return Object.assign({
	            set: set,
	            visible: false,
	            todayDisabled: todayDisabled
	        }, dateProps);
	    },
	    componentDidMount: function componentDidMount() {
	        var _this = this;

	        window.addEventListener('click', function () {
	            _this.hover || _this.hide();
	        }, false);
	    },
	    getDateStr: function getDateStr(year, month, date) {
	        var monthStr = month > 8 ? month + 1 : '0' + (month + 1);
	        var dateStr = date > 9 ? date : '0' + date;

	        return year + '-' + monthStr + '-' + dateStr;
	    },
	    show: function show() {
	        this.hover = true;
	        this.setState({
	            visible: true
	        });
	    },
	    hide: function hide() {
	        this.setState({
	            visible: false
	        });
	    },
	    prevYear: function prevYear() {
	        var curYear = this.state.year;
	        this.setState({
	            year: curYear - 1
	        });
	    },
	    nextYear: function nextYear() {
	        var curYear = this.state.year;
	        this.setState({
	            year: curYear + 1
	        });
	    },
	    prevMonth: function prevMonth() {
	        var curMonth = this.state.month;
	        var curYear = this.state.year;
	        if (curMonth === 0) {
	            this.setState({
	                year: curYear - 1,
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
	    setDate: function setDate(date) {
	        var _state = this.state;
	        var year = _state.year;
	        var month = _state.month;

	        var dateStr = this.getDateStr(year, month, date);
	        var dateObj = new Date(year, month, date);

	        this.setState({
	            set: true,
	            date: date,
	            visible: false
	        });

	        this.props.onChange(dateStr, dateObj);
	    },
	    setToday: function setToday() {
	        var todayProps = getDateProps(new Date());
	        var newState = Object.assign({
	            set: true,
	            visible: false
	        }, todayProps);

	        this.setState(newState);
	    },
	    clear: function clear() {
	        this.setState({
	            set: false,
	            visible: false
	        });
	        this.props.onChange('', null);
	    },
	    mouseEnter: function mouseEnter() {
	        this.hover = true;
	    },
	    mouseLeave: function mouseLeave() {
	        this.hover = false;
	    },
	    render: function render() {
	        var _this2 = this;

	        var _props2 = this.props;
	        var className = _props2.className;
	        var name = _props2.name;
	        var maxDate = _props2.maxDate;
	        var minDate = _props2.minDate;
	        var disableDates = _props2.disableDates;
	        var _state2 = this.state;
	        var set = _state2.set;
	        var visible = _state2.visible;
	        var year = _state2.year;
	        var month = _state2.month;
	        var date = _state2.date;
	        var day = _state2.day;
	        var todayDisabled = _state2.todayDisabled;

	        var dateStr = set ? this.getDateStr(year, month, date) : '';

	        var howManyDates = getMonthDays(year, month); //本月有多少天
	        var offset = new Date(year, month, 1).getDay(); //本月第一天是星期几

	        var maxValue = maxDate ? new Date(maxDate).valueOf() : undefined;
	        var minValue = minDate ? new Date(minDate).valueOf() : undefined;

	        var dates = [],
	            rows = [],
	            i = void 0;

	        for (i = 0; i < offset; i++) {
	            dates.push({
	                value: 0
	            });
	        }
	        for (i = 1; i <= howManyDates; i++) {
	            var curDateValue = void 0;
	            var disabled = false;
	            var active = i === date;

	            if (maxValue || minValue) {
	                curDateValue = new Date(year, month, i).valueOf();
	                disabled = curDateValue > maxValue || curDateValue < minValue;
	            }
	            dates.push({
	                value: i,
	                disabled: disabled,
	                active: active
	            });
	        }

	        //按行分组
	        for (i = 0; i <= dates.length; i += 7) {
	            rows.push(dates.slice(i, i + 7));
	        }

	        var disabledClass = void 0,
	            activeClass = void 0;
	        var tBody = React.createElement(
	            'tbody',
	            null,
	            rows.map(function (row, index) {
	                return React.createElement(
	                    'tr',
	                    { key: 'tr' + index },
	                    row.map(function (item, index) {
	                        disabledClass = item.disabled ? 'disabled' : '';
	                        activeClass = item.active ? 'active' : '';
	                        return React.createElement(
	                            'td',
	                            { key: 'th' + index },
	                            item.value > 0 && React.createElement(
	                                'span',
	                                {
	                                    className: 'datepicker-date ' + disabledClass + ' ' + activeClass,
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
	        );

	        var panelClass = visible ? 'datepicker-panel show' : 'datepicker-panel';

	        return React.createElement(
	            'div',
	            { className: 'datepicker-wrapper ' + className },
	            React.createElement(
	                'div',
	                { className: 'datepicker-trigger', onClick: this.show },
	                React.createElement('input', { type: 'text', name: name, readOnly: true, value: dateStr }),
	                React.createElement('i', { className: 'fa fa-calendar' })
	            ),
	            React.createElement(
	                'div',
	                { className: panelClass, onMouseEnter: this.mouseEnter, onMouseLeave: this.mouseLeave },
	                React.createElement(
	                    'div',
	                    { className: 'datepicker-head' },
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
	                React.createElement(
	                    'div',
	                    { className: 'datepicker-body' },
	                    React.createElement(
	                        'table',
	                        { className: 'datepicker-table' },
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
	                        tBody
	                    )
	                ),
	                React.createElement(
	                    'div',
	                    { className: 'datepicker-foot' },
	                    todayDisabled || React.createElement(
	                        'span',
	                        { className: 'datepicker-today-btn', onClick: this.setToday },
	                        '\u4ECA\u5929'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'datepicker-clear-btn', onClick: this.clear },
	                        '\u6E05\u7A7A'
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = DateTimePicker;

/***/ }
]);