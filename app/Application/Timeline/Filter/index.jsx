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
            left: 0,
            width: 0
        };
        if(this.props.durationTime != 0) {
            position = {
                left: this.props.x * (this.props.filter.time / (this.props.durationTime)),
                width: this.props.x * (this.props.filter.duration / (this.props.durationTime))
            };
        }
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
                        onMouseDown={this.onChangeStartTime.bind(this)}>
                    </div>
                    <div
                        className="b-timeline_controls-duration_time"
                        onMouseDown={this.onChangeDurationTime.bind(this)}>
                    </div>

                </div>
            </div>
        );
    }

    onChangeStartTime(event) {
        this.props.flux.getActions("editVideo").mouseDown({
            id: this.props.id,
            action: "changeStartTime",
            offsetX: event.nativeEvent.offsetX,
            offsetY: event.nativeEvent.offsetY,
            filter: this.props.filter,
            x: this.props.x,
            durationTime: this.props.durationTime
        });
    }

    onChangeDurationTime(event) {
        this.props.flux.getActions("editVideo").mouseDown({
            id: this.props.id,
            action: "changeDurationTime",
            offsetX: event.nativeEvent.offsetX,
            offsetY: event.nativeEvent.offsetY,
            filter: this.props.filter,
            x: this.props.x,
            durationTime: this.props.durationTime,
            currentTime: this.props.currentTime
        });
    }

}