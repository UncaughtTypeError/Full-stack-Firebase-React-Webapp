import React, { useState } from 'react';
// Theme
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
// Responsiveness
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    listItem: {
        top: 'auto',
        bottom: 0,
        [theme.breakpoints.down('sm')]: { // max-width: 960px
            flexDirection: 'column-reverse',
        },
    },
    avatar: {
        [theme.breakpoints.up('md')]: { // min-width: 960px
            marginLeft: 10,
        },
        [theme.breakpoints.down('sm')]: { // max-width: 960px
            width: 80,
            height: 'auto',
            margin: `${theme.spacing(1)}px auto`,
        },
    },
    menuIcon: {
        marginRight: 10,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
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
            { isUser && (laptopsNum  > 0 || monitorsNum > 0) ? (
                <small>You have <strong>{laptopsNum} Laptop/s</strong> and <strong>{monitorsNum} Monitor/s</strong> assigned to your account.</small>
            ) : (
                <small>You have no devices assigned to your account.</small>
            )}
        </React.Fragment>
    );
}

const UserProfile = (props) => {

    const   isBreakpoint = useMediaQuery('(min-width:960px)'),
            classes = useStyles();

    const   { imageUrl, name, role, laptopsNum, monitorsNum, isUser } = props,
            typographyProps = { color: 'inherit', align: isBreakpoint ? 'right' : 'center', component: 'div' },
            secondaryContentProps = { laptopsNum, monitorsNum, isUser };

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

const UserGreeting = (props) => {

    const   isBreakpoint = useMediaQuery('(min-width:960px)'),
            theme = useTheme(),
            classes = useStyles();

    const [isOpen, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(false);
    };

    return (
        <React.Fragment>
            {isBreakpoint ? (
                <UserProfile {...props} />
            ) : (
                <React.Fragment>
                    <div className={classes.drawerHeader} />
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuIcon, isOpen && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer
                            className={classes.drawer}
                            variant="temporary"
                            anchor="right"
                            open={isOpen}
                            onClose={handleDrawerClose}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                    >
                        <div className={classes.drawerHeader}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <UserProfile {...props} />
                    </Drawer>
                </React.Fragment>
            )}
        </React.Fragment>
    );

}

export default UserGreeting;