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
                        <FrameFilter key={i} filter={this.props.filters[i]} currentTime={this.props.currentTime} />
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
                    <div className="b-video_player_controls-container" style={style}>
                        <div className="b-video_player-overlay"></div>
                        <div className="b-video_player_controls">
                            <div className="b-video_player_controls-play">
                                <div className="b-video_player_controls-play_button" onClick={this.onPlay.bind(this)}>PLAY</div>
                            </div>
                        </div>
                    </div>
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
            </div>
        );
    }

    updateCurrentTime(event) {
        let el = event.target;
        for(let i = 0; i < this.props.filters.length; i++) {
            this.props.filters[i].update(el);
        }

        this.props.flux.getActions("editVideo").updateCurrentTime(el.currentTime);

        if(el.currentTime === el.duration) {
            this.setState({
                isPlay: false
            });
        }
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