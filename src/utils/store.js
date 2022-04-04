import { combineReducers, createStore } from 'redux';
import tokenReducer from '../features/token.js';
import userReducer from '../features/user.js';

const reducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
});

const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, reduxDevTools);

export default store;
