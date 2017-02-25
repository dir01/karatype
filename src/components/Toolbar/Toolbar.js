import React, { Component } from 'react';
import Indicator from '../Indicator/Indicator';
import LevelSelector from '../LevelSelector/LevelSelector';
import classNames from 'classnames';

import restart from './svg/restart.svg';
import pause from './svg/pause.svg';
import skip from './svg/skip.svg';
import './Toolbar.css';


export default class Toolbar extends Component {
    render() {
        return (
            <div className={ classNames('Toolbar', this.props.className) }>

                <button className="Toolbar__button">
                    <img src={ restart } role="presentation" />
                </button>

                <button className="Toolbar__button">
                    <img src={ pause } role="presentation" />
                </button>

                <button className="Toolbar__button">
                    <img src={ skip } role="presentation" />
                </button>

                <Indicator
                    className="Toolbar__Indicator"
                    text={ this.props.text }
                    progress={ this.props.progress }
                 />

                <LevelSelector
                    className="Toolbar__LevelSelector"
                    levels={ this.props.levels }
                    currentLevel={ this.props.currentLevel }
                    onLevelChange={ this.props.onLevelChange }
                />

            </div>
        );
    }
}
