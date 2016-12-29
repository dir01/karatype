import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Trial from './tutor/Trial';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App trial={ new Trial('Hello') }/>, div);
});
