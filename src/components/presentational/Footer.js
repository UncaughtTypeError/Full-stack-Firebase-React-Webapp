import React from 'react';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    typography: {
        display: 'block',
        margin: 'auto',
    },
}));

const Footer = () => {

    const classes = useStyles();

    return (
        <AppBar position="fixed" color="primary" className={classes.appBar} component="footer">
            <Toolbar variant="dense">
                <Typography component="div" gutterBottom align="center" className={classes.typography}>
                    <small>&copy; Copyright {new Date().getFullYear()}</small>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Footer;
