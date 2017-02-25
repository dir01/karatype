import React, { Component } from 'react';
import Indicator from '../Indicator/Indicator';
import LevelSelector from '../LevelSelector/LevelSelector';
import classNames from 'classnames';

import './Toolbar.css';


export default class Toolbar extends Component {
    render() {
        return (
            <div className={ classNames('Toolbar', this.props.className) }>
                <button className="Toolbar__button Toolbar__button--restart" />
                <button className="Toolbar__button Toolbar__button--skip" />
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
