// CheckboxGroup Field
// ---------------------------

const classNames = require('classnames');
const Formsy = require('formsy-react');

const CheckboxGroupField = React.createClass({
    mixins: [Formsy.Mixin],

    getInitialState() {
        return { value: [] };
    },

    componentDidMount() {
        const value = this.props.value || [];
        this.setValue(value);
        this.setState({ value });
    },

    changeValue(value, event) {
        const checked = event.currentTarget.checked;

        let newValue = [];
        if (checked) {
            newValue = this.state.value.concat(value);
        } else {
            newValue = this.state.value.filter(it => it !== value);
        }

        this.setValue(newValue);
        this.setState({ value: newValue });
    },

    render() {
        const { name, title, items } = this.props;

        return (
            <div className={`form-group ${this.props.className}`}>
                {title && 
                    <label className="form-label">{title}</label>
                }
                <div className="form-control">
                    {items.map((item, i) => (
                        <label key={i} className="checkbox">
                            <input
                                type="checkbox"
                                name={name}
                                value={item.value}
                                onChange={this.changeValue.bind(this, item.value)}
                                checked={this.state.value.indexOf(item.value) > -1}
                            />
                            <span>{item.text}</span>
                        </label>
                    ))}
                </div>
            </div>
        );
    }

});

module.exports = CheckboxGroupField;