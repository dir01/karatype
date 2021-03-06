import { action,  storiesOf } from '@kadira/storybook';
import * as React from 'react';
import Indicator from '../components/Indicator/Indicator';
import { Keyboard,  layouts } from '../components/Keyboard/Keyboard';
import LevelSelector from '../components/LevelSelector/LevelSelector';
import TextToType from '../components/TextToType/TextToType';
import Toolbar from '../components/Toolbar/Toolbar';


storiesOf('TextToType',  module)
    .add('normal',  () => (
        <TextToType
            text="Oh my god it's the funky shit"
            cursorIndex={ 18 }
            errorsIndexes={ [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 16, 17] }
        />
    ));

storiesOf('Keyboard',  module)
    .add('qwerty',  () => (
        <Keyboard layout={ layouts.qwerty }/>
    ))
    .add('qwerty with active space',  () => (
        <Keyboard layout={ layouts.qwerty } activeKeys={ [' '] } />
    ));

storiesOf('Indicator',  module)
    .add('text',  () => (
        <Indicator text="Excercise loaded. Press <b>Enter</b> to start." />
    ))
    .add('progress',  () => (
        <Indicator progress="42" />
    ));

const levels = [
    { name: 'f j' }, 
    { name: 'a s d f g h j k l ; q w e r t y u i o p [ ] z x c v b n m ,  . /' }
];

storiesOf('LevelSelector',  module)
    .add('normal',  () => (
        <LevelSelector levels={ levels } currentLevel={ 1 } onLevelChange={ action('levelChange') } />
    ));

storiesOf('Toolbar',  module)
    .add('normal',  () => (
        <Toolbar
            levels={ levels }
            currentLevel={ 0 }
            onLevelChange={ action('levelChange') } 
            onRestart={ action('restart') }
            onSkip={ action('skip') }
        />
    ));

