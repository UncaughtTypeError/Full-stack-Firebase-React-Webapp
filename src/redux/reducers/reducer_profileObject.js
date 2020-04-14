import { 
    SET_USER_PROPS,
    LOG_IN_SUCCESS,
    LOG_OUT_SUCCESS
} from '../actions/actionTypes';

const initialProfileObjectState = {
    googleId: null,
    role: null,
    imageUrl: null,
    email: null,
    name: null,
    givenName: null,
    familyName: null,
    userExists: false,
    dataEdit: false
}

const profileObjectConstructor = (payload) => {
    let { profileObj: profileObject } = payload;
    return {
        googleId:   profileObject.googleId,
        imageUrl:   profileObject.imageUrl,
        email:      profileObject.email,
        name:       profileObject.name,
        givenName:  profileObject.givenName,
        familyName: profileObject.familyName
    }
}

export default function( state = initialProfileObjectState, action = {} ) {
    switch(action.type) {
        case LOG_IN_SUCCESS: {
            const profileObject = profileObjectConstructor(action.payload);
            return { ...state, ...profileObject }
        }
        case SET_USER_PROPS: {
            const userPropsObject = action.payload;
            return { ...state, ...userPropsObject }
        }
        case LOG_OUT_SUCCESS: {
            return { ...state, ...initialProfileObjectState }
        }
        default:
            return state;
    }
}