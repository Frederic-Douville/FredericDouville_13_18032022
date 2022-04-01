import { createAction, createReducer } from '@reduxjs/toolkit';
import { userToken } from '../utils/selectors';
import axios from 'axios';

const initialState = {
    status: 'void',
    data: null,
    error: null,
};

const tokenAxiosRequesting = createAction('token/axiosRequesting');
const tokenResolved = createAction('token/resolved');
const tokenRejected = createAction('token/rejected');

export async function getOrUpdateToken(store) {
    const status = userToken(store.getState()).status;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    store.dispatch(tokenAxiosRequesting());
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/login',
            data: {
                email: 'tony@stark.com',
                password: 'password123',
            },
        });
        store.dispatch(tokenResolved(response.data.body.token));
    } catch (error) {
        store.dispatch(tokenRejected(error));
    }
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(tokenAxiosRequesting, (draft) => {
            if (draft.status === 'void') {
                draft.status = 'pending';
                return;
            }
            if (draft.status === 'rejected') {
                draft.status = 'pending';
                return;
            }
            if (draft.status === 'resolved') {
                draft.status = 'updating';
                return;
            }
            return;
        })
        .addCase(tokenResolved, (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.data = action.payload;
                draft.status = 'resolved';
                return;
            }
            return;
        })
        .addCase(tokenRejected, (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.status = 'rejected';
                draft.error = action.payload;
                draft.data = null;
                return;
            }
            return;
        })
);
