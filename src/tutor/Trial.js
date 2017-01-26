
class Trial {
    constructor(textToType, level) {
        this.textToType = textToType;
        this.index = 0;
        this.errorsIndexes = [];
        this.errorsCount = 0;
        this.level = level;
        this.loggedKeystrokes = [];
    }

    tryChar(char, date) {
        if (this.isOver) {
            return undefined;
        }

        this.loggedKeystrokes.push({
            char: char,
            date: date || new Date()
        });

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
        this.index--;
        let idx = this.errorsIndexes.indexOf(this.index);
        if (idx !== -1) {
            this.errorsIndexes.pop(idx);
        }
        return true;
    }

    get isStarted() {
        return this.index > 0;
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
                snippets.push({type: 'correct', text: typedText});
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

    get stats() {
        return {
            errorRate: this.errorRate,
            unproductiveKeystrokesRate: this.unproductiveKeystrokesRate,
            wordsPerMinute: this.wordsPerMinute,
        };
    }

    get errorRate() {
        return this.errorsCount / this.textToType.length * 100;
    }

    get unproductiveKeystrokesRate() {
        let charsCount = this.textToType.length;
        return (this.loggedKeystrokes.length - charsCount) / charsCount * 100;
    }

    get wordsPerMinute() {
        let typedChars = this.index + 1;
        let typedWords = Math.floor(typedChars / 5);
        let last = this.loggedKeystrokes[this.loggedKeystrokes.length - 1];
        let first = this.loggedKeystrokes[0];
        let seconds = (last.date - first.date) / 1000;
        let wpm = Math.floor(typedWords * 60 / seconds);
        return wpm;
    }

    get progress() {
        return this.index / this.textToType.length * 100;
    }

    get activeKeys() {
        if (this.isOver) {
            return [];
        }
        let char = this._getCurrentChar();
        let lower = char.toLowerCase();
        return char === lower ? [char] : [lower, 'shift'];
    }

    _onCorrectChar() {
        this.index++;
    }

    _onIncorrectChar() {
        this.errorsIndexes.push(this.index);
        this.errorsCount++;
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
