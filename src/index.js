import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reducer,{initialState} from './reducer';
import {StateProvider} from './StateProvider';

// import * as serviceWorker from "./serviceWorker";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState}
    reducer={reducer}>
     <App />
     </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// serviceWorker.unregister();
reportWebVitals();
