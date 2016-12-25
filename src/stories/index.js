import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { KeyboardKey, Keyboard, layouts } from '../Keyboard';


storiesOf('KeyboardKey', module)
    .add('normal', () => (
        <KeyboardKey label='q'/>
    ))
    .add('active', () => (
        <KeyboardKey label='q' active={true} />
    ));

storiesOf('Keyboard', module)
    .add('qwerty', () => (
        <Keyboard layout={layouts.qwerty}/>
    ));
