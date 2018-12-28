import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import Tutor from './core/Tutor';
import './index.css';
import { levels } from './levels';

const tutor = new Tutor(levels);


ReactDOM.render(
  <App tutor={ tutor }/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
