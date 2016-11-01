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
	    Dialog = _Z.Dialog,
	    Form = _Z.Form;


	var countries = [{
	    value: 'usa',
	    text: '美国'
	}, {
	    value: 'china',
	    text: '中国'
	}];

	var cities = [{
	    value: 'dc',
	    text: '华盛顿'
	}, {
	    value: 'ny',
	    text: '纽约'
	}];

	var App = React.createClass({
	    displayName: 'App',


	    getInitialState: function getInitialState() {
	        return {
	            dlg1Open: false,
	            dlg2Open: false,
	            dlg3Open: false
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
	        this.setState({ dlg1Open: true });
	    },
	    openDialog1: function openDialog1() {
	        this.setState({ dlg2Open: true });
	    },
	    openDialog2: function openDialog2() {
	        var _this = this;

	        this.setState({
	            dlg3Open: true
	        }, function () {
	            _this.refs.form.reset({
	                id: 'sdfsd',
	                name: 'jokoifkwe',
	                country: 'kj',
	                city: 'nykk',
	                cb1: true,
	                cb3: true
	            });
	        });
	    },
	    closeDlg: function closeDlg() {
	        this.setState({ dlg1Open: false });
	    },
	    closeDlg1: function closeDlg1() {
	        this.setState({ dlg2Open: false });
	    },
	    closeDlg2: function closeDlg2() {
	        this.setState({ dlg3Open: false });
	    },
	    render: function render() {
	        var _state = this.state,
	            dlg1Open = _state.dlg1Open,
	            dlg2Open = _state.dlg2Open,
	            dlg3Open = _state.dlg3Open;


	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.msg1 },
	                    'Message'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.msg2 },
	                    'Success message'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.msg3 },
	                    'Warning message'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.msg4 },
	                    'Error message'
	                )
	            ),
	            React.createElement('hr', null),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.openDialog },
	                    'Normal dialog'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.openDialog1 },
	                    'Dialog with full width'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.openDialog2 },
	                    'Dialog with form'
	                )
	            ),
	            React.createElement(
	                Dialog,
	                { isOpen: dlg1Open, title: '\u5BF9\u8BDD\u6846', style: { width: 500 }, onCancel: this.closeDlg },
	                '\u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002'
	            ),
	            React.createElement(
	                Dialog,
	                { isOpen: dlg2Open, style: { width: "100%" }, onCancel: this.closeDlg1 },
	                '\u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002 \u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002 \u554A\u4E09\u5B63\u5EA6\u6765\u770B\u623F\u8428\u82AC\u7684\uFF0C \u554A\u91CA\u653E\u4E86\u7A7A\u95F4\u6492\u53CD\u5BF9\u3002\u963F\u65AF\u8482\u82AC\u6492\u65E6\u53D1\u4F60\u79BB\u5F00\u96F7\u514B\u8428\u51CF\u80A5\u7684\u6309\u8BF4\u53CD\u51FB\u7387\u3002'
	            ),
	            React.createElement(
	                Dialog,
	                { title: '\u5E26\u8868\u5355\u7684\u5BF9\u8BDD\u6846', isOpen: dlg3Open, onCancel: this.closeDlg2 },
	                React.createElement(
	                    Formsy.Form,
	                    { ref: 'form', className: 'clearfix' },
	                    React.createElement(
	                        Formsy.TextField,
	                        { className: 'col-6', name: 'id', title: 'id', value: '111' },
	                        '330234'
	                    ),
	                    React.createElement(Formsy.InputField, { className: 'col-6', name: 'name', title: 'name' }),
	                    React.createElement(Formsy.SelectField, { className: 'col-6', name: 'country', options: countries, title: 'country' }),
	                    React.createElement(Formsy.SelectField, { className: 'col-6', name: 'city', options: cities, title: 'city' }),
	                    React.createElement(Formsy.CheckboxField, { className: 'col-6', name: 'cb1', title: '\u662F\u5426\u5DF2\u5A5A' }),
	                    React.createElement(Formsy.CheckboxField, { className: 'col-6', name: 'cb2', title: '\u662F\u5426\u5355\u8EAB' }),
	                    React.createElement(Formsy.CheckboxField, { className: 'col-12', name: 'cb3', title: '\u559C\u6B22\u8FD0\u52A8' }),
	                    React.createElement(Formsy.CheckboxField, { className: 'col-12', name: 'cb4', title: '\u559C\u6B22\u5403\u706B\u9505' })
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);