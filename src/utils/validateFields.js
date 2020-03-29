const validateFields = (deviceType, deviceData, type) => {

    let invalidField = false,
        validField = 0;

    switch(type) {

        case 'add':
            
            for (let [key] of Object.entries(deviceData[deviceType])) {
                if (deviceData[deviceType].hasOwnProperty(key) && deviceData[deviceType][key].length <= 0) {
                    invalidField = true;
                    validField = 0;
                    break;
                } else {
                    validField++;
                }
            }

            break;
        case 'update':

            for (let [id] of Object.entries(deviceData)) {
                console.log({deviceData},[id],deviceData[id]);
                for (let [key] of Object.entries(deviceData[id])) {
                    if (deviceData[id].hasOwnProperty(key) && deviceData[id][key].length <= 0) {
                        invalidField = true;
                        validField = 0;
                        break;
                    } else {
                        validField++;
                    }
                }
            }

            break;
        default:
            return;

    }

    switch(deviceType) {
        case 'laptops':
            if(validField <= 1) {
                invalidField = true;
                validField = 0;
            }
        break;
        case 'monitors':
            if(validField <= 2) {
                invalidField = true;
                validField = 0;
            }
        break;
        default:
            invalidField = false;
    }

    return invalidField ? true : false;

}

export default validateFields;