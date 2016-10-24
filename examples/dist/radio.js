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
	var RadioGroup = _Z.RadioGroup;
	var CheckboxGroup = _Z.CheckboxGroup;


	var App = React.createClass({
	    displayName: 'App',


	    getInitialState: function getInitialState() {
	        return {
	            emp: '',
	            hobby: [],
	            emps: [{
	                value: 'emp1',
	                text: 'Jack'
	            }, {
	                value: 'emp2',
	                text: 'Steve'
	            }, {
	                value: 'emp3',
	                text: 'Jim'
	            }, {
	                value: 'emp4',
	                text: 'Michael'
	            }],
	            hobbies: [{
	                value: 'b',
	                text: '篮球'
	            }, {
	                value: 'f',
	                text: '足球'
	            }, {
	                value: 's',
	                text: '游泳'
	            }]
	        };
	    },

	    handleEmpChange: function handleEmpChange(value) {
	        this.setState({
	            emp: value
	        });
	        console.log(value);
	    },
	    handleHobbyChange: function handleHobbyChange(value) {
	        this.setState({
	            hobby: value
	        });
	        console.log(value);
	    },
	    render: function render() {
	        var _state = this.state;
	        var emps = _state.emps;
	        var emp = _state.emp;
	        var hobby = _state.hobby;
	        var hobbies = _state.hobbies;


	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(RadioGroup, { value: emp, items: emps, onChange: this.handleEmpChange })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(CheckboxGroup, { value: hobby, items: hobbies, onChange: this.handleHobbyChange })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(RadioGroup, { align: 'y', value: emp, items: emps, onChange: this.handleEmpChange })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(CheckboxGroup, { align: 'y', value: hobby, items: hobbies, onChange: this.handleHobbyChange })
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);