import { HANDLE_SEARCH_FILTER } from '../actions/actionTypes';

const initialSearchFilterResultstate = {}

export default function( state = initialSearchFilterResultstate, action = {} ) {
    switch(action.type) {
        case HANDLE_SEARCH_FILTER: {
            const resultsObject = action.results;
            return { ...state, ...resultsObject }
        }
        default:
            return state;
    }
}