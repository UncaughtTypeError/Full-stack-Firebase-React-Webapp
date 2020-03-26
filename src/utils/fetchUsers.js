// Utils
import compileUserArray from '../utils/compileUserArray';

const fetchUsers = (props) => {
    let { firebase, userId } = props;

    (async () => {

        try {
            const   db = await firebase.database(),
                    data = db.ref('users');

            data.on('value', (snapshot) => {
                if(snapshot) {
                    return compileUserArray({ snapshot, userId });
                }
            });
        } catch (error) {
            console.error(error);
        }

    })();

}

export default fetchUsers;