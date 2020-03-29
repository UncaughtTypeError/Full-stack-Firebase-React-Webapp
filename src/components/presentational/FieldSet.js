import React from 'react';
// Theme
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const FieldSet = (props) => {

    const { children, legend, className } = props;

    return (
        <FormControl component="fieldset" fullWidth className={className}>
            <FormLabel component="legend">{legend}</FormLabel>
            {children}
        </FormControl>
    );

}

export default FieldSet;