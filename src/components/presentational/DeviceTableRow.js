import React, { useState, useEffect } from 'react';
// Components
import withFirebase from '../containers/withFirebase';
import InputTextField from './InputTextField';
import InputCheckbox from './InputCheckbox';
// Utils
import validateFields from '../../utils/validateFields';
// Redux
import { useDispatch } from 'react-redux';
// Actions
import { alertProps } from '../../redux/actions/actions';
// Theme
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import UpdateIcon from '@material-ui/icons/Update';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
// Responsiveness
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.action.disabled,
        verticalAlign: 'bottom',
        marginRight: 5,
    },
    tableRow: {
        [theme.breakpoints.down(450)]: { // max-width: 450px
            '& .MuiTableCell-body': {
                flexDirection: 'column',
                alignItems: 'end',
                textAlign: 'left',
            },
        },
    },
    tableRowFlex: { // max-width: 960px || max-width: 750px
        display: 'flex',
        flexWrap: 'wrap',
        '& .MuiTableCell-body': {
            flex: '1 1 100%',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'center',
            padding: theme.spacing(1, 2),
        },
        '&:not(:first-child) .MuiTableCell-body:first-child': {
            borderTop: '2px solid rgba(224, 224, 224, 1)',
        },
        '& .MuiTableCell-body > strong': {
            marginRight: theme.spacing(2),
        },
        '& .MuiTableCell-body > label': {
            marginRight: 0,
        },
    },
    tableEmptyColumn: {
        padding: '0 !important',
    },
    tableActionColumn: {
        width: '10%',
        minWidth: 150,
    },
    buttonGroup: {
        width: '100%',
        [theme.breakpoints.down(500)]: { // max-width: 500px
            '& > button': {
                flex: '1 1 50%',
            },
        },
        [theme.breakpoints.down(350)]: { // max-width: 350px
            flexWrap: 'wrap',
            '& > button': {
                flex: '1 1 100%',
                margin: 'auto',
                borderRadius: '4px !important',
                border: '1px solid rgba(0, 0, 0, 0.23) !important',
            },
            '& > button:first-of-type': {
                marginBottom: theme.spacing(2),
            },
        },
    },
}));

