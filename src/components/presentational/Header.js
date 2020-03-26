import React from 'react';
// Components
import LoginGoogle from '../LoginGoogle';
import UserProps from '../UserProps';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles(theme => ({
    logo: {
        width: 'auto',
        height: 50,
        marginRight: 10,
    },
    toTop: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        zIndex: 9999,
    },
    typography: {
        fontWeight: 300,
    }
}));

const ScrollTop = (props) => {

    const { children } = props;
    const classes = useStyles();
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.toTop}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
};

const HideOnScroll = (props) => {

    const { children } = props;
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
};

const Header = (props) => {

    const classes = useStyles();

    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar color="primary">
                    <Toolbar>
                        <Box display="flex" alignItems="center" style={{ width: '100%' }}>
                            <Box display="flex" alignItems="center" flexGrow={1}>
                                <img 
                                    src="https://webseo.co.za/wp-content/uploads/2017/06/Web-SEO-Online-Logo-white-transparent-ver-2.png" 
                                    alt="WebSEO Online Devices"
                                    className={classes.logo} 
                                />
                                <Typography className={classes.typography} variant="h6">WebSEO Online Devices</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <UserProps />
                                <LoginGoogle/>
                            </Box>
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar id="back-to-top-anchor" />
            <ScrollTop {...props}>
                <Fab color="secondary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}

export default Header;