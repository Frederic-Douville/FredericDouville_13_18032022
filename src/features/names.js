/**Feature to change user's name and save it or reset it */
import produce from 'immer';
import { namesData, userToken } from '../utils/selectors';
import axios from 'axios';

/**Initial statement */
const initialState = {
    status: 'void',
    response: null,
    error: null,
};

/**Actions called in the reducer */
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

/**
 * Send a PUT request to the API with token and an object to change user's data
 * @param {function} store hook from react-redux: useStore()
 * @param {String} token  authorization
 * @param {Object} names object which contains new names
 * @returns {Promise}
 * @returns {Promise.resolve<Object>} data object
 * @returns {Promise.reject<Error>} error
 */
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

/**The reducer which contain all the actions and change the statements */
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
