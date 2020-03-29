import React, { useState, useEffect } from 'react';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ComputerIcon from '@material-ui/icons/Computer';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.action.disabled,
        verticalAlign: 'sub',
        marginLeft: 5,
    },
    badge: {
        marginLeft: theme.spacing(1),
        '& > span': {
            fontSize: 10,    
            minWidth: 15,
            width: 15,
            height: 15,
        }
    }
}));

const Users = (props) => {

    const { user, selectedUser, onClick } = props;

    const classes = useStyles();

    const [devicesNum, setDevicesNum] = useState({});

    useEffect(() => {

        setDevicesNum({ 
            laptopsNum: user.devices.laptops.length || 0, 
            monitorsNum: user.devices.monitors.length || 0
        });

    }, [user]);

    return (
        <React.Fragment>
            <ListItem 
                alignItems="flex-start"
                id={user.googleId}
                key={user.googleId}
                role={user.role}
                onClick={onClick}
                dense 
                button
            >
                <ListItemAvatar>
                    <Avatar alt={user.profile.name} src={user.profile.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body1"
                                display="inline"
                            >
                                {user.profile.name}
                            </Typography>
                            {user.role === 'admin' && (
                                <VpnKeyIcon fontSize="small" className={classes.icon} />
                            )}
                        </React.Fragment>
                    }
                    secondary={
                        <Typography
                            component="span"
                            variant="body2"
                            color="textPrimary"
                        >
                            {user.profile.email}
                            {(devicesNum.laptopsNum > 0) && (
                                <Badge className={classes.badge} badgeContent={devicesNum.laptopsNum} color="secondary">
                                    <ComputerIcon fontSize="small" className={classes.icon} />
                                </Badge>
                            )}
                            {(devicesNum.monitorsNum > 0) && (
                                <Badge className={classes.badge} badgeContent={devicesNum.monitorsNum} color="secondary">
                                    <DesktopWindowsIcon fontSize="small" className={classes.icon} />
                                </Badge>
                            )}
                        </Typography>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="Selected user">
                        <Checkbox
                            onClick={onClick}
                            checked={user.googleId === selectedUser ? true : false}
                            tabIndex={-1}
                            disableRipple
                        />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Divider component="li" />
        </React.Fragment>
    );
}

export default Users;