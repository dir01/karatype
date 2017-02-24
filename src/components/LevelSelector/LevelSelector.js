import React, { Component } from 'react';

export default class LevelSelector extends Component {

    render() {
        return (
            <select
                className="LevelSelector"
                value={ this.props.currentLevel }
                onChange={ this.handleChange.bind(this) }
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
