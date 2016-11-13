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
	    Message = _zui.Message,
	    Notification = _zui.Notification;


	var App = React.createClass({
	    displayName: 'App',
	    msg1: function msg1() {
	        Message.msg('This is some message.');
	    },
	    msg2: function msg2() {
	        Message.info('This is a info message.');
	    },
	    msg3: function msg3() {
	        Message.success('This is a success message.');
	    },
	    msg4: function msg4() {
	        Message.warning('This is a warning message.');
	    },
	    msg5: function msg5() {
	        Message.error('This is an error message.');
	    },
	    notice1: function notice1() {
	        Notification.open({
	            title: 'notificatoin title',
	            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
	        });
	    },
	    notice2: function notice2() {
	        Notification.open({
	            type: 'info',
	            title: 'notificatoin title',
	            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
	        });
	    },
	    notice3: function notice3() {
	        Notification.open({
	            type: 'success',
	            title: 'notificatoin title',
	            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
	        });
	    },
	    notice4: function notice4() {
	        Notification.open({
	            type: 'warning',
	            title: 'notificatoin title',
	            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
	        });
	    },
	    notice5: function notice5() {
	        Notification.open({
	            type: 'error',
	            autoClose: false,
	            title: 'notificatoin title',
	            content: 'sioj ,sd,f lkjlsdf, s fsldkjfs df, fsld jfsldkf sd f,ljsdlkfsdf.'
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
	                    'Info message'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.msg3 },
	                    'Success message'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.msg4 },
	                    'Warning message'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.msg5 },
	                    'Error message'
	                )
	            ),
	            React.createElement('hr', null),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.notice1 },
	                    'Notification'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.notice2 },
	                    'Info Notification'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.notice3 },
	                    'Success Notification'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.notice4 },
	                    'Warning Notification'
	                )
	            ),
	            React.createElement(
	                'section',
	                null,
	                React.createElement(
	                    'a',
	                    { onClick: this.notice5 },
	                    'Error Notification'
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(App, null), document.getElementById('App'));

/***/ }
/******/ ]);