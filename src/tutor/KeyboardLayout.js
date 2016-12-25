export default class KeyboardLayout {

    constructor(rawLayout) {
        this.rawLayout = rawLayout;
    }

    get rows(){
        return this.rawLayout.map(this._parseRowString.bind(this));
    }

    _parseRowString(rowString) {
        return rowString.split(' ').map(this._parseChar);
    }

    _parseChar(char) {
        let match = char.match('{(\\w+)?(:label=(.*))?}');
        if (match) {
            return {
                key: match[1] || '',
                label: match[3] === undefined ? match[1] : match[3],
                className: match[1] || 'empty'
            }
        } else {
            return { key: char, label: char }
        }
    }

}
