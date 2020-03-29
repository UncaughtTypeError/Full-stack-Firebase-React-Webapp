import React from 'react';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        marginRight: theme.spacing(2),
    },
    circularProgress: {
        marginRight: theme.spacing(2),
    },
}));

const Loading = (props) => {

    const { size, color, display, text = true } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress className={classes.circularProgress} size={size} color={color} />
            {text && (
                <Typography display={display}>Loading...</Typography>
            )}
        </div>
    );

}

export default Loading;