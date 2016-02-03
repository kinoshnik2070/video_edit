import React from "react";
import styles from "./style";
import FilterType from "../../../flux/enums/FilterType";

export default class Filter extends React.Component {

    constructor() {
        super();

        this.state = {
            isCurrentTime: false,
            isDuration: false
        };
    }

    render() {
        let position = {
            left: this.props.x * (this.props.filter.time / (this.props.durationTime || 1)),
            width: this.props.x * (this.props.filter.duration / (this.props.durationTime || 1))
        };

        let key;
        for(key in FilterType) {
            if(FilterType[key] == this.props.filter.type) {
                break;
            }
        }
        let className = "b-timeline_filter";
        className += " b-timeline_filter--" + key;
        return (
            <div className={className} style={position}>
                <div className="b-timeline_controls">
                    <div
                        className="b-timeline_controls-start_time"
                        onMouseDown={this.handleMouseDown.bind(this)}
                        onMouseMove={this.handleMouseMove.bind(this)}
                        onMouseUp={this.handleMouseUp.bind(this)}
                        onMouseOut={this.handleMouseOut.bind(this)}>
                    </div>
                    <div
                        className="b-timeline_controls-duration_time"
                        onMouseDown={this.handleMouseDown.bind(this)}
                        onMouseMove={this.handleMouseMove.bind(this)}
                        onMouseUp={this.handleMouseUp.bind(this)}
                        onMouseOut={this.handleMouseOut.bind(this)}
                    ></div>

                </div>
            </div>
        );
    }

    handleMouseMove(event) {
        if(this.state.isCurrentTime) {
            let time = ((this.props.durationTime * (event.nativeEvent.offsetX - this.state.offsetX)) / this.props.x) + this.props.filter.time;
            let duration = this.props.filter.duration - ((this.props.durationTime * (event.nativeEvent.offsetX - this.state.offsetX)) / this.props.x);
            this.props.flux.getActions("editVideo").setPositionFrame(this.props.id, {time: time, duration: duration});
        } else if(this.state.isDuration) {
            let duration = ((this.props.durationTime * (event.nativeEvent.offsetX - this.state.offsetX)) / this.props.x) + this.props.filter.duration;
            this.props.flux.getActions("editVideo").setPositionFrame(this.props.id, {duration: duration});
        }
    }

    handleMouseDown(event) {
        switch(event.target.className) {
            case "b-timeline_controls-start_time":
                this.setState({
                    isCurrentTime: true,
                    offsetX: event.nativeEvent.offsetX,
                    offsetY: event.nativeEvent.offsetY
                });
            break;
            case "b-timeline_controls-duration_time":
                this.setState({
                    isDuration: true,
                    offsetX: event.nativeEvent.offsetX,
                    offsetY: event.nativeEvent.offsetY
                });
            break;

        }
    }

    handleMouseUp(event) {
        this.setState({
            isCurrentTime: false,
            isDuration: false
        });
    }

    handleMouseOut(event) {
        this.setState({
            isCurrentTime: false,
            isDuration: false
        });
    }

}