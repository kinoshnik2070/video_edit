export default class BaseFilter {
    constructor(options) {
        this.time = options.time;
        this.duration = options.duration;
        this.type = options.type;
    }

    isActive(currentTime) {
        if(currentTime >= this.time && currentTime < (this.time + this.duration)) {
            return true;
        }
        return false;
    }

    update(video) {}
}