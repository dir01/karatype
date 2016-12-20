import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Trial from './tutor/Trial';

var trial = new Trial('Hello world');

ReactDOM.render(
    <App trial={trial}/>,
    document.getElementById('root')
);
