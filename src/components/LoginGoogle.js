import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// Config
import { CLIENT_ID } from '../config/googleOAuth';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { 
    googleLoginRequest,
    googleLoginSuccess,
    googleLoginFailure,
    googleLogoutSuccess
} from '../redux/actions/actions';

const LoginGoogle = () => {
    
    const   loggedIn        = useSelector(state => state.userLogin.loggedIn),
            dispatch        = useDispatch(),
            loginRequest    = () => dispatch(googleLoginRequest()),
            loginSuccess    = (response) => dispatch(googleLoginSuccess(response)),
            loginFailure    = (error) => dispatch(googleLoginFailure(error)),
            logoutSuccess   = () => dispatch(googleLogoutSuccess());

    return (
        <React.Fragment>
            {loggedIn ? (
                <GoogleLogout
                    clientId={CLIENT_ID}
                    buttonText="Logout"
                    onLogoutSuccess={logoutSuccess}
                />
            ) : (
                <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText="Login"
                    onRequest={loginRequest}
                    onSuccess={loginSuccess}
                    onFailure={loginFailure}
                    cookiePolicy={'single_host_origin'}
                />
            )}
        </React.Fragment>
    );
}

export default LoginGoogle;