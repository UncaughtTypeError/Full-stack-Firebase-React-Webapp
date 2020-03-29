import React from 'react';
// Theme
import TextField from '@material-ui/core/TextField';

const InputTextField = (props) => {

    return (
        <TextField 
            type=           {props.type} 
            id=             {props.id} 
            name=           {props.name} 
            placeholder=    {props.placeholder}
            onChange=       {props.onChange} 
            onBlur=         {props.onBlur}
            label=          {props.label}
            inputProps=     {{ 
                ['data-key']:       props.dataKey, 
                ['data-deviceid']:  props.dataDeviceID, 
                value:              props.value,
                defaultValue:       props.defaultValue 
            }}
            size=           "small"
            variant=        "filled" 
            margin=         "none"
            fullWidth
        />
    );

}

export default InputTextField;