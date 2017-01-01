import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Trial from './tutor/Trial';


let tutor = {
    getNextTrial: () => {
        return new Trial('Hello'); 
    }
};


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App tutor={ tutor } />, div);
});
