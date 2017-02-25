import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

import Tutor from './core/Tutor';
import { levels } from './levels';
import 'reset-css';
import './index.css';

let tutor = new Tutor(levels);

ReactDOM.render(
    <App tutor={ tutor }/>,
    document.getElementById('root')
);
