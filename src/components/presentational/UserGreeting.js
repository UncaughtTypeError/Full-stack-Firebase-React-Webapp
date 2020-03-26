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
    },
    avatar: {
        marginLeft: 10,
    }
}));

const PrimaryContent = (props) => {

    const { name } = props;

    return (
        <React.Fragment>
            Welcome {name}
        </React.Fragment>
    );
}

const SecondaryContent = (props) => {

    const { laptopsNum, monitorsNum, isUser } = props;
    
    return (
        <React.Fragment>
            { isUser && (laptopsNum  > 0 && monitorsNum > 0) ? (
                <div>You have <strong>{laptopsNum} Laptop/s</strong> and <strong>{monitorsNum} Monitor/s</strong> assigned to your account.</div>
            ) : (
                <div>You have no devices assigned to your account.</div>
            )}
        </React.Fragment>
    );
}

const UserGreeting = (props) => {

    const   classes = useStyles();

    const   { imageUrl, name, role, laptopsNum, monitorsNum, isUser } = props,
            typographyProps = { color: 'inherit', align: 'right', component: 'div' },
            secondaryContentProps = { laptopsNum, monitorsNum, isUser }

    return (
        <ListItem data-role={role} className={classes.listItem} component="div">
            <ListItemText 
                primary={<PrimaryContent name={name} />} 
                secondary={<SecondaryContent {...secondaryContentProps} />} 
                primaryTypographyProps={typographyProps}
                secondaryTypographyProps={typographyProps}
            />
            <ListItemAvatar>
                <Avatar alt={name} src={imageUrl} className={classes.avatar} />
            </ListItemAvatar>
        </ListItem>
    );

}

export default UserGreeting;