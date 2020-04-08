import React, { useState, useEffect } from 'react';
// Components
import withFirebase from './withFirebase';
import SearchFilter from './SearchFilter';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { dataDisplayProps } from '../../redux/actions/actions';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Badge from '@material-ui/core/Badge';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ComputerIcon from '@material-ui/icons/Computer';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: 5,
        [theme.breakpoints.down(700)]: { // max-width: 700px
            '& > div': {
                flex: '1 1 100%',
            },
        },
    },
    icon: {
        color: theme.palette.action.disabled,
        verticalAlign: 'bottom',
        marginLeft: 5,
        [theme.breakpoints.down(850)]: { // max-width: 850px
            marginLeft: 0,
        },
    },
    chip: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.down(850)]: { // max-width: 850px
            '& > .MuiChip-label': {
                fontSize: 0,
            },
        },
        [theme.breakpoints.down(350)]: { // max-width: 350px
            display: 'none',
        },
    },
    badge: {
        marginRight: 0,
        '& > span': {
            position: 'relative',
            transform: 'scale(1) translate(0%, -5%)',
            background: '#9c9c9c',
        }
    },
}));

const UserListHeader = (props) => {

    const { userData } = props;

    const classes = useStyles();
    
    const   state_displayTypeSummary    = useSelector(state => state.dataDisplayObject.displayTypeSummary),
            dispatch                    = useDispatch(),
            setDataDisplayProps         = (props) => dispatch(dataDisplayProps(props));

    const   [displayType, setDisplayType]   = useState(state_displayTypeSummary),
            [devicesNum, setDevicesNum]     = useState({});

    const onDeviceDetailsDisplay = (event) => {
        setDisplayType(event.target.checked);
    };

    useEffect(() => {

        setDataDisplayProps({ displayTypeSummary: displayType });

    }, [displayType]);

    useEffect(() => {

        setDisplayType(state_displayTypeSummary);

    }, [state_displayTypeSummary]);

    useEffect(() => {

        let deviceCount = {
            laptopsNum: 0, 
            monitorsNum: 0
        };

        userData.map(user => {
            deviceCount = {
                ...deviceCount, 
                laptopsNum: (deviceCount.laptopsNum += user.devices.laptops.length), 
                monitorsNum: (deviceCount.monitorsNum += user.devices.monitors.length) 
            };
        });

        setDevicesNum({ ...deviceCount });

    }, [userData]);

    return (
        <Box className={classes.root} display="flex" flexWrap="wrap" alignItems="end">
            <Box flexGrow={1}>
                <FormControlLabel
                    control={<Switch checked={displayType} onChange={onDeviceDetailsDisplay} />}
                    label={displayType ? (
                        "Detail view"
                    ) : (
                        "Summary view"
                    )}
                />
                <Typography component="h5" display="inline">
                    <Chip
                        className={classes.chip}
                        size="small"
                        label={
                            <React.Fragment>
                                Laptops
                                <ComputerIcon fontSize="small" className={classes.icon} />
                            </React.Fragment>
                        }
                        icon={<Badge className={classes.badge} badgeContent={devicesNum.laptopsNum} color="primary" />}
                    />
                    <Chip
                        className={classes.chip}
                        size="small"
                        label={
                            <React.Fragment>
                                Monitors
                                <DesktopWindowsIcon fontSize="small" className={classes.icon} />
                            </React.Fragment>
                        }
                        icon={<Badge className={classes.badge} badgeContent={devicesNum.monitorsNum} color="primary" />}
                    />
                </Typography>
            </Box>
            <Box flexGrow={1} display="flex" justifyContent="flex-end">
                <SearchFilter userData={userData} />
            </Box>
        </Box>
    );

}

export default withFirebase(UserListHeader);