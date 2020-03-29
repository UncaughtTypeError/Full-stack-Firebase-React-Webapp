import React, { useEffect } from 'react';
// Components
import withFirebase from './containers/withFirebase';
import UserListItem from './UserListItem';
import Loading from './presentational/Loading';
import Error from './presentational/Error';
// Utils
import useFirebaseDataApi from '../utils/hooks/useFirebaseDataApi';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        padding: 0,
    },
}));

const UserList = (props) => {

    const { firebase } = props;

    const classes = useStyles();

    const [{ userData, isError, isLoading }, fetchFirebaseUsers] = useFirebaseDataApi(firebase);

    useEffect(() => {

        fetchFirebaseUsers(firebase);

    },[firebase, isLoading]);

    return (
        <React.Fragment>
            {isLoading ? ( 
                <Box display="flex" justifyContent="center" alignItems="center" component="div" style={{ width: '100%' }}>
                    <Loading text={false} />
                </Box>
                ) : isError ? (
                    <Error />
                    ) : (
                        <Paper elevation={3}>
                            <List className={classes.list}>
                                {userData.map(user => (
                                    <UserListItem user={user} key={user.googleId} id={user.googleId} />
                                ))}
                            </List>
                        </Paper>
                    )
            }
        </React.Fragment>
    );
}

export default withFirebase(UserList);