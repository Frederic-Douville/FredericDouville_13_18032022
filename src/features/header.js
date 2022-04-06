import produce from 'immer';

const initialState = {
    status: false,
};

const USERISLOG = 'header/userIsLog';
const USERISNOTLOG = 'header/userIsNotLog';

export const headerUserIsLog = () => ({
    type: USERISLOG,
});
export const headerUserIsNotLog = () => ({
    type: USERISNOTLOG,
});

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
