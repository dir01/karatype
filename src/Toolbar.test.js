"use strict";

import React from 'react';
import ReactDOM from 'react-dom';
import { Keyboard, layouts } from './Keyboard';


it('Keyboard renders without crashing', () => {
    const div = document.createElement('div');
    var element = <Keyboard layout={layouts.qwerty} />;
    ReactDOM.render(element, div);
});
