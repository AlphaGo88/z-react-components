// Hidden Field
// ---------------------------

const React = require('react');
const Formsy = require('formsy-react');

const HiddenField = React.createClass({

    mixins: [Formsy.Mixin],

    componentDidMount() {
        this.setValue(this.props.value || '');
    },

    render() {
        return (
            <input 
                type="hidden"
                name={this.props.name}
                value={this.getValue()}
            />
        );
    }
});

module.exports = HiddenField;