import { Store } from 'flummox';

export default class EditVideoStore extends Store {
    constructor(flux) {
        super();

        const editVideoActionsIds = flux.getActionIds('editVideo');

        this.register(editVideoActionsIds.updateCurrentTime, this.handleUpdateCurrentTime);
        this.register(editVideoActionsIds.updateDurationTime, this.handleUpdateDurationTime);
        this.register(editVideoActionsIds.getFilters, this.handleGetFilters);

        this.state = {
            currentTime: 0,
            durationTime: 0,
            filters: []
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
        this.setState({
            filters: this.state.filters.concat(filters)
        });
    }

}
