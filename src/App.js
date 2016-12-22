import React, { Component } from 'react';
import keydown from 'react-keydown';
import './App.css';


let soundPaths = {
    error: '/sounds/error.wav',
    keystroke: '/sounds/keystroke.wav'
};


class App extends Component {
    render() {
        let trial = this.props.trial;
        return (
            <div className="App">
                <div id="text-to-type">
                    {
                        trial.snippets.map((snippet, index) => {
                            return <span key={index} className={snippet.type}>{snippet.text}</span>
                        })
                    }
                </div>
            </div>
        );
    }

    componentWillReceiveProps({ keydown }) {
        if (keydown.event) {
            console.log(keydown.event);
            let result = this.props.trial.tryChar(keydown.event.key);
            if (result === undefined) {
                return
            }
            this.playSound(result);
        }
    }

    playSound(isCorrect) {
        let path = soundPaths[isCorrect ? 'keystroke' : 'error'];
        new Audio(path).play();
    }

}

export default keydown(App);
