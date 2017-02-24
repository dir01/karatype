'use strict';

import { expect } from 'chai';
import KeyboardLayout from './KeyboardLayout';


describe('KeyboardLayout', () => {

    it('transforms raw strings into array of objects', () => {
        let rows = new KeyboardLayout(['a b', 'c d']).rows;
        expect(rows).to.deep.equal([
            [{key: 'a', label: 'a'}, {key: 'b', label: 'b'}],
            [{key: 'c', label: 'c'}, {key: 'd', label: 'd'}]
        ]);
    });

    it('parses key objects', () => {
        let char = new KeyboardLayout(['{tab}']).rows[0][0];
        expect(char).to.deep.equal({key: 'tab', className: 'tab', label: 'tab'});
    });

    it('allows overriding key label', () => {
        let char = new KeyboardLayout(['{backspace:label=←}']).rows[0][0];
        expect(char).to.deep.equal({label: '←', key: 'backspace', className: 'backspace'});
    });

    it('allows setting empty labels', () => {
        let char = new KeyboardLayout(['{empty:label=}']).rows[0][0];
        expect(char).to.deep.equal({label: '', key: 'empty', className: 'empty'});
    });

});
