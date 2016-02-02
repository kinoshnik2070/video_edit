import React from "react";
import ReactDOM from "react-dom";
import styles from "./style";

export default class Timeline extends React.Component {
    render() {
        let width = this.refs.element ? this.refs.element.offsetWidth : 0;
        let x = (this.props.currentTime / (this.props.durationTime || 1));
        let style = {
            width: x * width
        };

        let filters = [];
        let filter;
        let position;
        let className = "";
        for(let i = 0; i < this.props.filters.length; i++) {
            filter = this.props.filters[i];
            position = {
                left: width * (filter.time / (this.props.durationTime || 1)),
                width: width * (filter.duration / (this.props.durationTime || 1))
            };
            className = "b-timeline_filter";
            className += " b-timeline_filter--" + filter.constructor.name;
            filters.push(
                <div className={className} key={i} style={position}></div>
            );
        }

        return (
            <div ref="element" className="l-timeline">
                <div className="b-timeline">
                    {filters}
                    <div className="b-timeline_progress" style={style}></div>
                </div>
            </div>
        );
    }

}