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
import { userAdditionalProps } from '../redux/actions/actions';

const UserProps = (props) => {

    const   { firebase } = props;

    const   [{ userData, isError, isLoading }, fetchFirebaseUsers] = useFirebaseDataApi(firebase);
    
    const   state_loggedIn      = useSelector(state => state.userLogin.loggedIn),
            state_user          = useSelector(state => state.profileObject),
            dispatch            = useDispatch(),
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
                setAdditionalProps(userProps);
                setIsUser(true);
                setDevicesNum({ 
                    laptops: user.devices.laptops.length, 
                    monitors: user.devices.monitors.length 
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

    return (
        <div>
            {
                isLoading ? (
                    <Loading />
                    ) : state_loggedIn && (
                        isError ? (
                            <Error />
                        ) : (
                            isUser ? (
                                <div>
                                    <UserGreeting 
                                        imageUrl={state_user.imageUrl} 
                                        name={state_user.name} 
                                        role={state_user.role}
                                        laptopsNum={devicesNum.laptops}
                                        monitorsNum={devicesNum.monitors}
                                        isUser={isUser}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <UserGreeting 
                                        imageUrl={state_user.imageUrl} 
                                        name={state_user.name} 
                                        isUser={isUser}
                                    />
                                </div>
                            )
                        )
                    )
            }
        </div>
    );
}

export default withFirebase(UserProps);