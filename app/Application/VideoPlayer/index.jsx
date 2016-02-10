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

    componentDidMount() {

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

        return (
            <div
                className="l-video_player"
                onMouseMove={this.handleMouseMove.bind(this)}
                onMouseUp={this.handleMouseUp.bind(this)}
                onProgress={this.handleProgress.bind(this)}
                ref="a">
                <div className="b-video_player_container">
                    <div>{filter}</div>
                    <video
                        className="b-video_player"
                        onTimeUpdate={this.updateCurrentTime.bind(this)}
                        onDurationChange={this.updateDurationTime.bind(this)}
                        onCanPlay={this.handleOnCayPlay.bind(this)}
                        ref="video">
                        <source src={video} type="video/mp4" />
                    </video>
                    <canvas ref="canvas" className="canvas"></canvas>
                    <canvas ref="buffer_canvas" className="canvas_buffer"></canvas>
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

    handleMouseMove(event) {
        if(this.props.md) {
            let x = event.nativeEvent.pageX - this.refs.a.offsetLeft;
            let y = event.nativeEvent.pageY - this.refs.a.offsetTop;
            let filter = this.props.md.filter;
            let offsetWidth = this.refs.video.offsetWidth;
            let offsetHeight = this.refs.video.offsetHeight;
            switch(this.props.md.action) {
                case "resizeFrame":
                    let width = x - filter.x;
                    let height = y - filter.y;
                    if((filter.x + width) >= offsetWidth) {
                        width = Math.abs(offsetWidth - filter.x);
                    }
                    if((filter.y + height) >= offsetHeight) {
                        height = Math.abs(offsetHeight - filter.y);
                    }
                    this.props.flux.getActions("editVideo").setPositionFrame(this.props.md.id, {
                        width: width,
                        height: height
                    });
                    break;
                case "moveFrame":
                    x = x - this.props.md.offsetX;
                    y = y - this.props.md.offsetY;
                    x = x < 0 ? 0 : x;
                    y = y < 0 ? 0 : y;
                    x = ((x + filter.width) > offsetWidth) ? offsetWidth - filter.width : x;
                    y = ((y + filter.height) > offsetHeight) ? offsetHeight - filter.height : y;
                    this.props.flux.getActions("editVideo").setPositionFrame(this.props.md.id, {
                        x: x,
                        y: y
                    });
                    break;
            }
        }
        event.stopPropagation();
        event.preventDefault();
    }

    handleMouseUp(event) {
        this.props.flux.getActions("editVideo").clearMd();
    }

    handleProgress(event) {
        var range = 0;
        var bf = event.target.buffered;
        var time = event.target.currentTime;

        if(event.target.readyState) {
           /* console.info(parseInt(((event.target.buffered.end(0) /
            event.target.duration) * 100)))*/
        }
    }

    handleOnCayPlay(event) {
        let ctx = this.refs.canvas.getContext("2d");
        let ctx_buffer = this.refs.buffer_canvas.getContext("2d");
        let self = this.refs.video;
        let a = this;
        this.refs.canvas.width = this.refs.video.offsetWidth;
        this.refs.canvas.height = this.refs.video.offsetHeight;

        this.refs.buffer_canvas.width = this.refs.video.offsetWidth;
        this.refs.buffer_canvas.height = this.refs.video.offsetHeight;

        (function loop() {
            ctx_buffer.drawImage(self, 0, 0, self.offsetWidth, self.offsetHeight);
            let frame = ctx_buffer.getImageData(0, 0, self.offsetWidth, self.offsetHeight);
            let l = frame.data.length / 4;

            for(let i = 0; i < l; i++) {
                frame.data[i * 4 + 0] = 255 - frame.data[i * 4 + 0];
                frame.data[i * 4 + 1] = 255 - frame.data[i * 4 + 1];
                frame.data[i * 4 + 2] = 255 - frame.data[i * 4 + 2];
            }
            ctx.putImageData(frame, 0, 0);
            setTimeout(loop, 1000 / 30); // drawing at 30fps
        })();
    }
}