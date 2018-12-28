import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Keyboard, layouts } from './Keyboard';

it('Keyboard renders without crashing', () => {
    const div = document.createElement('div');
    const element = <Keyboard layout={layouts.qwerty} />;
    ReactDOM.render(element, div);
});
