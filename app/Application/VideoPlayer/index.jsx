import React from "react";
import styles from "./style";
import video from "./video2.mp4";
import FrameFilter from "../Filter";

export default class VideoPlayer extends React.Component {
    render() {
        let filter = [];
        for(let i = 0; i < this.props.filters.length; i++) {
            filter.push(
                <FrameFilter key={i} filter={this.props.filters[i]} currentTime={this.props.currentTime} />
            );
        }
        return (
            <div className="b-video_player_container">
                {filter}
                <video
                    className="b-video_player"
                    onTimeUpdate={this.updateCurrentTime.bind(this)}
                    onDurationChange={this.updateDurationTime.bind(this)}
                    onLoadedData={this.abc}>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        );
    }

    updateCurrentTime(event) {
        this.props.flux.getActions("editVideo").updateCurrentTime(event.target.currentTime);
        for(let i = 0; i < this.props.filters.length; i++) {
            this.props.filters[i].update(event.target);
        }
    }

    updateDurationTime(event) {
        this.props.flux.getActions("editVideo").updateDurationTime(event.target.duration);
    }

    abc(event) {
        event.target.play();
    }
}