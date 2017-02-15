import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import Tutor from './tutor/Tutor';
import { levels } from './levels';


let tutor = new Tutor(levels);

ReactDOM.render(
    <App tutor={ tutor }/>,
    document.getElementById('root')
);
