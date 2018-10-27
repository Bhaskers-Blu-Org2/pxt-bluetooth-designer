import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
//import ResponseLayout from './ResponsiveLayout';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import './semantic/dist/semantic.min.css';

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
