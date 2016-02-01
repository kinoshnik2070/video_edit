import React from "react";
import Filter from "./Filter";

export default class FrameFilter extends Filter{
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
            width: this.props.width,
            height:this.props.height,
            top: this.props.y,
            left: this.props.x
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