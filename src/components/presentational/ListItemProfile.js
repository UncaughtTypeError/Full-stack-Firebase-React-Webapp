import React from 'react';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    listItem: {
        top: 'auto',
        bottom: 0,
        padding: 0,
    },
    avatar: {
        marginRight: 10,
    }
}));

const PrimaryContent = (props) => {

    const { name } = props;

    return (
        <React.Fragment>
            {name}
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

    const   { profile, role } = props,
            typographyProps = { component: 'div' };

    return (
        <ListItem data-role={role} className={classes.listItem} component="div">
            <ListItemAvatar>
                <Avatar alt={profile.name} src={profile.imageUrl} className={classes.avatar} />
            </ListItemAvatar>
            <ListItemText 
                primary={<PrimaryContent name={profile.name} />} 
                secondary={<SecondaryContent email={profile.email} />} 
                primaryTypographyProps={typographyProps}
                secondaryTypographyProps={typographyProps}
            />
        </ListItem>
    );

}

export default ListItemProfile;