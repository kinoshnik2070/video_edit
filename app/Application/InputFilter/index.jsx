import React from "react";
import ReactDOM from "react-dom";
import styles from "./style";

export default class InputFilter extends React.Component {

    constructor() {
        super();
        this.state = {
            value: JSON.stringify([{time:2,duration:1,x:40,y:40,width:40,height:40}])
        };
    }

    handleChange(event) {
        let a = "";
        try {
            let a = JSON.parse(event.target.value)
        } catch(e){
            alert(e);
            return
        }
        this.setState({
            value: a
        });
    }

    render() {
        return (
            <textarea value={this.state.value} onChange={this.handleChange.bind(this)}></textarea>
        );
    }

}