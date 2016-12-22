import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Trial from './tutor/Trial';


var trial = new Trial(
    'The fundamental principle of science, the definition almost, is this: the sole test of the validity of any idea is experiment'
);


ReactDOM.render(
    <App trial={trial}/>,
    document.getElementById('root')
);
