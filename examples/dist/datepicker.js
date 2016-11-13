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

	var _zui = zui,
	    DatePicker = _zui.DatePicker;


	var App = React.createClass({
	    displayName: 'App',
	    getInitialState: function getInitialState() {
	        return {
	            date: '2016-06-06'
	        };
	    },
	    handleChange: function handleChange(dateStr) {
	        this.setState({
	            date: dateStr
	        });
	    },
	    handleClick: function handleClick() {
	        var today = new Date();
	        this.setState({
	            date: today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
	        });
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Date Picker'
	                ),
	                React.createElement(DatePicker, null)
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Controlled Date Picker'
	                ),
	                React.createElement(DatePicker, { value: this.state.date, onChange: this.handleChange }),
	                React.createElement(
	                    'button',
	                    { style: { marginLeft: 20 }, onClick: this.handleClick },
	                    '\u73B0\u5728'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Date Picker with particular dates disabled'
	                ),
	                React.createElement(DatePicker, {
	                    disableDates: function disableDates(date) {
	                        return date.getDay() === 4;
	                    }
	                })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Date Picker with time selection'
	                ),
	                React.createElement(DatePicker, {
	                    selectTime: true
	                })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Disabled Date Picker'
	                ),
	                React.createElement(DatePicker, {
	                    disabled: true
	                })
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);