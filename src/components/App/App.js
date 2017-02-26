import React, { Component } from 'react';
import './App.css';
import TextToType from '../TextToType/TextToType';
import {Keyboard, layouts} from '../Keyboard/Keyboard';
import Toolbar from '../Toolbar/Toolbar';

let soundPaths = {
    error: '/sounds/error.wav',
    keystroke: '/sounds/keystroke.wav'
};


class App extends Component {
    render() {
        return (
            <div className="App">
                <Toolbar
                    className="App__Toolbar"
                    progress={ this.exercise.isStarted ? this.exercise.progress : null }
                    text={ this.exercise.isStarted ? null : 'Excercise is loaded. Start typing whenever ready' }
                    levels={ this.props.tutor.levels }
                    currentLevel={ this.props.tutor.currentLevel }
                    onLevelChange={ this.handleLevelChange.bind(this) }
                    onSkip={ this.handleSkip.bind(this) }
                />
                <TextToType
                    className="App__TextToType"
                    text={ this.exercise.textToType }
                    errorsIndexes={ this.exercise.errorsIndexes }
                    cursorIndex={ this.exercise.index }
                />
                <Keyboard
                    className="App__Keyboard"
                    layout={ layouts.qwerty }
                    highlightKeys={ this.exercise.activeKeys }
                />
            </div>
        );
    }

    get exercise() {
        if (!this._exercise || this._exercise.isOver) {
            this._exercise = this.props.tutor.getNextExercise(this._exercise);
        }
        return this._exercise;
    }

    componentWillMount() {
        document.addEventListener('keydown', this.onKeyDown.bind(this));
    }

    onKeyDown(event) {
        let result = this.exercise.tryChar(event.key);
        if (result === undefined) {
            return;
        }
        this.playSound(result);
        this.forceUpdate();
    }

    handleLevelChange(newLevel) {
        this.props.tutor.currentLevel = newLevel;
        this._exercise = null;
        this.forceUpdate();
    }

    handleSkip() {
        this._exercise = null;
        this.forceUpdate();
    }

    playSound(isCorrect) {
        let path = soundPaths[isCorrect ? 'keystroke' : 'error'];
        new Audio(path).play();
    }

}

export default App;
