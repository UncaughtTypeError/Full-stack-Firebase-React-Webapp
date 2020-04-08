import React from 'react';
// Components
import DeviceTableRow from './DeviceTableRow';
// Redux
import { useSelector } from 'react-redux';
// Theme
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ComputerIcon from '@material-ui/icons/Computer';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
// Responsiveness
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
        [theme.breakpoints.down(750)]: { // max-width: 750px
            minWidth: '100%',
        },
    },
    tableContainer: {
        marginBottom: 10,
    },
    tableHeaderWrap: {
    },
    tableHeaderWrapFlex: { // max-width: 960px || max-width: 750px
        '& > tr': {
            justifyContent: 'space-between',
            display: 'flex',
        },
        '& > tr:last-child:not([class*="tableHeader"])': {
            display: 'none',
        }
    },
    tableHeader: {
        backgroundColor: theme.palette.action.selected,
        [theme.breakpoints.down(750)]: { // max-width: 750px
            justifyContent: 'space-between',
        },
    },
    tableLeadColumn: {
        minWidth: 300,
    },
    tableDataColumn: {
        width: '20%',
        minWidth: 150,
    },
    tableEmptyColumn: {
        padding: '0 !important',
    },
    icon: {
        color: theme.palette.action.disabled,
        verticalAlign: 'bottom',
    },
    badge: {
        marginRight: 0,
        '& > span': {
            position: 'relative',
            transform: 'scale(1) translate(0%, 0%)',
            background: '#9c9c9c',
        }
    }
}));

const DevicesTable = (props) => {

    const { devices, deviceType, devicesNum, state_user, user_googleId, user_edit } = props;
    
    const state_displayTypeSummary = useSelector(state => state.dataDisplayObject.displayTypeSummary);

    const   isBreakpoint_960 = useMediaQuery('(max-width:960px)'),
            isBreakpoint_750 = useMediaQuery('(max-width:750px)'),
            classes = useStyles();

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead className={
                    clsx(
                        classes.tableHeaderWrap, 
                        ((isBreakpoint_960 && (user_googleId === user_edit)) || isBreakpoint_750) && classes.tableHeaderWrapFlex
                    )
                }>
                    {deviceType === 'laptops' && (
                        <React.Fragment>
                            <TableRow className={classes.tableHeader}>
                                <TableCell colSpan={2}>
                                    <Typography component="h5"><ComputerIcon className={classes.icon} /> Laptops</Typography>
                                </TableCell>
                                <TableCell colSpan={2} align="right">
                                    <Badge className={classes.badge} badgeContent={devicesNum} color="primary" />
                                </TableCell>
                            </TableRow>
                            {!state_displayTypeSummary && (
                                <TableRow>
                                    <TableCell align="left" className={classes.tableLeadColumn}>Make / Model</TableCell>
                                    <TableCell align="right" className={classes.tableDataColumn}>Serial No.</TableCell>
                                    <TableCell align="right" className={classes.tableDataColumn}>Taken Home?</TableCell>
                                    {( state_user.dataEdit && 
                                        (user_googleId === user_edit) && 
                                        (user_googleId === state_user.googleId || state_user.role === 'admin') ) ? (
                                            <TableCell align="right" className={classes.tableDataColumn}>Actions</TableCell>
                                        ) : (
                                            <TableCell align="right" className={classes.tableEmptyColumn}></TableCell>
                                    )}
                                </TableRow>
                            )}
                        </React.Fragment>
                    )}
                    {deviceType === 'monitors' && (
                        <React.Fragment>
                        <TableRow className={classes.tableHeader}>
                            <TableCell colSpan={2}>
                                <Typography component="h5"><DesktopWindowsIcon className={classes.icon} /> Monitors</Typography>
                            </TableCell>
                            <TableCell colSpan={2} align="right">
                                <Badge className={classes.badge} badgeContent={devicesNum} color="primary" />
                            </TableCell>
                        </TableRow>
                        {!state_displayTypeSummary && (
                            <TableRow>
                                <TableCell align="left" className={classes.tableLeadColumn}>Make / Model</TableCell>
                                <TableCell align="right" className={classes.tableDataColumn}>Serial No.</TableCell>
                                <TableCell align="right" className={classes.tableDataColumn}>Screen Size</TableCell>
                                {( state_user.dataEdit && 
                                    (user_googleId === user_edit) && 
                                    (user_googleId === state_user.googleId || state_user.role === 'admin') ) ? (
                                        <TableCell align="right" className={classes.tableDataColumn}>Actions</TableCell>
                                    ) : (
                                        <TableCell align="right" className={classes.tableEmptyColumn}></TableCell>
                                )}
                            </TableRow>
                        )}
                        </React.Fragment>
                    )}
                </TableHead>
                <TableBody>
                    {(deviceType === 'laptops' && !state_displayTypeSummary) && (
                        devices.map(laptop => (
                            <DeviceTableRow 
                                device={laptop} 
                                deviceType={deviceType}
                                key={laptop.id} 
                                id={laptop.id}
                                state_user={state_user} 
                                user_edit={user_edit} 
                                user_googleId={user_googleId}
                            />
                        ))
                    )}
                    {(deviceType === 'monitors' && !state_displayTypeSummary) && (
                        devices.map(monitor => (
                            <DeviceTableRow 
                                device={monitor} 
                                deviceType={deviceType}
                                key={monitor.id} 
                                id={monitor.id}
                                state_user={state_user} 
                                user_edit={user_edit} 
                                user_googleId={user_googleId}
                            />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );

}

export default DevicesTable;