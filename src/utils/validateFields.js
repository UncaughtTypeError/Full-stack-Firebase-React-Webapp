const validateFields = (validationData, type) => {

    let invalidField = false;

    switch(type) {

        case 'add':
            
            for (let [key] of Object.entries(validationData)) {
                if (
                    validationData.hasOwnProperty(key) && 
                    validationData[key] === true
                    ) {
                    invalidField = true;
                    break;
                } else {
                    invalidField = false;
                }
            }

            break;
        case 'update':

            for (let [key] of Object.entries(validationData)) {
                if (
                    validationData.hasOwnProperty(key) && 
                    validationData[key] === true
                    ) {
                    invalidField = true;
                    break;
                } else {
                    invalidField = false;
                }
            }

            break;
        default:
            return;

    }

    return invalidField ? true : false;

}

export default validateFields;