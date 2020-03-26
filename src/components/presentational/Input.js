import React from 'react';

const Input = (props) => {

    return (
        <React.Fragment>

            <input 
                type=           {props.type} 
                id=             {props.id} 
                name=           {props.name} 
                placeholder=    {props.placeholder}
                value=          {props.value} 
                defaultValue=   {props.defaultValue}
                data-key=       {props.dataKey}
                checked=        {props.checked} 
                defaultChecked= {props.defaultChecked}
                onChange=       {props.onChange} 
                onBlur=         {props.onBlur}
            />
            {props.label && (
                <label htmlFor={props.htmlFor}>{props.label}</label>
            )}

        </React.Fragment>
    );

}

export default Input;