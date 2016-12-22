class Trial {
    constructor(textToType) {
        this.textToType = textToType;
        this.index = 0;
        this.isOver = false;
    }

    tryChar(char) {
        if (char.length > 1) {
            return;
        }
        if (this._isCharCorrect(char)) {
            this._onCorrectChar();
            return true;
        } else {
            return false;
        }
    }

    get typedTextPart() {
        return this.textToType.slice(0, this.index);
    }

    get untypedTextPart() {
        return this.textToType.slice(this.index);
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
        return this.index === this.textToType.length;
    }
}


module.exports = Trial;
