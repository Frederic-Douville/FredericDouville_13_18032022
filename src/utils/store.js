import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import tokenReducer from '../features/token.js';
import userReducer from '../features/user.js';

export default configureStore({
    reducer: {
        token: tokenReducer,
        user: userReducer,
    },
});
