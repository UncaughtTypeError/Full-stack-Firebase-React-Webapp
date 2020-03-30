import React from 'react';
// Theme
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const InputCheckbox = (props) => {

    return (
        <FormControlLabel
            control={
                <Checkbox
                    id=             {props.id} 
                    name=           {props.name} 
                    onChange=       {props.onChange} 
                    onBlur=         {props.onBlur}
                    checked=        {props.checked} 
                    error=          {props.error ? true : undefined}
                    required=       {props.required}
                    inputProps=     {{ 
                        ['data-key']:       props.dataKey, 
                        ['data-deviceid']:  props.dataDeviceID, 
                        ['data-fieldid']:   props.dataFieldID, 
                        value:              props.value 
                    }}
                />
            }
            labelPlacement={props.labelPlacement}
            label={props.label}
            htmlFor={props.htmlFor}
        />
    );

}

export default InputCheckbox;