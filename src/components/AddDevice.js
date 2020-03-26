import React, { useState, useEffect } from 'react';
// Components
import withFirebase from './containers/withFirebase';
import FieldSet from './presentational/FieldSet';
import Input from './presentational/Input';
import Users from './presentational/Users';
import Loading from './presentational/Loading';
import Error from './presentational/Error';
// Utils
import useFirebaseDataApi from '../utils/hooks/useFirebaseDataApi';
import writeUserData from '../utils/writeUserData';
// Redux
import { useSelector } from 'react-redux';

const AddItem = (props) => {
    const   state_profileObject = useSelector(state => state.profileObject),
            state_googleId      = state_profileObject.googleId,
            state_role          = state_profileObject.role;

    const   { firebase } = props;

    const   [{ userData, isError, isLoading }, fetchFirebaseUsers] = useFirebaseDataApi(firebase);

    const   [deviceData, setDeviceData] = useState({}),
            [deviceType, setDeviceType] = useState(null),
            [addDevice, setAddDevice] = useState({ laptops: false, monitors: false }),
            [employeeAssignment, setEmployeeAssignment] = useState(false),
            [userId, setUserId] = useState(state_googleId);

    useEffect(() => {

        fetchFirebaseUsers(firebase);

    },[firebase, isLoading, employeeAssignment]);

    const onEmployeeAssignment = (checkValue) => {
        setEmployeeAssignment(checkValue);
        if (!checkValue) { 
            setUserId(state_googleId);
        }
    }

    const onUserSelect = (googleId) => {
        setUserId(googleId);
    }

    const onDeviceSelection = (target) => {
        setDeviceType(target);
        setAddDevice({ [target]:true });
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
    }

    const onEdit = (key, value) => {
        let editData = {};
        editData[deviceType] = { ...deviceData[deviceType], [key]: value };

        setDeviceData({...deviceData, ...editData});
    };

    return (
        <React.Fragment> 
            <FieldSet legend="Type of device">
                <Input 
                    type="radio" 
                    id="deviceType_laptop" 
                    name="typeOfDevice" 
                    defaultValue="laptops" 
                    defaultChecked={addDevice.laptops} 
                    onChange={e => onDeviceSelection(e.target.value)} 
                    label="Laptop"
                    htmlFor="deviceType_laptop"
                />
                
                <Input 
                    type="radio" 
                    id="deviceType_monitor" 
                    name="typeOfDevice" 
                    defaultValue="monitors" 
                    defaultChecked={addDevice.monitors} 
                    onChange={e => onDeviceSelection(e.target.value)} 
                    label="Monitor"
                    htmlFor="deviceType_monitor"
                />
            </FieldSet>
            { deviceType === 'laptops' && (
                <FieldSet legend="Add new laptop">
                    <Input 
                        placeholder='Make / Model'
                        id='laptop_makeModel'
                        dataKey='makeModel'
                        onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                        label="Make / Model"
                        htmlFor="laptop_makeModel"
                    />

                    <Input 
                        placeholder='Serial No.'
                        id='laptop_serialNo'
                        dataKey='serialNo'
                        onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                        label="Serial No."
                        htmlFor="laptop_serialNo"
                    />

                    <Input 
                        placeholder='Taken home?'
                        id='laptop_takenHome'
                        dataKey='takenHome'
                        type="checkbox"
                        onChange={e => onEdit(e.target.dataset.key, e.target.checked)}
                        label="Taken home?"
                        htmlFor="laptop_takenHome"
                    />
                </FieldSet>
            )}
            {deviceType === 'monitors' && (
                <FieldSet legend="Add new monitor">
                    <Input 
                        placeholder='Make / Model'
                        id='monitor_makeModel'
                        dataKey='makeModel'
                        onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                        label="Make / Model"
                        htmlFor="monitor_makeModel"
                    />

                    <Input 
                        placeholder='Serial No.'
                        id='monitor_serialNo'
                        dataKey='serialNo'
                        onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                        label="Serial No."
                        htmlFor="monitor_serialNo"
                    />

                    <Input 
                        placeholder='Screen Size'
                        id='monitor_screenSize'
                        dataKey='screenSize'
                        onBlur={e => onEdit(e.target.dataset.key, e.target.value)}
                        label="Screen Size"
                        htmlFor="monitor_screenSize"
                    />
                </FieldSet>
            )}
            {(state_role === 'admin' && (deviceType === 'laptops' || deviceType === 'monitors')) && (
                <FieldSet legend="Assign to Employee">

                    <Input 
                        type="checkbox" 
                        id="employeeAssignment" 
                        name="employeeAssignment" 
                        defaultChecked={false} 
                        onChange={e => onEmployeeAssignment(e.target.checked)}
                        label="Yes"
                        htmlFor="employeeAssignment"
                    />
                    
                    {employeeAssignment && (
                        isLoading ? (
                            <Loading />
                            ) : (
                            isError ? (
                                <Error />
                                ) : (
                                    <ul id='user-employee'>
                                        {userData.map(user => (
                                            <Users user={user} key={user.googleId} onClick={() => onUserSelect(user.googleId)} />
                                        ))}
                                    </ul>
                                )
                            )
                        )
                    }
                </FieldSet>
            )}
            {(deviceType === 'laptops' || deviceType === 'monitors') && (
                <div>
                    <button onClick={() => onAdd()}>Add Device</button>
                    <button onClick={() => onCancel()}>Cancel</button>
                </div>
            )}
        </React.Fragment>
    );

}

export default withFirebase(AddItem);