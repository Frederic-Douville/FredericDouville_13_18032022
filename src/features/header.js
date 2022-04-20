/**Feature to change the header link "sign in" into "sign out" */
import produce from 'immer';

/**Initial statement */
const initialState = {
    status: false,
};

/**Actions called in the reducer */
const USERISLOG = 'header/userIsLog';
const USERISNOTLOG = 'header/userIsNotLog';

export const headerUserIsLog = () => ({
    type: USERISLOG,
});
export const headerUserIsNotLog = () => ({
    type: USERISNOTLOG,
});

/**The reducer which contain all the actions and change the statement */
export default function headerReducerstate(state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case USERISLOG: {
                draft.status = true;
                return;
            }
            case USERISNOTLOG: {
                draft.status = false;
                return;
            }
            default:
                return;
        }
    });
}
