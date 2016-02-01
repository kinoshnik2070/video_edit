import { Actions } from 'flummox';
import Filter from "../model/BaseFilter";
import FrameFilter from "../model/FrameFilter";

export default class EditVideoActions extends Actions {
    updateCurrentTime(time) {
         return time;
    }

    updateDurationTime(time) {
        return time;
    }

    setFilters(filters) {
        return filters;
    }
}
