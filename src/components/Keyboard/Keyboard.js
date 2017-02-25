import React, { Component } from 'react';
import KeyboardLayout from './KeyboardLayout';
import classNames from 'classnames';

import './Keyboard.css';


class Keyboard extends Component {
    render() {
        const className = classNames('Keyboard', this.props.className);
        let layout = new KeyboardLayout(this.props.layout);
        return (
            <div className={ className }>{
                layout.rows.map(this.renderKeyRow.bind(this))
            }</div>
        );
    }

    renderKeyRow(row, id) {
        return <div className="Keyboard__Row" key={ id }>
            {row.map(this.renderKey.bind(this))}
        </div>;
    }

    renderKey(key, i) {
        const char = key.key.replace('space', ' ');
        const className = classNames('Keyboard__Key', `Keyboard__Key--${key.className}`, {
            'Keyboard__Key--highlighted': (this.props.highlightKeys || []).indexOf(char) >= 0
        });
        return <div className={ className } key={ `${key.key}_${i}` }>
            {key.label || key.key}
        </div>;
    }
}


let layouts = {
    qwerty: [
        '` 1 2 3 4 5 6 7 8 9 0 - = {backspace:label=←}',
        '{tab} q w e r t y u i o p [ ] \\',
        '{caps} a s d f g h j k l ; \' {enter}',
        '{shift} z x c v b n m , . / {shift}',
        '{empty} {empty} {empty} {space} {empty} {empty} {empty}'
    ]
};

export { Keyboard, layouts };