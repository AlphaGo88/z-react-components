webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Form = __webpack_require__(12);
	var Input = Form.InputField;
	var RadioGroup = Form.RadioGroupField;
	var CheckboxGroup = Form.CheckboxGroupField;
	var DateField = Form.DateField;

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
	    render: function render() {
	        var _props = this.props;
	        var countries = _props.countries;
	        var fruits = _props.fruits;

	        return React.createElement(
	            Form,
	            { style: { width: 600 }, onValidSubmit: this.submit, onValid: this.enableButton, onInvalid: this.disableButton },
	            React.createElement(Input, { className: 'col-6', name: 'name', title: 'name', required: true }),
	            React.createElement(DateField, { className: 'col-6', name: 'birth', title: 'birth', selectTime: true, required: true }),
	            React.createElement(RadioGroup, { className: 'col-6', name: 'country', items: countries, required: true }),
	            React.createElement(CheckboxGroup, { className: 'col-6', name: 'fruit', items: fruits, required: true }),
	            React.createElement(
	                'button',
	                { className: 'btn-float btn-primary', disabled: !this.state.canSubmit },
	                'Submit'
	            )
	        );
	    }
	});

	ReactDOM.render(React.createElement(MyAppForm, null), document.getElementById('App'));

/***/ }
]);