import React from "react";
import Filter from "./index";

export default class FrameFilter extends React.Component {
    constructor(options) {
        super(options);
    }

    render() {

        const filter = this.props.filter;

        let style = {
            width: filter.width || 0,
            height:filter.height || 0,
            top: filter.y || 0,
            left: filter.x || 0
        };
        let className = "b-filter_frame";

        if(filter.isActive(this.props.currentTime)) {
            className += " b-filter_frame--visible";
        }

        return (
            <div className={className} style={style}></div>
        );
    }

}