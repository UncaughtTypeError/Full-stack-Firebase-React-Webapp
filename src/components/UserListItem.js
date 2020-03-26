import React, { useState } from 'react';
// Components
import withFirebase from './containers/withFirebase';
import Input from './presentational/Input';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { userAdditionalProps } from '../redux/actions/actions';

const UserListItem = (props) => {

    const   { userData, firebase } = props;
    
    const   state_user          = useSelector(state => state.profileObject),
            dispatch            = useDispatch(),
            setAdditionalProps  = (props) => dispatch(userAdditionalProps(props));

    const   [deviceData, setDeviceData] = useState({}),
            [userEdit, setUserEdit] = useState(null);

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

    const onEdit = (key, value, deviceId) => {

        let editData = {};
        editData[deviceId] = { ...deviceData[deviceId], [key]: value };

        setDeviceData({...deviceData, ...editData});
    };

    const onUserEdit = (boolean, userId = null) => {
        setUserEdit(userId);
        setAdditionalProps({ dataEdit: boolean });
    }

    return (
        <React.Fragment>
            {userData.map(user => (
                <li className='userList__user' key={user.googleId} id={user.googleId}>
                    <div className='user__profile'>
                        <div><img src={user.profile.imageUrl} alt={user.profile.name} /></div>
                        <div>{user.profile.name}</div>
                        <div><a href={`mailto:${user.profile.email}`}>{user.profile.email}</a></div>
                    </div>
                    <div className='devices'>
                        <div className='devices_laptops'>
                            <h4>Laptops</h4>
                            {user.devices.laptops.length ? (
                                <ul className='devices__laptops__list'>
                                    {user.devices.laptops.map(laptop => (
                                        <li key={laptop.id} id={laptop.id}>
                                            {(  state_user.dataEdit && 
                                                (user.googleId === userEdit) && 
                                                (user.googleId === state_user.googleId || state_user.role === 'admin') ) ? (
                                                <div>
                                                    <Input 
                                                        defaultValue={laptop.makeModel} 
                                                        dataKey='makeModel' 
                                                        onBlur={e => onEdit(e.target.dataset.key, e.target.value, laptop.id)} 
                                                    />
                                                    <Input 
                                                        defaultValue={laptop.serialNo} 
                                                        dataKey='serialNo' 
                                                        onBlur={e => onEdit(e.target.dataset.key, e.target.value, laptop.id)} 
                                                    />
                                                    <Input 
                                                        defaultValue={laptop.takenHome} 
                                                        dataKey='takenHome' 
                                                        type='checkbox' 
                                                        defaultChecked={laptop.takenHome ? 'checked' : ''} 
                                                        onChange={e => onEdit(e.target.dataset.key, e.target.checked ? true : false, laptop.id)} 
                                                    />
                                                    <button onClick={() => onUpdate(user.googleId, laptop.id, 'laptops')}>Update</button>
                                                    <button onClick={() => onRemove(user.googleId, laptop.id, 'laptops')}>Remove</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <strong>{laptop.makeModel}</strong> <span>{laptop.serialNo}</span> <span>{laptop.takenHome ? 'Yes' : 'No'}</span>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div>No Laptops found...</div>
                            )}
                        </div>
                        <div className='devices_monitors'>
                            <h4>Monitors</h4>
                            {user.devices.monitors.length ? (
                                <ul className='devices__monitors__list'>
                                    {user.devices.monitors.map(monitor => (
                                        <li key={monitor.id} id={monitor.id}>
                                            {(  state_user.dataEdit && 
                                                (user.googleId === userEdit) && 
                                                (user.googleId === state_user.googleId || state_user.role === 'admin') ) ? (
                                                <div>
                                                    <Input 
                                                        defaultValue={monitor.makeModel} 
                                                        dataKey='makeModel' 
                                                        onBlur={e => onEdit(e.target.dataset.key, e.target.value, monitor.id)} 
                                                    />
                                                    <Input 
                                                        defaultValue={monitor.serialNo} 
                                                        dataKey='serialNo' 
                                                        onBlur={e => onEdit(e.target.dataset.key, e.target.value, monitor.id)} 
                                                    />
                                                    <Input 
                                                        defaultValue={monitor.screenSize} 
                                                        dataKey='screenSize' 
                                                        onBlur={e => onEdit(e.target.dataset.key, e.target.value, monitor.id)}
                                                    />
                                                    <button onClick={() => onUpdate(user.googleId, monitor.id, 'monitors')}>Update</button>
                                                    <button onClick={() => onRemove(user.googleId, monitor.id, 'monitors')}>Remove</button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <strong>{monitor.makeModel}</strong> <span>{monitor.serialNo}</span> <span>{monitor.screenSize}</span>
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div>No Monitors found...</div>
                            )}
                        </div>
                        <div>
                            {(user.devices.laptops.length > 0 || user.devices.monitors.length > 0) && (

                                // can the current user edit?
                                user.googleId === state_user.googleId || state_user.role === 'admin') && (

                                    // is the current user editing?
                                    state_user.dataEdit && (user.googleId === userEdit) ? (
                                        <button onClick={() => onUserEdit(false)}>Cancel</button>
                                    ) : (
                                        <button onClick={() => onUserEdit(true, user.googleId)}>Update</button>
                                    )
                                    
                            )}
                        </div>
                    </div>
                </li>
            ))}
        </React.Fragment>
    );

}

export default withFirebase(UserListItem);