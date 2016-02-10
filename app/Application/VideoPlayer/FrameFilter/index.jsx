import React from "react";
import Filter from "./index";
import style from "./style";

export default class FrameFilter extends React.Component {
    render() {

        const filter = this.props.filter;

        let style = {
            width: filter.width,
            height:filter.height,
            top: filter.y,
            left: filter.x
        };
        let className = "b-filter_frame";

        if(filter.isActive(this.props.currentTime)) {
            className += " b-filter_frame--visible";
        }

        return (
                <div className={className}
                     style={style}
                     onMouseDown={this.onMoveFrame.bind(this)}>
                    <div className="b-filter_frame_controls">
                        <div
                            className="b-filter_frame_control b-filter_frame_controls--right_bottom"
                            onMouseDown={this.onResizeFrame.bind(this)}>
                        </div>
                    </div>
                </div>
        );
    }

    onResizeFrame(event) {
        event.stopPropagation();
        this.props.flux.getActions("editVideo").mouseDown({
            id: this.props.id,
            action: "resizeFrame",
            offsetX: event.nativeEvent.offsetX,
            offsetY: event.nativeEvent.offsetY,
            filter: this.props.filter
        });
    }

    onMoveFrame(event) {
        this.props.flux.getActions("editVideo").mouseDown({
            id: this.props.id,
            action: "moveFrame",
            offsetX: event.nativeEvent.offsetX,
            offsetY: event.nativeEvent.offsetY,
            filter: this.props.filter
        });
    }
}