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
	var Form = _Z.Form;

	var Input = Form.InputField;
	var Select = Form.SelectField;
	var RadioGroup = Form.RadioGroupField;
	var CheckboxGroup = Form.CheckboxGroupField;
	var Date = Form.DateField;
	var TextArea = Form.TextAreaField;

	var MyAppForm = React.createClass({
	    displayName: 'MyAppForm',
	    getDefaultProps: function getDefaultProps() {
	        return {
	            countries: [{
	                value: 'usa',
	                text: '美国'
	            }, {
	                value: 'china',
	                text: '中国'
	            }],
	            fruits: [{
	                value: 'apple',
	                text: 'apple'
	            }, {
	                value: 'banana',
	                text: 'banana'
	            }]
	        };
	    },
	    getInitialState: function getInitialState() {
	        return {
	            a: '123',
	            canSubmit: false
	        };
	    },
	    enableButton: function enableButton() {
	        this.setState({
	            canSubmit: true
	        });
	    },
	    disableButton: function disableButton() {
	        this.setState({
	            canSubmit: false
	        });
	    },
	    submit: function submit(model) {
	        console.log(model);
	    },
	    changeValue: function changeValue() {
	        this.setState({
	            a: 'dsfsdfsdf'
	        });
	    },
	    render: function render() {
	        var _props = this.props;
	        var countries = _props.countries;
	        var fruits = _props.fruits;

	        return React.createElement(
	            Form,
	            { style: { width: 400 }, onValidSubmit: this.submit, onValid: this.enableButton, onInvalid: this.disableButton },
	            React.createElement(Input, { className: 'col-6', name: 'name', title: 'name', defaultValue: this.state.a }),
	            React.createElement(Date, { className: 'col-6', name: 'birth', title: 'birth', selectTime: true, defaultValue: '2015-06-03',
	                disableDates: function disableDates(date) {
	                    return date.getDay() === 5;
	                }
	            }),
	            React.createElement(Select, { className: 'col-6', name: 'select1', data: countries, title: 'aabv', multi: true }),
	            React.createElement(Input, { className: 'col-6', name: 'input_iosdjf', title: 'iosdjf', validations: 'isUrl', validationError: '\u8BF7\u8F93\u5165\u5408\u6CD5\u7684URL' }),
	            React.createElement(RadioGroup, { className: 'col-6', name: 'radio', items: countries, defaultValue: 'usa', required: true }),
	            React.createElement(CheckboxGroup, { className: 'col-6', name: 'checkbox', items: fruits, required: true }),
	            React.createElement(TextArea, { className: 'col-6', name: 'ta', defaultValue: 'sdf' }),
	            React.createElement(
	                'div',
	                { className: 'form-group col-12' },
	                React.createElement(
	                    'button',
	                    { className: 'btn-float btn-primary', disabled: !this.state.canSubmit },
	                    'Submit'
	                ),
	                React.createElement(
	                    'span',
	                    { className: 'btn-float btn-default', onClick: this.changeValue },
	                    'ChangeValue'
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(MyAppForm, null), document.getElementById('App'));

/***/ }
/******/ ]);