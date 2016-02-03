import React from "react";
import Filter from "./index";
import style from "./style";

export default class FrameFilter extends React.Component {
    constructor(options) {
        super(options);

        this.state = {
            dragStartX: 0,
            dragStartY: 0,
            isMove: false,
            isResize: false
        };
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
            <div ref="b" className="b-filter_frame_container" >
                <div ref="a" className={className} style={style} onMouseDown={this.handleMouseDown.bind(this)} onMouseOut={this.handleMouseOut.bind(this)} onMouseMove={this.handleMouseMove.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}>
                    <div className="b-filter_frame_controls">
                        <div
                            className="b-filter_frame_control b-filter_frame_controls--right_bottom">
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleMouseMove(event) {
        if(this.state.isMove) {
            //TODO: Поправить выход за пределы экрана
            let x = Math.abs(parseInt(this.props.filter.x) + event.nativeEvent.offsetX - this.state.offsetX);
            let y = Math.abs(parseInt(this.props.filter.y) + event.nativeEvent.offsetY - this.state.offsetY);
            this.props.flux.getActions("editVideo").setPositionFrame(this.props.id, {x: x, y: y});
        } else if(this.state.isResize) {
            let width = this.props.filter.width + (event.nativeEvent.offsetX - this.state.offsetX);
            let height = this.props.filter.height + (event.nativeEvent.offsetY - this.state.offsetY);
            this.props.flux.getActions("editVideo").setPositionFrame(this.props.id, {width: width, height: height});
        }
    }

    handleMouseDown(event) {
        switch(event.target.className) {
            case "b-filter_frame_control b-filter_frame_controls--right_bottom":
                this.setState({
                    isResize: true,
                    offsetX: event.nativeEvent.offsetX,
                    offsetY: event.nativeEvent.offsetY
                });
                break;
            default:
                this.setState({
                    isMove: true,
                    offsetX: event.nativeEvent.offsetX,
                    offsetY: event.nativeEvent.offsetY
                });
                break
        }
    }

    handleMouseUp(event) {
        this.setState({
            isMove: false,
            isResize: false
        });
    }

    handleMouseOut(event) {
       this.setState({
            isMove: false,
            isResize: false
        });
    }
}