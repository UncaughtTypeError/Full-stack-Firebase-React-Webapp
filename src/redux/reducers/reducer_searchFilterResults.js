import { 
    HANDLE_SEARCH_FILTER,
    STORE_SEARCH_FILTER 
} from '../actions/actionTypes';

const initialSearchFilterState = {
    searchTerm: null,
    resultsObject: null
}

export default function( state = initialSearchFilterState, action = {} ) {
    switch(action.type) {
        case HANDLE_SEARCH_FILTER: {
            const resultsObject = action.payload;
            return { ...state, resultsObject }
        }
        case STORE_SEARCH_FILTER: {
            const term = action.payload;
            return { ...state, searchTerm: term }
        }
        default:
            return state;
    }
}