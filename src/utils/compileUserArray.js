const compileUserArray = (props) => {

    let { snapshot, userId = null } = props,
        dbItems = snapshot.val();

    let userObject = [],
        laptopsObject = {},
        monitorsObject = {},
        devicesNumObject = {},

        userArray = [],
        laptopsArray = [],
        monitorsArray = [];

    for(let [key, value] of Object.entries(dbItems)) {
        userObject.push(value);
    }

    userObject.map((key, index) => {

        userArray.push({
            googleId: key.googleId,
            role: key.role,
            profile: {
                imageUrl:   key.profile.imageUrl,
                email:      key.profile.email,
                name:       key.profile.name,
                givenName:  key.profile.givenName,
                familyName: key.profile.familyName
            },
            devices: {
                laptops: [],
                monitors: []
            },
            devicesNum: {
                laptopsNum: 0,
                monitorsNum: 0
            }
        });

        if(key.devices) {

            laptopsObject = key.devices.laptops || {};
            for(let [key] of Object.entries(laptopsObject)) {
                laptopsArray = userArray[index].devices.laptops;
                laptopsArray.push({
                    id:         key,
                    makeModel:  laptopsObject[key].makeModel,
                    serialNo:   laptopsObject[key].serialNo,
                    takenHome:  laptopsObject[key].takenHome
                });
                userArray[index].devicesNum.laptopsNum++
            }

            monitorsObject = key.devices.monitors || {};
            for(let [key] of Object.entries(monitorsObject)) {
                monitorsArray = userArray[index].devices.monitors;
                monitorsArray.push({
                    id:         key,
                    makeModel:  monitorsObject[key].makeModel,
                    serialNo:   monitorsObject[key].serialNo,
                    screenSize: monitorsObject[key].screenSize
                });
                userArray[index].devicesNum.monitorsNum++
            }

        }

    });
    if(userId) {
        userArray.some((user,index) => { // move current user profile to first index of array
            user.googleId === userId && userArray.unshift(userArray.splice(index, 1)[0]);
        });
    }

    return userArray;

};

export default compileUserArray;