import { createAction, createReducer } from '@reduxjs/toolkit';
import { userData } from '../utils/selectors';
import axios from 'axios';

const initialState = {
    status: 'void',
    data: null,
    error: null,
};

const userAxiosRequesting = createAction('user/axiosRequesting');
const userResolved = createAction('user/resolved');
const userRejected = createAction('user/rejected');

export async function getUserData(store, token) {
    const status = userData(store.getState()).status;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    store.dispatch(userAxiosRequesting());
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/profile',
            headers: { Authorization: `Bearer ${token}` },
        });
        store.dispatch(userResolved(response.data.body));
    } catch (error) {
        store.dispatch(userRejected(error));
    }
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(userAxiosRequesting, (draft) => {
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
        .addCase(userResolved, (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.data = action.payload;
                draft.status = 'resolved';
                return;
            }
            return;
        })
        .addCase(userRejected, (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.status = 'rejected';
                draft.error = action.payload;
                draft.data = null;
                return;
            }
            return;
        })
);
