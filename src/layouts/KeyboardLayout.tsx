export type TLayout = LayoutChar[][]

export type LayoutChar = {
    className?: undefined | string;
    key: string;
    label: string;
}

export default class KeyboardLayout {
    private rawLayout: string[];

    constructor(rawLayout: string[]) {
        this.rawLayout = rawLayout;
    }


    get rows(): TLayout {
        return this.rawLayout.map(this._parseRowString.bind(this));
    }

    public _parseRowString(rowString: string): LayoutChar[] {
        return rowString.split(' ').map(this._parseChar);
    }

    public _parseChar(char: string): LayoutChar {
        const match = char.match('{(\\w+)?(:label=(.*))?}');
        if (match) {
            return {
                className: match[1] || 'empty',
                key: match[1] || '',
                label: match[3] === undefined ? match[1] : match[3],
            };
        } else {
            return { key: char, label: char };
        }
    }

}
