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

	var _zui = zui,
	    Tabs = _zui.Tabs;


	var App = React.createClass({
	    displayName: "App",
	    getInitialState: function getInitialState() {
	        return {
	            activeTab: 'tab1'
	        };
	    },
	    handleTabChange: function handleTabChange(value) {
	        this.setState({ activeTab: value });
	    },
	    render: function render() {

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    Tabs,
	                    null,
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab1" },
	                        "jdsifojflsmfd"
	                    ),
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab2" },
	                        "\u4F60\u597D\u820D\u5F97\u79BB\u5F00\u623F\u95F4"
	                    ),
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab3" },
	                        "\u5973\u90CE\u7684\u5B50\u5973\u963F\u4F5Bi\u8FDD\u6CD5jo\u989D\u5916i\u4ED8\u91D1\u989D\u6211if"
	                    )
	                )
	            ),
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    Tabs,
	                    { value: this.state.activeTab, onChange: this.handleTabChange },
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab1", value: "tab1" },
	                        "jdsifojflsmfd"
	                    ),
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab2", value: "tab2" },
	                        "\u4F60\u597D\u820D\u5F97\u79BB\u5F00\u623F\u95F4"
	                    ),
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab3", value: "tab3", onActive: function onActive(value) {
	                                return alert(value);
	                            } },
	                        "\u5973\u90CE\u7684\u5B50\u5973\u963F\u4F5Bi\u8FDD\u6CD5jo\u989D\u5916i\u4ED8\u91D1\u989D\u6211if"
	                    )
	                )
	            ),
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    Tabs,
	                    { defaultActiveIndex: 1, tabStyle: { width: 200 } },
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab1" },
	                        "jdsifojflsmfd"
	                    ),
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab2" },
	                        "\u4F60\u597D\u820D\u5F97\u79BB\u5F00\u623F\u95F4"
	                    ),
	                    React.createElement(
	                        Tabs.Tab,
	                        { label: "tab3" },
	                        "\u5973\u90CE\u7684\u5B50\u5973\u963F\u4F5Bi\u8FDD\u6CD5jo\u989D\u5916i\u4ED8\u91D1\u989D\u6211if"
	                    )
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);