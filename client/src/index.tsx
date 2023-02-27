import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./store";

const element = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(
    element
);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);
