import React from 'react';

const Input = (props) => {
    return ( 
        <div className="form-group">
            <label htmlFor={props.name}>{ props.label }</label>
            <input
                type={props.type}
                className="form-control"
                id={props.name}
                placeholder={`Enter ${props.label}`}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
            />
            {props.error && <div className="alert alert-danger">{props.error}</div>}
        </div>
     );
}
 
export default Input;