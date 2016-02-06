import { Store } from "flummox";
import FilterType from "../enums/FilterType";
import ClippingFilter from "../model/ClippingFilter";
import FrameFilter from "../model/FrameFilter";

export default class EditVideoStore extends Store {
    constructor(flux) {
        super();

        this.flux = flux;

        const editVideoActionsIds = flux.getActionIds("editVideo");

        this.register(editVideoActionsIds.updateCurrentTime, this.handleUpdateCurrentTime);
        this.register(editVideoActionsIds.updateDurationTime, this.handleUpdateDurationTime);
        this.register(editVideoActionsIds.getFilters, this.handleGetFilters);
        this.register(editVideoActionsIds.setFilters, this.handleGetFilters);
        this.register(editVideoActionsIds.setPositionFrame, this.handleSetPositionFrame);
        this.register(editVideoActionsIds.mouseDown, this.handleMouseDown);
        this.register(editVideoActionsIds.clearMd, this.handleClearMd);

        this.state = {
            currentTime: 0,
            durationTime: 0,
            filters: [],
            md: null
        }
    }

    handleUpdateCurrentTime(time) {
        this.setState({
            currentTime: time
        });
    }

    handleUpdateDurationTime(time) {
        this.setState({
            durationTime: time
        });
    }

    handleGetFilters(filters) {
        let data = filters;
        let arr = [];
        for(let i = 0; i < data.length; i++) {
            switch (data[i].type) {
                case FilterType.ClippingFilter:
                    arr.push(new ClippingFilter(data[i]));
                    break;
                case FilterType.FrameFilter:
                    arr.push(new FrameFilter(data[i]));
                    break;

            }
        }
        this.setState({
            filters: arr
        });
    }

    handleSetPositionFrame(options) {
        let filter = this.state.filters[options.id];
        for(let key in options) {
            filter[key] = options[key];
        }
        this.forceUpdate();
        //очень плохо, нужно исправить
        localStorage["filter"] = JSON.stringify(this.state.filters);
    }

    handleMouseDown(options) {
        this.setState({
            md: options
        });
        //this.state.md = options;
    }
    handleClearMd() {
        this.setState({
            md: null
        });
    }


}
