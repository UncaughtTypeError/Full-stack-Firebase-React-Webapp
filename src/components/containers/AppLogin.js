import React from 'react';
// Components
import LoginGoogle from '../LoginGoogle';
import Footer from '../presentational/Footer';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    gridContainer: {
        position: 'absolute',
        top: 0,
        bottom: 50,
    },
    logo: {
        height: 0,
        paddingTop: '56.25%', // 16:9
        backgroundSize: "80%",
        backgroundColor: theme.palette.primary.main,
    },
    card: {
        margin: 'auto',
        width: '100%',
        textAlign: 'center',
    },
    typography: {
        fontWeight: 300,
        marginBottom: 30,
    }
}));

const AppLogin = () => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid className={classes.gridContainer} container alignItems="center" justify="center">
                <Grid item xs={2}>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.logo}
                            image="https://webseo.co.za/wp-content/uploads/2017/06/Web-SEO-Online-Logo-white-transparent-ver-2.png"
                            title="WebSEO Online Devices"
                        />
                        <CardContent>
                            <Typography className={classes.typography} variant="h6">WebSEO Online Devices</Typography>
                            <LoginGoogle />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Footer />
        </React.Fragment>
    );
}

export default AppLogin;