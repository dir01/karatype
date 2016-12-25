import React, { Component } from 'react';
import './Keyboard.css';
import KeyboardLayout from './tutor/KeyboardLayout';


class Keyboard extends Component {
    render() {
        let layout = new KeyboardLayout(this.props.layout);
        return (
            <div className="Keyboard">{
                layout.rows.map((row, i) => {
                    return <div className="Keyboard__Row" key={i}>
                        {row.map(this.renderKey.bind(this))}
                    </div>;
                })
            }</div>
        )
    }

    renderKey(key, i) {
        let active = (this.props.activeKeys || []).indexOf(key.key) >= 0;
        return <div
            className={`KeyboardKey ${key.className} ${active ? 'active' : ''}`}
            key={`${key.key}_${i}`}
        >{key.label || key.key}</div>;
    }


}


class KeyboardKey extends Component {
    render() {
        return (
            <div className={`KeyboardKey ${this.props.active ? 'active' : ''}`}>{this.props.label}</div>
        )
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

export { Keyboard, KeyboardKey, layouts };
