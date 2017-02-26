import React, { Component } from 'react';
import classNames from 'classnames';


export default class LevelSelector extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <select
                className={ classNames('LevelSelector', this.props.className) }
                value={ this.props.currentLevel }
                onChange={ this.handleChange }
            >{ this._renderOptions() }</select>
        );
    }

    _renderOptions () {
        return (this.props.levels || []).map((level, i) => {
            return (
                <option key={ i } value={ i }>
                    Level { i + 1 }: { level.name }
                </option>
            );
        });
    }

    handleChange(event) {
        this.props.onLevelChange && this.props.onLevelChange(event.target.value);
    }

}
