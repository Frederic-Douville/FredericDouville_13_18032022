import produce from 'immer';
import { namesData, userToken } from '../utils/selectors';
import axios from 'axios';

const initialState = {
    status: 'void',
    response: null,
    error: null,
};

const AXIOSREQUESTING = 'names/axiosRequesting';
const RESOLVED = 'names/resolved';
const REJECTED = 'names/rejected';
const RESET = 'names/reset';

const namesAxiosRequesting = () => ({
    type: AXIOSREQUESTING,
});
const namesResolved = (data) => ({
    type: RESOLVED,
    payload: { data },
});
const namesRejected = (error) => ({
    type: REJECTED,
    payload: { error },
});
export const namesReset = () => ({
    type: RESET,
});

export async function changeUserNames(store, token, names) {
    const status = namesData(store.getState()).status;
    const tokenResponse = userToken(store.getState()).response;
    if (status === 'pending' || status === 'updating') {
        return;
    }
    if (tokenResponse != null) {
        store.dispatch(namesAxiosRequesting());
        try {
            const response = await axios({
                method: 'put',
                url: 'http://localhost:3001/api/v1/user/profile',
                headers: { Authorization: `Bearer ${token}` },
                data: names,
            });
            store.dispatch(namesResolved(response.data.body));
        } catch (error) {
            store.dispatch(namesRejected(error));
        }
    }
}

export default function namesReducer(state = initialState, action) {
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
            case RESET: {
                draft.status = 'void';
                draft.response = null;
                draft.error = null;
                return;
            }
            default:
                return;
        }
    });
}
