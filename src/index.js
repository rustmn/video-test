import React, {
  useContext,
  createContext
} from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Player from './player';
import reportWebVitals from './reportWebVitals';
import 'video.js/dist/video-js.css';
import { Provider } from 'react-redux';
import store from './store';
import '@silvermine/videojs-quality-selector/dist/css/quality-selector.css';

    ReactDOM.render(
      <React.StrictMode>
        <Provider
        store = { store }
        >
          <Player />
        </Provider>
      </React.StrictMode>,
      document.getElementById('root')
    )


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
