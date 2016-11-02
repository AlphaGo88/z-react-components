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

	"use strict";

	var _Z = Z,
	    Button = _Z.Button;


	var App = React.createClass({
	    displayName: "App",
	    handleClick: function handleClick(event) {
	        alert('clicked!');
	    },
	    render: function render() {

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    "h4",
	                    null,
	                    "Button Size"
	                ),
	                React.createElement(
	                    Button,
	                    { size: "small", primary: true },
	                    "small"
	                ),
	                "\xA0\xA0",
	                React.createElement(
	                    Button,
	                    { size: "medium", primary: true },
	                    "medium"
	                ),
	                "\xA0\xA0",
	                React.createElement(
	                    Button,
	                    { size: "large", primary: true },
	                    "large"
	                )
	            ),
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    "h4",
	                    null,
	                    "Float Button"
	                ),
	                React.createElement(
	                    Button,
	                    null,
	                    "default"
	                ),
	                "\xA0\xA0",
	                React.createElement(
	                    Button,
	                    { primary: true, focus: true },
	                    "primary"
	                ),
	                "\xA0\xA0",
	                React.createElement(
	                    Button,
	                    { disabled: true },
	                    "disabled"
	                ),
	                "\xA0\xA0"
	            ),
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    "h4",
	                    null,
	                    "Flat Button"
	                ),
	                React.createElement(
	                    Button,
	                    { type: "flat", focus: true, onClick: this.handleClick },
	                    "default"
	                ),
	                "\xA0\xA0",
	                React.createElement(
	                    Button,
	                    { type: "flat", primary: true },
	                    "primary"
	                ),
	                "\xA0\xA0",
	                React.createElement(
	                    Button,
	                    { type: "flat", disabled: true },
	                    "disabled"
	                ),
	                "\xA0\xA0"
	            ),
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    "h4",
	                    null,
	                    "Link Button"
	                ),
	                React.createElement(
	                    Button,
	                    { type: "flat", link: "https://github.com/" },
	                    "Github"
	                ),
	                "\xA0\xA0"
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);