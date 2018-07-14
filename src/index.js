import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css'
import App from './App';
import store from './store';
import {unregister} from './registerServiceWorker';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));
unregister();
