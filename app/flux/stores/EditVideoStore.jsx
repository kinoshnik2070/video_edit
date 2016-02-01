import { Store } from "flummox";
import FilterType from "../enums/FilterType";
import ClippingFilter from "../model/ClippingFilter";
import FrameFilter from "../model/FrameFilter";

export default class EditVideoStore extends Store {
    constructor(flux) {
        super();

        const editVideoActionsIds = flux.getActionIds("editVideo");

        this.register(editVideoActionsIds.updateCurrentTime, this.handleUpdateCurrentTime);
        this.register(editVideoActionsIds.updateDurationTime, this.handleUpdateDurationTime);
        this.register(editVideoActionsIds.setFilters, this.handleSetFilters);

        this.state = {
            currentTime: 0,
            durationTime: 0,
            filters: [],
            value: ""
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

    handleSetFilters(filters) {
        let data = JSON.parse(filters);
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

}
