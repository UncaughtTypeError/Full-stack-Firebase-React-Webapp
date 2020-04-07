import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// Config
import { CLIENT_ID } from '../../config/googleOAuth';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { 
    googleLoginRequest,
    googleLoginSuccess,
    googleLoginFailure,
    googleLogoutSuccess
} from '../../redux/actions/actions';
// Theme
import Button from '@material-ui/core/Button';

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
                    icon={true}
                    onLogoutSuccess={logoutSuccess}
                    render={(renderProps) => (
                        <Button 
                            variant="contained" 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                        >
                            Logout
                        </Button>
                    )}
                />
            ) : (
                <GoogleLogin
                    clientId={CLIENT_ID}
                    buttonText="Login"
                    icon={true}
                    onRequest={loginRequest}
                    onSuccess={loginSuccess}
                    onFailure={loginFailure}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => (
                        <Button 
                            variant="outlined" 
                            onClick={renderProps.onClick} 
                            disabled={renderProps.disabled}
                        >
                            Login with Google
                        </Button>
                    )}
                />
            )}
        </React.Fragment>
    );
}

export default LoginGoogle;