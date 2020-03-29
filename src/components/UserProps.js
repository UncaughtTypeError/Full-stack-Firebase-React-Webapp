import React, { useState, useEffect } from 'react';
// Components
import withFirebase from './containers/withFirebase';
import UserGreeting from './presentational/UserGreeting';
import Loading from './presentational/Loading';
import Error from './presentational/Error';
// Utils
import useFirebaseDataApi from '../utils/hooks/useFirebaseDataApi';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { userAdditionalProps, userDevicesProps } from '../redux/actions/actions';

const UserProps = (props) => {

    const   { firebase } = props;

    const   [{ userData, isError, isLoading }, fetchFirebaseUsers] = useFirebaseDataApi(firebase);
    
    const   state_loggedIn      = useSelector(state => state.userLogin.loggedIn),
            state_user          = useSelector(state => state.profileObject),
            state_devices       = useSelector(state => state.devicesObject),
            dispatch            = useDispatch(),
            setDevicesProps     = (props) => dispatch(userDevicesProps(props)),
            setAdditionalProps  = (props) => dispatch(userAdditionalProps(props));

    const   [isUser, setIsUser]         = useState(false),
            [userProps, setUserProps]   = useState({}),
            [devicesNum, setDevicesNum] = useState({});

    useEffect(() => {

        fetchFirebaseUsers(firebase);

    },[firebase, isLoading]);

    useEffect(() => {

        userData.some(user => {
            if(state_user.googleId === user.googleId) {
                setUserProps({ 
                    role: user.role, 
                    userExists: true,
                    dataEdit: false,
                });
                setIsUser(true);
                setDevicesNum({ 
                    laptopsNum: user.devicesNum.laptopsNum, 
                    monitorsNum: user.devicesNum.monitorsNum 
                });
            } else {
                setUserProps({ 
                    userExists: false, 
                });
                setAdditionalProps(userProps);
                setIsUser(false);
            }
            return state_user.googleId === user.googleId;
        });

    }, [userData]);

    useEffect(() => {

        if(isUser) {
            setAdditionalProps(userProps);
            setDevicesProps(devicesNum);
        }

    },[userProps, devicesNum]);

    return (
        <React.Fragment>
            {
                isLoading ? (
                    <Loading size={20} color="inherit" display="inline" />
                    ) : state_loggedIn && (
                        isError ? (
                            <Error />
                        ) : (
                            isUser ? (
                                <UserGreeting 
                                    imageUrl={state_user.imageUrl} 
                                    name={state_user.name} 
                                    role={state_user.role}
                                    laptopsNum={state_devices.laptopsNum}
                                    monitorsNum={state_devices.monitorsNum}
                                    isUser={isUser}
                                />
                            ) : (
                                <UserGreeting 
                                    imageUrl={state_user.imageUrl} 
                                    name={state_user.name} 
                                    isUser={isUser}
                                />
                            )
                        )
                    )
            }
        </React.Fragment>
    );
}

export default withFirebase(UserProps);