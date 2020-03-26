import { 
    LOG_IN_PENDING, 
    LOG_IN_FAILURE, 
    LOG_IN_SUCCESS, 
    LOG_OUT_SUCCESS,
    SET_PROFILE,
    SET_USER_PROPS,
    UNSET_PROFILE,
    HANDLE_LOADING
} from './actionTypes';

// User Login & Profile Object
export const googleLoginRequest = () => dispatch => {
    console.log('Login Request');
    dispatch({ type: LOG_IN_PENDING });
}

export const googleLoginSuccess = (response) => dispatch => {
    console.log('Login Success',{response});
    dispatch({ type: LOG_IN_SUCCESS, payload: response });
    dispatch({ type: SET_PROFILE, payload: response });
}

export const googleLoginFailure = (error) => dispatch => {
    console.log('Login Error',{error});
    dispatch({ type: LOG_IN_FAILURE, payload: error });
}

export const googleLogoutSuccess = () => dispatch => {
    console.log('Logout Success');
    dispatch({ type: LOG_OUT_SUCCESS });
    dispatch({ type: UNSET_PROFILE });
}

export const userAdditionalProps = (props) => dispatch => {
    console.log('User Props',{props});
    dispatch({ type: SET_USER_PROPS, payload: props });
}

// Utils
export const handleLoading = (boolean) => dispatch => {
    console.log('Handling Loading...');
    dispatch({ type: HANDLE_LOADING, payload: boolean });
}