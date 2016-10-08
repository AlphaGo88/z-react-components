// RadioGroup Field
// ---------------------------

const classNames = require('classnames');
const Formsy = require('formsy-react');

const RadioGroupField = React.createClass({
    mixins: [Formsy.Mixin],

    componentDidMount() {
        const value = this.props.value;
        this.setValue(value);
        this.setState({ value });
    },

    changeValue(value) {
        this.setValue(value);
        this.setState({ value });
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
                        <label key={i} className="radio">
                            <input
                                type="radio"
                                name={name}
                                value={item.value}
                                onChange={this.changeValue.bind(this, item.value)}
                                checked={this.state.value === item.value}
                            />
                            <span>{item.text}</span>
                        </label>
                    ))
                }
                </div>
            </div>
        );
    }

});

module.exports = RadioGroupField;