import classNames from 'classnames';
import * as React from 'react';
import KeyboardLayout, { LayoutChar } from './KeyboardLayout';

import './Keyboard.css';

type Props = {
    layout: string[];
    className?: string;
    highlightKeys?: string[];
}

class Keyboard extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.renderKey = this.renderKey.bind(this);
        this.renderKeyRow = this.renderKeyRow.bind(this);
    }

    public render() {
        const className = classNames('Keyboard', this.props.className);
        const layout = new KeyboardLayout(this.props.layout);
        return (
            <div className={ className }>{
                layout.rows.map(this.renderKeyRow)
            }</div>
        );
    }

    public renderKeyRow(row: LayoutChar[], id: number) {
        return <div className="Keyboard__Row" key={ id }>
            {row.map(this.renderKey)}
        </div>;
    }

    public renderKey(key: LayoutChar, i: number) {
        const char = key.key.replace('space', ' ');
        const className = classNames('Keyboard__Key', `Keyboard__Key--${key.className}`, {
            'Keyboard__Key--highlighted': (this.props.highlightKeys || []).indexOf(char) >= 0
        });
        return <div className={ className } key={ `${key.key}_${i}` }>
            {key.label || key.key}
        </div>;
    }
}


const layouts = {
    qwerty: [
        '` 1 2 3 4 5 6 7 8 9 0 - = {backspace:label=←}',
        '{tab} q w e r t y u i o p [ ] \\',
        '{caps} a s d f g h j k l ; \' {enter}',
        '{shift} z x c v b n m , . / {shift}',
        '{empty} {empty} {empty} {space} {empty} {empty} {empty}'
    ]
};

export { Keyboard, layouts };
