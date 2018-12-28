import {expect} from 'chai';
import { render } from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Indicator from './Indicator';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Indicator />, div);
});

it('contains progressbar with progress=', () => {
    const wrapper = render(<Indicator progress={55} />);
    expect(wrapper.find('.Indicator__progressbar').length).to.equal(1);
    expect(wrapper.find('.Indicator>span').length).to.equal(0);
});

it('doesn\'t contain progressBar with text=', () => {
    const wrapper = render(<Indicator text="hello <b>world</b>" />);
    expect(wrapper.find('.Indicator__progressbar').length).to.equal(0);
    expect(wrapper.find('.Indicator>span').length).to.equal(1);
});
