import { SET_DEVICE_PROPS } from '../actions/actionTypes';

const initialDevicesObjectState = {
    laptopsNum: 0,
    monitorsNum: 0,
}

export default function( state = initialDevicesObjectState, action = {} ) {
    switch(action.type) {
        case SET_DEVICE_PROPS: {
            const devicesObject = action.payload;
            return { ...state, ...devicesObject }
        }
        default:
            return state;
    }
}