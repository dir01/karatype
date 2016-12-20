class Trial {
    constructor(textToType) {
        this.textToType = textToType;
        this.index = 0;
        this.isOver = false;
    }

    tryChar(char) {
        if (this._isCharCorrect(char)) {
            this._onCorrectChar();
            return true;
        } else {
            return false;
        }
    }

    _onCorrectChar() {
        this.index++;
        if (this._isTrialOver()) {
            this.isOver = true;
        }
    }

    _isCharCorrect(char) {
        return this._getCurrentChar() === char;
    }

    _getCurrentChar() {
        return this.textToType[this.index];
    }

    _isTrialOver() {
        return this.index == this.textToType.length;
    }
}


module.exports = Trial;