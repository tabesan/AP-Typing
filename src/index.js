import { render } from "react-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from "./App";


render (
    <Provider store={store}>
        <Home />
    </Provider>
    , document.querySelector("#content")
);