import { 
    LOG_IN_PENDING, 
    LOG_IN_FAILURE, 
    LOG_IN_SUCCESS, 
    LOG_OUT_SUCCESS,
    SET_PROFILE,
    SET_USER_PROPS,
    UNSET_PROFILE,
    SET_DEVICE_PROPS,
    HANDLE_LOADING,
    HANDLE_FEEDBACK,
    HANDLE_DISPLAY,
    HANDLE_SEARCH_FILTER,
    STORE_SEARCH_FILTER
} from './actionTypes';

// User Login & Profile Object
export const googleLoginRequest = () => dispatch => {
    console.log('ACTION: Login Request');
    dispatch({ type: LOG_IN_PENDING });
}

export const googleLoginSuccess = (response) => dispatch => {
    console.log('ACTION: Login Success',{response});
    dispatch({ type: LOG_IN_SUCCESS, payload: response });
    dispatch({ type: SET_PROFILE, payload: response });
}

export const googleLoginFailure = (error) => dispatch => {
    console.log('ACTION: Login Error',{error});
    dispatch({ type: LOG_IN_FAILURE, payload: error });
}

export const googleLogoutSuccess = () => dispatch => {
    console.log('ACTION: Logout Success');
    dispatch({ type: LOG_OUT_SUCCESS });
    dispatch({ type: UNSET_PROFILE });
}

export const userAdditionalProps = (props) => dispatch => {
    console.log('ACTION: User Props',{props});
    dispatch({ type: SET_USER_PROPS, payload: props });
}

// Devices Object
export const userDevicesProps = (props) => dispatch => {
    console.log('ACTION: Device Props',{props});
    dispatch({ type: SET_DEVICE_PROPS, payload: props });
}

// Utils
export const handleLoading = (boolean) => dispatch => {
    console.log('ACTION: Handling Loading...');
    dispatch({ type: HANDLE_LOADING, payload: boolean });
}

// Alert Feedback
export const alertProps = (props) => dispatch => {
    console.log('ACTION: Alert',{props});
    dispatch({ type: HANDLE_FEEDBACK, payload: props });
}

// Data Display
export const dataDisplayProps = (props) => dispatch => {
    console.log('ACTION: Data Display Props',{props});
    dispatch({ type: HANDLE_DISPLAY, payload: props });
}

// Search Filter Results
export const handleSearchFilter = (results) => dispatch => {
    console.log('ACTION: Search Filter Results',{results});
    dispatch({ type: HANDLE_SEARCH_FILTER, payload: results });
}

export const storeSearchFilter = (term) => dispatch => {
    console.log('ACTION: Search Filter Term',{term});
    dispatch({ type: STORE_SEARCH_FILTER, payload: term });
}