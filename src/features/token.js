import produce from 'immer';
import { userToken } from '../utils/selectors';
import axios from 'axios';

const initialState = {
    status: 'void',
    response: null,
    error: null,
};

const AXIOSREQUESTING = 'token/axiosRequesting';
const RESOLVED = 'token/resolved';
const REJECTED = 'token/rejected';

const tokenAxiosRequesting = () => ({
    type: AXIOSREQUESTING,
});
const tokenResolved = (data) => ({
    type: RESOLVED,
    payload: { data },
});
const tokenRejected = (error) => ({
    type: REJECTED,
    payload: { error },
});

export async function getToken(store, log) {
    const status = userToken(store.getState()).status;

    if (status === 'pending' || status === 'updating') {
        return;
    }
    store.dispatch(tokenAxiosRequesting());
    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3001/api/v1/user/login',
            data: log,
        });
        store.dispatch(tokenResolved(response.data.body.token));
    } catch (error) {
        store.dispatch(tokenRejected(error));
    }
}

export default function tokenReducer(state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case AXIOSREQUESTING: {
                if (draft.status === 'void') {
                    draft.status = 'pending';
                    return;
                }
                if (draft.status === 'rejected') {
                    draft.error = null;
                    draft.status = 'pending';
                    return;
                }
                if (draft.status === 'resolved') {
                    draft.status = 'updating';
                    return;
                }
                if (draft.response != null) {
                    draft.response = null;
                    return;
                }
                return;
            }
            case RESOLVED: {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.response = action.payload;
                    draft.status = 'resolved';
                    return;
                }
                return;
            }
            case REJECTED: {
                if (draft.status === 'pending' || draft.status === 'updating') {
                    draft.status = 'rejected';
                    draft.error = action.payload;
                    draft.response = null;
                    return;
                }
                return;
            }
            default:
                return;
        }
    });
}
