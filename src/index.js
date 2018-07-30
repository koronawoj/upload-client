import React from "react";
import ReactDOM from "react-dom";
import "./scss/main.scss";
import App from './components/App';
import {Provider} from 'react-redux';
import {configureStore} from "./configureStore";
import {BrowserRouter} from 'react-router-dom';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    , document.getElementById("index"));