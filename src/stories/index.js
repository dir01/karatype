import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import { KeyboardKey, Keyboard, layouts } from '../Keyboard';
import Toolbar from '../Toolbar';
import Indicator from '../Indicator';
import LevelSelector from '../LevelSelector';
import TextToType from '../TextToType';


storiesOf('TextToType', module)
    .add('normal', () => (
        <TextToType
            text="Oh my god it's the funky shit"
            cursorIndex={18}
            errorsIndexes={[6,7,8,9,10,11,12,13,14,15,16,16,17]}
        />
    ));

storiesOf('KeyboardKey', module)
    .add('normal', () => (
        <KeyboardKey label='q'/>
    ))
    .add('active', () => (
        <KeyboardKey label='q' active={ true } />
    ));

storiesOf('Keyboard', module)
    .add('qwerty', () => (
        <Keyboard layout={ layouts.qwerty }/>
    ))
    .add('qwerty with active space', () => (
        <Keyboard layout={ layouts.qwerty } activeKeys={ [' '] } />
    ));

storiesOf('Indicator', module)
    .add('text', () => (
        <Indicator text="Excercise loaded. Press <b>Enter</b> to start." />
    ))
    .add('progress', () => (
        <Indicator progress="42" />
    ));

let levels = [
    { name: 'f j' },
    { name: 'a s d f g h j k l ; q w e r t y u i o p [ ] z x c v b n m , . /' }
];

storiesOf('LevelSelector', module)
    .add('normal', () => (
        <LevelSelector levels={ levels } currentLevel={ 1 } onLevelChange={ action('levelChange') } />
    ));

storiesOf('Toolbar', module)
    .add('normal', () => (
        <Toolbar levels={ levels } currentLevel={ 1 } onLevelChange={ action('levelChange') } />
    ));

