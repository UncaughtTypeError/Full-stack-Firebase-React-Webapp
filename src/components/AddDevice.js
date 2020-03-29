import React, { useState, useEffect } from 'react';
// Components
import withFirebase from './containers/withFirebase';
import FieldSet from './presentational/FieldSet';
import InputTextField from './presentational/InputTextField';
import InputRadio from './presentational/InputRadio';
import InputCheckbox from './presentational/InputCheckbox';
import Users from './presentational/Users';
import Loading from './presentational/Loading';
import Error from './presentational/Error';
// Utils
import useFirebaseDataApi from '../utils/hooks/useFirebaseDataApi';
import writeUserData from '../utils/writeUserData';
import validateFields from '../utils/validateFields';
// Redux
import { useSelector } from 'react-redux';
// Theme
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: 20,
    },
    cardContent: {
        '&:last-child': {
            paddingBottom: theme.spacing(2),
        }
    },
    cardActions: {
        padding: 0,
        '&:not(:empty)': {
            marginTop: theme.spacing(2),
        }
    },
    buttonGroup: {
        width: '100%',
    },
    fieldSet: {
        marginTop: theme.spacing(2),
        paddingTop: theme.spacing(1),
        borderTop: '1px solid rgba(0, 0, 0, 0.12)',
        '& > legend': {
            paddingRight: theme.spacing(1),
        },
    },
    fieldWrap: {
        '& > div:not(:last-child)': {
            padding: theme.spacing(0, 2, 0, 0),
        }
    },
    icon: {
        color: theme.palette.action.disabled,
        verticalAlign: 'bottom',
        marginRight: 5,
    },
}));

