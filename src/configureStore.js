import {createStore, applyMiddleware} from 'redux';
import RootReducer from './reducers';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export function configureStore() {
    const store = createStore(
        RootReducer,
        composeWithDevTools(applyMiddleware(thunk)),
    );
    return store;
}
