import React, { useState } from 'react';
// Theme
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    anchorOriginBottomLeft: {
        marginBottom: theme.spacing(5),
    },
}));

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarAlert = (props) => {

    const { message, severity, open } = props;

    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(open);
    console.log({isOpen});

    const onClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
    };

    return (
        <Snackbar 
            className={classes.anchorOriginBottomLeft}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }} 
            open={isOpen} 
            autoHideDuration={6000} 
            onClose={onClose}
        >
            <Alert onClose={onClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
}

export default SnackbarAlert;