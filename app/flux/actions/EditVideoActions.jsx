import { Actions } from "flummox";
import Filter from "../model/BaseFilter";
import FrameFilter from "../model/FrameFilter";

export default class EditVideoActions extends Actions {

    updateCurrentTime(time) {
         return time;
    }

    updateDurationTime(time) {
        return time;
    }

    getFilters() {
        let item = localStorage.getItem("filters");
        //если набор фильтров не задан, то берем тестовые данны, чтобы можно было проверить работу
        if(!item) {
            let exampleFilter = [{
                "time":2,
                "duration":4,
                "x":40,
                "y":40,
                "width":40,
                "height":40,
                "type":"1"
            },{
                "time":2,
                "duration":20,
                "x":140,
                "y":140,
                "width":40,
                "height":40,
                "type":"1"
            },{
                "time":15,
                "duration":21,
                "type":"0"
            },{
                "time":20,
                "duration":10,
                "x":240,
                "y":140,
                "width":40,
                "height":40,
                "type":"1"
            }];
            this.setFilters(exampleFilter);
            return exampleFilter;
        }
        return JSON.parse(item);
    }

    setFilters(filters) {
        localStorage.setItem("filters", JSON.stringify(filters));
        return filters;
    }

    setPositionFrame(id, options) {
        options.id = id;
        return options;
    }

    mouseDown(options) {
        return options;
    }

    clearMd(options) {
        return null;
    }
}
