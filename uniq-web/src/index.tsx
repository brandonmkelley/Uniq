
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './App';
import store from './store'

import io from 'socket.io-client'
import * as firebase from 'firebase'

import * as serviceWorker from './serviceWorker'

var socket = null

if (window.location.hostname === 'localhost')
  socket = io('http://127.0.0.1:8080')

else
  socket = io('https://' + window.location.hostname + ':443', { secure: true })

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBUroEN1LLBpeTp1U2y6TUsCqSVrCWbSjM",
    authDomain: "userportal-fa7ab.firebaseapp.com",
    databaseURL: "https://userportal-fa7ab.firebaseio.com",
    projectId: "userportal-fa7ab",
    storageBucket: "userportal-fa7ab.appspot.com",
    messagingSenderId: "957655912160",
    appId: "1:957655912160:web:3347953fa9dd2d18d58a85",
    measurementId: "G-5L0F9F07YV"
})

const ServiceContext = React.createContext({ socket: socket, firebaseApp: firebaseApp })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ServiceContext.Provider value={{ socket: socket, firebaseApp: firebaseApp }}>
        <App />
      </ServiceContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export { ServiceContext }
