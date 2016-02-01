import { Actions } from 'flummox';
import Filter from "../model/Filter";
import FrameFilter from "../model/FrameFilter";

export default class EditVideoActions extends Actions {
    updateCurrentTime(time) {
         return time;
    }

    updateDurationTime(time) {
        return time;
    }

    getFilters() {
        let f1 = {
            time: 0,
            duration: 0,
            type: 0
        };
        let f2 = {
            time: 10,
            duration: 30,
            x: 40,
            y: 40,
            width: 40,
            height: 40,
            type: 1
        };
        return [f1, f2];
    }
}