const AddItem = (props) => {
    const   state_profileObject = useSelector(state => state.profileObject),
            state_googleId      = state_profileObject.googleId,
            state_role          = state_profileObject.role;

    const   { firebase } = props;

    const classes = useStyles();

    const   [{ userData, isError, isLoading }, fetchFirebaseUsers] = useFirebaseDataApi(firebase);

    const   [deviceData, setDeviceData] = useState({ laptops: false, monitors: false }),
            [deviceType, setDeviceType] = useState(null),
            [addDevice, setAddDevice] = useState({ laptops: false, monitors: false }),
            [isDisabled, setIsDisabled] = useState(true),
            [employeeAssignment, setEmployeeAssignment] = useState(false),
            [userId, setUserId] = useState(state_googleId);

    useEffect(() => {

        fetchFirebaseUsers(firebase);

    },[firebase, isLoading, employeeAssignment]);

    useEffect(() => {

        if(deviceType) {
            setIsDisabled(validateFields(deviceType, deviceData, 'add'));
        }

    },[deviceData]);

    const onEmployeeAssignment = (checkValue) => {
        setEmployeeAssignment(checkValue);
        if (!checkValue) { 
            setUserId(state_googleId);
        }
    }

    const onUserSelect = (googleId) => {
        setUserId(googleId);
    }

    const onDeviceSelection = (target,e) => {
        setDeviceType(target);
        setAddDevice({ [target]:true });
        setIsDisabled(true);
        setDeviceData({ laptops: false, monitors: false });
    }

    const onAdd = () => {
        const   db = firebase.database(),
                ref = db.ref('users');

        let child = null;

        ref.child(userId).once('value', (snapshot) => {

            if(!snapshot.exists()) {
                writeUserData(state_profileObject, ref);
            }

            child = ref.child(userId).child('devices').child(deviceType);

            child.push(deviceData[deviceType]);
        });

    };

    const onCancel = () => {
        setDeviceType(null);
        setAddDevice(false);
        setIsDisabled(true);
    }

    const onEdit = (key, value) => {
        let editData = {};
        editData[deviceType] = { ...deviceData[deviceType], [key]: value };

        setDeviceData({...deviceData, ...editData});
    };

    return (
        <Card className={classes.card} elevation={3}>
            <CardContent className={classes.cardContent}>
                <Typography variant="h6">Add A New Device</Typography>
                <FieldSet legend="Type of device" className={classes.fieldSet}>
                    <RadioGroup row>
                        <InputRadio 
                            id="deviceType_laptop" 
                            name="typeOfDevice" 
                            value="laptops" 
                            defaultChecked={addDevice.laptops} 
                            checked={addDevice.laptops}
                            onChange={e => onDeviceSelection(e.target.value,e)}
                            label="Laptop"
                            htmlFor="deviceType_laptop"
                        />
                        <InputRadio 
                            id="deviceType_monitor" 
                            name="typeOfDevice" 
                            value="monitors" 
                            defaultChecked={addDevice.monitors} 
                            checked={addDevice.monitors}
                            onChange={e => onDeviceSelection(e.target.value,e)}
                            label="Monitor"
                            htmlFor="deviceType_monitor"
                        />
                    </RadioGroup>
                </FieldSet>
                { deviceType === 'laptops' && (
                    <FieldSet legend="Add new laptop" className={classes.fieldSet}>
                        <Box display="flex" alignItems="center" component="div" className={classes.fieldWrap}>
                            <Box flexGrow={1}>
                                <InputTextField 
                                    placeholder='Make / Model'
                                    id='laptop_makeModel'
                                    dataKey='makeModel'
                                    onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                                    label="Make / Model"
                                    htmlFor="laptop_makeModel"
                                />
                            </Box>
                            <Box flexGrow={1}>
                                <InputTextField 
                                    placeholder='Serial No.'
                                    id='laptop_serialNo'
                                    dataKey='serialNo'
                                    onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                                    label="Serial No."
                                    htmlFor="laptop_serialNo"
                                />
                            </Box>
                            <Box>
                                <InputCheckbox 
                                    placeholder='Taken home?'
                                    id='laptop_takenHome'
                                    dataKey='takenHome'
                                    onChange={e => onEdit(e.target.dataset.key, e.target.checked)}
                                    label="Taken home?"
                                    htmlFor="laptop_takenHome"
                                    labelPlacement="start"
                                />
                            </Box>
                        </Box>
                    </FieldSet>
                )}
                {deviceType === 'monitors' && (
                    <FieldSet legend="Add new monitor" className={classes.fieldSet}>
                        <Box display="flex" alignItems="center" component="div" className={classes.fieldWrap}>
                            <Box flexGrow={1}>
                                <InputTextField 
                                    placeholder='Make / Model'
                                    id='monitor_makeModel'
                                    dataKey='makeModel'
                                    onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                                    label="Make / Model"
                                    htmlFor="monitor_makeModel"
                                />
                            </Box>
                            <Box flexGrow={1}>
                                <InputTextField 
                                    placeholder='Serial No.'
                                    id='monitor_serialNo'
                                    dataKey='serialNo'
                                    onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                                    label="Serial No."
                                    htmlFor="monitor_serialNo"
                                />
                            </Box>
                            <Box flexGrow={1}>
                                <InputTextField 
                                    placeholder='Screen Size'
                                    id='monitor_screenSize'
                                    dataKey='screenSize'
                                    onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                                    label="Screen Size"
                                    htmlFor="monitor_screenSize"
                                />
                            </Box>
                        </Box>
                    </FieldSet>
                )}
                {(state_role === 'admin' && (deviceType === 'laptops' || deviceType === 'monitors')) && (
                    <FieldSet legend="Assign to Employee" className={classes.fieldSet}>
                        <InputCheckbox 
                            id="employeeAssignment" 
                            name="employeeAssignment" 
                            defaultChecked={false} 
                            onChange={e => onEmployeeAssignment(e.target.checked)}
                            label="Yes"
                            htmlFor="employeeAssignment"
                        />
                        {employeeAssignment && (
                            isLoading ? (
                                <Loading size={20} display="inline" />
                                ) : (
                                isError ? (
                                    <Error />
                                    ) : (
                                        <List className={classes.list}>
                                            {userData.map(user => (
                                                <Users 
                                                    user={user} 
                                                    selectedUser={userId} 
                                                    key={user.googleId} 
                                                    onClick={() => onUserSelect(user.googleId)} 
                                                />
                                            ))}
                                        </List>
                                    )
                                )
                            )
                        }
                    </FieldSet>
                )}
                <CardActions className={classes.cardActions}>
                    {(deviceType === 'laptops' || deviceType === 'monitors') && (
                        <ButtonGroup variant="outlined" className={classes.buttonGroup}>
                            <Button onClick={() => onAdd()} disabled={isDisabled}>
                                <AddIcon fontSize="small" className={classes.icon} /> Add Device
                            </Button>
                            <Button onClick={() => onCancel()}>
                                <ClearIcon fontSize="small" className={classes.icon} /> Cancel
                            </Button>
                        </ButtonGroup>
                    )}
                </CardActions>
            </CardContent>
        </Card>
    );

}

export default withFirebase(AddItem);