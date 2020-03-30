import React from 'react';
// Components
import DeviceTableRow from './DeviceTableRow';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ComputerIcon from '@material-ui/icons/Computer';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';

const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 650,
    },
    tableContainer: {
        marginBottom: 10,
    },
    tableHeader: {
        backgroundColor: theme.palette.action.selected,
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
    }
}));

const DevicesTable = (props) => {

    const { devices, deviceType, state_user, user_googleId, user_edit } = props;

    const classes = useStyles();

    return (
        <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                    {deviceType === 'laptops' && (
                        <React.Fragment>
                            <TableRow className={classes.tableHeader}>
                                <TableCell colSpan={4}>
                                    <Typography component="h5"><ComputerIcon className={classes.icon} /> Laptops</Typography>
                                </TableCell>
                            </TableRow>
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
                        </React.Fragment>
                    )}
                    {deviceType === 'monitors' && (
                        <React.Fragment>
                        <TableRow className={classes.tableHeader}>
                            <TableCell colSpan={4}>
                                <Typography component="h5"><DesktopWindowsIcon className={classes.icon} /> Monitors</Typography>
                            </TableCell>
                        </TableRow>
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
                        </React.Fragment>
                    )}
                </TableHead>
                <TableBody>
                    {deviceType === 'laptops' && (
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
                    {deviceType === 'monitors' && (
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