import React from "react";
import styles from "./style";
import Filter from "./Filter";

export default class Timeline extends React.Component {
    render() {
        let width = this.refs.element ? this.refs.element.offsetWidth : 0;
        let x = (this.props.currentTime / (this.props.durationTime || 1));
        let style = {
            width: x * width
        };

        let filters = [];
        for(let i = 0; i < this.props.filters.length; i++) {
            filters.push(
                <Filter
                    filter={this.props.filters[i]}
                    x={width}
                    key={i}
                    id={i}
                    currentTime={this.props.currentTime}
                    durationTime={this.props.durationTime}
                    flux={this.props.flux}
                    maxWidth={width}/>
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