import Filter from "./BaseFilter";

export default class ClippingFilter extends Filter{
    constructor(options) {
        super(options);
    }

    update(video) {
        if(this.isActive(video.currentTime)) {
            video.currentTime = this.time + this.duration;
        }
    }
}