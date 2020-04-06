import React from 'react';
// Redux
import { useSelector } from 'react-redux';
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
    },
    mark: {
        background: theme.palette.primary.main,
        color: 'white',
    }
}));

const UserName = (props) => {

    const classes = useStyles();

    const state_searchTerm = useSelector(state => state.searchFilterResults.searchTerm);

    const   { name } = props,
            regex = new RegExp(`(${state_searchTerm})`, 'gi'),
            parts = name.split(regex);

    return (
        <React.Fragment>
            {parts.filter(part => part).map((part, i) => (
                regex.test(part) ? <mark key={i} className={classes.mark}>{part}</mark> : <span key={i}>{part}</span>
            ))}
        </React.Fragment>
    );
}

const PrimaryContent = (props) => {

    const classes = useStyles();

    const { name, roles } = props;

    return (
        <React.Fragment>
            <UserName name={name} />
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