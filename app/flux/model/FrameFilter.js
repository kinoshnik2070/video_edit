import Filter from "./BaseFilter";

export default class FrameFilter extends Filter{
    constructor(options) {
        super(options);
        this.width = options.width;
        this.height = options.height;
        this.x = options.x;
        this.y = options.y;
    }
}