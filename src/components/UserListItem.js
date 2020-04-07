import React, { useState, useEffect } from 'react';
// Components
import withFirebase from './containers/withFirebase';
import ListItemProfile from './presentational/ListItemProfile';
import DevicesTable from './presentational/DevicesTable';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { userAdditionalProps, dataDisplayProps } from '../redux/actions/actions';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import UpdateIcon from '@material-ui/icons/Update';
import ClearIcon from '@material-ui/icons/Clear';
import ComputerIcon from '@material-ui/icons/Computer';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.action.disabled,
        verticalAlign: 'bottom',
        marginRight: 5,
    },
    badge: {
        marginRight: theme.spacing(2),
    }
}));

const UserListItem = (props) => {

    const { user, id } = props;

    const classes = useStyles();
    
    const   state_user                  = useSelector(state => state.profileObject),
            state_displayTypeSummary    = useSelector(state => state.dataDisplayObject.displayTypeSummary),
            dispatch                    = useDispatch(),
            setAdditionalProps          = (props) => dispatch(userAdditionalProps(props)),
            setDataDisplayProps         = (props) => dispatch(dataDisplayProps(props));

    const   [userEdit, setUserEdit] = useState(null),
            [devicesNum, setDevicesNum] = useState({});

    const onUserEdit = (boolean, userId = null) => {
        setUserEdit(userId);
        setAdditionalProps({ dataEdit: boolean });
        setDataDisplayProps({ displayTypeSummary: false });
    }

    useEffect(() => {

        state_displayTypeSummary ? (
            setAdditionalProps({ dataEdit: false })
        ) : (
            setAdditionalProps({ dataEdit: true })
        );

    }, [state_displayTypeSummary]);

    useEffect(() => {

        setDevicesNum({ 
            laptopsNum: user.devices.laptops.length || 0, 
            monitorsNum: user.devices.monitors.length || 0
        });

    }, [user]);

    return (
        <React.Fragment>
            <ListItem key={id} id={user.googleId}>
                <Box component="div" style={{ width: '100%' }}>
                    <Box display="flex" alignItems="center">
                        <Box component="div" flexGrow={1}>
                            <ListItemProfile profile={user.profile} roles={{ viewerRole: state_user.role, userRole: user.role }} />
                        </Box>
                        <Box component="div">
                            {(devicesNum.laptopsNum > 0) && (
                                <Badge className={classes.badge} badgeContent={devicesNum.laptopsNum} color="secondary">
                                    <ComputerIcon className={classes.icon} />
                                </Badge>
                            )}
                            {(devicesNum.monitorsNum > 0) && (
                                <Badge className={classes.badge} badgeContent={devicesNum.monitorsNum} color="secondary">
                                    <DesktopWindowsIcon className={classes.icon} />
                                </Badge>
                            )}
                            {(user.devices.laptops.length > 0 || user.devices.monitors.length > 0) && (
                                // can the current user edit?
                                user.googleId === state_user.googleId || state_user.role === 'admin') && (
                                    // is the current user editing?
                                    state_user.dataEdit && (user.googleId === userEdit) ? (
                                        <Button variant="contained" onClick={() => onUserEdit(false)}>
                                            <ClearIcon fontSize="small" className={classes.icon} /> Done
                                        </Button>
                                    ) : (
                                        <Button variant="outlined" onClick={() => onUserEdit(true, user.googleId)}>
                                            <UpdateIcon fontSize="small" className={classes.icon} /> Update
                                        </Button>
                                    )
                            )}
                        </Box>
                    </Box>
                    <div className='devices'>
                        <div className='devices_laptops'>
                            {user.devices.laptops.length ? (
                                <DevicesTable 
                                    devices={user.devices.laptops} 
                                    deviceType='laptops'
                                    devicesNum={devicesNum.laptopsNum}
                                    state_user={state_user} 
                                    user_edit={userEdit} 
                                    user_googleId={user.googleId} 
                                />
                            ) : (
                                <Typography component="div">No Laptops found...</Typography>
                            )}
                        </div>
                        <div className='devices_monitors'>
                            {user.devices.monitors.length ? (
                                <DevicesTable 
                                    devices={user.devices.monitors} 
                                    deviceType='monitors'
                                    devicesNum={devicesNum.monitorsNum}
                                    state_user={state_user} 
                                    user_edit={userEdit} 
                                    user_googleId={user.googleId} 
                                />
                            ) : (
                                <Typography component="div">No Monitors found...</Typography>
                            )}
                        </div>
                    </div>
                </Box>
            </ListItem>
            <Divider component="li" />
        </React.Fragment>
    );

}

export default withFirebase(UserListItem);