import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import App from './App';
import Exercise from './core/Exercise';
import LevelSelector from './LevelSelector';
import Toolbar from './Toolbar';


let tutor = {
    getNextExercise: () => {
        return new Exercise('Hello');
    },
    currentLevel: 0
};


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App tutor={ tutor } />, div);
});

describe('LevelSelector', () => {
    it('has level 0 when just started', () => {
        const wrapper = shallow(<App tutor={ tutor }/>);
        let select = wrapper
            .find(Toolbar).dive()
            .find(LevelSelector).dive()
            .find('select').node;
        expect(select.props.value).to.equal(0);
    });
});

