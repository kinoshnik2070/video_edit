import React from "react";
import Filter from "./index";

export default class FrameFilter extends React.Component {
    constructor(options) {
        super(options);
    }

    isActive() {
        if(this.props.currentTime >= this.props.time && this.props.currentTime < (this.props.time + this.props.duration)) {
            return true;
        }
        return false;
    }

    render() {
        let style = {
            width: this.props.width || 0,
            height:this.props.height || 0,
            top: this.props.y || 0,
            left: this.props.x || 0
        };
        let className = "b-filter_frame";
        if(this.isActive()) {
            className += " b-filter_frame--visible";
        }
        return (
            <div className={className} style={style}></div>
        );
    }

}