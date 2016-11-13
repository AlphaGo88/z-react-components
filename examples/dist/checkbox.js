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
	    Checkbox = _zui.Checkbox,
	    CheckboxGroup = _zui.CheckboxGroup;

	var fruits = [{
	    value: 'apple',
	    text: 'apple'
	}, {
	    value: 'banana',
	    text: 'banana'
	}, {
	    value: 'orange',
	    text: 'orange'
	}];
	var sports = [{
	    value: 'football',
	    text: 'football'
	}, {
	    value: 'swimming',
	    text: 'swimming'
	}, {
	    value: 'tennis',
	    text: 'tennis'
	}];

	var App = React.createClass({
	    displayName: 'App',
	    handleChange: function handleChange(value) {
	        alert(JSON.stringify(value));
	    },
	    render: function render() {
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h4',
	                    null,
	                    'Checkbox'
	                ),
	                React.createElement(Checkbox, { label: 'checkbox', defaultChecked: true })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h4',
	                    null,
	                    'Disabled Checkbox'
	                ),
	                React.createElement(Checkbox, { label: 'Disabled checkbox', disabled: true, defaultChecked: true })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h4',
	                    null,
	                    'Controlled Checkbox'
	                ),
	                React.createElement(Checkbox, { label: 'controlled checkbox', checked: true })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h4',
	                    null,
	                    'CheckboxGroup'
	                ),
	                React.createElement(CheckboxGroup, { items: fruits, onChange: this.handleChange })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h4',
	                    null,
	                    'Verticall CheckboxGroup'
	                ),
	                React.createElement(CheckboxGroup, { align: 'y', items: sports })
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);