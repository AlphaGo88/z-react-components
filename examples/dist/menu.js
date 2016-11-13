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
	    Button = _zui.Button,
	    Menu = _zui.Menu,
	    DropdownMenu = _zui.DropdownMenu,
	    Divider = _zui.Divider;


	var App = React.createClass({
	    displayName: "App",
	    render: function render() {

	        var menu = React.createElement(
	            Menu,
	            null,
	            React.createElement(Menu.MenuItem, { value: "a", text: "Menu1" }),
	            React.createElement(Menu.MenuItem, { value: "b", text: "Menu2" }),
	            React.createElement(Menu.MenuItem, { value: "c", text: "Menu3", disabled: true })
	        );

	        return React.createElement(
	            "div",
	            null,
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    "h4",
	                    null,
	                    "Menu"
	                ),
	                React.createElement(
	                    Menu,
	                    { onSelect: function onSelect(value) {
	                            return alert(value);
	                        } },
	                    React.createElement(Menu.MenuItem, {
	                        value: "1",
	                        text: "Menu1",
	                        secondaryText: "Go",
	                        leftIcon: React.createElement("i", { className: "fa fa-envelope" })
	                    }),
	                    React.createElement(
	                        Menu.SubMenu,
	                        {
	                            value: "2",
	                            text: "Menu2",
	                            leftIcon: React.createElement("i", { className: "fa fa-bank" })
	                        },
	                        React.createElement(Menu.MenuItem, { text: "subMenu", value: "11" }),
	                        React.createElement(Menu.MenuItem, { text: "subMenu", value: "12" }),
	                        React.createElement(
	                            Menu.SubMenu,
	                            { text: "subMenu", value: "13" },
	                            React.createElement(Menu.MenuItem, { text: "subMenu", value: "21" }),
	                            React.createElement(Menu.MenuItem, { text: "subMenu", value: "22" })
	                        )
	                    ),
	                    React.createElement(Divider, null),
	                    React.createElement(Menu.MenuItem, {
	                        value: "3",
	                        text: "Menu3",
	                        disabled: true
	                    })
	                )
	            ),
	            React.createElement(
	                "section",
	                null,
	                React.createElement(
	                    "h4",
	                    null,
	                    "Dropdown Menu"
	                ),
	                React.createElement(
	                    DropdownMenu,
	                    { menu: menu },
	                    React.createElement(
	                        Button,
	                        { type: "float", primary: true },
	                        "\u4E0B\u62C9\u83DC\u5355"
	                    )
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);