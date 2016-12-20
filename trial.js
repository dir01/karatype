class Trial {
    constructor(textToType) {
        this.textToType = textToType;
        this.index = 0;
    }

    tryKey(key) {
        if (key == this.textToType[this.index]) {
            this.index++;
            return true;
        }
    }
}


module.exports = Trial;