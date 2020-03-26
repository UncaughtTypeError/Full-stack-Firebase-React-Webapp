import React, { useEffect } from 'react';
// Components
import withFirebase from './containers/withFirebase';
import UserListItem from './UserListItem';
import Loading from './presentational/Loading';
import Error from './presentational/Error';
// Utils
import useFirebaseDataApi from '../utils/hooks/useFirebaseDataApi';

const UserList = (props) => {

    const { firebase } = props;

    const [{ userData, isError, isLoading }, fetchFirebaseUsers] = useFirebaseDataApi(firebase);

    useEffect(() => {

        fetchFirebaseUsers(firebase);

    },[firebase, isLoading]);

    return (
        <React.Fragment>
            {isLoading ? ( 
                    <Loading />
                ) : isError ? (
                    <Error />
                    ) : (
                        <ul className='userList'>
                            <UserListItem userData={userData} />
                        </ul>
                    )
            }
        </React.Fragment>
    );
}

export default withFirebase(UserList);