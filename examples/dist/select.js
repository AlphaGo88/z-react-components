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

	var _Z = Z;
	var Select = _Z.Select;


	var App = React.createClass({
	    displayName: 'App',


	    getInitialState: function getInitialState() {
	        return {
	            emp: [],
	            emps: [{
	                value: '1',
	                text: 'Jack'
	            }, {
	                value: '2',
	                text: 'Steve'
	            }, {
	                value: '3',
	                text: 'Jim'
	            }, {
	                value: '4',
	                text: 'Michael'
	            }, {
	                value: '5',
	                text: 'Adf',
	                disabled: true
	            }, {
	                value: '6',
	                text: 'Gdfd'
	            }, {
	                value: '7',
	                text: 'Hfgf'
	            }, {
	                value: '8',
	                text: 'Ygdf'
	            }, {
	                value: '9',
	                text: 'Adhghf'
	            }, {
	                value: '10',
	                text: 'Gdtr43fd'
	            }, {
	                value: '11',
	                text: 'mhj6'
	            }, {
	                value: '12',
	                text: 'R3re'
	            }]
	        };
	    },

	    changeEmp: function changeEmp(value) {
	        this.setState({
	            emp: value
	        });
	    },
	    render: function render() {
	        var _state = this.state;
	        var emps = _state.emps;
	        var emp = _state.emp;


	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(Select, {
	                    multi: true,
	                    data: emps,
	                    value: emp,
	                    onChange: this.changeEmp
	                })
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);