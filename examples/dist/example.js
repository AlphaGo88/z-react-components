webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	var _Z = Z;
	var Pagination = _Z.Pagination;
	var Message = _Z.Message;
	var Dialog = _Z.Dialog;
	var DatePicker = _Z.DatePicker;


	var App = React.createClass({
	    displayName: 'App',


	    getInitialState: function getInitialState() {
	        return {
	            dlgVisible: false
	        };
	    },

	    handleClick: function handleClick() {
	        Message.msg('This is some message.');
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
	        var dlgVisible = this.state.dlgVisible;


	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-primary', onClick: this.handleClick },
	                    '\u5F39\u51FA\u6D88\u606F'
	                ),
	                '\xA0\xA0\xA0',
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-primary', onClick: this.showDialog },
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
	                React.createElement(DatePicker, { selectTime: true })
	            ),
	            React.createElement(
	                Dialog,
	                { visible: dlgVisible, title: '\u5BF9\u8BDD\u6846', style: { width: 500 } },
	                '\u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002'
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
	    Message: __webpack_require__(6),
	    Pagination: __webpack_require__(8),
	    DatePicker: __webpack_require__(10),
	    Form: __webpack_require__(12)
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

	var Dialog = __webpack_require__(4);

	module.exports = React.createClass({
	    displayName: 'exports',
	    appendDialogToDoc: function appendDialogToDoc() {
	        ReactDOM.unstable_renderSubtreeIntoContainer(this, React.createElement(Dialog, this.props), this.layer);
	    },
	    componentDidMount: function componentDidMount() {
	        this.layer = document.createElement('div');
	        document.body.appendChild(this.layer);
	        this.appendDialogToDoc();
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        this.appendDialogToDoc();
	    },
	    componentWillUnmount: function componentWillUnmount() {
	        document.body.removeChild(this.layer);
	    },
	    render: function render() {
	        return null;
	    }
	});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 对话框组件

	var classNames = __webpack_require__(5);

	var Dialog = React.createClass({
	    displayName: 'Dialog',
	    getDefaultProps: function getDefaultProps() {
	        return {
	            style: null,
	            visible: false,
	            title: '',
	            footer: null, //自定义footer
	            onOK: function onOK() {},
	            onCancel: null
	        };
	    },
	    getInitialState: function getInitialState() {
	        return { visible: this.props.visible };
	    },
	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({ visible: nextProps.visible });
	    },
	    close: function close() {
	        this.setState({ visible: false });
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


	        var layerClass = classNames('dlg-mask', { 'show': visible });

	        return React.createElement(
	            'div',
	            { className: layerClass },
	            React.createElement(
	                'div',
	                { className: 'dlg', style: style },
	                React.createElement('a', { className: 'fa fa-close dlg-close', onClick: this.close }),
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
	                footer ? React.createElement(
	                    'div',
	                    { className: 'dlg-foot' },
	                    footer
	                ) : React.createElement(
	                    'div',
	                    { className: 'dlg-foot' },
	                    React.createElement(
	                        'span',
	                        { className: 'btn-flat', onClick: onOK },
	                        '\u786E\u8BA4'
	                    ),
	                    React.createElement(
	                        'span',
	                        { className: 'btn-flat', onClick: onCancel || this.close },
	                        '\u53D6\u6D88'
	                    )
	                )
	            )
	        );
	    }
	});

	module.exports = Dialog;

/***/ },
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(7);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	// 消息组件

	module.exports = {
	    msg: function msg(content) {

	        // create message layer if not been created.
	        var layer = document.getElementById('msg-layer');

	        if (!layer) {
	            layer = document.createElement('div');
	            layer.id = 'msg-layer';
	            layer.addEventListener('transitionend', function (e) {
	                layer.removeChild(e.target);
	            }, false);
	            document.body.appendChild(layer);
	        }

	        var msgBox = document.createElement('div');

	        msgBox.className = 'msg';
	        msgBox.innerHTML = content;
	        layer.appendChild(msgBox);

	        setTimeout(function () {
	            msgBox.className += ' msg-exit';
	        }, 4000);
	    }
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(9);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// 页码组件

	var classNames = __webpack_require__(5);

	var Pagination = React.createClass({
	    displayName: 'Pagination',
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
	        return { pageNo: this.props.initialPageNo };
	    },

	    handleClick: function handleClick(pageNo) {
	        if (pageNo !== this.state.pageNo) {
	            this.setState({ pageNo: pageNo });
	            this.props.onPageChange(pageNo);
	        }
	    },
	    render: function render() {
	        var _this = this;

	        var _props = this.props;
	        var recordCount = _props.recordCount;
	        var pageDisplay = _props.pageDisplay;
	        var pageSize = _props.pageSize;


	        if (recordCount === 0) return null;

	        var activeNo = this.state.pageNo;
	        var pageCount = Math.ceil(recordCount / pageSize); //总共的页数
	        var leftNo = Math.ceil(activeNo / pageDisplay) * pageDisplay - pageDisplay + 1; //最左边的页码
	        var rightNo = Math.min(leftNo + pageDisplay - 1, pageCount); //最右边的页码

	        var pageNos = [];

	        // 生成页码
	        for (var i = leftNo; i <= rightNo; i++) {
	            pageNos.push(i);
	        }

	        return React.createElement(
	            'div',
	            { className: 'pagination' },
	            activeNo === 1 || React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'span',
	                    { onClick: function onClick(e) {
	                            _this.handleClick(1);
	                        } },
	                    '\u9996\u9875'
	                ),
	                React.createElement(
	                    'span',
	                    { onClick: function onClick(e) {
	                            _this.handleClick(activeNo - 1);
	                        } },
	                    '\u4E0A\u4E00\u9875'
	                )
	            ),
	            pageNos.map(function (pageNo) {
	                return React.createElement(
	                    'span',
	                    {
	                        key: pageNo,
	                        className: classNames({ 'active': pageNo === activeNo }),
	                        onClick: function onClick(e) {
	                            _this.handleClick(pageNo);
	                        }
	                    },
	                    pageNo
	                );
	            }),
	            activeNo === pageCount || React.createElement(
	                'div',
	                null,
	                React.createElement(
	                    'span',
	                    { onClick: function onClick(e) {
	                            _this.handleClick(activeNo + 1);
	                        } },
	                    '\u4E0B\u4E00\u9875'
	                ),
	                React.createElement(
	                    'span',
	                    { onClick: function onClick(e) {
	                            _this.handleClick(pageCount);
	                        } },
	                    '\u5C3E\u9875'
	                )
	            )
	        );
	    }
	});

	module.exports = Pagination;

/***/ }
]);