const DeviceTableRow = (props) => {

    const   { firebase, device, deviceType, state_user, user_googleId, user_edit } = props,
            label_makeModel = 'Make / Model',
            label_serialNo = 'Serial No.',
            label_takenHome = 'Taken Home?',
            label_screenSize = 'Screen Size';

    const   isBreakpoint_960 = useMediaQuery('(max-width:960px)'),
            isBreakpoint_750 = useMediaQuery('(max-width:750px)'),
            classes = useStyles();

    const   dispatch      = useDispatch(),
            setAlertProps = (props) => dispatch(alertProps(props));

    const   [deviceData, setDeviceData] = useState({}),
            [isDisabled, setIsDisabled] = useState(false),
            [inputChecked, setInputChecked] = useState(device.takenHome),
            [validationData, setValidationData] = useState({});

    useEffect(() => {

        if(validationData) {
            setIsDisabled(validateFields(validationData, 'update'));
        }

    },[validationData]);

    const onRemove = (userId, deviceId, deviceType) => {
        const   db      = firebase.database(),
                ref     = db.ref('users'),
                child   = ref.child(userId).child('devices').child(deviceType).child(deviceId);

        child.remove().then(function(){
            setAlertProps({ alert: true, severity: 'success', message: 'Device Removed.', open: true });
        }).catch(function(error) {
            console.error('Update could not be saved.' + error);
            setAlertProps({ alert: true, severity: 'error', message: 'Database Error. Removal failed...', open: true });
        });
    };

    const onUpdate = (userId, deviceId, deviceType) => {
        const   db      = firebase.database(),
                ref     = db.ref('users'),
                child   = ref.child(userId).child('devices').child(deviceType).child(deviceId);

        let updateData = deviceData[deviceId]; 

        child.once('value', (snapshot) => {
            let existingData = snapshot.val();
            child.update({ ...existingData, ...updateData }).then(function(){
                    setAlertProps({ alert: true, severity: 'success', message: 'Update successful!', open: true });
                }).catch(function(error) {
                    console.error('Update could not be saved.' + error);
                    setAlertProps({ alert: true, severity: 'error', message: 'Database Error. Update failed...', open: true });
                });
        });
    };

    const onEdit = (key, value, deviceId, fieldId, required, type) => {

        let editData = {};
        editData[deviceId] = { ...deviceData[deviceId], [key]: value };

        setDeviceData({...deviceData, ...editData});

        if(required) {
            let fieldValidationData = {},
                invalidity = (value.length || value === true) ? false : true;
            fieldValidationData = { ...validationData, [fieldId]: invalidity };

            setValidationData({...validationData, ...fieldValidationData});
        }

        if(type === 'checkbox') {
            setInputChecked(value);
        }
    };

    return (
        <TableRow key={device.id} id={device.id} className={
            clsx(
                classes.tableRow, 
                ((isBreakpoint_960 && (user_googleId === user_edit)) || isBreakpoint_750) && classes.tableRowFlex
            )
        }>
            {( state_user.dataEdit && 
                (user_googleId === user_edit) && 
                (user_googleId === state_user.googleId || state_user.role === 'admin') ) ? (
                <React.Fragment>
                    <TableCell align="left">
                        <InputTextField 
                            defaultValue={device.makeModel} 
                            dataKey='makeModel' 
                            dataDeviceID={device.id}
                            dataFieldID={device.id+1}
                            error={validationData[device.id+1]}
                            label='Make / Model'
                            onBlur={e => onEdit(
                                e.target.dataset.key, 
                                e.target.value, 
                                e.target.dataset.deviceid, 
                                e.target.dataset.fieldid, 
                                e.target.required
                            )} 
                            required={true}
                        />
                    </TableCell>
                    <TableCell align="right">
                        <InputTextField 
                            defaultValue={device.serialNo} 
                            dataKey='serialNo' 
                            dataDeviceID={device.id}
                            dataFieldID={device.id+2}
                            error={validationData[device.id+2]}
                            label='Serial No.'
                            onBlur={e => onEdit(
                                e.target.dataset.key, 
                                e.target.value, 
                                e.target.dataset.deviceid, 
                                e.target.dataset.fieldid, 
                                e.target.required
                            )} 
                            required={true}
                        />
                    </TableCell>
                    {deviceType === 'laptops' && (
                        <TableCell align="right">
                            {isBreakpoint_960 && (
                                <strong>{label_takenHome}:</strong> 
                            )}
                            <InputCheckbox 
                                defaultValue={device.takenHome} 
                                dataKey='takenHome' 
                                dataDeviceID={device.id}
                                dataFieldID={device.id+3}
                                error={validationData[device.id+3]}
                                checked={inputChecked}
                                type='checkbox'
                                onChange={e => onEdit(
                                    e.target.dataset.key, 
                                    e.target.checked ? true : false, 
                                    e.target.dataset.deviceid, 
                                    e.target.dataset.fieldid, 
                                    e.target.required,
                                    e.target.type
                                )} 
                                required={false}
                            />
                        </TableCell>
                    )}
                    {deviceType === 'monitors' && (
                        <TableCell align="right">
                            <InputTextField 
                                defaultValue={device.screenSize} 
                                dataKey='screenSize' 
                                dataDeviceID={device.id}
                                dataFieldID={device.id+4}
                                error={validationData[device.id+4]}
                                label='Screen Size'
                                onBlur={e => onEdit(
                                    e.target.dataset.key, 
                                    e.target.value, 
                                    e.target.dataset.deviceid, 
                                    e.target.dataset.fieldid, 
                                    e.target.required
                                )}
                                required={true}
                            />
                        </TableCell>
                    )}
                    <TableCell align="right" className={classes.tableActionColumn}>
                        <ButtonGroup variant="outlined" className={classes.buttonGroup}>
                            <Button onClick={() => onUpdate(user_googleId, device.id, deviceType)} disabled={isDisabled}>
                                <UpdateIcon fontSize="small" className={classes.icon} /> Update
                            </Button>
                            <Button onClick={() => onRemove(user_googleId, device.id, deviceType)}>
                                <ClearIcon fontSize="small" className={classes.icon} /> Remove
                            </Button>
                        </ButtonGroup>
                    </TableCell>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <TableCell align="left">
                        {isBreakpoint_750 && (
                            <strong>{label_makeModel}:</strong> 
                        )}
                        <span>{device.makeModel}</span>
                    </TableCell>
                    <TableCell align="right">
                        {isBreakpoint_750 && (
                            <strong>{label_serialNo}:</strong> 
                        )}
                        <span>{device.serialNo}</span>
                    </TableCell>
                    {deviceType === 'laptops' && (
                        <TableCell align="right">
                            {isBreakpoint_750 && (
                                <strong>{label_takenHome}:</strong> 
                            )}
                            {device.takenHome ? (
                                <span><CheckIcon className={classes.icon} /></span>
                            ) : (
                                <span><ClearIcon className={classes.icon} /></span>
                            )}
                        </TableCell>
                    )}
                    {deviceType === 'monitors' && (
                        <TableCell align="right">
                            {isBreakpoint_750 && (
                                <strong>{label_screenSize}:</strong> 
                            )}
                            <span>{device.screenSize}</span>
                        </TableCell>
                    )}
                    <TableCell align="right" className={classes.tableEmptyColumn}></TableCell>
                </React.Fragment>
            )}
        </TableRow>
    );

}

export default withFirebase(DeviceTableRow);