import { HANDLE_FEEDBACK } from '../actions/actionTypes';

const initialAlertObjectState = {
    alert: false,
    severity: '',
    message: '',
    open: false,
}

export default function( state = initialAlertObjectState, action = {} ) {
    switch(action.type) {
        case HANDLE_FEEDBACK: {
            const alertObject = action.payload;
            return { ...state, ...alertObject }
        }
        default:
            return state;
    }
}