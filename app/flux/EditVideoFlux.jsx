import { Flux } from 'flummox';
import EditVideoActions from './actions/EditVideoActions';
import EditVideoStore from './stores/EditVideoStore';

export default class FilterFlux extends Flux {
    constructor() {
        super();

        this.createActions('editVideo', EditVideoActions);
        this.createStore('editVideo', EditVideoStore, this);
    }
}
