import React, { useState, useEffect, useRef } from 'react';
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
import Typography from '@material-ui/core/Typography';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        padding: 0,
    },
    text: {
        padding: '20px 0'
    },
    icon: {
        display: 'block',
        fontSize: '3em',
        margin: '20px auto 0 auto',
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
                                        {users.length ? (
                                            users.map(user => (
                                                <React.Fragment>
                                                    <UserListItem user={user} key={user.googleId} id={user.googleId} />
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <Typography align="center" variant="h5" className={classes.text}>
                                                No Results...
                                                <ErrorOutlineIcon fontSize="large" color="disabled" className={classes.icon} />
                                            </Typography>
                                        )}
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