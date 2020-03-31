import React, { useState, useEffect } from 'react';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { alertProps } from '../../redux/actions/actions';
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

const SnackbarAlert = () => {

    const classes = useStyles();

    const   state_alertProps = useSelector(state => state.alertObject),
            dispatch         = useDispatch(),
            setAlertProps    = (props) => dispatch(alertProps(props));

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        
        setIsOpen(state_alertProps.open);

    },[state_alertProps]);

    const onClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsOpen(false);
        setAlertProps({ alert: false, severity: '', message: '', open: false });
    };

    return (
        <React.Fragment>
            {(state_alertProps.alert && (
                <Snackbar 
                    className={classes.anchorOriginBottomLeft}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }} 
                    open={isOpen} 
                    autoHideDuration={3000} 
                    onClose={onClose}
                >
                    <Alert onClose={onClose} severity={state_alertProps.severity}>
                        {state_alertProps.message}
                    </Alert>
                </Snackbar>
            ))}
        </React.Fragment>
    );
}

export default SnackbarAlert;