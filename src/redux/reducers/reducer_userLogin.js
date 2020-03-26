import { 
    LOG_IN_PENDING, 
    LOG_IN_FAILURE, 
    LOG_IN_SUCCESS, 
    LOG_OUT_SUCCESS
} from '../actions/actionTypes';

const initialUserLoginState = {
    loggedIn: false,
    response: null,
}

export default function( state = initialUserLoginState, action = {} ) {
    switch(action.type) {
        case LOG_IN_PENDING: {
                console.log('pending');
                return { ...state, loggedIn: false, response: null };
            }
        case LOG_IN_SUCCESS: {
                console.log('success',action.payload);
                const response = action.payload;
                return { ...state, loggedIn: true, response: response };
            }
        case LOG_OUT_SUCCESS: {
                console.log('success');
                return { ...state, loggedIn: false, response: null };
            }
        case LOG_IN_FAILURE: {
                console.log('failure');
                const error = action.payload;
                return { ...state, loggedIn: false, response: error };
            }
        default:
            return state;
    }
}