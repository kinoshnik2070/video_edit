import React from "react";
import styles from "./style";
import video from "./video2.mp4";
import FrameFilter from "./FrameFilter";
import FilterType from "../../flux/enums/FilterType";

export default class VideoPlayer extends React.Component {

    constructor() {
        super();

        this.state = {
          isPlay: false
        };
    }

    render() {
        let filter = [];
        for(let i = 0; i < this.props.filters.length; i++) {
            switch (this.props.filters[i].type) {
                case FilterType.FrameFilter:
                    filter.push(
                        <FrameFilter
                            key={i}
                            filter={this.props.filters[i]}
                            currentTime={this.props.currentTime}
                            flux={this.props.flux}
                            id={i}/>
                    );
                    break
            }
        }
        let style = {};
        if(this.state.isPlay) {
            style.display = "none";
        }

        return (
            <div className="l-video_player">
                <div className="b-video_player_container">
                    {filter}
                    <video
                        className="b-video_player"
                        onTimeUpdate={this.updateCurrentTime.bind(this)}
                        onDurationChange={this.updateDurationTime.bind(this)}
                        ref="video"
                        onClick={this.onStop.bind(this)}>
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
                <button onClick={this.onPlay.bind(this)}>Start</button>
                <button onClick={this.onStop.bind(this)}>Stop</button>
            </div>
        );
    }

    updateCurrentTime(event) {
        let el = event.target;

        for(let i = 0; i < this.props.filters.length; i++) {
            this.props.filters[i].update(el);
        }

        if(el.currentTime === el.duration) {
            this.setState({
                isPlay: false
            });
        }

        this.props.flux.getActions("editVideo").updateCurrentTime(el.currentTime);
    }

    updateDurationTime(event) {
        this.props.flux.getActions("editVideo").updateDurationTime(event.target.duration);
    }

    onPlay(event) {
        this.refs.video.play();
        this.setState({
            isPlay: true
        });
        event.stopPropagation();
    }

    onStop(event) {
        this.refs.video.pause();
        this.setState({
            isPlay: false
        });
        event.stopPropagation();
    }
}