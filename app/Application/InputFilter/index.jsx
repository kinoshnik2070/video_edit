import React from "react";
import styles from "./style";

export default class InputFilter extends React.Component {
    handleChange(event) {
        let value = event.target.value;
        this.setState({
            value: value
        });
        this.props.flux.getActions("editVideo").setFilters(JSON.parse(value));
    }

    componentWillMount() {
        let testValue = [{
            "time":2,
            "duration":1,
            "x":40,
            "y":40,
            "width":40,
            "height":40,
            "type": "1"
        }, {
            "time": 5,
            "duration": 5,
            "type": "0"
        }];
        this.state = {
            value: JSON.stringify(testValue)
        };
        this.props.flux.getActions("editVideo").setFilters(testValue);
    }

    render() {
        return (
            <div className="l-input_filter">
                <div className="b-input_filter_container">
                    <textarea  value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
                </div>
            </div>
        );
    }

}