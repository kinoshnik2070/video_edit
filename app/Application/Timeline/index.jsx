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
        let filterStyle;
        for(let i = 0; i < this.props.filters.length; i++) {
            filter = this.props.filters[i];
            filterStyle = {
                left: width * (filter.time / (this.props.durationTime || 1)),
                width: width * (filter.duration / (this.props.durationTime || 1)),
                background: "orange",
                position: "relative",
                height: "20px"
            };
            filters.push(
                <div key={i} style={filterStyle}></div>
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