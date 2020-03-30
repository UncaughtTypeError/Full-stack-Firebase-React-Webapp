import React, { useState, useEffect } from 'react';
// Components
import withFirebase from '../containers/withFirebase';
import InputTextField from './InputTextField';
import InputCheckbox from './InputCheckbox';
// Utils
import validateFields from '../../utils/validateFields';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import UpdateIcon from '@material-ui/icons/Update';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(theme => ({
    icon: {
        color: theme.palette.action.disabled,
        verticalAlign: 'bottom',
        marginRight: 5,
    },
    tableEmptyColumn: {
        padding: '0 !important',
    },
    tableActionColumn: {
        width: '10%',
        minWidth: 150,
    },
}));

const DeviceTableRow = (props) => {

    const { firebase, device, deviceType, state_user, user_googleId, user_edit } = props;

    const classes = useStyles();

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

        child.remove();
    };

    const onUpdate = (userId, deviceId, deviceType) => {
        const   db      = firebase.database(),
                ref     = db.ref('users'),
                child   = ref.child(userId).child('devices').child(deviceType).child(deviceId);

        let updateData = deviceData[deviceId]; 

        child.once('value', (snapshot) => {
            let existingData = snapshot.val();
            child.update({ ...existingData, ...updateData });
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
        <TableRow key={device.id} id={device.id}>
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
                        <ButtonGroup variant="outlined">
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
                    <TableCell align="left">{device.makeModel}</TableCell>
                    <TableCell align="right">{device.serialNo}</TableCell>
                    {deviceType === 'laptops' && (
                        <TableCell align="right">
                            {device.takenHome ? (
                                <CheckIcon className={classes.icon} />
                            ) : (
                                <ClearIcon className={classes.icon} />
                            )}
                        </TableCell>
                    )}
                    {deviceType === 'monitors' && (
                        <TableCell align="right">{device.screenSize}</TableCell>
                    )}
                    <TableCell align="right" className={classes.tableEmptyColumn}></TableCell>
                </React.Fragment>
            )}
        </TableRow>
    );

}

export default withFirebase(DeviceTableRow);