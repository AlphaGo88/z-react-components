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
	    Select = _zui.Select;


	var App = React.createClass({
	    displayName: 'App',


	    getInitialState: function getInitialState() {
	        return {
	            fruit: '',
	            fruits: [{
	                value: 1,
	                text: 'apple'
	            }, {
	                value: 2,
	                text: 'orange'
	            }, {
	                value: 3,
	                text: 'banana'
	            }],
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
	    changeFruit: function changeFruit(value) {
	        this.setState({
	            fruit: value
	        });
	    },
	    render: function render() {
	        var _state = this.state,
	            emps = _state.emps,
	            emp = _state.emp,
	            fruits = _state.fruits,
	            fruit = _state.fruit;


	        return React.createElement(
	            'div',
	            null,
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Select'
	                ),
	                React.createElement(Select, { options: fruits, value: fruit, onChange: this.changeFruit })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Select with default Value'
	                ),
	                React.createElement(Select, { defaultValue: 2, options: fruits })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Multi Select'
	                ),
	                React.createElement(Select, { multi: true, style: { width: 300 }, options: emps })
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'h5',
	                    null,
	                    'Disabled'
	                ),
	                React.createElement(Select, { disabled: true, options: fruits })
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);