import React from "react";
import Filter from "./index";
import style from "./style";

export default class FrameFilter extends React.Component {
    constructor(options) {
        super(options);
    }

    render() {

        const filter = this.props.filter;

        let style = {
            width: filter.width,
            height:filter.height,
            top: filter.y,
            left: filter.x
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