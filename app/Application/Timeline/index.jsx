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
            <div ref="element" className="l-timeline"
                 onMouseMove={this.handleMouseMove.bind(this)}
                 onMouseUp={this.handleMouseUp.bind(this)}>
                <div className="b-timeline">
                    {filters}
                    <div className="b-timeline_progress" style={style}></div>
                </div>
            </div>
        );
    }

    handleMouseMove(event) {
        if(this.props.md) {
            let x = (event.nativeEvent.pageX - this.refs.element.offsetLeft) || 1;
            switch(this.props.md.action) {
                case "changeStartTime":
                    let time = ((this.props.md.durationTime * (x- this.props.md.offsetX)) / this.props.md.x);
                    let timeDx = this.props.md.filter.duration + this.props.md.filter.time - time;
                    this.props.flux.getActions("editVideo").setPositionFrame(this.props.md.id, {time: time, duration: timeDx});
                    break;
                case "changeDurationTime":
                    let duration = ((this.props.md.durationTime * (x+this.props.md.offsetX)) / this.props.md.x) - this.props.md.filter.time;
                    this.props.flux.getActions("editVideo").setPositionFrame(this.props.md.id, {duration: duration});
            }
        }
        event.stopPropagation();
        event.preventDefault();
    }

    handleMouseUp(event) {
        this.props.flux.getActions("editVideo").clearMd();
    }

}