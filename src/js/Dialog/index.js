
const React = require('react');
const ReactDOM = require('react-dom');
const Dialog = require('./Dialog');

module.exports = React.createClass({

    appendDialogToDoc() {
        ReactDOM.unstable_renderSubtreeIntoContainer(
            this,
            <Dialog {...this.props}/>,
            this.layer
        );
    },

    componentDidMount() {
        this.layer = document.createElement('div');
        document.body.appendChild(this.layer);
        this.appendDialogToDoc();
    },

    componentDidUpdate() {
        this.appendDialogToDoc();
    },

    componentWillUnmount() {
        document.body.removeChild(this.layer)
    },

    render() {
        return null;
    }
    
});