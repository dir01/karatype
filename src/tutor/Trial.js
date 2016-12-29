
class Trial {
    constructor(textToType) {
        this.textToType = textToType;
        this.index = 0;
        this.errorsIndexes = [];
        this.stats = {errors: 0};
    }

    tryChar(char) {
        if (this.isOver) {
            return undefined;
        }
        if (char.length > 1) {
            return this._trySpectialChar(char);
        }
        if (this._isCharCorrect(char)) {
            this._onCorrectChar();
            return true;
        } else {
            this._onIncorrectChar();
            return false;
        }
    }

    _trySpectialChar(char) {
        if (char !== 'Backspace' || this.index === 0) {
            return undefined;
        }
        this.index -= 1;
        let idx = this.errorsIndexes.indexOf(this.index);
        if (idx !== -1) {
            this.errorsIndexes.pop(idx);
        }
        return true;
    }

    get isOver() {
        return this.index === this.textToType.length;
    }

    get snippets() {
        let snippets = [];
        let idx = this.index;
        if (idx) {
            let typedText = this.textToType.slice(0, idx);
            if (!this.errorsIndexes.length) {
                snippets.push({type: 'correct', text: typedText})
            } else {
                var correctText = '', errorText = '';
                for (var i = 0; i < typedText.length; i++) {
                    let isError = this.errorsIndexes.includes(i);
                    if (isError) {
                        errorText += typedText[i];
                        if (correctText) {
                            snippets.push({type: 'correct', text: correctText});
                            correctText = '';
                        }
                    } else {
                        correctText += typedText[i];
                        if (errorText) {
                            snippets.push({type: 'error', text: errorText});
                            errorText = '';
                        }
                    }
                }
                errorText && snippets.push({type: 'error', text: errorText});
                correctText && snippets.push({type: 'correct', text: correctText});
            }
        }
        snippets.push({type: 'current', text: this.textToType.slice(idx, idx + 1)});
        snippets.push({type: 'untyped', text: this.textToType.slice(idx + 1)});
        return snippets;
    }

    get activeKeys() {
        if (this.isOver) {
            return [];
        }
        let char = this._getCurrentChar();
        let lower = char.toLowerCase();
        return char === lower ? [char] : [lower, 'shift']
    }

    _onCorrectChar() {
        this.index++;
    }

    _onIncorrectChar() {
        this.errorsIndexes.push(this.index);
        this.stats.errors++;
        this.index++;
    }

    _isCharCorrect(char) {
        return this._getCurrentChar() === char;
    }

    _getCurrentChar() {
        return this.textToType[this.index];
    }
}


module.exports = Trial;
