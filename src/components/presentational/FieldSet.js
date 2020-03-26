import React from 'react';

const FieldSet = (props) => {

    const { children, legend } = props;

    return (
        <fieldset>
            <legend>{legend}</legend>
            {children}
        </fieldset>
    );

}

export default FieldSet;