import React from 'react';

const Input = (props) => {
    return ( 
        <div className="form-group">
            <label htmlFor={props.name}>{ props.label }</label>
            <input
                type={props.type}
                className="form-control"
                id={props.name}
                placeholder={`${props.label}`}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
            />
            {props.error && <small className="mt-5 text-danger">{props.error}</small>}
        </div>
     );
}
 
export default Input;