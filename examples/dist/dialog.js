/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _Z = Z,
	    Message = _Z.Message,
	    Dialog = _Z.Dialog;


	var App = React.createClass({
	    displayName: 'App',


	    getInitialState: function getInitialState() {
	        return {
	            dlgOpen: false,
	            dlgOpen1: false
	        };
	    },

	    msg1: function msg1() {
	        Message.msg('This is some message.');
	    },
	    msg2: function msg2() {
	        Message.success('This is a success message.');
	    },
	    msg3: function msg3() {
	        Message.warning('This is a warning message.');
	    },
	    msg4: function msg4() {
	        Message.error('This is an error message.');
	    },
	    openDialog: function openDialog() {
	        this.setState({ dlgOpen: true });
	    },
	    openDialog1: function openDialog1() {
	        this.setState({ dlgOpen1: true });
	    },
	    closeDlg: function closeDlg() {
	        this.setState({ dlgOpen: false });
	    },
	    closeDlg1: function closeDlg1() {
	        this.setState({ dlgOpen1: false });
	    },
	    render: function render() {
	        var _state = this.state,
	            dlgOpen = _state.dlgOpen,
	            dlgOpen1 = _state.dlgOpen1;


	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-primary', onClick: this.msg1 },
	                    '\u5F39\u51FA\u6D88\u606F1'
	                ),
	                '\xA0\xA0\xA0',
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-primary', onClick: this.msg2 },
	                    '\u5F39\u51FA\u6D88\u606F2'
	                ),
	                '\xA0\xA0\xA0',
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-primary', onClick: this.msg3 },
	                    '\u5F39\u51FA\u6D88\u606F3'
	                ),
	                '\xA0\xA0\xA0',
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-primary', onClick: this.msg4 },
	                    '\u5F39\u51FA\u6D88\u606F4'
	                ),
	                '\xA0\xA0\xA0'
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-primary', onClick: this.openDialog },
	                    '\u663E\u793A\u5BF9\u8BDD\u6846'
	                ),
	                '\xA0\xA0\xA0',
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-primary', onClick: this.openDialog1 },
	                    '\u663E\u793A\u5BF9\u8BDD\u68461'
	                )
	            ),
	            React.createElement(
	                Dialog,
	                { isOpen: dlgOpen, title: '\u5BF9\u8BDD\u6846', style: { width: 500 }, onCancel: this.closeDlg },
	                '\u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002'
	            ),
	            React.createElement(
	                Dialog,
	                { isOpen: dlgOpen1, style: { width: "100%" }, onCancel: this.closeDlg1 },
	                '\u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002 \u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002 \u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002 \u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002 \u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002'
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);