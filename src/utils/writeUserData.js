// Utils
import userObjectConstructor from './userObjectConstructor';

const writeUserData = (profileObject, dbRef) => {

    const setUserObject = userObjectConstructor(profileObject);

    let existingData = null;

    dbRef.once('value', (snapshot) => {
        existingData = snapshot.val();
    });

    dbRef.set({...existingData, ...setUserObject}, (error) => {
        if (error) {
            console.error("Data could not be saved." + error);
        } else {
            console.info("Data saved successfully.");
        }
    });
};

export default writeUserData;