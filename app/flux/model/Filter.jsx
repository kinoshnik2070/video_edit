import React from "react";

export default class Filter extends React.Component{
    constructor(options) {
        super(options);
    }

    isActive(currentTime) {
        if(currentTime >= this.props.time && currentTime < (this.props.time + this.props.duration)) {
            return true;
        }
        return false;
    }

    render() {
        return (<div></div>);
    }
}