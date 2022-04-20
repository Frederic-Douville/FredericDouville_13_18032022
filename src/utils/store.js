/**The store which contain the main reducer*/
import { combineReducers, createStore } from 'redux';
import tokenReducer from '../features/token.js';
import userReducer from '../features/user.js';
import namesReducer from '../features/names.js';
import headerReducer from '../features/header.js';

const reducer = combineReducers({
    token: tokenReducer,
    user: userReducer,
    names: namesReducer,
    header: headerReducer,
});

const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducer, reduxDevTools);

export default store;
