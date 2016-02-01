import React from "react";
import styles from "./style";
import bg from "./video1.mp4";
import FrameFilter from "../Filter";


export default class VideoPlayer extends React.Component {
    render() {
        let filter = [];
        for(let i = 0; i < this.props.filters.length; i++) {
            filter.push(
                <FrameFilter key={i} {...this.props.filters[i]} currentTime={this.props.currentTime} />
            );
        }
        return (
            <div className="b-video_player_container">
                {filter}
                <video
                    className="b-video_player"
                    autoPlay="autoPlay"
                    onTimeUpdate={this.updateCurrentTime.bind(this)}
                    onDurationChange={this.updateDurationTime.bind(this)}>
                    <source src={bg} type="video/mp4" />
                </video>
            </div>
        );
    }

    updateCurrentTime(event) {
        let dictionary = {
            "ClipFilter": 0,
            "FrameFilter": 1
        };
        let filter;
        for(let i = 0; i < this.props.filters.length; i++) {
            filter = this.props.filters[i];
            switch(filter.type) {
                case dictionary.ClipFilter:
                    let isActive = (event.target.currentTime >= filter.time && event.target.currentTime < (filter.time + filter.duration));
                    if(isActive) {
                        event.target.currentTime = filter.time + filter.duration;
                    }
                    break;
                case dictionary.FrameFilter:
                    break;
            }
        }

        this.props.flux.getActions("editVideo").updateCurrentTime(event.target.currentTime);
    }

    updateDurationTime(event) {
        this.props.flux.getActions("editVideo").updateDurationTime(event.target.duration);
    }
}