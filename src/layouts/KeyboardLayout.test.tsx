import KeyboardLayout from './KeyboardLayout';

describe('KeyboardLayout', () => {

    it('transforms raw strings into array of objects', () => {
        const rows = new KeyboardLayout(['a b', 'c d']).rows;
        expect(rows).toEqual([
            [{key: 'a', label: 'a'}, {key: 'b', label: 'b'}],
            [{key: 'c', label: 'c'}, {key: 'd', label: 'd'}]
        ]);
    });

    it('parses key objects', () => {
        const char = new KeyboardLayout(['{tab}']).rows[0][0];
        expect(char).toEqual({key: 'tab', className: 'tab', label: 'tab'});
    });

    it('allows overriding key label', () => {
        const char = new KeyboardLayout(['{backspace:label=←}']).rows[0][0];
        expect(char).toEqual({label: '←', key: 'backspace', className: 'backspace'});
    });

    it('allows setting empty labels', () => {
        const char = new KeyboardLayout(['{empty:label=}']).rows[0][0];
        expect(char).toEqual({label: '', key: 'empty', className: 'empty'});
    });

});
