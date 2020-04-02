import React, { useState, useEffect } from 'react';
// Components
import withFirebase from './containers/withFirebase';
import UserListHeader from './containers/UserListHeader';
import UserListItem from './UserListItem';
import Loading from './presentational/Loading';
import Error from './presentational/Error';
// Utils
import useFirebaseDataApi from '../utils/hooks/useFirebaseDataApi';
// Redux
import { useSelector } from 'react-redux';
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

    const state_filteredResults = useSelector(state => state.searchFilterResults.resultsObject);

    const [{ userData, isError, isLoading }, fetchFirebaseUsers] = useFirebaseDataApi(firebase);

    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetchFirebaseUsers(firebase);

    },[firebase, isLoading]);

    useEffect(() => {

        if(state_filteredResults) {
            setUsers(state_filteredResults);
        } else {
            setUsers(userData);
        }
        console.log({userData},{users},{state_filteredResults});

    },[state_filteredResults, userData]);

    return (
        <React.Fragment>
            {isLoading ? ( 
                <Box display="flex" justifyContent="center" alignItems="center" component="div" style={{ width: '100%' }}>
                    <Loading text={false} />
                </Box>
                ) : isError ? (
                    <Error />
                    ) : (users && (
                            <React.Fragment>
                                <UserListHeader userData={userData} />
                                <Paper elevation={3}>
                                    <List className={classes.list}>
                                        {users.map(user => (
                                            <UserListItem user={user} key={user.googleId} id={user.googleId} />
                                        ))}
                                    </List>
                                </Paper>
                            </React.Fragment>
                        )
                    )
            }
        </React.Fragment>
    );
}

export default withFirebase(UserList);