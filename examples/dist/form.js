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
	    Button = _zui.Button,
	    Formsy = _zui.Formsy;

	var TextField = Formsy.TextField;
	var Input = Formsy.InputField;
	var Select = Formsy.SelectField;
	var RadioGroup = Formsy.RadioGroupField;
	var CheckboxGroup = Formsy.CheckboxGroupField;
	var Checkbox = Formsy.CheckboxField;
	var Date = Formsy.DateField;
	var TextArea = Formsy.TextAreaField;

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
	            cities: {
	                china: [{
	                    value: 'bj',
	                    text: '北京'
	                }, {
	                    value: 'sh',
	                    text: '上海'
	                }],
	                usa: [{
	                    value: 'dc',
	                    text: '华盛顿'
	                }, {
	                    value: 'ny',
	                    text: '纽约'
	                }]
	            },
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
	            country: 'china',
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
	    countryChange: function countryChange(value) {
	        this.setState({
	            country: value
	        });
	        this.refs.citySelect.setValue('');
	    },
	    render: function render() {
	        var _props = this.props,
	            countries = _props.countries,
	            cities = _props.cities,
	            fruits = _props.fruits;
	        var country = this.state.country;

	        return React.createElement(
	            'div',
	            { style: { padding: 20 } },
	            React.createElement(
	                Formsy.Form,
	                { style: { width: 400 }, onValidSubmit: this.submit, onValid: this.enableButton, onInvalid: this.disableButton },
	                React.createElement(
	                    TextField,
	                    { className: 'col-6', name: 'id', title: 'id', value: '111' },
	                    '330234'
	                ),
	                React.createElement(Input, { className: 'col-6', name: 'name', title: 'name' }),
	                React.createElement(Date, { className: 'col-6', name: 'birth', title: 'birth' }),
	                React.createElement(Date, { className: 'col-6', name: 'birth', title: 'graduate', selectTime: true }),
	                React.createElement(Checkbox, { className: 'col-6', name: 'cb1', title: '\u662F\u5426\u5DF2\u5A5A' }),
	                React.createElement(Checkbox, { className: 'col-6', name: 'cb2', title: '\u662F\u5426\u5355\u8EAB' }),
	                React.createElement(Select, { className: 'col-6', name: 'select1', options: countries, title: 'country', onChange: this.countryChange, required: true }),
	                React.createElement(Select, { ref: 'citySelect', className: 'col-6', name: 'select2', options: cities[country], title: 'city' }),
	                React.createElement(RadioGroup, { className: 'col-6', name: 'radio', items: countries }),
	                React.createElement(CheckboxGroup, { className: 'col-6', name: 'checkbox', items: fruits }),
	                React.createElement(TextArea, { className: 'col-6', name: 'ta' }),
	                React.createElement(
	                    'div',
	                    { className: 'form-group col-12' },
	                    React.createElement(
	                        Button,
	                        { primary: true, disabled: !this.state.canSubmit },
	                        'Submit'
	                    )
	                )
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(MyAppForm, null), document.getElementById('App'));

/***/ }
/******/ ]);