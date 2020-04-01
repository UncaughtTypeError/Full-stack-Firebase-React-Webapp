import React from 'react';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles(theme => ({
    listItem: {
        top: 'auto',
        bottom: 0,
        padding: 0,
    },
    avatar: {
        marginRight: 10,
    },
    icon: {
        color: theme.palette.action.disabled,
        verticalAlign: 'sub',
        marginLeft: 5,
    }
}));

const PrimaryContent = (props) => {

    const   classes = useStyles();

    const { name, roles } = props;

    return (
        <React.Fragment>
            {name}
            {(roles.viewerRole === 'admin' && roles.userRole === 'admin') && (
                <VpnKeyIcon fontSize="small" className={classes.icon} />
            )}
        </React.Fragment>
    );
}

const SecondaryContent = (props) => {

    const { email } = props;
    
    return (
        <React.Fragment>
            <a href={`mailto:${email}`}>{email}</a>
        </React.Fragment>
    );
}

const ListItemProfile = (props) => {

    const   classes = useStyles();

    const   { profile, ...roles } = props,
            typographyProps = { component: 'div' };

    return (
        <ListItem data-role={roles.viewerRole} className={classes.listItem} component="div">
            <ListItemAvatar>
                <Avatar alt={profile.name} src={profile.imageUrl} className={classes.avatar} />
            </ListItemAvatar>
            <ListItemText 
                primary={<PrimaryContent name={profile.name} {...roles} />} 
                secondary={<SecondaryContent email={profile.email} />} 
                primaryTypographyProps={typographyProps}
                secondaryTypographyProps={typographyProps}
            />
        </ListItem>
    );

}

export default ListItemProfile;