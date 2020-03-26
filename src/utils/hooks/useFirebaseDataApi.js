import { useState, useEffect } from 'react';
// Utils
import compileUserArray from '../compileUserArray';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { handleLoading } from '../../redux/actions/actions';

const useFirebaseDataApi = (firebaseObj) => {

    const   state_profileObject = useSelector(state => state.profileObject),
            state_userId        = state_profileObject.googleId,
            dispatch            = useDispatch(),
            fetchingData        = (boolean) => dispatch(handleLoading(boolean));

    const   [firebase, fetchFirebaseUsers] = useState(firebaseObj),
            [userData, setUserData] = useState([]),
            [isError, setIsError] = useState(false),
            [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let didCancel = false;

        (async function fetchUserData() {

            try {
                const   db = await firebase.database(),
                        data = db.ref('users');

                if(!didCancel) {
                    data.on('value', (snapshot) => {
                        if(snapshot) {
                            setUserData( compileUserArray({ snapshot, state_userId }) );
                        }
                    });
                }
            } catch (error) {
                if(!didCancel) {
                    setIsError(true);
                    console.error(error);
                }
            }

        })();

        return () => {
            didCancel = true;
        };
    }, [firebase]);

    useEffect(() => {
        
        if (userData.length) {
            fetchingData(false);
            setIsLoading(false);
        } else {
            fetchingData(true);
            setIsLoading(true);
        }

    }, [userData]);

    return [{ userData, isError, isLoading }, fetchFirebaseUsers];

}

export default useFirebaseDataApi;