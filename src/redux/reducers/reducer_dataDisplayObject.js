import { HANDLE_DISPLAY } from '../actions/actionTypes';

const initialDisplayObjectState = {
    displayTypeSummary: false,
}

export default function( state = initialDisplayObjectState, action = {} ) {
    switch(action.type) {
        case HANDLE_DISPLAY: {
            const displayObject = action.payload;
            return { ...state, ...displayObject }
        }
        default:
            return state;
    }
}