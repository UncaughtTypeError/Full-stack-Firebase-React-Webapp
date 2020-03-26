import { HANDLE_LOADING } from '../actions/actionTypes';

const initialLoadingState = {
    isLoading: false,
}

export function handleLoading( state = initialLoadingState, action = {} ) {
    switch(action.type) {
        case HANDLE_LOADING: {
                console.log('loading state:',action.payload);
                const boolean = action.payload;
                return { ...state, isLoading: boolean };
            }
        default:
            return state;
    }
}