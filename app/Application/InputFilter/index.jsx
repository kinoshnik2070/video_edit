import React from "react";
import styles from "./style";

export default class InputFilter extends React.Component {

    componentWillMount() {
        this.setState({
            isValid: true,
            value: this.props.filters
        });
    }

    handleChange(event) {
        let value = event.target.value;
        let isValid = this.isValidJson(value);
        if(isValid) {
            this.props.flux.getActions("editVideo").setFilters(JSON.parse(value));
        }
        this.setState({
            isValid: isValid,
            value: value
        });
    }

    isValidJson(json) {
        try {
            JSON.parse(json);
            return true;
        } catch (e) {
            return false;
        }
    }

    render() {
        let className = "";
        if(!this.state.isValid) {
            className = "b-input_filter--error";
        }
        return (
            <div className="l-input_filter">
                <div className="b-input_filter_container">
                    <textarea
                        className={className}
                        value={JSON.stringify(this.props.filters)}
                        onChange={this.handleChange.bind(this)}>
                    </textarea>
                </div>
            </div>
        );
    }

}