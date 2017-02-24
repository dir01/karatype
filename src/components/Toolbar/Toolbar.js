import React, { Component } from 'react';
import './Toolbar.css';
import restart from './svg/restart.svg';
import pause from './svg/pause.svg';
import skip from './svg/skip.svg';
import Indicator from '../Indicator/Indicator';
import LevelSelector from '../LevelSelector/LevelSelector';

export default class Toolbar extends Component {
    render() {
        return (
            <div id="Toolbar">
                <button id="reload"><img src={ restart } role="presentation" /></button>
                <button id="pause"><img src={ pause } role="presentation" /></button>
                <button id="skip"><img src={ skip } role="presentation" /></button>
                <Indicator text={ this.props.text } progress={ this.props.progress } />
                <LevelSelector
                    levels={ this.props.levels }
                    currentLevel={ this.props.currentLevel }
                    onLevelChange={ this.props.onLevelChange }
                />
            </div>
        );
    }
}
