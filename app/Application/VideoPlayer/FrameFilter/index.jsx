import React from "react";
import Filter from "./index";
import style from "./style";

export default class FrameFilter extends React.Component {
    constructor(options) {
        super(options);

        this.state = {
          isClick: false
        };
    }

    handleOnDragStart(event) {
        debugger
    }

    handleOnDagOver(event) {
        console.info(arguments);
    }

    handleOnDragEnd(event) {

    }

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
            <div
                className="b-filter_frame_container">
                <div className={className} style={style}>
                    <div className="b-filter_frame_controls">
                        <div
                            className="b-filter_frame_control b-filter_frame_controls--left_top"
                            onDragStart={this.handleOnDragStart.bind(this)}
                            onDragOver={this.handleOnDagOver.bind(this)}
                            onDragEnd={this.handleOnDragEnd.bind(this)}>
                        </div>
                        <div
                            className="b-filter_frame_control b-filter_frame_controls--right_top"
                            onDragStart={this.handleOnDragStart.bind(this)}
                            onDragOver={this.handleOnDagOver.bind(this)}
                            onDragEnd={this.handleOnDragEnd.bind(this)}>
                        </div>
                        <div
                            className="b-filter_frame_control b-filter_frame_controls--right_bottom"
                            onDragStart={this.handleOnDragStart.bind(this)}
                            onDragOver={this.handleOnDagOver.bind(this)}
                            onDragEnd={this.handleOnDragEnd.bind(this)}>
                        </div>
                        <div
                            className="b-filter_frame_control b-filter_frame_controls--left_bottom"
                            onDragStart={this.handleOnDragStart.bind(this)}
                            onDragOver={this.handleOnDagOver.bind(this)}
                            onDragEnd={this.handleOnDragEnd.bind(this)}>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}